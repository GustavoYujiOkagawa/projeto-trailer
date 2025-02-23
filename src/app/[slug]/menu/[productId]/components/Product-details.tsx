"use client";

import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";

interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{
        include: {restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true,
                }
            }
        }
}>;
}

const ProductDetails = ({product}: ProductDetailsProps) => {
    const [quantity, setQuantity] = useState<number>(1);
    const handleDecremeaseQuantity = () => {
        setQuantity(prev => {
            if (prev === 1){
                return 1;
            } 
            return prev - 1;
        })
    }
    const handleImcremeaseQuantity = () => {
        setQuantity(prev => prev +1)
    }
    return ( 
        <div className="relative z-50 rounded-t-3xl p-5  mt-[-1.5rem] flex flex-col h-full">
    <div className="flex-1 overflow-hidden">
        {/* Restaurante */}
        <div className="flex items-center gap-1.5">
            <Image
                src={product.restaurant.avatarImageUrl}
                alt={product.restaurant.name}
                width={16}
                height={16}
                className="rounded-full"
            />
            <p className="text-sx text-muted-foreground">
                {product.restaurant.name}
            </p>
        </div>

        {/* Nome do produto */}
        <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>

        {/* Preço e quantidade */}
        <div className="flex items-center justify-between mt-3">
            <h3 className="text-xl font-semibold">
                {formatCurrency(product.price)}
            </h3>
            <div className="flex items-center gap-3 text-center">
                <Button variant="outline" className="h-8 w-8 rounded-xl" onClick={handleDecremeaseQuantity}>
                    <ChevronLeftIcon />
                </Button>
                <p className="w-4">{quantity}</p>
                <Button variant="destructive" className="h-8 w-8 rounded-xl" onClick={handleImcremeaseQuantity}>
                    <ChevronRightIcon />
                </Button>
            </div>
        </div>

        {/* ScrollArea */}
        <ScrollArea className="h-[calc(100vh-300px)]"> {/* Ajuste a altura conforme necessário */}
            {/* Sobre */}
            <div className="mt-6 space-x-3">
                <h4 className="font-semibold">Sobre</h4>
                <p className="text-sm text-muted-foreground">{product.description}</p>
            </div>

            {/* Ingredientes */}
            <div className="mt-6 space-x-3">
                <div className="flex items-center gap-1.5">
                    <ChefHatIcon size={18} />
                    <h4 className="font-semibold">Ingredientes</h4>
                </div>
                <ul className="list-disc px-5 text-sm text-muted-foreground">
                    {product.ingredients.map(ingredient =><li key={ingredient}>{ingredient}</li>)}
                </ul>
            </div>
        </ScrollArea>
    </div>

    {/* Botão no final */}
    <Button className="rounded-full w-full mt-6">
        Adicionar à sacola
    </Button>
</div>
     );
}
 
export default ProductDetails;