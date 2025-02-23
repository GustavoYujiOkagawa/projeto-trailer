import { PrismaClient } from "@prisma/client";

{
  /* banco de dados async */
}

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}

{
  /* declare global: Amplia o escopo global do TypeScript para adicionar uma variável global chamada cachedPrisma.

var cachedPrisma: PrismaClient: Declara uma variável global que armazenará uma instância do PrismaClient.

O comentário // eslint-disable-next-line no-var desabilita temporariamente uma regra do ESLint que desencoraja o uso de var. Aqui, var é necessário porque estamos trabalhando com o escopo global. */
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}
{
  /* let prisma: PrismaClient: Declara uma variável prisma que será usada para interagir com o banco de dados.

process.env.NODE_ENV === "production": Verifica se o ambiente de execução é de produção.

Se for produção, uma nova instância do PrismaClient é criada (prisma = new PrismaClient()).

Se não for produção (ou seja, desenvolvimento ou teste), o código verifica se já existe uma instância do PrismaClient armazenada na variável global cachedPrisma.

Se não existir, cria uma nova instância e a armazena em global.cachedPrisma.

Se existir, reutiliza a instância armazenada. */
}

//chamar o banco de dados
export const db = prisma;
