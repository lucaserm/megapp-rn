import { Link } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const NAV_LINKS = [
  { href: "/", label: "About" },
  { href: "/", label: "Product" },
  { href: "/", label: "Pricing" },
] as const;

export function Header() {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{ paddingTop: top }}
      className="bg-white  border-b border-gray-200"
    >
      <View className="px-4 lg:px-6 h-14 flex items-center flex-row justify-between">
        {/* Logo */}
        <Link
          className="font-bold text-xl flex-1 items-center justify-center"
          href="/"
        >
          <Text className="font-bold text-xl text-gray-900">MEGA</Text>
        </Link>

        {/* Navigation */}
        <View className="flex flex-row gap-4 sm:gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              className="text-md font-medium hover:underline web:underline-offset-4"
              href={link.href}
            >
              <Text className="text-md font-medium text-gray-700">
                {link.label}
              </Text>
            </Link>
          ))}
        </View>
      </View>
    </View>
  );
}
