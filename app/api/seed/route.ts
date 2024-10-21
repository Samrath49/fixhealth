import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { ApiErrors, Collections } from "@/constants/api";
import type { ApiResponse } from "@/types";
import { sampleDoctors } from "@/constants";

export async function POST(): Promise<NextResponse<ApiResponse<null>>> {
  try {
    const db = await getDatabase();
    await db.collection(Collections.DOCTORS).insertMany(sampleDoctors);

    return NextResponse.json({
      success: true,
      data: null,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, error: ApiErrors.SEED_DATA },
      { status: 500 }
    );
  }
}
