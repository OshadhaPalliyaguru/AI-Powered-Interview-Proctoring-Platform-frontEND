// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai'; 


const apiKey = process.env.GEMINI_API_KEY;


if (!apiKey) {
  console.error("API Key eka na machan!");
}


const genAI = new GoogleGenerativeAI(apiKey || '');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userMessage = body.message;


    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    
    const prompt = `
      You are a strict, professional technical interviewer for a Full-Stack Software Engineering role. 
      The candidate is a human interacting via voice.
      
      The candidate just said: "${userMessage}"
      
      Instructions for your response:
      1. Act like a real human interviewer.
      2. Briefly acknowledge or evaluate what they just said.
      3. Ask a challenging follow-up technical question related to Next.js, Spring Boot, or System Design.
      4. Keep your response concise (maximum 2-3 sentences), as it will be converted to speech. Do not use markdown, emojis, or lists.
    `;

   
    const result = await model.generateContent(prompt);
    const aiResponseText = result.response.text();

  
    return NextResponse.json({ reply: aiResponseText });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Gemini server ekata connect wenna ba." }, { status: 500 });
  }
}