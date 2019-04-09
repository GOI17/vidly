import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import Genres from "./common/genres";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like liked={movie.liked} onClick={() => this.handleLike(movie)} />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          value={movie}
          className="btn btn-danger"
          onClick={() => this.handleDelete(movie)}
        >
          Delete
        </button>
      )
    }
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

  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  renderMovies = movies => {
    return movies.map(movie => {
      return (
        <tr key={movie._id}>
          {this.columns.map(column => (
            <td key={this.createKey(movie, column)}>
              {this.renderCell(movie, column)}
            </td>
          ))}
        </tr>
      );
    });
  };

  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      currentGenre,
      sortColumn
    } = this.state;

    const filtered =
      currentGenre && currentGenre._id
        ? allMovies.filter(m => m.genre._id === currentGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: moviesCount } = this.state.movies;
    const {
      currentPage,
      pageSize,
      currentGenre,
      genres,
      sortColumn
    } = this.state;

    if (moviesCount === 0) return <p>There are no movies in the database</p>;

    const { totalCount, data: movies } = this.getPagedData();

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
          <p>Showing {totalCount} movies in the database.</p>
          <Table
            columns={this.columns}
            data={movies}
            sortColumn={sortColumn}
            onSort={this.handleSort}
            onRender={this.renderMovies}
          />
          <Pagination
            currentPage={currentPage}
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default MoviesTable;
