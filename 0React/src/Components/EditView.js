import React, { useState } from "react";

const EditView = (props) => {
  const { name, last_name, age, present, student_id } = props.specificStudent;
  const [textName, setTextName] = useState(name);
  const [textLastName, setLastName] = useState(last_name);
  const [checked, setChecked] = useState(present);

  const texthandler = (event) => setTextName(event.target.value);
  const texthandler2 = (event) => setLastName(event.target.value);

  const abortHandler = () => {
    props.setView("default");
  };

  const checkHandler = () => {
    setChecked((onOff) => !onOff);
  };

  const submitHandler = () => {
    const index = props.index;
    console.dir(props);
    props.onSubmit({ textName, textLastName, age, checked, student_id });
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
      <div>Age: {age}</div>
      <label>Attending: </label>
      <input type="checkbox" defaultChecked={checked} onChange={checkHandler} />
      <button className="doneBtn" type="submit">
        CHANGE
      </button>
      <button className="doneBtn" onClick={abortHandler}>
        GO BACK
      </button>
    </form>
  );
};

export default EditView;
