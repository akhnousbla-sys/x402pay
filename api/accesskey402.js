// /api/accesskey402.js
export default function handler(req, res) {
  res.status(402).json({
    x402Version: 1,
    accepts: [
      {
        scheme: "exact",
        network: "base",
        name: "AccessKey402 NFT Mint",
        description:
          "AccessKey402 is a collection of 6,666 digital keys granting access to the x402 ecosystem.",
        // mint endpoint used by x402scan after payment
        resource: "https://x402pay-rho.vercel.app/api/mint",
        // receiver wallet for the payment
        payTo: "0x9dc9eD28361cCC251549b56E9F187d464263a4B3",
        mimeType: "application/json",
        // use a direct image URL (required for validation)
        asset: "https://i.imgur.com/hAkRxli.png",
        // NOTE: x402scan expects a string here in your setup
        maxAmountRequired: "true",
        maxTimeoutSeconds: 30,
        price: {
          amount: "2",
          currency: "USDC",
          chain: "base",
        },
        // No bodyFields => UI will NOT ask user for wallet
        outputSchema: {
          input: {
            type: "http",
            method: "POST",
            bodyType: "json"
          },
          output: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              txHash: { type: "string" }
            }
          }
        }
      }
    ],
    payer: "dynamic"
  });
}
