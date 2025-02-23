import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    /* remotePatterns: [{ hostname: "u9a6wmr3as.ufs.sh" }], */
    remotePatterns: [
      {
        protocol: "https", // Usa HTTPS
        hostname: "i.imgur.com", // Domínio do Imgur para imagens
        port: "", // Porta padrão (deixe vazio)
        pathname: "/**", // Permite qualquer caminho no domínio
      },
    ],
  },
};

export default nextConfig;
