import React from "react";

const Welcome = (props) => {
  const editModeHandler = () => {
    props.setView("editMode");
  };

  const readModeHandler = () => {
    props.setView("attendMode");
  };

  return (
    <div>
      <h3>Välkommen till Skolsoft V.1.0</h3>
      <p>Här kan du anmäla frånvaro och lägga till studenter.</p>

      <button className="spaceBtn" onClick={readModeHandler}>
        Kolla närvaro
      </button>
      <button className="spaceBtn" onClick={editModeHandler}>
        Administrera elever
      </button>
    </div>
  );
};

export default Welcome;
