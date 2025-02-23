import { db } from "@/lib/prisma";

{
  /* Slug = titulo do restaurante */
}

export const getRestaurantBySlug = async (slug: string) => {
  const restaurant = await db.restaurant.findUnique({ where: { slug } });
  return restaurant;
};
{
  /* getRestaurantBySlug: É uma função assíncrona que recebe um slug (uma string) como parâmetro e retorna os dados do restaurante correspondente.

db.restaurant.findUnique: Usa o Prisma Client para buscar um registro único na tabela restaurant do banco de dados.

where: { slug }: Define a condição de busca. O Prisma procurará um restaurante onde o campo slug seja igual ao valor passado como argumento.

await: Espera a conclusão da operação assíncrona no banco de dados.

return restaurant: Retorna o objeto do restaurante encontrado. Se nenhum restaurante for encontrado, o valor retornado será null */
}
