const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages
  ? (process.env.NEXT_PUBLIC_BASE_PATH ?? "/radio-agape-giap")
  : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isGithubPages
    ? {
        output: "export",
        trailingSlash: true,
      }
    : {}),
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_STATIC_EXPORT: isGithubPages ? "true" : "false",
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
