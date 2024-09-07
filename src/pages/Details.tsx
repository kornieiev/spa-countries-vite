import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { searchByCountry } from "../config";
import { Button } from "../components/Button/Button";
import { Info } from "../components/Details/Info/Info";

export const Details = () => {
  const [country, setCountry] = useState<object | null>(null);

  const { name } = useParams(); // Получаем параметр 'name' из URL

  useEffect(() => {
    axios.get(searchByCountry(name)).then(({ data }) => setCountry(data[0]));
  }, [name]);

  return (
    <div>
      <Button>
        <IoArrowBack />
        Go Back to main page
      </Button>
      {country && <Info {...country} />}
    </div>
  );
};
