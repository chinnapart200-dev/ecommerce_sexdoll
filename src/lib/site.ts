const fallbackSiteUrl = "http://localhost:3000";

export function getSiteUrl() {
  const value =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_URL ??
    fallbackSiteUrl;

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return `https://${value}`;
}

