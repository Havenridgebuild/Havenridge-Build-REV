import { createClient, OAuthStrategy, ApiKeyStrategy } from "@wix/sdk";
import { items } from "@wix/data";
import { members } from "@wix/members";

export const WIX_CLIENT_ID = import.meta.env.VITE_WIX_CLIENT_ID || "82200a09-e8d2-498d-9d20-f0acfae7b59c";
export const WIX_API_KEY = import.meta.env.VITE_WIX_API_KEY || "IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjUyYjM1NTU0LTY4MzQtNDUxNi05ZGI1LWExNTJmNjk2YWUwY1wiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcImViYzliNGYyLWQwODUtNDM1Ni1hOWRlLTY1NDRhNWYyODcyY1wifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCJkYjMzOGNmOS0yMGYyLTRkZjAtYWNmNS0wNDZjNjE5ZWY1OTZcIn19IiwiaWF0IjoxNzg4MTMyMTU3fQ.R3o_0_RL5d_0oz1mcCDyUXN-z7nXUgR-QCUy4Xr1vNjO_NK79yQfv5elgWwRp1VsRse_TXxu9H1HCGYkWEz26xP5EZvEJvwxtYESGs0_zf74k1oLywEt4srDpJ15bUUNTP-gr_WVQyU1VAELWff6mPlAsEa96G6aC2JoFy-fEBKD3WDUQYzgStd1ZUV0FvGTYafOPOBk3wdMQK7RIJCdzvkuzs43JIx9Zbzzb_3vH1EaDIcgykN13rB2cpHTX0JMrvYk3Ty-XgtSjvHbSIgovpuaJTt5QKgtsys3ruPyC2nc3kHKSNQCeYqZH2A1FP8JWJlyfVl-P5ohoQleBmMhnw";
export const WIX_ACCOUNT_ID = import.meta.env.VITE_WIX_ACCOUNT_ID || "db338cf9-20f2-4df0-acf5-046c619ef596";

// Primary frontend client using OAuthStrategy (for visitors & public form submissions)
export const wixClient = createClient({
  modules: {
    items,
    members,
  },
  auth: OAuthStrategy({
    clientId: WIX_CLIENT_ID,
  }),
});

// Admin client using ApiKeyStrategy (for backend scripts & admin tasks)
export const wixAdminClient = createClient({
  modules: {
    items,
    members,
  },
  auth: ApiKeyStrategy({
    apiKey: WIX_API_KEY,
    accountId: WIX_ACCOUNT_ID,
  }),
});
