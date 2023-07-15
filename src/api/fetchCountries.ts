import { Country, schemaForCountry } from "@/lib/country";
import { QueryFunction } from "@tanstack/react-query";
import { z } from "zod";

const schema = z.array(schemaForCountry);

interface FetchCountriesParams {
  region?: string;
  searchTerm?: string;
}

const fetchCountries: QueryFunction<Country[], [string, FetchCountriesParams]> = async ({
  queryKey: [_, { region, searchTerm }],
}) => {
  let response: Response;

  if (region) {
    response = await fetch(
      `https://restcountries.com/v3.1/region/${region}?fields=name,flags,population,region,capital,cca3`,
    );
  } else if (searchTerm) {
    response = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(
        searchTerm,
      )}?fields=name,flags,population,region,capital,cca3`,
    );
  } else {
    response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3",
    );
  }

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error("Response is not 200");
  }

  const data: unknown = await response.json();
  return schema.parse(data);
};

export default fetchCountries;
