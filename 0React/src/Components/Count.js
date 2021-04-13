import React from "react";

const Count = (props) => {
  const nrOfTodos = props.length;
  return (
    <div className="footer">
      <span>
        You have <span className="pendingTasks">{nrOfTodos}</span> pending tasks
      </span>
      <button onClick={props.removeAll}>Clear All</button>
    </div>
  );
};

export default Count;
