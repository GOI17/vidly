import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import Genres from "./common/genres";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";
import TableHeader from "./common/tableHeader";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "like" },
    { key: "delete" }
  ];
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    currentGenre: "",
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleFilterByGenre = genre => {
    console.log(genre);
    this.setState({ currentPage: 1, currentGenre: genre });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  renderMovies(movies) {
    return movies.map((movie, index) => {
      return (
        <tr key={index}>
          <td>{movie.title}</td>
          <td>{movie.genre.name}</td>
          <td>{movie.numberInStock}</td>
          <td>{movie.dailyRentalRate}</td>
          <td className="row">
            <div className="col-3">
              <Like
                liked={movie.liked}
                onClick={() => this.handleLike(movie)}
              />
            </div>
            <div className="col-3">
              <button
                value={movie}
                className="btn btn-danger"
                onClick={() => this.handleDelete(movie)}
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { length: moviesCount } = this.state.movies;
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      currentGenre,
      genres,
      sortColumn
    } = this.state;
    if (moviesCount === 0) return <p>There are no movies in the database</p>;

    const filtered =
      currentGenre && currentGenre._id
        ? allMovies.filter(m => m.genre._id === currentGenre._id)
        : allMovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <Genres
            selectedGenre={currentGenre}
            genres={genres}
            onGenreSelect={this.handleFilterByGenre}
          />
        </div>
        <div className="col">
          <p>Showing {filtered.length} movies in the database.</p>
          <table className="table">
            <TableHeader
              columns={this.columns}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <tbody>{this.renderMovies(movies)}</tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            itemsCount={filtered.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default MoviesTable;
