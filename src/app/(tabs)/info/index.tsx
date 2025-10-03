import { HeroSection } from "@/components/hero-section";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ScrollView, View } from "react-native";

export default function Page() {
  return (
    <View className="flex flex-1 dark bg-gray-50">
      <Header />
      <ScrollView className="flex-1">
        <HeroSection />
      </ScrollView>
      <Footer />
    </View>
  );
}
