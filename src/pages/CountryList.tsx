import Layout from "@/components/layouts/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { regions } from "@/data/regions";
import React from "react";
import { useSearchParams } from "react-router-dom";
import CountryCards from "./CountryCards";

function CountryList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const region = searchParams.get("region") ?? "";
  const searchTerm = searchParams.get("searchTerm") ?? "";
  const [searchInput, setSearchInput] = React.useState("");

  const handleOnValueChange = (value: string) => {
    setSearchInput("");
    setSearchParams({ region: value || "" });
  };

  const handleOnSubmit: React.ComponentProps<"form">["onSubmit"] = (e) => {
    e.preventDefault();
    setSearchParams({ searchTerm: searchInput });
  };

  return (
    <Layout>
      <section className="mb-8 mt-6 flex flex-wrap gap-y-10 2xl:mt-12">
        <form className="mr-auto basis-[30rem]" onSubmit={handleOnSubmit}>
          <Input
            id="search"
            type="search"
            placeholder="Search for a country…"
            className="text-xs 2xl:text-sm"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Label htmlFor="search" className="sr-only">
            Search for a country...
          </Label>
        </form>
        <Select onValueChange={handleOnValueChange} value={region}>
          <SelectTrigger className="w-[13rem]" aria-label="Filter by region">
            <SelectValue placeholder="Filter by region" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
              <SelectItem value={null as unknown as string}>None</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </section>
      <CountryCards region={region} searchTerm={searchTerm} />
    </Layout>
  );
}

export default CountryList;
