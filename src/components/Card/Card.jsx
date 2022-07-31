import React from "react";

export const Card = (props) => {
  const { title, datetime, creator, status, priority, description } = props;

  const limitString = (str) => {
    if (str.length > 370) {
      return { string: str.slice(0, 367).concat("..."), addButton: true };
    }
    return { string: str, addButton: false };
  };

  return (
    <div className="card">
      <div className="close">x</div>
      <h3>{title}</h3>
      <h5>{datetime}</h5>
      <h6>{creator}!</h6>
      <button className="status" type="button">
        {status}
      </button>
      <button className="priority">{priority}</button>
      <p className="description">{limitString(description).string}</p>
    </div>
  );
};
