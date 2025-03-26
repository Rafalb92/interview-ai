import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

import { db } from '@/firebase/admin';
import { getRandomInterviewCover } from '@/lib/utils';

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userId } = await request.json();

  try {
    const { text: questions } = await generateText({
      model: google('gemini-2.0-flash-001'),
      prompt: `Przygotuj pytania na rozmowę kwalifikacyjną.
    Stanowisko pracy: ${role}.
    Poziom doświadczenia: ${level}.
    Stos technologiczny używany w pracy: ${techstack}.
    Nacisk między pytaniami behawioralnymi a technicznymi powinien być skierowany w stronę: ${type}.
    Liczba wymaganych pytań: ${amount}.
    
    Proszę zwrócić tylko pytania, bez dodatkowego tekstu.
    Pytania będą odczytywane przez asystenta głosowego, więc nie używaj znaków takich jak "/" czy "*", ani żadnych innych znaków specjalnych, które mogłyby zakłócić działanie asystenta głosowego.
    
    Zwróć pytania w następującym formacie:
    ["Pytanie 1", "Pytanie 2", "Pytanie 3"]
    
    Dziękuję! <3
  `,
    });

    const interview = {
      role: role,
      type: type,
      level: level,
      techstack: techstack.split(','),
      questions: JSON.parse(questions),
      userId: userId,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection('interviews').add(interview);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ success: false, error: error }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ success: true, data: 'Thank you!' }, { status: 200 });
}
