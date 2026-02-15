// Cloudflare Pages Functions - Fortune API
// Uses Workers AI for fortune generation

interface Env {
  AI: Ai;
  FORTUNE_DB: D1Database;
}

interface FortuneRequest {
  name: string;
  birthDay: string;
  topic: string;
  language: string;
}

// Generate AI-powered fortune
export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context;
  
  try {
    const data: FortuneRequest = await request.json();
    const { name, birthDay, topic, language } = data;

    // Try to use Workers AI if available
    if (env.AI) {
      const prompt = `You are a humorous Thai fortune teller named "Uncle Moo" (ลุงมู).
Generate a personalized fortune in ${language} for:
- Name: ${name}
- Birth day: ${birthDay}
- Topic: ${topic}

Include:
1. A playful personality archetype based on their birth day
2. A specific Thai regional destination they should visit
3. A local product they should buy
4. A humorous "ritual" they must perform
5. A luck score (60-99)

Keep it light-hearted and promote Thai soft power. Respond in JSON format with keys: archetype, location, product, ritual, luckScore, prediction.`;

      const response = await env.AI.run('@cf/meta/llama-3.2-3b-instruct', {
        prompt,
        max_tokens: 500,
      });

      return new Response(JSON.stringify({ 
        fortune: response,
        aiGenerated: true 
      }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Fallback response without AI
    return new Response(JSON.stringify({ 
      fortune: null,
      aiGenerated: false,
      message: 'AI not available, using local data'
    }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'Failed to generate fortune',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Save analytics
export async function onRequestPut(context: { request: Request; env: Env }) {
  const { request, env } = context;
  
  try {
    const data = await request.json();
    
    if (env.FORTUNE_DB) {
      await env.FORTUNE_DB.prepare(
        'INSERT INTO fortunes (id, session_id, name, birth_day, topic, archetype_title, quest_location, quest_product, luck_score) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
      ).bind(
        crypto.randomUUID(),
        data.sessionId || 'anonymous',
        data.name,
        data.birthDay,
        data.topic,
        data.archetypeTitle,
        data.questLocation,
        data.questProduct,
        data.luckScore
      ).run();
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'Failed to save analytics',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
