import Image from "next/image";
{
  /* notFound: Função do Next.js que redireciona o usuário para uma página 404 (não encontrada) quando algo não é encontrado. */
}
import { notFound } from "next/navigation";
{
  /* getRestaurantBySlug: Uma função assíncrona que busca os dados de um restaurante com base em um "slug" (um identificador único, geralmente uma versão formatada do nome do restaurante). */
}
import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import ConsumptionMethodOption from "./components/consumption-method-eption";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}
{
  /* Define a tipagem das propriedades (props) que o componente RestaurantPage recebe.

Aqui, params é uma promessa que resolve para um objeto contendo um slug (uma string que identifica o restaurante). */
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    return notFound();
  }
  {
    /* RestaurantPage: É um componente React que é assíncrono (ou seja, pode usar await para buscar dados antes de renderizar a página).

params: Desestruturação do objeto params para obter o slug.

getRestaurantBySlug(slug): Chama a função assíncrona para buscar os dados do restaurante com base no slug.

if (!restaurant): Se o restaurante não for encontrado, a função notFound() é chamada, redirecionando o usuário para uma página 404. */
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      {/* Logo e o titulo */}
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={124}
          height={115}
        />
        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>
      {/* H3 e o paragrafo */}
      <div className="space-y-2 pt-24 text-center">
        <h3 className="text-2xl font-semibold">Seja bem-vindo!</h3>
        <p className="opacity-55">
        Aqui, crocância e sabor dão o match perfeito!
Hot rolls quentinhos e pastéis crocantes, feitos na hora com ingredientes frescos.
Perfeitos para compartilhar, repetir ou saborear sozinho. Vem viver essa experiência irresistível!
        </p>
      </div>
      {/* H3 e o paragrafo */}
      <div className="grid grid-cols-2 gap-4 pt-14">
        <ConsumptionMethodOption
          slug={slug}
          option="COMER_AQUI"
          buttonText="Para comer aqui"
          imageAlt="Comer aqui"
          imageUrl="/IconeTrailer1.png"
        />
        <ConsumptionMethodOption
          slug={slug}
          option="Levar"
          buttonText="Para levar"
          imageAlt="Para levar"
          imageUrl="/IconeTrailer2.png"
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
