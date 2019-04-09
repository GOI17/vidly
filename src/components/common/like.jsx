import React from "react";

const Like = ({ liked, onClick }) => {
  let classes = "fa clickable fa-heart";
  if (!liked) classes += "-o";
  return <i onClick={onClick} className={classes} aria-hidden="true" />;
};

export default Like;
