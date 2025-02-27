"use client";

import { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface ProductHeaderProps{
    product: Pick<Product, 'name' | 'imageUrl'>
}
/* Aqui, é definida uma interface TypeScript chamada ProductHeaderProps. Ela especifica que o componente ProductHeader espera receber uma prop chamada product, que é um objeto contendo apenas as propriedades name e imageUrl do tipo Product. */

const ProductHeader = ({product }: ProductHeaderProps) => {
    const router = useRouter();
    const handleBackClick = () => router.back()
    return (  <div className="relative m-h-[300px] w-full h-[300px]">
        <Button
            variant="secondary"
            size="icon"
            className="absolute left-4 top-4 z-50 rounded-full"
            onClick={handleBackClick}>
            <ChevronLeftIcon />
            {/* chama handleBackClick para voltar à página anterior. Ele usa o ícone ChevronLeftIcon. */}
          </Button>
          <Image
            src={product.imageUrl}
            alt={product.name}
            className="object-contain"
            fill
          />
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-4 top-4 z-50 rounded-full"
          >
            <ScrollTextIcon />
          </Button>
        </div> );
}
 
export default ProductHeader;