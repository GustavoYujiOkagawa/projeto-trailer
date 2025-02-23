import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import RestaurantHeader from "./components/header";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}
{
  /* Define as propriedades (props) que o componente RestaurantMenuPage recebe.

params: Uma promessa que resolve para um objeto contendo o slug (identificador único do restaurante).

searchParams: Uma promessa que resolve para um objeto contendo o consumptionMethod (método de consumo, como "Comer Aqui" ou "Levar"). */
}

const isConsumptionMethodValid = (ConsumptionMethod: string) => {
  return ["COMER_AQUI", "Levar"].includes(ConsumptionMethod.toUpperCase());
};
{
  /* Verifica se o método de consumo (consumptionMethod) é válido.

Compara o valor recebido (convertido para maiúsculas) com as opções válidas: "COMER_AQUI" e "LEVAR".

Retorna true se for válido e false caso contrário. */
}

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  {
    /* // Aguarda a resolução da promessa e desestrutura o slug
  // Agora você pode usar o slug para buscar dados do restaurante */
  }
  const { consumptionMethod } = await searchParams;
  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound;
  }
  {
    /* Chama a função isConsumptionMethodValid para verificar se o consumptionMethod é válido.

Se não for válido, redireciona para a página 404 usando notFound(). */
  }

  const restaurant = await db.restaurant.findUnique({ where: { slug } });
  if (!restaurant) {
    return notFound();
  }
  {
    /* Se o restaurante não for encontrado, o Prisma retorna null. */
  }
  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
    </div>
  );
};

export default RestaurantMenuPage;
