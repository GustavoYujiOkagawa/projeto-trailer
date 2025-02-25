import { useContext } from "react";

import { Sheet, SheetContent, SheetDescription,SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { CartContext } from "../context/cart";

// Importação do contexto

const CartSheet = () => {
    const { isOpen, toggleCart } = useContext(CartContext); // Uso do contexto

    return (
        // Modal do carrinho
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
                {/* Conteúdo do carrinho aqui */}
            </SheetContent>
        </Sheet>
    );
};

export default CartSheet;