"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react"; 

export interface CartProduct extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
    quantity: number;
}
/* Define a estrutura de um produto no carrinho.
Pick<Product, "id" | "name" | "price" | "imageUrl">:
Utiliza o utilitário Pick do TypeScript para selecionar apenas os campos id, name, price e imageUrl da interface Product.
Adiciona o campo extra quantity para armazenar a quantidade do produto no carrinho. */

export interface ICartContext {
    isOpen: boolean;
    products: CartProduct[];
    toggleCart: () => void;
    addProduct: (product: CartProduct) => void;
}
/* Define a estrutura do contexto do carrinho:

isOpen: Define se o carrinho está aberto (true) ou fechado (false).
products: Lista de produtos no carrinho (cada um com CartProduct).
toggleCart: Função que alterna o estado do carrinho (abre/fecha).
addProduct: Função para adicionar produtos ao carrinho.

 */

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    toggleCart: () => {},
    addProduct: () => {},
});
/* createContext: Cria um contexto com valores padrão.

O contexto é tipado com ICartContext, garantindo que ele sempre tenha:

isOpen: Inicialmente false.

products: Inicialmente um array vazio.

toggleCart: Uma função vazia (será implementada no CartProvider). */

export const CartProvider = ({ children }: { children: ReactNode }) => {
   const [products, setProducts]= useState<CartProduct[]>([]);
   const [isOpen, setIsOpen] = useState<boolean>(false);
    /* products: Armazena a lista de produtos no carrinho, iniciando como um array vazio.
isOpen: Controla se o carrinho está aberto ou fechado, iniciando como false.
 */
   const toggleCart = () => {
    setIsOpen(prev => !prev);
   }
   /* O parâmetro prev representa o valor atual de isOpen.
    !prev inverte o valor:
    false → true
    true → false */
   const addProduct = (product: CartProduct) => {
    const productIsAlreadyOnTheCart = products.some(prevProduct => prevProduct.id === product.id);
    /* Recebe um objeto do tipo CartProduct como argumento.
    Verifica se o produto já está no carrinho usando .some(), que retorna true se algum produto tiver o mesmo id. */
    if (!productIsAlreadyOnTheCart) {
        return setProducts(prev => [...prev, product]);
    }
    /* Se o produto não está no carrinho:
    Adiciona o produto ao estado usando o spread operator [...prev, product], que mantém os produtos anteriores e adiciona o novo no final.
    O return encerra a execução da função após a adição. */

    setProducts(prevProducts => {
        return prevProducts.map(prevProduct => {
            if (prevProduct.id === product.id) {
                return {
                    ...prevProduct,
                    quantity: prevProduct.quantity + product.quantity                };
            }
            return prevProduct;
        });
        /* Se o produto já está no carrinho:
    Usa .map() para criar um novo array com as alterações necessárias.
    Verifica se o id do produto no carrinho é igual ao do produto adicionado.
    Se for igual, cria um novo objeto usando o spread operator para copiar o produto e incrementa a quantidade em +1.
    Se não for igual, retorna o produto sem alterações. */
    });
};

   /* Alterna o valor de isOpen entre true e false (abrir/fechar o carrinho). */
   return (
        <CartContext.Provider
            value={{
                isOpen,
                products,
                toggleCart,
                addProduct,
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