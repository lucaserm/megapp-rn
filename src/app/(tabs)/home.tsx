import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { UploadForm } from "@/components/upload-form";
import React from "react";
import { ScrollView, View } from "react-native";

export default function Page() {
  return (
    <View className="flex flex-1 dark bg-gray-50">
      <Header />
      <ScrollView className="flex-1">
        <View className="p-4 md:px-6 pb-12">
          <UploadForm />
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
