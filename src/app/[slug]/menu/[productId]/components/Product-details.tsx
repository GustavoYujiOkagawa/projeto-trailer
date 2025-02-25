"use client";

import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";

import CartSheet from "../../components/cart-sheet";
import { CartContext } from "../../context/cart";

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
/* Define as propriedades do componente:

product: Um objeto que contém:

Informações do produto (nome, preço, descrição, ingredientes).

Informações do restaurante (nome e URL da imagem). */

const ProductDetails = ({product}: ProductDetailsProps) => {
    const {toggleCart, addProduct} = useContext(CartContext);
    /* Essa linha está usando o hook useContext para acessar o contexto do carrinho (CartContext). Ela extrai duas propriedades do contexto: */
    
    const [quantity, setQuantity] = useState<number>(1);
    /* quantity: Armazena a quantidade selecionada do produto (inicialmente 1).

handleDecremeaseQuantity: Diminui a quantidade (mínimo 1).

handleImcremeaseQuantity: Aumenta a quantidade. */
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

    const handleAddToCart = () => {
        addProduct({
            ...product,
            quantity,
        });
        toggleCart();
    }
    /* Essa função chama o toggleCart do Context */


    return ( 
        <>
        <div className="relative z-50 rounded-t-3xl p-5 mt-[-1.5rem] flex flex-col h-full">
            {/* Conteúdo do produto */}
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
                <ScrollArea className="h-[calc(80vh-300px)]">
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
                            {product.ingredients.map((ingredient) => (
                                <li key={ingredient}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                </ScrollArea>
            </div>

            {/* Botão para adicionar ao carrinho e abrir o modal */}
            <Button className="rounded-full w-full mt-6" onClick={handleAddToCart}>
                Adicionar à sacola
            </Button>
        </div>

         <CartSheet/>                   
    </>
     );
}
 
export default ProductDetails;