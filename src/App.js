import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  let [heroes, setHeroes] = useState([]);

  useEffect(() => {
    getHeroes();
  }, []);

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("heroes") === null) {
        return <h1 style="center"> No fue posible recuperar los personajes</h1>;
      } else {
        setHeroes(localStorage.getItem("heroes"));
      }
    } else {
      getHeroes();
    }
  }, []);

  function getHeroes() {
    new Promise(function (resolve, reject) {
      const req = new XMLHttpRequest();
      req.open(
        "get",
        "https://gateway.marvel.com/v1/public/characters?apikey=ae0b11ca1a1f394b82a092fff13c6c2a&ts=1635290078374&hash=4992d5bc2c104007f815b5e0beab8b6f"
      );
      req.onload = function () {
        if (req.status === 200) {
          let heroesIn = JSON.parse(req.response);
          resolve(heroesIn);
          heroes = heroesIn.data.results;
          setHeroes(heroes);
          localStorage.setItem("heroes", heroes);
          console.log(heroes);
        } else {
          reject("No se encontraron productos");
        }
      };
      req.send();
    });
  }

  return (
    <div>
      <div className="container">
        <h1>Personajes de Marvel</h1>
        <div class="accordion" id="accordionExample">
          {heroes.map((m) => (
            <div class="accordion-item">
            <h2 class="accordion-header" id={m.id}>
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#collapse" + m.id}
                aria-expanded="true"
                aria-controls={"collapse" + m.id}
              >
                {m.name}
              </button>
            </h2>
            <div
              id={"collapse" + m.id}
              class="accordion-collapse collapse show"
              aria-labelledby={m.id}
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <p>{m.description}</p>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
