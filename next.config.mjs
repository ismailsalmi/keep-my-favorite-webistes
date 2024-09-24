/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: "https://nlgzpvbscutcxmwnsizo.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMDY0NzA1NCwiZXhwIjoxOTM2MjIzMDU0fQ.NulTK3h8Sh41EANHvatGNRy6O8PRKbSgOglUUjFq2PQ",
  },
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

export default nextConfig;
