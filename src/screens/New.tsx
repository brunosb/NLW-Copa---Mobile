import { useState } from "react";
import { Heading, Text, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import Logo from "../assets/logo.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Alert } from "react-native";
import { api } from "../services/api";

export function New() {
  const toast = useToast();

  const [poolName, setPoolName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handlePoolCreate() {
    if (!poolName.trim()) {
      return toast.show({
        title: "Preencha o nome do bolão",
        placement: "top",
        bgColor: "red.500",
      });
    }

    try {
      setIsLoading(true);
      await api.post("/pools", { title: poolName.trim().toUpperCase() });

      toast.show({
        title: "Bolão criado com sucesso",
        placement: "top",
        bgColor: "green.500",
      });

      setPoolName("");
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Não foi possível criar o bolão",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo width={212} height={40} />

        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Crie seu próprio bolão da copa {"\n"} e compartilhe entre amigos!
        </Heading>

        <Input
          mb={2}
          placeholder="Qual nome do seu bolão?"
          onChangeText={setPoolName}
          value={poolName}
        />

        <Button
          title="CRIAR MEU BOLÃO"
          onPress={handlePoolCreate}
          isLoading={isLoading}
        />

        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}
