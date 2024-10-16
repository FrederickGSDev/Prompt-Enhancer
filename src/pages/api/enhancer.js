export const GET = async ({ params, request }) => {
  const url = new URL(request.url);
  const prompt = url.searchParams.get('prompt');

  console.log(import.meta.env.API_KEY);

  const response = await fetch("https://ai-api.koyeb.app/api/enhancer/enhance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": import.meta.env.API_KEY
    },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok) {
    // Manejo de errores en caso de una respuesta no exitosa
    return new Response(JSON.stringify({ error: 'Error en la API' }), { status: response.status });
  }

  const data = await response.json();
  const enhancedPrompt = data.promptEnhanced;

  return new Response(JSON.stringify({ enhancedPrompt }), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};
