import express from "express";

const app = express();
// To make app understand Json
app.use(express.json());

let movieList = [
  {
    id: 20,
    name: "Saalar",
  },
  {
    id: 25,
    name: "Dunki",
  },
];
app.post("/movie/add", (req, res) => {
  const newMovie = req.body;
  movieList.push(newMovie);
  return res.status(200).send({ message: "Movie Added Successfully" });
});

app.get("/movie/list", (req, res) => {
  return res.status(200).send(movieList);
});

app.delete("/movie/delete/:id", (req, res) => {
  const movieIdToBeDelete = Number(req.params.id);
  const newMovieList = movieList.filter((item, index, array) => {
    return item.id !== movieIdToBeDelete;
  });
  movieList = structuredClone(newMovieList);

  return res.status(200).send({ message: "Movie Deleted Successfully" });
});

// Movie Edit
app.put("/movie/edit/:id", (req, res) => {
  const movieToBeEdited = Number(req.params.id);

  //   extract new values from req.body
  const newValues = req.body;
  //   check if movie with provided id exists
  const requiredMovie = movieList.find((item, index, array) => {
    if (item.id === movieToBeEdited) {
      return item;
    }
  });
  // console.log(requiredMovie)

  // if not movie, throw error
  if (!requiredMovie) {
    return res.status(200).send({ message: "Movie does not exist" });
  };

  //   edit that movie
  const newMovieList = movieList.map((item, index, array) => {
    if (item.id === movieToBeEdited) {
      return { ...item, ...newValues };
    } else {
      return item;
    }
  });
  movieList = structuredClone(newMovieList);
  return res.status(200).send({ message: "Movie Edited Successfully" });
});

// port
const port = 6000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
