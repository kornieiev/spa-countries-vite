import styled from "styled-components";

import { useLocation } from "react-router-dom";

import { CountryInfo, WrapperProps } from "../../interfaces";

const Wrapper = styled.article<WrapperProps>`
  border-radius: var(--radii);
  background-color: var(--colors-ui-base);
  box-shadow: var(--shadow);

  cursor: pointer;
  overflow: hidden;
`;

const CardImage = styled.img`
  display: block;
  width: 100%;
  height: 150px;
  object-fit: cover;
  object-position: center;
  box-shadow: var(--shadow);
`;

const CardBody = styled.div`
  padding: 1rem 1.5rem 1.5rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: var(--fs-md);
  font-weight: var(--fw-bold);
`;

const CardList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 1rem 0 0;
`;

const CardListItem = styled.li`
  font-size: var(--fs-sm);
  line-height: 1.5;
  font-weight: var(--fw-light);
  & > b {
    font-weight: var(--fw-bold);
  }
`;

export const Card = ({ img, name, info = [], onClick }: CountryInfo) => {
  const location = useLocation();

  return (
    <Wrapper onClick={onClick} $state={{ from: location }}>
      <CardImage src={img} alt={name} />
      <CardBody>
        <CardTitle>{name}</CardTitle>
        <CardList>
          {info.map((el: { title: string; description: string }) => {
            return (
              <CardListItem key={el.title}>
                <b>{el.title}:</b> {el.description}
              </CardListItem>
            );
          })}
        </CardList>
      </CardBody>
    </Wrapper>
  );
};
