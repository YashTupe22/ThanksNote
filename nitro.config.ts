import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  preset: "vercel",
  publicAssets: [{ baseURL: "/", dir: "public" }],
});
