import React from "react";

function Spinner() {
  return (
    <div
      className="spinner-border spinner-border-lg text-primary"
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
export function FullScreenSpinner() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        aspectRatio: 3 / 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner />
    </div>
  );
}

export default Spinner;
