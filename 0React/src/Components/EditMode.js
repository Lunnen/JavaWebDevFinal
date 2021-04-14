import React from "react";

const Student = (props) => {
  const removeHandler = () => {
    props.removeFunc(props.studentInfo, props.student_id);
  };
  const linkHandler = () => {
    props.gotoStudent(props.studentInfo);
  };

  return (
    <li>
      <a href="#" onClick={linkHandler}>
        {props.studentInfo.name} {props.studentInfo.last_name},
        {" " + props.studentInfo.age} år gammal.
      </a>
      <button className="defBtn" onClick={removeHandler}>
        X
      </button>
    </li>
  );
};
//************************************************************* */
const EditMode = (props) => {
  const back = () => {
    props.setView("default");
  };

  return (
    <ul className="theList">
      <button className="spaceBtn" onClick={back}>
        Tillbaka
      </button>
      <header>Administrera elever</header>

      {props.Students.map((studentInfo, index) => (
        <Student
          key={index}
          removeFunc={props.removeStudent}
          studentInfo={studentInfo}
          gotoStudent={props.gotoStudent}
        />
      ))}
    </ul>
  );
};

export default EditMode;
