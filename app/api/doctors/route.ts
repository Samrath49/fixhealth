import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { ApiErrors, Collections } from "@/constants/api";
import type { Doctor, ApiResponse } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request
): Promise<NextResponse<ApiResponse<Doctor[]>>> {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");

    const db = await getDatabase();
    const query = city ? { city, availability: true } : { availability: true };

    const doctors = await db
      .collection(Collections.DOCTORS)
      .find(query)
      .project({ name: 1, expertise: 1, city: 1 })
      .sort({ name: 1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: doctors as Doctor[],
    });
  } catch (error) {
    console.error("Doctor fetch error:", error);
    return NextResponse.json(
      { success: false, error: ApiErrors.FETCH_DOCTORS },
      { status: 500 }
    );
  }
}
