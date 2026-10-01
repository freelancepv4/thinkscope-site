/** @type {import('next').NextConfig} */
const nextConfig = {
  // Serve the finished East of Eden page (static HTML) at its clean URL.
  async rewrites() {
    return [{ source: "/questions/east-of-eden-relevance", destination: "/questions/east-of-eden-relevance/index.html" }];
  },
  async headers() {
    return [{ source: "/(.*)", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    ] }];
  },
};
export default nextConfig;
