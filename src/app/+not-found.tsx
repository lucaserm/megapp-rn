import { Button } from "@/components/ui/button";
import { Layout } from "@/components/ui/layout";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";

export default function UnmatchedRoute() {
  return (
    <Layout.Screen className="items-center justify-center gap-4 p-container">
      <Text className="text-center font-b text-3xl">
        Eita, você não deveria estar aqui.
      </Text>
      <Text className="text-center">
        Tá perdido? Calma aí que podemos te ajudar a voltar.
      </Text>
      <Link href="/home" asChild>
        <Button.Container variant="primary" className="w-full">
          <Button.Text>Voltar</Button.Text>L from "@/compo
        </Button.Container>
      </Link>
    </Layout.Screen>
  );
}
