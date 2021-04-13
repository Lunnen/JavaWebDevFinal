import React, { useState } from "react";

const Student = (props) => {
  const [checked, setChecked] = useState(props.studentInfo.present);

  const attendHandler = () => {
    setChecked((checked) => !checked);
    props.changeAttend(props.studentInfo.student_id, !checked);  
  };

  return (
    <li className="attendingStudent">
      <div>
        {props.studentInfo.name +
          " " +
          props.studentInfo.last_name +
          ", " +
          props.studentInfo.age +
          " år gammal.        "}
        Närvarande:{" "}
        <input
          type="checkbox"
          defaultChecked={props.studentInfo.present}
          onChange={attendHandler}
        />
      </div>
    </li>
  );
};

const Attending = (props) => {
  const back = () => {
    props.setView("default");
  };

  const allTrue = props.Students.filter((student) => student.present == true);

  return (
    <>
      <button onClick={back}>Tillbaka</button>
      <h3>
        <p>Vill du dra in CSN för en snorvalp eller två?</p>
        <p>klicka i frånvarande!</p>
      </h3>
      <p>Antalet närvarande i klassen: {allTrue.length}</p>
      <p>
        Antalet frånvarande i klassen: {props.Students.length - allTrue.length}
      </p>
      <ul className="attendingList">
        {props.Students.map((studentInfo, index) => (
          <Student
            key={index}
            studentInfo={studentInfo}
            changeAttend={props.changeAttend}
          />
        ))}
      </ul>
    </>
  );
};

export default Attending;
