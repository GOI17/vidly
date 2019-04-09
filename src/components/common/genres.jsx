import React from "react";

const Genres = ({
  onGenreSelect,
  selectedGenre,
  genres,
  textProperty,
  valueProperty
}) => {
  return (
    <ul className="list-group">
      {genres.map(g => (
        <li
          key={g[valueProperty]}
          className={
            g === selectedGenre
              ? "list-group-item active clickable"
              : "list-group-item clickable"
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
