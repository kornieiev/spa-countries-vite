import styled from "styled-components";

import { FC, useEffect, useState } from "react";
import { Search } from "./Search/Search";
import { CustomSelect } from "./CustomSelect/CustomSelect";

const options = [
  { value: "Africa", label: "Africa" },
  { value: "America", label: "America" },
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "Oceania", label: "Oceania" },
];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 767px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;
interface Controls {
  onSearch: (search: string, regionValue: string) => void;
}
interface Region {
  value: string;
  label: string;
}

export const Controls: FC<Controls> = ({ onSearch }) => {
  const [search, setSearch] = useState<string>("");
  const [region, setRegion] = useState<Region | null>(null);

  useEffect(() => {
    const regionValue: string = region?.value || "";
    onSearch(search, regionValue);
  }, [onSearch, region, search]);

  return (
    <Wrapper>
      <Search
        search={search}
        setSearch={setSearch}
        // onSearch={onSearch}
      />
      <CustomSelect
        options={options}
        placeholder='Filter by Region'
        isClearable
        isSearchable={false}
        value={region}
        onChange={setRegion}
      />
    </Wrapper>
  );
};

// eslint-disable-next-line
