import React, { useEffect, useState } from "react";
import Title from "./Title";
import StudentsBox from "./StudentsBox";
import Count from "./Count";
import Welcome from "./Welcome";
import EditView from "./EditView";
import Form from "./Form";
import Attending from "./Attending";

const App = () => {
  const [Students, setStudents] = useState([]);
  //const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState("default");
  const [specificStudent, setSpecificStudent] = useState({});

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await fetch("http://localhost:8080/students");
    const input = await res.json();
    setStudents(input);
    if (input.ok) {
      setStudents(input);
    }
  };

  const changeAttend = (studentId, studentBool) => {
    console.log(studentBool);

    const response = fetch(`http://localhost:8080/students/${studentId}`, {
      method: "PUT",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        present: studentBool,
      }),
    });
    if (response.ok) {
      fetchStudents();
    }
  };

  const addStudent = (newStudent) => {
    setStudents((prev) => [...prev, newStudent]);
  };

  const removeAll = () => {
    setStudents([]);
  };

  const removeStudent = (props) => {
    const response = fetch(
      `http://localhost:8080/students/${props.student_id}`,
      { method: "DELETE" }
    );

    if (response.ok) {
      fetchStudents();
    }
  };

  /* Edit View - Start */
  const gotoStudent = (StudentMessage) => {
    setSpecificStudent(StudentMessage);
    setView("editView");
  };

  const specificIndex = Students.findIndex(function (el) {
    return el === specificStudent.StudentMessage;
  });
  /* Edit View - End */

  function handleForm(input) {
    setStudents(function (prevState) {
      return [...prevState, input]; //show previous info and add with new input from EmpForm
    });
  }

  function onSubmit(input) {
    fetch(`http://localhost:8080/students/${input.student_id}`, {
      method: "PUT",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: input.textName,
        last_name: input.textLastName,
        age: input.age,
        present: input.present,
        student_id: input.student_id,
      }),
    });

    //setStudents(newArr);
    setView("default");
  }

  switch (view) {
    case "attending":
      console.log(Students);
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
            onSubmit={onSubmit}
          />
        </div>
      );
    case "list":
      return (
        <>
          <div className="wrapper">
            <Title setView={setView} runFetch={fetchStudents} />
            <StudentsBox
              Students={Students}
              removeStudent={removeStudent}
              gotoStudent={gotoStudent}
            />
            <Count removeAll={removeAll} length={Students.length} />
          </div>
          <Form onSubmit={handleForm} />
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
