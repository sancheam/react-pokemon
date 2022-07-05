import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./common_files/Header";
import Footer from "./common_files/Footer";

const PokemonDetails = () => {
  const [singlepoke, setSinglepoke] = useState([]);
  const [pokemonType, setPokemonType] = useState("");
  const [numberOfGame, setNumberOfGame] = useState([]);
  const [image, setImage] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchSinglePost = () => {
      fetch(`https://pokeapi.co/api/v2${location.pathname}`)
        .then((singlepoke) => {
          return singlepoke.json();
        })
        .then((data) => {
          console.log(data);
          setSinglepoke(data);
          setPokemonType(data.types[0].type.name);
          setNumberOfGame(data.game_indices);
          setImage(data.sprites["front_default"]);
        });
    };
    fetchSinglePost();
  }, []);

  return (
    <div className="app-container">
      <Header />

      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item active" aria-current="page">
            <a href="#">← Back to all Pokemons</a>
          </li>
        </ol>
      </nav>

      <div className="card_single_container">
        <div className="card card_single">
          <div className="img_single">
            <img src={image} alt={singlepoke.name} className="card-img-top" />
          </div>
          <div className="card-body">
            <h5 className="card-title">Name: {singlepoke.name}</h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"> Type: {pokemonType} </li>
            <li className="list-group-item"> Height: {singlepoke.height} </li>
            <li className="list-group-item">
              Game Indices : {numberOfGame.length}{" "}
            </li>
            <li className="list-group-item">Order: {singlepoke.order}</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PokemonDetails;
