import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

const MAX_GUESTS = 35;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("RSVP BODY:", body);

    const {
      first_name,
      last_name,
      email,
      contact_number,
      company_name,
      birth_date,
    } = body;

    // Validate required fields
    if (
      !first_name ||
      !last_name ||
      !email ||
      !contact_number ||
      !company_name ||
      !birth_date
    ) {
      return NextResponse.json(
        {
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // Check current RSVP count
    const { count, error: countError } = await supabaseAdmin
      .from("rsvps")
      .select("*", {
        count: "exact",
        head: true,
      });

    if (countError) {
      console.error("SUPABASE COUNT ERROR:", countError);

      return NextResponse.json(
        {
          error: countError.message,
          details: countError.details,
          hint: countError.hint,
          code: countError.code,
        },
        { status: 500 }
      );
    }

    console.log("CURRENT RSVP COUNT:", count);

    // Check guest limit
    if ((count ?? 0) >= MAX_GUESTS) {
      return NextResponse.json(
        {
          message:
            "We're sorry, but the maximum number of guests has already been reached.",
        },
        { status: 409 }
      );
    }

    // Save RSVP
    const { data, error: insertError } = await supabaseAdmin
      .from("rsvps")
      .insert([
        {
          first_name,
          last_name,
          email,
          contact_number,
          company_name,
          birth_date,
        },
      ])
      .select();

    if (insertError) {
      console.error("SUPABASE INSERT ERROR:", insertError);

      return NextResponse.json(
        {
          error: insertError.message,
          details: insertError.details,
          hint: insertError.hint,
          code: insertError.code,
        },
        { status: 500 }
      );
    }

    console.log("RSVP SAVED:", data);

    // IMPORTANT: Return a response after successful insert
    return NextResponse.json(
      {
        success: true,
        message: "RSVP submitted successfully!",
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("SERVER ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}