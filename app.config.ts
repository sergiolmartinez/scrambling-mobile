import "dotenv/config";
import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Scrambling",
  slug: "scrambling",
  version: "1.0.0",
  orientation: "portrait",

  // universal app icon
  icon: "./assets/icon.png",

  scheme: "scrambling",
  userInterfaceStyle: "automatic",

  // Splash (light + dark)
  splash: {
    image: "./assets/splash-icon.png", // ← matches your file
    resizeMode: "contain",
    backgroundColor: "#ffffff",
    dark: {
      image: "./assets/ios-dark.png", // use a dedicated splash if you prefer
      backgroundColor: "#000000",
    },
  },

  ios: {
    ...(config.ios ?? {}),
    supportsTablet: false,
    // iOS uses top-level `icon` unless you override:
    icon: "./assets/ios-light.png", // optional override
    bundleIdentifier: "com.yourcompany.scrambling", // ← set this
  },

  android: {
    ...(config.android ?? {}),
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png", // ← matches your file
      backgroundColor: "#ffffff",
    },
    package: "com.yourcompany.scrambling", // ← required
    edgeToEdge: true, // (SDK 50) or edgeToEdgeEnabled for older
  },

  web: {
    ...(config.web ?? {}),
    favicon: "./assets/favicon.png",
  },

  plugins: ["expo-router"],

  extra: {
    ...(config.extra ?? {}),
    env: process.env.APP_ENV ?? "local",
    API_BASE_URL: process.env.API_BASE_URL,
  },
});
