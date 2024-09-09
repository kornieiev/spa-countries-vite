import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { filterByCode } from "../../../config";
import { Country } from "../../../interfaces";

const Wrapper = styled.section`
  margin-top: 3rem;
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  gap: 2rem;

  @media (min-width: 767px) {
    grid-template-columns: minmax(100px, 400px) 1fr;
    align-items: center;
    gap: 2rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: minmax(400px, 600px) 1fr;
    align-items: center;
    gap: 2rem;
  }
`;

const InfoImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  box-shadow: var(--shadow);
`;

const InfoTitle = styled.h1`
  margin: 0;
  font-weight: var(--fw-normal);
`;

const ListGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 4rem;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  line-height: 1.8rem;

  & > b {
    font-weight: var(--fw-bold);
  }

  & > span {
    display: flex;
    gap: 1rem;
  }
`;

const Meta = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  flex-direction: column;
  align-items: flex-start;

  & > b {
    font-weight: var(--fw-bold);
  }

  @media (min-width: 767px) {
    flex-direction: row;
    align-items: center;

    gap: 1.5rem;
  }
`;

const Tag = styled(Link)`
  padding: 0 1rem;
  background-color: var(--colors-ui-base);
  box-shadow: var(--shadow);
  color: var(--color-text);
  line-height: 1.5rem;
  cursor: pointer;
  text-decoration: none;
`;

interface Info {
  name: {
    common: string;
    official: string;
  };
  flags: {
    alt?: string | undefined;
    png: string;
  };
  capital: string[] | object;
  population: number;
  region: string;
  subregion?: string | undefined;
  tld?: string[] | object;
  currencies?: {
    [key: string]: {
      name?: string;
      symbol?: string;
    };
  };
  languages?: { [key: string]: string };
  borders?: string[] | object;
}

export const Info = ({
  name,
  flags,
  capital,
  population,
  region,
  subregion,
  tld = [],
  currencies = {},
  languages = {},
  borders = [],
}: Info) => {
  const [neibhors, setNeibhors] = useState([]);
  // console.log("name", name, typeof name);
  // console.log("name", name.common, typeof name.common);
  // console.log("name", name.official, typeof name.official);

  // console.log("flags", flags, typeof flags);
  // console.log("flags", flags.alt, typeof flags.alt);
  // console.log("flags", flags.png, typeof flags.png);

  // console.log("capital", capital, typeof capital);
  // console.log("population", population, typeof population);
  // console.log("region", region, typeof region);

  // console.log("subregion", subregion, typeof subregion);
  // console.log("tld", tld, typeof tld);
  // console.log("currencies", currencies, typeof currencies);
  // console.log("languages", languages, typeof languages);
  // console.log("borders", borders, typeof borders);

  useEffect(() => {
    axios
      .get(filterByCode(borders))
      .then(({ data }) => setNeibhors(data))
      .catch((error) => {
        console.error("Error fetching neighboring countries:", error.status);
      });
  }, [borders]);

  return (
    <Wrapper>
      <InfoImg src={flags?.png} alt={flags?.alt} />
      <div>
        <InfoTitle>{name.common}</InfoTitle>
        <ListGroup>
          <List>
            <ListItem>
              <b>NativeName:</b> {name.official}
            </ListItem>
            <ListItem>
              <b>Population:</b> {population}
            </ListItem>
            <ListItem>
              <b>Region:</b> {region}
            </ListItem>
            <ListItem>
              <b>Sub Region:</b> {subregion}
            </ListItem>
            <ListItem>
              <b>Capital:</b> {capital}
            </ListItem>
          </List>

          <List>
            <ListItem>
              <b>Top Level Domain:</b>{" "}
              {tld.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </ListItem>
            <ListItem>
              <b>Currency:</b>{" "}
              {Object.keys(currencies).map((c) => {
                return <span key={c}>{c}</span>;
              })}
            </ListItem>
            <ListItem>
              <b>Languages:</b>{" "}
              {Object.keys(languages).map((l) => (
                <span key={l}>{languages[l]}</span>
              ))}
            </ListItem>
          </List>
        </ListGroup>
        <Meta>
          <b>Border Countries:</b>
          {neibhors.length < 1 ? (
            <span>There is no borders with other countries</span>
          ) : (
            neibhors.map((b: Country) => {
              return (
                <Tag key={b.name.common} to={`/country/${b.name.common}`}>
                  {b.name.common}
                </Tag>
              );
            })
          )}
        </Meta>
      </div>
    </Wrapper>
  );
};
