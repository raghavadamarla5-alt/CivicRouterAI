import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { allPortals } from '@/lib/portalsRegistry';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ 
        error: "API Configuration Error: GEMINI_API_KEY is not configured. Please add this variable to your .env file at the root of the project.",
        status: "missing_key"
      }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const { messages, language } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }

    // Prepare system instructions and prompt
    const systemInstruction = `You are CIVIC AI, a smart assistant helping Indian citizens report civic issues (potholes, water supply, sewage, garbage, electricity, etc.). 
    Identify the correct government department. Ask for the state or city if missing. 
    Use the following verified portal registry to recommend the exact portal based on the state and category: ${JSON.stringify(allPortals.map(p => ({name: p.name, desc: p.desc, state: p.state, categories: p.categories})))}
    Do NOT claim a complaint has been officially filed by you. Just guide the user on where and how to file it. Keep responses helpful, direct, and empathetic. Do NOT fabricate URLs. Use only the ones from the registry if matched, or direct them to search.
    CRITICAL: YOU MUST REPLY IN THE LANGUAGE CODE: ${language || 'en'}. If the user types in transliterated input (e.g. Telugu in English letters), understand it but reply in the proper native script of the selected language.`;

    const formattedMessages = messages.map(m => `${m.sender === 'user' ? 'User' : 'Assistant'}: ${m.text}`).join('\n');
    const prompt = `${systemInstruction}\n\nConversation history:\n${formattedMessages}\n\nAssistant:`;

    const modelName = 'gemini-3.5-flash-lite';
    
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
    });

    const replyText = response.text || "I'm sorry, I couldn't generate a response at this time.";

    return NextResponse.json({ reply: replyText });
  } catch (error: any) {
    console.error("AI API Error:", error);
    
    // Provide a helpful generic error instead of stack trace
    let errorMessage = "An unexpected error occurred while communicating with the AI service.";
    if (error.message?.includes("quota") || error.message?.includes("rate limit")) {
      errorMessage = "The AI service is currently busy or out of quota. Please try again later.";
    } else if (error.message?.includes("authentication") || error.message?.includes("key")) {
      errorMessage = "API Configuration Error: Invalid API key.";
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}


