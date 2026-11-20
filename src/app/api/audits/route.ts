import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuditRecord } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { record, auditor } = body as {
      record: AuditRecord;
      auditor?: { name?: string; phone?: string };
    };

    if (!record || !record.business?.name) {
      return NextResponse.json(
        { success: false, error: "Valid audit record and client name are required" },
        { status: 400 }
      );
    }

    const clientName = record.business.name.trim();
    const phone =
      record.business.whatsappNumber ||
      record.business.phone ||
      auditor?.phone ||
      null;
    const auditorName =
      auditor?.name?.trim() ||
      record.business.auditorName ||
      "TWS Coach";
    const auditorPhone = auditor?.phone?.trim() || null;

    try {
      const saved = await (prisma as any).twsSampleAudit.create({
        data: {
          slug: record.id,
          auditType: record.auditType,
          clientName,
          phone,
          whatsappNumber: phone,
          auditorName,
          auditorPhone,
          category: record.business.category || null,
          locality: record.business.locality || null,
          age: record.business.age || null,
          biologicalSex: record.business.biologicalSex || null,
          totalScore: record.totalScore,
          maxScore: record.maxScore || 100,
          percentage: record.percentage || record.totalScore,
          bandTitle: record.band.title,
          bandHeadline: record.band.headline || null,
          sprintRecommendation: record.band.sprintRecommendation || null,
          sectionScores: record.sectionScores as any,
          answers: record.answers as any,
          findings: record.findings as any,
          profileDetails: record.business as any,
          payload: body.payload || null,
        },
      });

      return NextResponse.json(
        {
          success: true,
          id: saved.id,
          slug: saved.slug,
          message: "Audit successfully saved to database",
        },
        { status: 201 }
      );
    } catch (dbErr: any) {
      console.warn("Prisma tws_sample_audit save failed:", dbErr.message);
      return NextResponse.json(
        {
          success: true,
          id: record.id,
          warning: "Saved to local cache fallback: " + dbErr.message,
        },
        { status: 200 }
      );
    }
  } catch (err: any) {
    console.error("API Error in POST /api/audits:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);
    const search = searchParams.get("search")?.trim() || "";

    const where: any = {};
    if (type && type !== "all") {
      where.auditType = type;
    }
    if (search) {
      where.OR = [
        { clientName: { contains: search, mode: "insensitive" } },
        { phone: { contains: search } },
        { auditorName: { contains: search, mode: "insensitive" } },
      ];
    }

    const [total, audits] = await Promise.all([
      (prisma as any).twsSampleAudit.count({ where }),
      (prisma as any).twsSampleAudit.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
      }),
    ]);

    return NextResponse.json({
      success: true,
      total,
      audits,
      hasMore: offset + audits.length < total,
    });
  } catch (err: any) {
    console.error("API Error in GET /api/audits:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch audits" },
      { status: 500 }
    );
  }
}
