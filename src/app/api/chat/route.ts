// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import Groq from 'groq-sdk'; 


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userMessage = body.message;

  
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a strict, professional technical interviewer for a Full-Stack Software Engineering role. 
          The candidate is a human interacting via voice.
          
          Instructions for your response:
          1. Act like a real human interviewer.
          2. Briefly acknowledge or evaluate what they just said.
          3. Ask a challenging follow-up technical question related to Next.js, Spring Boot, or System Design.
          4. Keep your response concise (maximum 2-3 sentences), as it will be converted to speech. Do not use markdown, emojis, or lists.`
        },
        {
          role: "user",
          content: `The candidate just said: "${userMessage}"`
        }
      ],
 
      model: "llama-3.1-8b-instant", 
      temperature: 0.7, 
    });

 
    const aiResponseText = chatCompletion.choices[0]?.message?.content || "Sorry, I missed that. Can you repeat?";

    return NextResponse.json({ reply: aiResponseText });

  } catch (error) {
    console.error("Groq API Error:", error);
    return NextResponse.json({ error: "Groq server ekata connect wenna ba." }, { status: 500 });
  }
}