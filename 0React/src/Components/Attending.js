import React, { useState } from "react";

const Student = (props) => {
  const [checked, setChecked] = useState(props.studentInfo.present);

  const attendHandler = () => {
    setChecked((checked) => !checked);
    props.changeAttend(props.studentInfo.student_id, !checked);

    props.update();
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

  const [numerOfAttending, setnumberOfAttending] = useState(
    props.Students.filter((student) => student.present === true)
  );

  const update = () => {
    setnumberOfAttending(
      props.Students.filter((student) => student.present === true)
    );
  };

  return (
    <ul className="theList">
      <div className="infoBox">
        <button className="spaceBtn" onClick={back}>
          Tillbaka
        </button>
        <h2>Kursnärvaro</h2>
        <p>
          Vill du dra in CSN för en student eller två? klicka i frånvarande!
        </p>

        <p>
          Antalet närvarande i klassen:{" "}
          <strong>{numerOfAttending.length}</strong>, frånvarande:{" "}
          <strong>{props.Students.length - numerOfAttending.length}</strong>
        </p>
      </div>
      <ul className="attendingList">
        {props.Students.map((studentInfo, index) => (
          <Student
            key={index}
            studentInfo={studentInfo}
            changeAttend={props.changeAttend}
            update={update}
          />
        ))}
      </ul>
    </ul>
  );
};

export default Attending;
