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

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    LeagueSpartan_400Regular,
    LeagueSpartan_600SemiBold,
    LeagueSpartan_700Bold,
    LeagueSpartan_900Black,
  });
  return <Providers>{fontsLoaded ? <Slot /> : <Splash />}</Providers>;
}
