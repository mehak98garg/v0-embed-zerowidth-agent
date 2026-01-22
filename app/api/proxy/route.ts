import chatConfig from "../../../config/config";

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

    const apiUrl = chatConfig.flowURL;
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

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.ok ? 200 : response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: "Internal Server Error", details: String(error?.message || error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
