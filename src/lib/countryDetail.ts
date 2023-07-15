import { z } from "zod";

export const schemaForCountryDetail = z.object({
  flags: z.object({
    svg: z.string().nonempty(),
    alt: z.string().optional(),
  }),
  name: z.object({
    common: z.string().nonempty(),
    nativeName: z.record(
      z.string(),
      z.object({
        official: z.string(),
        common: z.string(),
      }),
    ),
  }),
  population: z.number().int(),
  region: z.string(),
  subregion: z.string(),
  capital: z.array(z.string()),
  tld: z.array(z.string()).optional(),
  currencies: z.record(
    z.string(),
    z.object({
      name: z.string(),
      symbol: z.string(),
    }),
  ),
  cca3: z.string(),
  languages: z.record(z.string(), z.string()),
  borders: z.array(z.string()).optional(),
});

export type CountryDetailType = z.infer<typeof schemaForCountryDetail>;
