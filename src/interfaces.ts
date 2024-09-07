export interface Country {
  capital: string[];
  flags: {
    alt?: string;
    png?: string;
    svg?: string;
  };
  name: {
    common: string;
    nativeName?: object;
    official?: string;
  };
  population: number;
  region: string;
}

export interface CountryInfo {
  img: string | undefined;
  name: string;
  info: {
    title: string;
    description: string;
  }[];
  onClick?: () => void;
}

export interface El {
  title: string;
  description: string;
}

export interface WrapperProps {
  $state: {
    from: {
      hash: string;
      key: string;
      pathname: string;
      search: string;
      state: null;
    };
  };
}
