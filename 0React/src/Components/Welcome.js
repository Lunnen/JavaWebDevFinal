import React from "react";

const Welcome = (props) => {
  const editModeHandler = () => {
    props.setView("list");
  };

  const readModeHandler = () => {
    props.setView("attending");
  };

  return (
    <div>
      <h3>Välkommen till Skolsoft V.1.0</h3>
      <p>Här kan du anmäla frånvaror och lägga till studenter.</p>

      <button onClick={readModeHandler}>Kolla närvaro</button>
      <button onClick={editModeHandler}>Administrera elver</button>
    </div>
  );
};

export default Welcome;
