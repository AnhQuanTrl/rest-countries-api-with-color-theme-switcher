import { CountryDetailType, schemaForCountryDetail } from "@/lib/countryDetail";
import { QueryFunction } from "@tanstack/react-query";
import { z } from "zod";

const fetchCountry: QueryFunction<CountryDetailType | undefined, [string, string]> = async ({
  queryKey: [_, cca],
}) => {
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${cca}`);
  if (response.status === 404) {
    return;
  }

  if (!response.ok) {
    throw new Error("Response is not 200");
  }

  const data: unknown = await response.json();
  return z.array(schemaForCountryDetail).parse(data)[0];
};

export default fetchCountry;
