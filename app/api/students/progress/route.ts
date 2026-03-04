import { NextResponse } from "next/server";
import { studentProgressList } from "@/lib/platform-data";

export async function GET() {
  return NextResponse.json({
    items: studentProgressList,
    total: studentProgressList.length,
  });
}
