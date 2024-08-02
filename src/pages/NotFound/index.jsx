import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      {" "}
      404 NotFound <Link to={"/tasks"}> Goto home page</Link>{" "}
    </div>
  );
};

export default NotFound;
