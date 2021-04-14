import React from "react";

const Form = (props) => {
  const onSubmit = (data) => {
    data.preventDefault();

    const fetchUsers = async () => {
      const resp = await fetch(`http://localhost:8080/students/`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.target[0].value,
          last_name: data.target[1].value,
          age: data.target[2].value,
          present: false,
        }),
      });

      if (resp.status !== 201) {
        console.log("something's wrong");
      }
      const newUser = await resp.json();
      props.setStudents((prev) => [...prev, newUser]);
    };
    fetchUsers();
    data.target.reset();
  };

  return (
    <form className="wrapper" onSubmit={onSubmit}>
      <ul className="theList">
        <h2>Lägg till ny student</h2>
        <li>
          <input className="wideInput" name="name" placeholder="Förnamn" />
        </li>
        <li>
          <input
            className="wideInput"
            name="lastName"
            placeholder="Efternamn"
          />
        </li>
        <li>
          <input className="wideInput" name="age" placeholder="Ålder" />
        </li>

        <button className="defBtn wideBtn" type="submit">
          SUBMIT
        </button>
      </ul>
    </form>
  );
};
export default Form;
