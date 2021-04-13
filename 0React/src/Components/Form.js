import React, { useState } from "react";

const Form = (props) => {
  const [checked, setChecked] = useState(false);

  const onSubmit = (data) => {
    data.preventDefault();

    fetch(`http://localhost:8080/students/`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.target[0].value,
        last_name: data.target[1].value,
        age: data.target[2].value,
        present: checked,
      }),
    });
  };

  const checkHandler = () => {
    setChecked((check) => !check);
  };

  return (
    <form className="wrapper" onSubmit={onSubmit}>
      <div>
        <label>First Name:</label>
        <input name="name" />
      </div>
      <div>
        <label>Last Name:</label>
        <input name="lastName" />
      </div>
      <div>
        <label>Age:</label>
        <input name="age" />
      </div>
      <div>
        <label>Attending:</label>
        <input
          type="checkbox"
          defaultChecked={checked}
          onChange={checkHandler}
        />
      </div>

      <button className="doneBtn" type="submit">
        SUBMIT
      </button>
    </form>
  );
};
export default Form;
