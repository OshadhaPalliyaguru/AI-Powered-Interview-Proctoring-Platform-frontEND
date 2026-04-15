// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import Groq from 'groq-sdk'; 


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: Request) {
  try {
    const body = await request.json();
   const userMessage = body.message;
    const candidateName = body.candidateName || "Candidate";
    const role = body.role || "Software Engineer";
    const cvContext = body.cvContext || "No CV provided.";

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
        
          content: `You are a strict, professional technical interviewer for the role of ${role}.
          The candidate's name is ${candidateName}. 
          Here is their CV/Skills summary: "${cvContext}".
          
          Instructions:
          1. Act like a real human interviewer. Use their name occasionally.
          2. Ask challenging technical questions based on the skills mentioned in their CV.
          3. If it's the start of the interview, welcome them by name and ask a question about a specific project or skill in their CV.
          4. Keep your response concise (maximum 2-3 sentences). Do not use markdown or lists.`
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