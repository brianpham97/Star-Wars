export const compare = (characters, movies) => {
  let sameHomeworld;
  let sameMovies = characters.leftFilms.filter(movie => characters.rightFilms.includes(movie))
  let movieStorage = []

  if (sameMovies.length === 0) {
    return createDescription(characters, 'none')
  }

  if (characters.leftHomeworld === characters.rightHomeworld) {
    sameHomeworld = characters.leftHomeworld
  }

  let sameVehicles = characters.leftVehicles.filter(vehicle => characters.rightVehicles.includes(vehicle))

  let sameStarships = characters.leftStarships.filter(starship => characters.rightStarships.includes(starship))

  if (sameHomeworld) {
    compareHomeworld(sameHomeworld, movies, movieStorage)
  }

  if (sameStarships.length > 0) {
    compareStarships(sameStarships, movies, movieStorage)
  }

  if (sameVehicles.length > 0) {
    compareVehicles(sameVehicles, movies, movieStorage)
  }
  return createDescription(characters, compareMovies(sameMovies, movieStorage))
}

const compareHomeworld = (sameHomeworld, movies, storage) => {
  for (let movie of movies) {
    let checkPlanets = movie.planets.filter(planet => {
      if (planet === sameHomeworld) {
        return planet;
      }
    });
    if (checkPlanets.length > 0) {
      storage.push({ title: movie.title, url: movie.url });
    }
  }
}

const compareStarships = (sameStarships, movies, storage) => {
  for (let movie of movies) {
    let checkStarships = sameStarships.filter(starship =>
      movie.starships.includes(starship)
    );
    if (checkStarships.length > 0) {
      storage.push({ title: movie.title, url: movie.url });
    }
  }
  return;
}

const compareVehicles = (sameVehicles, movies, storage) => {
  for (let movie of movies) {
    let checkVehicles = sameVehicles.filter(vehicle =>
      movie.vehicles.includes(vehicle)
    );
    if (checkVehicles.length > 0) {
      storage.push({title: movie.title, url: movie.url})
    }
  }
  return
}

const compareMovies = (sameMovies, storage) => {
  if (storage.length === 0) {
    return []
  }
  let matchingMovies = new Set()
    for (let i = 0; i < storage.length; i++) {
      if (sameMovies.includes(storage[i].url)) {
        matchingMovies.add(storage[i].title)
      }
    }
  return [...matchingMovies]
}

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