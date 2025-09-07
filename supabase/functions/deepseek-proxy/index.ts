import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions"

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const apiKey = Deno.env.get("DEEPSEEK_API_KEY")
    if (!apiKey) {
      throw new Error("DEEPSEEK_API_KEY is not set in environment variables. Please add it in your Supabase project settings.")
    }

    const { message } = await req.json()
    if (!message) {
      throw new Error("No message provided in the request body.")
    }

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "You are a friendly and helpful cooking assistant for a recipe website called ZaikabyShahana. Keep your answers concise and focused on cooking, recipes, and culinary advice." },
          { role: "user", content: message },
        ],
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error?.message || `API request failed with status ${response.status}`)
    }

    const botResponse = data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response."

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