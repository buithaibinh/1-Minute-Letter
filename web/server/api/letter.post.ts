/**
 * API endpoint: Generate letter from "future self"
 * POST /api/letter
 */

export default defineEventHandler(async (event) => {
  // Only allow POST
  if (event.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    });
  }

  const config = useRuntimeConfig();
  const apiKey = config.openaiApiKey;

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'OpenAI API key not configured'
    });
  }

  // Prompt template for "future self" letter
  const prompt = `You are writing a short, quiet letter from the perspective of the reader's future self.

Guidelines:
- Keep it under 200 words
- Focus on acknowledgment and companionship, not advice
- Tone: gentle, understanding, non-judgmental
- Write as if you (the future self) have been where they are now
- Avoid giving solutions or telling them what to do
- Simply acknowledge their current state and offer quiet presence
- No motivational language, no "you should", no "you can do it"
- Just understanding and companionship

Write the letter now:`;

  try {
    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a compassionate writer who creates quiet, understanding letters from the perspective of someone\'s future self. You focus on acknowledgment and presence, not advice or solutions.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      // Handle rate limiting
      if (response.status === 429) {
        throw createError({
          statusCode: 429,
          statusMessage: 'Rate limit exceeded. Please try again later.'
        });
      }

      // Handle other API errors
      throw createError({
        statusCode: response.status,
        statusMessage: errorData.error?.message || 'Failed to generate letter'
      });
    }

    const data = await response.json();
    const letter = data.choices[0]?.message?.content?.trim();

    if (!letter) {
      throw createError({
        statusCode: 500,
        statusMessage: 'No letter content received from API'
      });
    }

    // Return letter with metadata
    return {
      letter,
      generatedAt: new Date().toISOString(),
      model: 'gpt-4o'
    };

  } catch (error: any) {
    // Handle network errors
    if (error.name === 'FetchError' || error.message?.includes('fetch')) {
      throw createError({
        statusCode: 503,
        statusMessage: 'Unable to connect to AI service. Please try again.'
      });
    }

    // Re-throw if it's already a createError
    if (error.statusCode) {
      throw error;
    }

    // Generic error
    throw createError({
      statusCode: 500,
      statusMessage: 'Unable to generate letter. Please try again.'
    });
  }
});

