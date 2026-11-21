import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const limit = parseInt(searchParams.get("limit") || "50", 10);
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
        { category: { contains: search, mode: "insensitive" } },
      ];
    }

    const [total, records] = await Promise.all([
      (prisma as any).twsSampleAudit.count({ where }),
      (prisma as any).twsSampleAudit.findMany({
        where,
        select: {
          id: true,
          slug: true,
          auditType: true,
          clientName: true,
          phone: true,
          whatsappNumber: true,
          auditorName: true,
          auditorPhone: true,
          category: true,
          locality: true,
          totalScore: true,
          maxScore: true,
          bandTitle: true,
          payload: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
      }),
    ]);

    const formatted = records.map((r: any) => ({
      id: r.slug || r.id,
      type: r.auditType,
      typeBadge:
        r.auditType === "business"
          ? "TWS Lifestyle"
          : r.auditType === "fitness"
          ? "TWS Training"
          : r.auditType === "nutrition"
          ? "TWS Clinical Nutrition"
          : "TWS Physio Audit",
      clientName: r.clientName,
      phone: r.whatsappNumber || r.phone || "Not Provided",
      auditorName: r.auditorName || undefined,
      auditorPhone: r.auditorPhone || undefined,
      score: r.totalScore,
      maxScore: r.maxScore || 100,
      bandTitle: r.bandTitle,
      date: new Date(r.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      createdAt: new Date(r.createdAt).getTime(),
      locality: r.category || r.locality || undefined,
      payload: r.payload || undefined,
    }));

    return NextResponse.json({
      success: true,
      total,
      history: formatted,
      hasMore: offset + records.length < total,
    });
  } catch (err: any) {
    console.error("API Error in GET /api/history:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch history" },
      { status: 500 }
    );
  }
}
