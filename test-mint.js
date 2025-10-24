import fetch from "node-fetch";

const res = await fetch("https://x402pay-rho.vercel.app/api/mint", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    wallet: "0x9dc9eD28361cCC251549b56E9F187d464263a4B3"
  }),
});

const data = await res.json();
console.log(data);
