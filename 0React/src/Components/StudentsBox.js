import React, { useState, useEffect } from "react";

const Student = (props) => {
  const attendHandler = () => {
    props.changeAttend(
      props.studentInfo.student_id,
      !props.studentInfo.present
    );
  };

  const removeHandler = () => {
    props.removeTodo(props.studentInfo, props.student_id);
  };
  const linkHandler = () => {
    props.gotoTodo(props.studentInfo);
  };

  return (
    <li>
      <a href="#" onClick={linkHandler}>
        {props.studentInfo.name} {props.studentInfo.last_name},
        {" " + props.studentInfo.age} år gammal.
      </a>
      <button className="doneBtn" onClick={removeHandler}>
        X
      </button>
    </li>
  );
};
//************************************************************* */
const Students = (props) => {
  return (
    <ul className="todoList">
      {props.Students.map((studentInfo, index) => (
        <Student
          key={index}
          removeTodo={props.removeStudent}
          finished={index % 2 === 0}
          studentInfo={studentInfo}
          gotoTodo={props.gotoStudent}
          changeDoneState={props.changeDoneState}
        />
      ))}
    </ul>
  );
};

export default Students;
