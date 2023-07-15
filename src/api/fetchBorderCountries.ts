import { Country, schemaForCountry } from "@/lib/country";
import { QueryFunction } from "@tanstack/react-query";
import { z } from "zod";

const fetchBorderCountries: QueryFunction<
  Pick<Country, "name" | "cca3">[],
  [string, string[]]
> = async ({ queryKey: [_, ccas] }) => {
  if (ccas.length === 0) {
    return [];
  }

  const response = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${ccas.join(",")}&fields=name,cca3`,
  );
  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error("Response is not 200");
  }

  const data: unknown = await response.json();
  return z
    .array(
      schemaForCountry.pick({
        name: true,
        cca3: true,
      }),
    )
    .parse(data);
};

export default fetchBorderCountries;
