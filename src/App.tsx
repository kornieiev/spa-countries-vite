import Header from "./components/Header/Header";
import { Main } from "./components/Main/Main";

import { Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { Details } from "./pages/Details";
import { NotFound } from "./pages/NotFound";
import { useState } from "react";

import { Country } from "./interfaces";

function App() {
  const [countries, setCountries] = useState<Country[]>([]);

  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route
            index
            element={
              <HomePage countries={countries} setCountries={setCountries} />
            }
          />
          <Route path='/country/:name' element={<Details />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Main>
    </>
  );
}

export default App;
