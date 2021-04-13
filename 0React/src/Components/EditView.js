import React, { useState } from "react";

const EditView = (props) => {
  const { name, last_name, age, student_id } = props.specificStudent;
  const [textName, setTextName] = useState(name);
  const [textLastName, setLastName] = useState(last_name);
  const [ageText, setAgeText] = useState(age);

  const texthandler = (event) => setTextName(event.target.value);
  const texthandler2 = (event) => setLastName(event.target.value);
  const ageHandler = (event) => setAgeText(event.target.value);

  const abortHandler = () => {
    props.setView("editMode");
  };

  const submitHandler = () => {
    props.onSubmit({ textName, textLastName, age, student_id });
    props.setView("editMode");
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label>First Name: </label>
        <input
          value={textName}
          type="text"
          style={{ width: "50%" }}
          onChange={texthandler}
        />
      </div>
      <div>
        <label>Last Name: </label>
        <input
          value={textLastName}
          type="text"
          style={{ width: "50%" }}
          onChange={texthandler2}
        />
      </div>
      <div>
        <label>Age: </label>
        <input
          value={ageText}
          type="text"
          style={{ width: "50%" }}
          onChange={ageHandler}
        />
      </div>
      <div>
        <button className="spaceBtn" onClick={abortHandler}>
          Tillbaka
        </button>
        <button className="spaceBtn" type="submit">
          Ändra värden
        </button>
      </div>
    </form>
  );
};

export default EditView;
