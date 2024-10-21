import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import type { Booking } from "@/types";

export async function POST(request: Request) {
  try {
    const body: Booking = await request.json();

    // Validation logic
    if (body.age < 30) {
      delete body.previousPhysioExperience;
    }

    if (["housewife", "homemaker"].includes(body.occupation.toLowerCase())) {
      delete body.company;
    }

    const client = await clientPromise;
    const db = client.db("physiotherapy");

    const result = await db.collection("bookings").insertOne({
      ...body,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        bookingId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create booking." + error },
      { status: 400 }
    );
  }
}
