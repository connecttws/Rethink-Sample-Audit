import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuditRecord, AuditType } from "@/lib/types";
import { decodeRecordFromPayload } from "@/lib/session-store";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Audit ID is required" },
        { status: 400 }
      );
    }

    // Look up by primary id or slug
    const record = await (prisma as any).twsSampleAudit.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!record) {
      return NextResponse.json(
        { success: false, error: "Audit record not found" },
        { status: 404 }
      );
    }

    // Increment view count asynchronously
    (prisma as any).twsSampleAudit
      .update({
        where: { id: record.id },
        data: { viewCount: { increment: 1 } },
      })
      .catch(() => {});

    let formatted: AuditRecord | null = null;
    if (record.payload) {
      formatted = decodeRecordFromPayload(record.payload);
    }

    if (!formatted) {
      formatted = {
        id: record.slug || record.id,
        auditType: (record.auditType || "fitness") as AuditType,
        createdAt: record.createdAt instanceof Date ? record.createdAt.toISOString() : new Date().toISOString(),
        business: (record.profileDetails as any) || {
          name: record.clientName,
          clientName: record.clientName,
          phone: record.whatsappNumber || record.phone || "",
          whatsappNumber: record.whatsappNumber || record.phone || "",
          category: record.category || "",
          locality: record.locality || "",
          auditorName: record.auditorName || "TWS Coach",
          age: record.age || undefined,
          biologicalSex: record.biologicalSex || undefined,
        },
        answers: (record.answers as any) || {},
        sectionScores: (record.sectionScores as any) || [],
        totalScore: record.totalScore,
        maxScore: record.maxScore || 100,
        percentage: record.percentage || record.totalScore,
        band: {
          title: record.bandTitle,
          range: "0-100",
          badgeClass: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
          accentColor: "emerald",
          headline: record.bandHeadline || record.bandTitle,
          description: record.bandHeadline || "",
          sprintRecommendation: record.sprintRecommendation || "12-Week Guided Onboarding Protocol",
          sprintDetails: "Guided 1-on-1 coaching intervention and lifestyle realignment.",
        },
        findings: (record.findings as any) || [],
      };
    }

    const shortId = record.slug || record.id;
    return NextResponse.json({
      success: true,
      audit: formatted,
      shortUrl: `/r/${shortId}`,
      fullUrl: `/report?id=${shortId}`,
    });
  } catch (err: any) {
    console.error("Error in GET /api/audits/[id]:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to load audit" },
      { status: 500 }
    );
  }
}
