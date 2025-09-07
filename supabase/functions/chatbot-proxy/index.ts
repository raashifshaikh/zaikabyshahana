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
      console.error("OPENROUTER_API_KEY not found.");
      throw new Error("OPENROUTER_API_KEY is not set in environment variables.")
    }

    const { message } = await req.json()
    if (!message) {
      console.error("No message in request body.");
      throw new Error("No message provided in the request body.")
    }

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': `https://hgstyhpuewxeiwpphorj.supabase.co`,
        'X-Title': `ZaikabyShahana`,
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free", // Switched to a more reliable free model
        messages: [
          { role: "system", content: "You are a friendly and helpful cooking assistant for a recipe website called ZaikabyShahana. Keep your answers concise and focused on cooking, recipes, and culinary advice." },
          { role: "user", content: message },
        ],
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("OpenRouter API Error:", data);
      const errorMessage = data?.error?.message || `API request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    const botResponse = data.choices?.[0]?.message?.content;

    if (!botResponse) {
      console.error("Could not extract bot response. Full API response:", data);
      throw new Error("Failed to extract bot response from API.");
    }

    return new Response(JSON.stringify({ reply: botResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error("Error in Edge Function:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})