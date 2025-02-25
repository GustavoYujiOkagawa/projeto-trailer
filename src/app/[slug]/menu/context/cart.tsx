"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react"; 

interface CartProduct extends Product {
    quantity: number;
}
/* Estende a interface Product (que vem do Prisma) para adicionar uma propriedade quantity.

Isso significa que um CartProduct tem todas as propriedades de um Product mais a quantidade no carrinho. */

export interface ICartContext {
    isOpen: boolean;
    products: CartProduct[];
    toggleCart: () => void;
}
/* Define a estrutura do contexto do carrinho:

isOpen: Indica se o carrinho está aberto ou fechado.

products: Lista de produtos no carrinho (cada um com uma quantidade).

toggleCart: Função para alternar o estado de isOpen (abrir/fechar o carrinho).

 */

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    toggleCart: () => {},
});
/* createContext: Cria um contexto com valores padrão.

O contexto é tipado com ICartContext, garantindo que ele sempre tenha:

isOpen: Inicialmente false.

products: Inicialmente um array vazio.

toggleCart: Uma função vazia (será implementada no CartProvider). */

export const CartProvider = ({ children }: { children: ReactNode }) => {
   const [products, setProducts]= useState<CartProduct[]>([]);
   const [isOpen, setIsOpen] = useState<boolean>(false);
    /* products: Armazena a lista de produtos no carrinho.

      isOpen: Controla se o carrinho está aberto ou fechado. */
   const toggleCart = () => {
    setIsOpen(prev => !prev);
   }
   /* Alterna o valor de isOpen entre true e false (abrir/fechar o carrinho). */
   return (
        <CartContext.Provider
            value={{
                isOpen,
                products,
                toggleCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );

    /* CartContext.Provider: Fornece o contexto para os componentes filhos.

    O value contém:

    O estado atual (isOpen e products).

    A função toggleCart para alternar o estado do carrinho.

    {children}: Renderiza os componentes filhos passados para o CartProvider */
};