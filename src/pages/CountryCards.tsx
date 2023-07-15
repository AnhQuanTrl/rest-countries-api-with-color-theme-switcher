import fetchCountries from "@/api/fetchCountries";
import DescriptionListItem from "@/components/ui/DescriptionListItem";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

interface CountryCardsProps {
  region: string;
  searchTerm: string;
}

function CountryCards({ region, searchTerm }: CountryCardsProps) {
  const countriesQuery = useQuery({
    queryKey: [
      "countries",
      {
        region,
        searchTerm,
      },
    ],
    queryFn: fetchCountries,
  });

  return (
    <section className="mb-16 grid grid-cols-[repeat(auto-fill,_minmax(min(263px,_100%),_1fr))] gap-10 @container">
      {countriesQuery.isLoading
        ? Array(8)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="mx-auto h-[336px] w-[263px] @[36rem]:aspect-h-1 @[36rem]:aspect-w-[0.78] @[36rem]:relative @[36rem]:h-auto @[36rem]:w-full"
              >
                <Skeleton className="h-full w-full" />
              </div>
            ))
        : countriesQuery.isSuccess &&
          countriesQuery.data.map((country) => (
            <article
              key={country.cca3}
              className="mx-auto h-[336px] w-[263px] @[36rem]:h-auto @[36rem]:w-full"
            >
              <Link
                to={`countries/${country.cca3}`}
                className="group block w-full overflow-hidden rounded-md bg-card shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                title={`Go to country ${country.name.common}`}
              >
                <div className="bg-[#000] @[36rem]:aspect-h-1 @[36rem]:aspect-w-[1.64] @[36rem]:relative">
                  <img
                    src={country.flags.svg}
                    alt={country.flags.alt}
                    className="h-40 w-full rounded-tl-md rounded-tr-md object-cover object-center transition-opacity group-hover:opacity-70 @[36rem]:absolute @[36rem]:inset-0 @[36rem]:h-full"
                  />
                </div>
                <h2 className="m-6 mb-4 overflow-hidden overflow-ellipsis whitespace-nowrap text-lg font-extrabold">
                  {country.name.common}
                </h2>
                <dl className="mx-6 flex flex-col gap-2 pb-12 text-sm">
                  <DescriptionListItem label="Population">{country.population}</DescriptionListItem>
                  <DescriptionListItem label="Region">{country.region}</DescriptionListItem>
                  <DescriptionListItem label="Capital">{country.capital}</DescriptionListItem>
                </dl>
              </Link>
            </article>
          ))}
    </section>
  );
}

export default CountryCards;
