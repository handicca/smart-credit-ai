export async function POST(req) {
  try {
    const body = await req.json();
    
    // simulate processing delay
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    // produce plausible fake response
    const rnd = Math.random();
    const risk_score = Math.min(0.95, Math.max(0.02, rnd));
    const features = [
      { name: "Debt-to-income ratio", importance: 0.42 },
      { name: "CIBIL score", importance: 0.31 },
      { name: "Employment length", importance: 0.12 },
    ];
    const decision = risk_score > 0.5 ? "Rejected" : "Approved";
    const message =
      decision === "Approved"
        ? "Applicant appears credit worthy based on provided data."
        : "Higher debt-to-income ratio increases risk; consider lowering requested amount.";

    return new Response(
      JSON.stringify({ decision, risk_score, features, message }),
      { status: 200 }
    );
  } catch (err) {
    return new Response("Bad request", { status: 400 });
  }
}
