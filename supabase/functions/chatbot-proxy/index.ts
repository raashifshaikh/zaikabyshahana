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
    console.log("Chatbot function invoked.");

    const apiKey = Deno.env.get("OPENROUTER_API_KEY")
    if (!apiKey) {
      console.error("CRITICAL: OPENROUTER_API_KEY environment variable not found.");
      throw new Error("The OPENROUTER_API_KEY is not set in the Supabase project secrets.")
    } else {
      console.log("Successfully loaded OPENROUTER_API_KEY.");
    }

    const { message } = await req.json()
    if (!message) {
      console.error("Request body did not contain a 'message' property.");
      return new Response(JSON.stringify({ error: "No message provided in the request body." }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }
    console.log(`Received message: "${message}"`);

    const requestBody = {
      model: "mistralai/mistral-7b-instruct:free",
      messages: [
        { role: "system", content: "You are a friendly and helpful cooking assistant for a recipe website called ZaikabyShahana. Keep your answers concise and focused on cooking, recipes, and culinary advice." },
        { role: "user", content: message },
      ],
    };

    console.log("Sending request to OpenRouter API...");
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
    console.log(`Received response from OpenRouter with status: ${response.status}`);

    const data = await response.json()

    if (!response.ok) {
      console.error("OpenRouter API returned an error.", { status: response.status, body: data });
      const errorMessage = data?.error?.message || `API request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    const botResponse = data.choices?.[0]?.message?.content;

    if (!botResponse) {
      console.error("Could not extract bot response from API. Full API response:", data);
      throw new Error("Failed to extract bot response from API.");
    }

    console.log("Successfully generated bot response.");
    return new Response(JSON.stringify({ reply: botResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error("An unexpected error occurred in the edge function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})