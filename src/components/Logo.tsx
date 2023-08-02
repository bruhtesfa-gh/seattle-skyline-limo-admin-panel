import React from "react";
import { Link } from "react-router-dom";
import LogoImg from "../assets/react.svg";
function Logo() {
  return (
    <div className="app-brand justify-content-center">
      <Link to="/" className="app-brand-link gap-2">
        <span className="app-brand-logo demo">
          <img
            src={LogoImg}
            style={{
              objectFit: "contain",
              width: "10rem",
              aspectRatio: "2/1",
            }}
          />
        </span>
        <span className="app-brand-text demo text-body fw-bolder"></span>
      </Link>
    </div>
  );
}

export default Logo;
