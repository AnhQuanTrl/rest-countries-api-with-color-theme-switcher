import fetchBorderCountries from "@/api/fetchBorderCountries";
import DescriptionListItem from "@/components/ui/DescriptionListItem";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CountryDetailType } from "@/lib/countryDetail";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

interface CountryDetailInfoProps {
  country: CountryDetailType | undefined;
  isLoading?: boolean;
}

function CountryDetailInfo({ country, isLoading = false }: CountryDetailInfoProps) {
  const {
    languages,
    name,
    flags,
    region,
    subregion,
    population,
    capital,
    tld,
    currencies,
    borders,
  } = country ?? {};
  const randomLanguage = languages ? Object.keys(languages)[0] : undefined;
  const nativeName = randomLanguage ? name?.nativeName?.[randomLanguage]?.common : "";
  const currencyValues = currencies
    ? Object.values(currencies).map((currency) => currency.name)
    : [];
  const languageValues = languages ? Object.values(languages) : [];
  const {
    isLoading: isBordersLoading,
    data: borderCountries,
    isFetching: isBordersFetching,
    isSuccess: isBordersSuccess,
  } = useQuery({
    queryKey: ["borderCountries", borders!],
    queryFn: fetchBorderCountries,
    enabled: !!borders,
  });

  return (
    <section className="mb-16 flex w-full flex-col items-center gap-x-28 gap-y-11 lg:flex-row">
      <div className="mx-auto min-w-[calc(min(30rem,_100%))] lg:flex-1">
        <div className="aspect-h-6 aspect-w-8">
          {!isLoading ? (
            <img
              src={flags?.svg}
              alt={flags?.alt}
              className="rounded-md object-cover object-center"
            />
          ) : (
            <Skeleton />
          )}
        </div>
      </div>
      <div className="lg:flex-1">
        <h2 className="mb-4 text-[22px] font-extrabold leading-tight 2xl:text-[32px]">
          {!isLoading ? name?.common : <Skeleton variant="text" className="w-20" />}
        </h2>
        <div className="mb-8 flex flex-wrap justify-between gap-y-8 text-sm 2xl:text-base">
          <dl className="flex flex-col gap-3">
            <DescriptionListItem label="Native Name" isLoading={isLoading}>
              {nativeName}
            </DescriptionListItem>
            <DescriptionListItem label="Population" isLoading={isLoading}>
              {population}
            </DescriptionListItem>
            <DescriptionListItem label="Region" isLoading={isLoading}>
              {region}
            </DescriptionListItem>
            <DescriptionListItem label="Sub Region" isLoading={isLoading}>
              {subregion}
            </DescriptionListItem>
            <DescriptionListItem label="Capital" isLoading={isLoading}>
              {capital?.join(", ")}
            </DescriptionListItem>
          </dl>
          <dl className="flex flex-col gap-3">
            {tld && (
              <DescriptionListItem label="Top Level Domain" isLoading={isLoading}>
                {tld[0]}
              </DescriptionListItem>
            )}
            <DescriptionListItem label="Currencies" isLoading={isLoading}>
              {currencyValues.join(", ")}
            </DescriptionListItem>
            <DescriptionListItem label="Languages" isLoading={isLoading}>
              {languageValues.join(", ")}
            </DescriptionListItem>
          </dl>
        </div>
        {(isBordersFetching || borderCountries?.length) && (
          <>
            <h3 className="mb-4 text-base font-semibold">Border Countries:</h3>
            {isBordersLoading ? (
              <div className="mb-16 flex gap-[10px]">
                <Skeleton className="h-7 w-24" />
                <Skeleton className="h-7 w-24" />
                <Skeleton className="h-7 w-24" />
              </div>
            ) : (
              isBordersSuccess && (
                <ul className="flex w-full flex-wrap gap-[10px]">
                  {borderCountries.map((border) => (
                    <li key={border.cca3}>
                      <Button
                        asChild
                        size="sm"
                        className="rounded-[2px] shadow-[0px_0px_4px_1px_rgba(0,0,0,0.1)]"
                      >
                        <Link to={`/countries/${border.cca3}`}>{border.name.common}</Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              )
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default CountryDetailInfo;
