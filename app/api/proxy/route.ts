// app/api/proxy/route.ts

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(req: Request) {
  try {
    const requestBody = await req.json();

    const apiUrl =
      "https://api.zerowidth.ai/v1/process/jEtdtYF8iVXc3BdCVg0b/1D0dqGu2Gz2jNaGRXFVr";

    const bearerToken = process.env.ZEROWIDTH_API_KEY;

    if (!bearerToken) {
      return new Response(
        JSON.stringify({ error: "Missing ZEROWIDTH_API_KEY" }),
        { status: 500 }
      );
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    const text = await response.text();

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: `Zerowidth error ${response.status}`,
          details: text,
        }),
        { status: response.status }
      );
    }

    return new Response(text, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: "Internal Server Error", details: err?.message }),
      { status: 500 }
    );
  }
}
