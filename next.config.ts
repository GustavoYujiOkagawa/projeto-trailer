import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https", // Usa HTTPS
        hostname: "i.imgur.com", // Domínio do Imgur para imagens
        port: "", // Porta padrão (deixe vazio)
        pathname: "/**", // Permite qualquer caminho no domínio
      },
      {hostname: "u9a6wmr3as.ufs.sh" },
    ],
  },
};

export default nextConfig;
