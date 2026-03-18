// app/api/chat/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
   
    const body = await request.json();
    const userMessage = body.message;


    const mockAiResponse = `Ah, I heard you say: "${userMessage}". That's an interesting point!`;

  
    return NextResponse.json({ reply: mockAiResponse });

  } catch (error) {
  
    return NextResponse.json({ error: "Server eke awulak!" }, { status: 500 });
  }
}