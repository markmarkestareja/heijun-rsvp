import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

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

    const { data, error } = await supabaseAdmin
      .from("rsvps")
      .insert({
        first_name,
        last_name,
        email,
        contact_number,
        company_name,
        birth_date,
      })
      .select()
      .single();

    if (error) {
      console.error("SUPABASE INSERT ERROR:", error);

      return NextResponse.json(
        {
          error: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        },
        { status: 500 }
      );
    }

    console.log("RSVP SAVED:", data);

    return NextResponse.json(
      {
        message: "RSVP submitted successfully.",
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("SERVER ERROR:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}