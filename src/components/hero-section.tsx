import { Link } from "expo-router";
import { Text, View } from "react-native";

export function HeroSection() {
  return (
    <View className="py-12 md:py-24 lg:py-32 xl:py-48">
      <View className="px-4 md:px-6">
        <View className="flex flex-col items-center gap-6 text-center">
          {/* Title */}
          <Text
            role="heading"
            className="text-3xl text-center native:text-5xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-balance text-gray-900 "
          >
            Bem-vindo ao projeto MEGA
          </Text>

          {/* Description */}
          <Text className="mx-auto max-w-[700px] text-lg text-center text-gray-600 md:text-xl text-pretty">
            Projeto desenvolvido para suprir as necessidades da falta de
            desempenho do site da MEGA.
          </Text>

          {/* CTA Button */}
          <View className="gap-4 mt-4">
            <Link
              className="flex p-12 items-center justify-center overflow-hidden rounded-xl bg-[#007AFF] px-8 py-2 text-sm font-medium web:shadow ios:shadow"
              href="/"
            >
              <Text className="text-white font-semibold text-base">
                Explorar
              </Text>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
