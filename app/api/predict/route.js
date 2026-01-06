export async function POST(req) {
  try {
    const body = await req.json();

    const model = body.model || "xgboost";

    const baseUrl = process.env.PREDICT_API_BASE_URL;

    const endpoint =
      model === "logreg"
        ? process.env.PREDICT_LOGREG_ENDPOINT
        : model === "random_forest"
        ? process.env.PREDICT_RF_ENDPOINT
        : process.env.PREDICT_XGBOOST_ENDPOINT;

    const backendRes = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!backendRes.ok) {
      const text = await backendRes.text();
      return new Response(JSON.stringify({ error: text }), {
        status: backendRes.status,
      });
    }

    const rawData = await backendRes.json();
    // console.log("RAW BACKEND DATA:", rawData);

    const result = Array.isArray(rawData) ? rawData[0] : rawData;

    return Response.json({
      model: result.model ?? model,
      decision: result.status,
      prediction_label: result.prediction_label ?? null,
      confidence: result.confidence,
      ratio_aset_pinjaman: result.ratio_aset_pinjaman,
    });
  } catch (error) {
    console.error("Predict API error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
