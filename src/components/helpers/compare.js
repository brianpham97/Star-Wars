export const compare = (characters, movies) => {
  let sameHomeworld, homeworldMovies, starshipMovies, vehicleMovies;
  let sameMovies = characters.leftFilms.filter(movie => characters.rightFilms.includes(movie))

  if (sameMovies.length === 0) {
    return createDescription(characters, 'none')
  }

  if (characters.leftHomeworld === characters.rightHomeworld) {
    sameHomeworld = characters.leftHomeworld
  }

  let sameVehicles = characters.leftVehicles.filter(vehicle => characters.rightVehicles.includes(vehicle))

  let sameStarships = characters.leftStarships.filter(starship => characters.rightStarships.includes(starship))

  if (sameHomeworld) {
    homeworldMovies = compareHomeworld(sameHomeworld, movies)
  }

  if (sameStarships.length > 0) {
    starshipMovies = compareStarships(sameStarships, movies)
  }

  if (sameVehicles.length > 0) {
    vehicleMovies = compareVehicles(sameVehicles, movies)
  }

  const finalMovieStorage = finalizeMovieStorage(
    homeworldMovies,
    starshipMovies,
    vehicleMovies
  );


  return createDescription(characters, compareMovies(sameMovies, finalMovieStorage))
}

const compareHomeworld = (sameHomeworld, movies) => {
  let movieStorage = []
  for (let movie of movies) {
    let checkPlanets = movie.planets.filter(planet => {
      if (planet === sameHomeworld) {
        return planet;
      }
    });

    if (checkPlanets.length > 0) {
      movieStorage.push({ title: movie.title, url: movie.url });
    }
  }
  return movieStorage
}

const compareStarships = (sameStarships, movies) => {
  let movieStorage = [];
  for (let movie of movies) {
    let checkStarships = sameStarships.filter(starship =>
      movie.starships.includes(starship)
    );

    if (checkStarships.length > 0) {
      movieStorage.push({ title: movie.title, url: movie.url });
    }
  }
  return movieStorage;
}

const compareVehicles = (sameVehicles, movies) => {
  let movieStorage = [];
  for (let movie of movies) {
    let checkVehicles = sameVehicles.filter(vehicle =>
      movie.vehicles.includes(vehicle)
    );

    if (checkVehicles.length > 0) {
      movieStorage.push({title: movie.title, url: movie.url})
    }
  }
  return movieStorage
}

const finalizeMovieStorage = (homeworldMovies, starshipMovies, vehicleMovies) => {
  homeworldMovies = homeworldMovies || []
  starshipMovies = starshipMovies || []
  vehicleMovies = vehicleMovies || []

  return [...homeworldMovies, ...starshipMovies, ...vehicleMovies]
}

const compareMovies = (sameMovies, storage) => {
  if (storage.length === 0) {
    return [];
  }

  let matchingMovies = new Set();
  for (let i = 0; i < storage.length; i++) {
    if (sameMovies.includes(storage[i].url)) {
      matchingMovies.add(storage[i].title);
    }
  }

  return [...matchingMovies];
};

const createDescription = (characters, movies) => {
  let queryString = ''
  if (movies.length === 0) {
    queryString = `${characters.left} and ${characters.right} have no matching planets, vehicles, or starships.`;

  } else if (movies === 'none') {
    queryString = `${characters.left} and ${characters.right} have no movies together.`;

  } else {
    let movieString = movies.reduce(
      (accumulator, movie) => accumulator + movie + ", ",
      ""
    );
    movieString = movieString.slice(0, queryString.length - 2)
    queryString = `${characters.left} and ${characters.right} both appear in ${movieString}.`;
  }

  return queryString;
}