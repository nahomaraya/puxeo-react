import React, { useState } from "react";

export const SpaceForm = (props) => {
  return (
    <div className="">
      <div className="">
        <h4  style={{ fontWeight: "bold" }}>Enter a name for your {props.child}</h4>
      
        <div className="card mb-5">
          <div className="card-body">
            <div className="d-flex flex-column">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name Here"
                  value={props.name}
                  onChange={(e) => props.setName(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const ColorSelector = (props) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [color, setColor] = useState("#000000");

  return (
    <div className="">
      <div className="">
        <h4  style={{ fontWeight: "bold" }}>Select a Color</h4>
        <p>Click on a color to select it.</p>
        <div className="card mb-5">
          <div className="card-body d-flex flex-column align-items-center">
            <input
              type="color"
              id="color"
              className="form-control"
              value={props.color}
              onChange={(e) => props.setColor(e.target.value)}
            />
            {/* <div className="selected-color mb-3" style={{ backgroundColor: selectedColor, width: "50px", height: "50px" }}></div>
          <div className="color-options d-flex flex-wrap justify-content-center">
            {[...Array(8)].map((_, index) => {
              const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
              return (
                <div
                  key={index}
                  className="color-option"
                  onClick={() => setColor(color)}
                  style={{ backgroundColor: color, width: "20px", height: "20px", marginRight: "10px", marginBottom: "10px", cursor: "pointer" }}
                ></div>
              );
            })}
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export const StatusAdder = (props) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(-1);

  function handleAddStatus() {
    if (!name || !color) { // check if both name and color are provided
      return;
    }

    props.setStatuses([
      ...props.statuses,
      { name: name, color: color },
    ]);
    setName("");
    setColor("");
  }

  function removeStatus(index) {
    const newStatuses = [...props.statuses];
    newStatuses.splice(index, 1);
    props.setStatuses(newStatuses);
  }

  return (
    <div className="">
      <div className="">
        <h4  style={{ fontWeight: "bold" }}>Add Status</h4>
        <div className="card mb-5">
          <div className="card-body">
            <div className="form-group mb-3">
              <label htmlFor="status">Status Name</label>
              <input
                type="text"
                id="status"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="color">Status Color</label>
              <input
                type="color"
                id="color"
                className="form-control"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={handleAddStatus}>
              Add Status
            </button>
          </div>
        </div>
        {props.statuses.length > 0 && (
          <div className="card mb-5">
            <div className="card-body">
              <h4  style={{ fontWeight: "bold" }}>Select Status</h4>
              <p>Click on a status to select it.</p>
              <div className="status-options">
                {props.statuses.map((status, index) => (
                  <div
                    key={index}
                    className={`status-option mb-3 ${
                      selectedStatus === index ? "selected" : ""
                    }`}
                    onClick={() => setSelectedStatus(index)}
                    style={{
                      backgroundColor: status.color,
                      borderRadius: "10px",
                      color: "white",
                    
                    }}
                  >
                     <button
                      type="button"
                      className="close"
                      aria-label="Close"
                      onClick={() => removeStatus(index)}
                    
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                    {status.name}
                   
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export const Summary = (props) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", rowGap: "0.5rem" }}>
    <div style={{ fontWeight: "bold" }}>Name:</div>
    <div>{props.name}</div>
    <div style={{ fontWeight: "bold" }}>Color:</div>
    <div>
      <span style={{ backgroundColor: props.color, padding: "0.2rem", color: "white" }}>
        {props.color}
      </span>
    </div>
    <div style={{ fontWeight: "bold" }}>Created Statuses:</div>
    <div>
      <ul style={{ margin: 0 }}>
        {props.statuses.map((status) => (
          <li
            key={status.name}
            style={{
              backgroundColor: status.color,
              padding: "0.2rem",
              borderRadius: "10px",
              width: "40%",
              color: "white",
              marginBottom: "0.5rem",
            }}
          >
            {status.name}
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
};
