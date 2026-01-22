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

    // Get API credentials from environment variables
    const projectId = process.env.ZEROWIDTH_PROJECT_ID;
    const agentId = process.env.ZEROWIDTH_AGENT_ID;
    const apiKey = process.env.ZEROWIDTH_API_KEY;

    console.log("[v0] Environment check:");
    console.log("[v0] ZEROWIDTH_PROJECT_ID exists:", !!projectId);
    console.log("[v0] ZEROWIDTH_AGENT_ID exists:", !!agentId);
    console.log("[v0] ZEROWIDTH_API_KEY exists:", !!apiKey);

    // Validate environment variables
    if (!apiKey) {
      return new Response(
        JSON.stringify({ 
          error: "Missing ZEROWIDTH_API_KEY environment variable",
          help: "Set ZEROWIDTH_API_KEY in your environment variables with your Zerowidth secret key (starts with 'sk0w-')"
        }),
        { status: 500 }
      );
    }

    if (!projectId) {
      return new Response(
        JSON.stringify({ 
          error: "Missing ZEROWIDTH_PROJECT_ID environment variable",
          help: "Set ZEROWIDTH_PROJECT_ID in your environment variables (e.g., 'jEtdtYF8iVXc3BdCVg0b')"
        }),
        { status: 500 }
      );
    }

    if (!agentId) {
      return new Response(
        JSON.stringify({ 
          error: "Missing ZEROWIDTH_AGENT_ID environment variable",
          help: "Set ZEROWIDTH_AGENT_ID in your environment variables (e.g., '1D0dqGu2Gz2jNaGRXFVr')"
        }),
        { status: 500 }
      );
    }

    // Construct the API URL according to Zerowidth API v1 documentation
    const apiUrl = `https://api.zerowidth.ai/v1/process/${projectId}/${agentId}`;
    
    console.log("[v0] Making request to:", apiUrl);
    console.log("[v0] projectId (first 8 chars):", projectId.substring(0, 8) + "...");
    console.log("[v0] agentId (first 8 chars):", agentId.substring(0, 8) + "...");
    console.log("[v0] apiKey starts with 'sk0w-':", apiKey.startsWith("sk0w-"));

    // Transform request to Zerowidth format
    // Zerowidth expects: { data: { messages: [...], variables: {...} } }
    const zerowidthRequest = {
      data: requestBody.messages 
        ? { messages: requestBody.messages } 
        : requestBody.data || requestBody
    };

    console.log("[v0] Sending messages count:", requestBody.messages?.length || 0);

    const bearerToken = apiKey; // Declare the bearerToken variable

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(zerowidthRequest),
    });

    const text = await response.text();
    console.log("[v0] Response status:", response.status);
    console.log("[v0] Response body:", text);

    if (!response.ok) {
      console.error("[v0] API error - Status:", response.status);
      console.error("[v0] API error - Body:", text);
      console.error("[v0] Check that your ZEROWIDTH_PROJECT_ID and ZEROWIDTH_AGENT_ID are correct");
      return new Response(
        JSON.stringify({
          error: `Zerowidth API returned ${response.status}`,
          details: text,
          help: "Verify your projectId and agentId are correct. Check the Zerowidth dashboard for the correct IDs.",
        }),
        { status: response.status }
      );
    }

    // Parse the response
    let responseData;
    try {
      responseData = JSON.parse(text);
    } catch (e) {
      // If response is not JSON, return as text
      responseData = { response: text };
    }

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("[v0] Proxy error:", err);
    return new Response(
      JSON.stringify({ 
        error: "Internal Server Error", 
        details: err?.message,
        stack: err?.stack 
      }),
      { status: 500 }
    );
  }
}
