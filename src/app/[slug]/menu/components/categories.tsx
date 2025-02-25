"use client";

import {Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import Products from "./products";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategory: {
        include: { products: true };
      };
    };
  }>;
}
/* RestaurantCategoriesProps: Define o tipo da propriedade restaurant com os dados do restaurante, categorias e produtos.
MenuCategoryProducts: Define o tipo das categorias de menu, incluindo os produtos.
 */

type MenuCategoryProducts = Prisma.MenuCategoryGetPayload<{
    include: {products: true};
}>
/* Prisma.MenuCategoryGetPayload: Tipo fornecido pelo Prisma para representar os dados de uma categoria de menu (MenuCategory).
include: { products: true }: Indica que, além dos dados da categoria, os produtos associados a essa categoria também serão incluídos no tipo. */

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
    const [selectedCategory, setSelectedCategory] = useState<MenuCategoryProducts | null>(restaurant.menuCategory[0] || null);
    /* RestaurantCategories: Componente principal que recebe o restaurante como propriedade.
useState: Define o estado selectedCategory com a primeira categoria do restaurante ou null caso não haja. */

  const handleCategoryClick = (category:MenuCategoryProducts) => {
    setSelectedCategory(category)
  }
  /* handleCategoryClick: Define a categoria selecionada ao clicar no botão. */
  const getCategoryButtonVariant = (category: MenuCategoryProducts) => {
    if (!selectedCategory || !category) {
      return "default"; 
    }
    return selectedCategory.id === category.id ? "destructive" : "secondary";
  };
  /* getCategoryButtonVariant: Retorna a variante do botão:
"default" se nenhuma categoria estiver selecionada.
"secondary" se o botão for da categoria selecionada.
"destructive" para as demais categorias. */
const isOpenNow = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Verifica se está entre 19:00 (19 * 60 = 1140 minutos) e 21:30 (21 * 60 + 30 = 1290 minutos)
  const nowInMinutes = hours * 60 + minutes;
  return nowInMinutes >= 1140 && nowInMinutes <= 1290;
};

  return (
    <div className="relative z-50 mt-[-1.5em] rounded-t-3xl  bg-white">
      <div className="p-5">
        <div className="item-center flex gap-3">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            height={45}
            width={45}
          />
          <div>
            <h2 className="text-lg font-semibold">{restaurant.name}</h2>
            <p className="text-xs opacity-55">{restaurant.description}</p>
          </div>
        </div>
            <div className="mt-3 flex items-center gap-1 text-xs" 
        style={{ color: isOpenNow() ? "green" : "red" }}>
      <ClockIcon size={12} />
      <p>{isOpenNow() ? "Aberto" : "Fechado"}</p>
    </div>

      </div>

      <ScrollArea className="w-full">
        <div className="flex w-max space-x-4 p-4 pt-0">
          {restaurant.menuCategory.map((category) => (
            <Button
            onClick={() => handleCategoryClick(category)}
            key={category.id}
            variant={getCategoryButtonVariant(category)}
            size="sm"
            className="rounded-full"
          >
            {category.name}
          </Button>
          
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <h3 className="px-5 font-semibold p-2">{selectedCategory ? selectedCategory.name : 'Categoria não encontrada'}</h3>
    <Products products={selectedCategory ? selectedCategory.products : []} />

    </div>
  );
};

export default RestaurantCategories;
