import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { OpenAI } from "https://deno.land/x/openai/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { query, history } = await req.json();
    const openAI = new OpenAI(Deno.env.get("OPENROUTER_API_KEY") || "", "https://openrouter.ai/api/v1");

    const messages = [
      { role: "system", content: "You are a helpful cooking assistant for a food blog called ZaikabyShahana. Provide concise and helpful answers related to cooking, recipes, and ingredients. Be friendly and encouraging." },
      ...(history || []),
      { role: "user", content: query },
    ];

    const completion = await openAI.createChatCompletion({
      model: "openai/gpt-3.5-turbo",
      messages: messages,
    });

    const reply = completion.choices[0].message.content;

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});