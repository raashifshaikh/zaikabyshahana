import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const apiKey = Deno.env.get("OPENROUTER_API_KEY")
    if (!apiKey) {
      throw new Error("The OPENROUTER_API_KEY is not set in the Supabase project secrets.")
    }

    const { query, history } = await req.json()
    if (!query) {
      return new Response(JSON.stringify({ error: "No query provided in the request body." }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    const messages = [
      { role: "system", content: "You are an enthusiastic and friendly cooking assistant for 'ZaikabyShahana', a recipe website by a passionate chef named Shahana. Your tone is encouraging and helpful. You love talking about food! Your goal is to help users with cooking questions, suggest recipes, and explain culinary techniques. Keep your answers concise, focused on cooking, and always positive. When asked for a recipe, provide a simple, clear list of ingredients and steps." },
      ...(history || []),
      { role: "user", content: query },
    ];

    const requestBody = {
      model: "mistralai/mistral-7b-instruct:free",
      messages: messages,
    };

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': `https://hgstyhpuewxeiwpphorj.supabase.co`,
        'X-Title': `ZaikabyShahana`,
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()

    if (!response.ok) {
      const errorMessage = data?.error?.message || `API request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    const botResponse = data.choices?.[0]?.message?.content;

    if (!botResponse) {
      throw new Error("Failed to extract bot response from API.");
    }

    return new Response(JSON.stringify({ reply: botResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})