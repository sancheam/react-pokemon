import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import PokemonDetails from "./PokemonDetails";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/pokemon/:name" exact element={<PokemonDetails />} />
        <Route path="/:number" exact element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
