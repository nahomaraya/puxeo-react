import React from "react";

function Loader(props) {
  const { visible } = props;

  if (!visible) {
    return null;
  }

  return (
    <div className="loader">
      <div className="loader-spinner">xxx</div>
    </div>
  );
}

export default Loader;