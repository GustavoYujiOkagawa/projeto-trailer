import { z } from "zod";

export const emailSchema = z.string().refine((value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}, {
    message: "E-mail inválido!"
});