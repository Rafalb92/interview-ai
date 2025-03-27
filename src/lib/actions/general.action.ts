'use server';

import { feedbackSchema } from '@/constants';
import { db } from '@/firebase/admin';
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';

export async function getInterviewsByUserId(
  userId: string,
): Promise<Interview[] | null> {
  if (!userId) return null;
  const interviews = await db
    .collection('interviews')
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await db.collection('interviews').doc(id).get();

  return interview.data() as Interview | null;
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams,
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  const interviews = await db
    .collection('interviews')
    .orderBy('createdAt', 'desc')
    .where('finalized', '==', true)
    .where('userId', '!=', userId)
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, feedbackId } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`,
      )
      .join('');

    const { object } = await generateObject({
      model: google('gemini-2.0-flash-001', {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `
        Jesteś sztuczną inteligencją pełniącą rolę rekrutera, analizującą próbny wywiad rekrutacyjny. Twoim zadaniem jest ocena kandydata na podstawie ustalonych kategorii. Bądź dokładny i szczegółowy w swojej analizie. Nie bądź pobłażliwy wobec kandydata. Jeśli zauważysz błędy lub obszary wymagające poprawy, wskaż je.
        Transkrypcja wywiadu:
        ${formattedTranscript}

        Oceń kandydata w skali od 0 do 100 w następujących obszarach. Nie dodawaj innych kategorii niż te podane poniżej:
        - **Umiejętności komunikacyjne**: Jasność wypowiedzi, artykulacja, struktura odpowiedzi.
        - **Wiedza techniczna**:  Zrozumienie kluczowych koncepcji związanych z rolą.
        - **Rozwiązywanie problemów**: Zdolność do analizy problemów i proponowania rozwiązań.
        - **Dopasowanie kulturowe do roli**: Zgodność z wartościami firmy i wymaganiami stanowiska.
        - **Pewność siebie i klarowność**: Pewność w odpowiedziach, zaangażowanie i klarowność wypowiedzi.
        `,
      system:
        'Jesteś profesjonalnym rekruterem analizującym próbny wywiad rekrutacyjny. Twoim zadaniem jest ocena kandydata na podstawie ustalonych kategorii.',
    });

    const feedback = {
      interviewId: interviewId,
      userId: userId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      finalAssessment: object.finalAssessment,
      createdAt: new Date().toISOString(),
    };

    let feedbackRef;

    if (feedbackId) {
      feedbackRef = db.collection('feedback').doc(feedbackId);
    } else {
      feedbackRef = db.collection('feedback').doc();
    }

    await feedbackRef.set(feedback);

    return { success: true, feedbackId: feedbackRef.id };
  } catch (error) {
    console.error('Error saving feedback:', error);
    return { success: false };
  }
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams,
): Promise<Feedback | null> {
  const { interviewId, userId } = params;

  const querySnapshot = await db
    .collection('feedback')
    .where('interviewId', '==', interviewId)
    .where('userId', '==', userId)
    .limit(1)
    .get();

  if (querySnapshot.empty) return null;

  const feedbackDoc = querySnapshot.docs[0];
  return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
}
