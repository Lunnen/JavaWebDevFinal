import React, { useEffect, useState } from "react";
import EditMode from "./EditMode";
import Welcome from "./Welcome";
import EditView from "./EditView";
import Form from "./Form";
import Attending from "./Attending";

const App = () => {
  const [Students, setStudents] = useState([]);
  const [view, setView] = useState("default");
  const [specificStudent, setSpecificStudent] = useState({});

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await fetch("http://localhost:8080/students");

    if (res.ok) {
      const input = await res.json();
      setStudents(input);
    }
  };

  const removeStudent = async (props) => {
    //To MySQL
    fetch(`http://localhost:8080/students/${props.student_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    //To useState
    setStudents(
      Students.filter((item) => item.student_id !== props.student_id)
    );
  };

  /* Edit View - Start */
  const gotoStudent = (studentInfo) => {
    setSpecificStudent(studentInfo);
    setView("editView");
  };

  const specificIndex = Students.findIndex(function (el) {
    return el === specificStudent.studentInfo;
  });
  /* Edit View - End */

  const changeAttend = (studentId, studentBool) => {
    fetch(`http://localhost:8080/students/${studentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        present: studentBool,
      }),
    });

    Students.map(function (student) {
      if (student.student_id === studentId) {
        student.present = studentBool;
      }
    });
  };

  function onChange(input) {
    fetch(`http://localhost:8080/students/${input.student_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: input.textName,
        last_name: input.textLastName,
        age: input.ageText,
      }),
    });

    Students.map(function (student) {
      if (student.student_id === input.student_id) {
        student.name = input.textName;
        student.last_name = input.textLastName;
        student.age = input.ageText;
      }
    });
  }

  switch (view) {
    case "attendMode":
      return (
        <div className="wrapper">
          <Attending
            Students={Students}
            changeAttend={changeAttend}
            setView={setView}
          />
        </div>
      );
    case "editView":
      return (
        <div className="wrapper">
          <EditView
            specificStudent={specificStudent}
            setStudents={setStudents}
            index={specificIndex}
            setView={setView}
            onSubmit={onChange}
          />
        </div>
      );
    case "editMode":
      return (
        <>
          <div className="wrapper">
            <EditMode
              Students={Students}
              removeStudent={removeStudent}
              gotoStudent={gotoStudent}
              setView={setView}
            />
          </div>
          <Form setView={setView} setStudents={setStudents} />
        </>
      );
    default:
      return (
        <div className="wrapper">
          <Welcome setView={setView} />
        </div>
      );
  }
};

export default App;
