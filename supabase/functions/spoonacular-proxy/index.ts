import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SPOONACULAR_API_URL = "https://api.spoonacular.com"

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const apiKey = Deno.env.get("SPOONACULAR_API_KEY")
    if (!apiKey) {
      throw new Error("SPOONACULAR_API_KEY is not set in environment variables. Please add it in your Supabase project settings.")
    }

    const { path, params } = await req.json() // e.g., path: 'recipes/complexSearch', params: { query: 'pasta' }
    
    const queryParams = new URLSearchParams({ ...params, apiKey })
    const apiUrl = `${SPOONACULAR_API_URL}/${path}?${queryParams}`

    const response = await fetch(apiUrl)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || `API request failed with status ${response.status}`)
    }

    return new Response(JSON.stringify(data), {
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