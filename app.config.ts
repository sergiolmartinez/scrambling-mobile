import "dotenv/config";

export default ({ config }) => ({
  ...config,
  name: "Scrambling",
  slug: "scrambling",
  scheme: "scrambling",
  plugins: ["expo-router"],
  extra: {
    env: process.env.APP_ENV ?? "local",
    API_BASE_URL: process.env.API_BASE_URL,
  },
});
