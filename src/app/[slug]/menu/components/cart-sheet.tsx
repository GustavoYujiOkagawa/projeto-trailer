import { useContext } from "react";

import { Sheet, SheetContent,SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { CartContext } from "../context/cart";
import CartProductItem from "./cart-product-item";

// Importação do contexto

const CartSheet = () => {
    const { isOpen, toggleCart, products } = useContext(CartContext); // Uso do contexto

    return (
        // Modal do carrinho
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent className="w-[90%] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle className="text-left mb-5">Carinho</SheetTitle>
                </SheetHeader>
                <div className="py-5">
             {/* Conteúdo do carrinho aqui */}
             {products.map(product => (
                    <CartProductItem key={product.id} product={product} />
                ))}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default CartSheet;