import React, { useEffect, useMemo, useState } from "react";
import "./Card.css";

const Card = () => {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);
  const [Pokemon, setPokemon] = useState([]);
  const [search, setsearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=250";

  const fetchapi = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      const indiviual = data.results.map(async (elm) => {
        const res = await fetch(elm.url);
        const data = await res.json();
        // console.log(data,"before");
        return data;
      });

      //   console.log(indiviual, "after");
      const all = await Promise.all(indiviual);
      // console.log(all);
      setPokemon(all);

      setloading(false);
    } catch (error) {
      console.log(error);
      seterror(error);
      setloading(false);
    }
  };

  useEffect(() => {
    fetchapi();
  }, []);

  // search function

  //   elm.name.toLowerCase().includes(search.toLowerCase())
  const searchdata = Pokemon.filter((elm) =>
    elm.name.toLowerCase().startsWith(search.toLowerCase())
  );

  // const searchdata = useMemo(() => {
  //   return Pokemon.filter(pokemon =>
  //     pokemon.name.toLowerCase().includes(search.toLowerCase())
  //   );
  // }, [Pokemon, search]);

  if (loading) {
    return (
      <>
        <div className="load">
          <p className="text">
            <span className="letter letter1">L</span>
            <span className="letter letter2">o</span>
            <span className="letter letter3">a</span>
            <span className="letter letter4">d</span>
            <span className="letter letter5">i</span>
            <span className="letter letter6">n</span>
            <span className="letter letter7">g</span>
            <span className="letter letter8">.</span>
            <span className="letter letter9">.</span>
            <span className="letter letter10">.</span>
          </p>
        </div>
        <div className="pok-ball">
          <div className="loader"></div>
        </div>
      </>
    );
  }

  if (error) {
    return <h1>Error:{error.message}</h1>;
  }

  return (
    <>
      <div className="main">
        <h1 className="pokemon-hunt-heading">Pokemon Hunt Begins!</h1>
      </div>
      <div className="int">
        <input
          spellCheck="false"
          type="text"
          placeholder="Search Pokemon ..."
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
      </div>
      <div className="all">
        <div className="card1">
          {searchdata.length === 0 ? (
            <div className="no-results">
              <h2>No Pokémon found with that name.</h2>
            </div>
          ) : (
            searchdata.map((elm) => {
              return (
                <div className="card" key={elm.id}>
                  <div className="shape"></div>
                  <img
                    src={elm.sprites.other.dream_world.front_default}
                    height="100"
                    width="100"
                    loading="lazy"
                  />
                  <h2 className="name">{elm.name}</h2>
                  <span className="type">
                    {elm.types.map((elm) => elm.type.name).join(", ")}
                  </span>
                  <div className="power">
                    <h5>
                      Height:<pre> {elm.height}</pre>
                    </h5>
                    <h5>
                      Wieght:<pre> {elm.weight}</pre>
                    </h5>
                    <h5>
                      Speed:<pre> {elm.stats[5].base_stat}</pre>
                    </h5>
                  </div>
                  <div className="pow power">
                    <pre>
                      {elm.base_experience}
                      <h5>Experience:</h5>
                    </pre>
                    <pre>
                      {elm.stats[1].base_stat}
                      <h5>Attack:</h5>
                    </pre>
                    <pre>
                      {elm.abilities[0].ability.name}
                      <h5>Abilities:</h5>
                    </pre>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* <div className="card1">
        <div className="card">
          <img src="./images/pikachu.png" height="150" width="150" />
          <h2 className="name">Pikachu</h2>
          <span className="type">grass</span>
          <div className="power">
            <h4>Height: 50</h4>
            <h4>Wieght: 50</h4>
            <h4>Speed: 50</h4>
          </div>
          <div className="power">
            <h4>Experience: 50</h4>
            <h4>Attack: 50</h4>
            <h4>Abilities: 50</h4>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Card;
