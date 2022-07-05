import "./App.css";
import React, { useState, useEffect } from "react";
import Footer from "./components/common_files/Footer";
import Header from "./components/common_files/Header";
import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination";

const App = () => {
  console.log("localStorage page key:", localStorage);
  const [pokemons, setPokemons] = useState([]);
  const [loadPokemon] = useState("https://pokeapi.co/api/v2/pokemon?limit=200");
  const PAGE_KEY = "MY_PAGINATION_KEY";
  const getPageNumber = () => {
    if (localStorage && parseInt(localStorage.getItem(PAGE_KEY)) > 0) {
      console.log("localStorage page key:", localStorage.getItem(PAGE_KEY));

      return parseInt(localStorage.getItem(PAGE_KEY));
    }
    return 1;
  };

  const [currentPage, setCurrentPage] = useState(getPageNumber());
  const [postsPerPage] = useState(20);

  useEffect(() => {
    console.log("scroll to top");
    console.log("currentPage===1===:", currentPage);
    localStorage.setItem(PAGE_KEY, currentPage);

    window.scrollTo({ behavior: "smooth", top: "0px" });
  }, [currentPage]);
  useEffect(() => {
    const getAllPokemons = async () => {
      try {
        const res = await fetch(loadPokemon);
        const data = await res.json();
        function createPokemonObject(results) {
          results.forEach(async (pokemon) => {
            const res = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
            );
            const data = await res.json();
            setPokemons((list) => [...list, data]);
          });
        }
        createPokemonObject(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getAllPokemons();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = pokemons.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log("paginate:", paginate);
  console.log("currentPage:", currentPage);

  return (
    <div className="container-fluid app_wrapper">
      <Header />
      <PokemonList pokemons={currentPosts} paginate={paginate} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={pokemons.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <Footer />
    </div>
  );
};

export default App;
