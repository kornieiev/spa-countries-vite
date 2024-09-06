import styled from "styled-components";

import Select from "react-select";

export const CustomSelect = styled(Select).attrs({
  styles: {
    control: (provided) => ({
      ...provided,
      backgroundColor: "var(--colors-ui-base)",
      color: "var(--color-text)",
      borderRadius: "var(--radii)",
      padding: "0.25rem",
      border: "none",
      boxShadow: "var(--shadow)",
      height: "50px",
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      color: "var(--color-text)",
      backgroundColor: state.isSelected
        ? "var(--colors-ui-base)"
        : "var(--colors-bg)",
    }),
  },
})`
  width: 200px;
  border-radius: var(--radii);
  font-family: var(--family);
  border: none;
  background-color: red;

  & > * {
    box-shadow: var(--shadow);
  }

  & div > input {
    padding-left: 0.25rem;
    /* background-color: red !important; */
    /* color: green !important; */
  }

  & * {
    color: var(--color-text) !important;
  }

  & > div > div[id] {
    background-color: var(--colors-bg);
    /* background-color: red; */
  }
`;
