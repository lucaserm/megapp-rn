import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Logo } from "@/assets/svg/logo";
import { getRandomItem } from "@/utils/get-random-item";

import { Badge } from "./ui/badge";
import { Text } from "./ui/text";

interface SplashProps {
  message?: string;
}

export function Splash({ message }: SplashProps) {
  return (
    <SafeAreaView className="flex-1 bg-background p-container">
      <View className="flex-1 items-center justify-center gap-4">
        <View className="text-white">
          <Text>test</Text>
          <Logo />
        </View>
        <View className="gap-4">
          <Badge.Container size="xs">
            <Badge.Text>BETA</Badge.Text>
          </Badge.Container>
        </View>
        {!!message && <Text>{message}</Text>}
      </View>
      <View className="gap-2">
        <Tip />
        <Text className="text-center text-muted-foreground">1.0.0</Text>
      </View>
    </SafeAreaView>
  );
}

const categories = {
  tips: {
    title: "Fica a dica",
  },
  curiosity: {
    title: "Você sabia?",
  },
  other: {
    title: "",
  },
} as const;

type TipProps = {
  category: keyof typeof categories;
  text: string;
};

const tips: TipProps[] = [
  {
    category: "tips",
    text: "Você pode criar coleções na sua página de perfil para organizar seus memes.",
  },
  {
    category: "tips",
    text: 'Está procurando algum meme específico? Procure ele na aba "Explorar"',
  },
  {
    category: "tips",
    text: "Viu algum meme ou comentário desagradável? Você pode denunciá-lo!",
  },
  {
    category: "tips",
    text: "Ao publicar um meme, descreva-o com o máximo de detalhes a partir das TAGs, para aumentar seu alcance.",
  },
  {
    category: "tips",
    text: "A contagem de dias aumenta quando você entra no app. Abra todo dia para aumentar a contagem!",
  },
  {
    category: "tips",
    text: "Você pode alterar a aparência do aplicativo nas configurações.",
  },
  {
    category: "tips",
    text: "Atualize o aplicativo sempre que possível para ter a melhor experiência possível do ComedyHub.",
  },
  {
    category: "tips",
    text: "Quer mudar o seu nome de usuário? Você pode fazer isso nas configurações.",
  },
  {
    category: "tips",
    text: "Entre no nosso servidor do Discord para encontrar amigos e receber atualizações do app.",
  },
  {
    category: "tips",
    text: "Você pode salvar memes para ver mais tarde clicando no ícone de salvar.",
  },
  {
    category: "tips",
    text: "Use tags relevantes ao publicar memes para ganhar mais visibilidade.",
  },
  {
    category: "tips",
    text: "Personalize seu perfil com uma bio criativa — seja o protagonista dos memes!",
  },

  {
    category: "curiosity",
    text: "Quanto mais curtidas um meme tiver, maiores as chances de ele aparecer nos Memes em Alta.",
  },

  {
    category: "curiosity",
    text: 'Você pode ver quem somos nós na aba de configurações, em "Sobre o ComedyHub".',
  },
  {
    category: "curiosity",
    text: "Existem algumas coisas escondidas que acontecem se você procurar no lugar certo...",
  },
  {
    category: "curiosity",
    text: "O ComedyHub é feito por uma equipe de desenvolvedores apaixonados por memes",
  },
  {
    category: "other",
    text: "gragas",
  },

  {
    category: "other",
    text: "Sorrir queima calorias, você ainda pode ficar em forma enquanto usa o ComedyHub.",
  },
  {
    category: "other",
    text: "Encontrou um bug? Avise a gente pelo nosso Discord!",
  },
  {
    category: "other",
    text: "Beba água.",
  },
  {
    category: "other",
    text: "Compartilhar memes também ajuda o ComedyHub a crescer. Espalhe a palavra!",
  },
  {
    category: "other",
    text: "O tempo de carregamento é inversamente proporcional à sua ansiedade.",
  },
];

export function Tip() {
  const [tip, setTip] = useState(getRandomItem(tips));

  useEffect(() => {
    const interval = setInterval(() => {
      setTip(getRandomItem(tips));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <Text className="text-center font-b">
        {categories[tip.category].title}
      </Text>
      <Text className="text-center text-sm">{tip.text}</Text>
    </View>
  );
}
