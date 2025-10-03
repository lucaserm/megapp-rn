import type { AppJSONConfig } from "expo/config";

const variants = ["production", "preview", "development"] as const;
type Variant = (typeof variants)[number];

// @ts-ignore
const variant = variants.includes(process.env.APP_VARIANT)
  ? (process.env.APP_VARIANT as Variant)
  : "production";

process.env.EXPO_PUBLIC_APP_VARIANT = variant;

const version =
  process.env.APP_VERSION ??
  (variant === "production" ? "1.0.0-beta" : "1.0.0-beta.2");

const packageName = {
  production: "br.com.megapp",
  preview: "br.com.megapp.preview",
  development: "br.com.megapp.preview",
}[variant];

console.log();
console.log("=> App configuration");
console.log("Variant:", variant);
console.log("Version:", version);
console.log("Package name:", packageName);
console.log();

let iconPath = "./assets/images/mega.svg";

export default {
  expo: {
    name: {
      production: "Mega App",
      preview: "Mega App - Testes",
      development: "Mega App (Dev)",
    }[variant],
    slug: "megapp",
    version,
    orientation: "portrait",
    icon: iconPath,
    scheme: "megapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    backgroundColor: "#1a1320",
    splash: {
      image: iconPath,
      resizeMode: "contain",
      backgroundColor: "#14002f",
    },
    android: {
      package: packageName,
      edgeToEdgeEnabled: true,
    },
    web: {
      output: "static",
    },
    plugins: [
      "expo-router",
      "expo-font",
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app accesses your photos to let you share them in the future.",
        },
      ],
      "expo-video",
      [
        "expo-build-properties",
        {
          android: {
            targetSdkVersion: 36,
            compileSdkVersion: 36,
            kotlinVersion: "2.0.21",
          },
          ios: {
            // https://docs.page/invertase/react-native-google-mobile-ads#optionally-configure-ios-static-frameworks
            useFrameworks: "static",
          },
        },
      ],
      "expo-constants",
      "expo-image",
      "expo-linear-gradient",
      "expo-linking",
      "expo-splash-screen",
      "expo-status-bar",
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      router: {
        origin: false,
      },
    },
    owner: "kiaz",
  },
} satisfies AppJSONConfig;
