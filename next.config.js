/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    GOOGLE_ID:"1084123646797-rkutpfb962u1qb2jpftkcar99lchoi7c.apps.googleusercontent.com",
    GOOGLE_SECRET:"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",
    NEXTAUTH_URL:"http://localhost:3000"
  }
}

module.exports = nextConfig
