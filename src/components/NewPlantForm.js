import React, {useState} from "react";

function NewPlantForm({onSubmitPlant}) {
  const [newPlant, setNewPlant] = useState({
    name: "",
    image: "",
    price: ""
  });

  function handleChange(event){
    setNewPlant({
      ...newPlant,
      [event.target.name]: event.target.value,
    })
  };

  function handleSubmit(event){
    event.preventDefault();
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(newPlant)
    })
      .then((r) => r.json())
      .then((newPlant) => onSubmitPlant(newPlant))
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" onChange={handleChange} value={newPlant.name} />
        <input type="text" name="image" placeholder="Image URL" onChange={handleChange} value={newPlant.image} />
        <input type="number" name="price" step="0.01" placeholder="Price" onChange={handleChange} value={newPlant.price} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
