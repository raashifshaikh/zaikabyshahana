import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const MEALDB_API_URL = "https://www.themealdb.com/api/json/v1/1"

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { path, params } = await req.json() // e.g., path: 'search.php', params: { s: 'Arrabiata' }
    
    const queryParams = new URLSearchParams(params)
    const apiUrl = `${MEALDB_API_URL}/${path}?${queryParams}`

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