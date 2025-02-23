"use client";

import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "name" | "coverImageUrl">;
}
{
  /*RestaurantHeaderProps:

É o nome da interface. Ela define a estrutura das propriedades (props) que um componente React pode receber.

restaurant:

É uma propriedade que o componente espera receber.

O tipo dessa propriedade é Pick<Restaurant, "name" | "coverImageUrl">.  */
}

const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
  const router = useRouter();
  const handleBackClick = () => router.back();
  {
    /* Utilizando o userRouter para usar a biblioteca next/navigation
    e o handleBackClick para fazer a navegação para a tela inical. */
  }
  return (
    <div className="relative h-[200px] w-full">
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-50 rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <Image
        src={restaurant?.coverImageUrl}
        alt={restaurant.name}
        className="object-cover"
        fill
      />
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-50 rounded-full"
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
};

export default RestaurantHeader;
