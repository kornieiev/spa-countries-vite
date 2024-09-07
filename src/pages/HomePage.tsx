import { useCallback } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ALL_COUNTRIES } from "../config";
import { List } from "../components/List/List";
import { Card } from "../components/Card/Card";

import { Controls } from "../components/Controls/Controls";

import { Country, CountryInfo } from "../interfaces";

interface HomePageProps {
  setCountries: (data: Country[]) => void;
  countries: Country[];
}

export const HomePage = ({ setCountries, countries }: HomePageProps) => {
  const [filteredCountries, setFilteredCountries] =
    useState<Country[]>(countries);
  const navigate = useNavigate();

  const handleSearch = useCallback(
    (search: string, region: string): void => {
      let data = [...countries];

      if (region) {
        data = data.filter((c) => c.region.includes(region));
      }
      if (search) {
        data = data.filter((c) =>
          c.name.common.toLowerCase().includes(search.toLowerCase())
        );
      }
      setFilteredCountries(data);
    },
    [countries]
  );

  useEffect(() => {
    if (!countries.length)
      axios.get(ALL_COUNTRIES).then(({ data }) => {
        setCountries(data);
      });
  }, [countries.length, setCountries]);

  return (
    <>
      <Controls onSearch={handleSearch} />
      <List>
        {filteredCountries.map((c: Country) => {
          const countryInfo: CountryInfo = {
            img: c.flags.png,
            name: c.name.common,
            info: [
              {
                title: "Population",
                description: c.population.toLocaleString(),
              },
              {
                title: "Region",
                description: c.region,
              },
              {
                title: "Capital",
                description: c?.capital[0],
              },
            ],
          };

          return (
            <Card
              key={c.name.common}
              onClick={() =>
                navigate(`/country/${c.name.common}`, { replace: true })
              }
              {...countryInfo}
            />
          );
        })}
      </List>
    </>
  );
};
