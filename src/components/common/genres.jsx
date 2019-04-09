import React from "react";

const Genres = props => {
  const {
    onGenreSelect,
    selectedGenre,
    genres,
    textProperty,
    valueProperty
  } = props;
  return (
    <ul className="list-group">
      {genres.map(g => (
        <li
          key={g[valueProperty]}
          style={{ cursor: "pointer" }}
          className={
            g === selectedGenre ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onGenreSelect(g)}
        >
          {g[textProperty]}
        </li>
      ))}
    </ul>
  );
};

Genres.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default Genres;
