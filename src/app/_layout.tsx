import { Slot } from "expo-router";
import "../global.css";

import { Providers } from "@/components/providers";
import { Splash } from "@/components/splash";
import {
  LeagueSpartan_400Regular,
  LeagueSpartan_600SemiBold,
  LeagueSpartan_700Bold,
  LeagueSpartan_900Black,
  useFonts,
} from "@expo-google-fonts/league-spartan";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    LeagueSpartan_400Regular,
    LeagueSpartan_600SemiBold,
    LeagueSpartan_700Bold,
    LeagueSpartan_900Black,
  });

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(() => setReady(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded]);
  return <Providers>{ready ? <Slot /> : <Splash />}</Providers>;
}
