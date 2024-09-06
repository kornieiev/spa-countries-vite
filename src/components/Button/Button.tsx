import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

export const Btn = styled(Link)`
  padding: 0 1rem;
  background-color: var(--colors-ui-base);
  box-shadow: var(--shadow);
  line-height: 2.5;
  border-radius: var(--radii);

  border: none;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  color: var(--color-text);
  cursor: pointer;
`;

export const Button = ({ children }) => {
  const location = useLocation();

  const backLinkLocationRef = useRef(location.state?.from ?? "/");

  return <Btn to={`${backLinkLocationRef.current}`}>{children}</Btn>;
};
