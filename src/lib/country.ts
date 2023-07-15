import { z } from "zod";

export const schemaForCountry = z.object({
  flags: z.object({
    svg: z.string().nonempty(),
    alt: z.string().optional(),
  }),
  name: z.object({
    common: z.string().nonempty(),
  }),
  population: z.number().int(),
  region: z.string(),
  capital: z.array(z.string()),
  cca3: z.string(),
});

export type Country = z.infer<typeof schemaForCountry>;
