import { appParams } from './app-params';

const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${appParams.geminiModel}:generateContent`;

export const hasGeminiConfig = Boolean(appParams.geminiApiKey);

export async function askGemini(message, model) {
  if (!hasGeminiConfig) return null;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-goog-api-key': appParams.geminiApiKey,
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: `Eres Kivarux, una asistente de IA clara y útil. Responde en español salvo que el usuario pida otro idioma. Estilo seleccionado: ${model}.` }],
      },
      contents: [{ parts: [{ text: message }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 1200 },
    }),
  });

  if (!response.ok) throw new Error(`Gemini API error: ${response.status}`);
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('') || null;
}