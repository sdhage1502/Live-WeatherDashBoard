export const generateWeatherSummary = async (weather, forecast, type = 'today') => {
  const inputData = type === 'today' ? weather : forecast;

  const prompt = `
    You are a helpful weather assistant. Generate a clear, concise, and friendly summary for the user based on the following ${type === 'today' ? 'current weather' : '5-day forecast'} data:
    ${JSON.stringify(inputData)}
  `;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_META_AI_API_KEY}`,
        "HTTP-Referer": "https://your-site-url.com", // Optional
        "X-Title": "React Weather App",              // Optional
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.3-8b-instruct:free",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();
    return data?.choices?.[0]?.message?.content || "No summary generated.";
  } catch (error) {
    console.error("AI summary error:", error);
    throw error;
  }
};
