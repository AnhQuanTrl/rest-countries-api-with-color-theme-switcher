import fetchCountry from "@/api/fetchCountry";
import Layout from "@/components/layouts/Layout";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import CountryDetailInfo from "./CountryDetailInfo";

type CountryDetailParams = {
  cca: string;
};

function CountryDetail() {
  const { cca } = useParams<CountryDetailParams>();
  if (!cca) {
    throw new Error("Accessing this page without params cca is impossible");
  }
  const countryQuery = useQuery({
    queryKey: ["country", cca],
    queryFn: fetchCountry,
  });
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <Button
        type="button"
        onClick={handleBackButton}
        aria-label="Go back to previous page"
        className="mb-16 mt-10 gap-[6px] text-sm shadow-md 2xl:mt-20 2xl:text-base"
      >
        <ArrowLeftIcon className="h-[18px] w-[18px]" />
        <span>Back</span>
      </Button>
      <CountryDetailInfo country={countryQuery.data} isLoading={countryQuery.isLoading} />
    </Layout>
  );
}

export default CountryDetail;
