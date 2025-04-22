import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((data) => setPlants(data))
  }, [])

  function addNewPlant(newPlant) {
    setPlants([...plants, newPlant])
  };

  function handleSearch(event) {
    setSearch(event.target.value)
  }

  const plantsToDisplay = plants.filter((plant) => {
    const name = plant.name.toLowerCase();
    if (!search) {
      return true;
    }
    else {
      return name.includes(search.toLowerCase()) || search === "";
    }
  })


  return (
    <main>
      <NewPlantForm onSubmitPlant={addNewPlant} />
      <Search handleSearch={handleSearch}/>
      <PlantList plants={plantsToDisplay} />
    </main>
  );
}

export default PlantPage;
