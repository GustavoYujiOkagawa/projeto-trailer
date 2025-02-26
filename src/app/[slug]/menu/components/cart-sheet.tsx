
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent,SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext } from "../context/cart";
import CartProductItem from "./cart-product-item";

// Importação do contexto

const CartSheet = () => {
    const { isOpen, toggleCart, products, total } = useContext(CartContext); // Uso do contexto

    return (
        // Modal do carrinho
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent className="w-[90%] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle className="text-left mb-5">Carinho</SheetTitle>
                </SheetHeader>
                <div className="py-5 flex h-full flex-col">
           <div className="flex-auto">
              {/* Conteúdo do carrinho aqui */}
              {products.map(product => (
                    <CartProductItem key={product.id} product={product} />
                ))}
           </div>
           <Card className="mb-6">
                <CardContent className="p-5">
                    <div className="flex justify-between">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="font-semibold text-sm">{formatCurrency(total)} 
                        </p>
                    </div>
                </CardContent>
           </Card>

                <Button className="w-full rounded-full mb-5" variant="destructive">Finalizar pedido</Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default CartSheet;