import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs initialRouteName="home">
      <Tabs.Screen
        name="home"
        options={{ title: "Início", headerShown: false }}
      />
      <Tabs.Screen name="info/index" options={{ title: "Configurações" , headerShown: false}} />
    </Tabs>
  );
}
