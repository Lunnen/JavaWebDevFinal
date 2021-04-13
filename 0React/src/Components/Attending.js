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
    <ul className="theList">
      <div className="infoBox">
        <button className="spaceBtn" onClick={back}>
          Tillbaka
        </button>
        <h2>Kursnärvaro</h2>
        <p>
          Vill du dra in CSN för en snorvalp eller två? klicka i frånvarande!
        </p>

        <p>
          Antalet närvarande i klassen: {allTrue.length}, frånvarande:{" "}
          {props.Students.length - allTrue.length}
        </p>
      </div>
      <ul className="attendingList">
        {props.Students.map((studentInfo, index) => (
          <Student
            key={index}
            studentInfo={studentInfo}
            changeAttend={props.changeAttend}
          />
        ))}
      </ul>
    </ul>
  );
};

export default Attending;
