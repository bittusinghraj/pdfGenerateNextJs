import { NextResponse } from "next/server"

export async function POST(request) { 
    let data = await request.json()
    return new NextResponse(JSON.stringify(data));
}