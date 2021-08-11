import { useState } from "react";

// import images dynamically
import * as images from "../../assets/img";
import Planet from "../Planet/Planet";
import handleDownload from "../../helpers/DownloadFile";

function App() {
  const [data, setData] = useState("");
  const [draggedDiv, setDraggedDiv] = useState(null);
  let [planets, setPlanets] = useState([]);
  const planetNames = [
    "earth",
    "saturn",
    "venus",
    "mars",
    "jupiter",
    "mercury",
    "mars",
  ];
  // handle submiting the data

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = data.replaceAll(" ", "").split(",");
    setPlanets([]);
    // loop through the inputted planet names
    input.map((name) => {
      name = name.toLowerCase();
      setPlanets((prevState) => {
        // check if the name is an actual planet
        if (planetNames.includes(name)) {
          return [...prevState, name];
        } else {
          return prevState;
        }
      });
    });
  };

  // Handle Download

  const onDownload = (e) => {
    e.preventDefault();
    handleDownload(planets);
  };

  // Drag and Drop Functions

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const drag = (e) => {
    setDraggedDiv(e.target.id);
  };

  const drop = (e) => {
    e.preventDefault();
    const secondElement = e.target.parentElement.parentElement;
    if (secondElement.className.includes("planet")) {
      const newPlanets = planets;
      const firstPlanet = planets[draggedDiv];
      const secondPlanet = planets[secondElement.id];
      newPlanets[draggedDiv] = secondPlanet;
      newPlanets[secondElement.id] = firstPlanet;
      setPlanets([...newPlanets]);
      console.log(newPlanets);
    }
  };

  return (
    <div className="App flex flex-col p-10 items-center justify-items-center">
      <div className="App-header text-6xl mb-20">
        <h1>Planetarium</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />
        <button type="submit">Generate</button>
      </form>
      <div
        onDragOver={allowDrop}
        onDrop={drop}
        className="planets mt-20  w-3/4 max-w-3xl overflow-y-scroll h-100"
      >
        {" "}
        {planets.length
          ? planets.map((name, i) => {
              return (
                <Planet
                  key={Math.random()}
                  id={i}
                  name={name}
                  img={images[name].default}
                  onDragStart={drag}
                />
              );
            })
          : null}
      </div>

      <div>
        {planets.length ? (
          <button className="download" onClick={onDownload}>
            Download
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default App;
