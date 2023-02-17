export const updateCharacter = (character) => {
  const films = character.films
  const homeworld = character.homeworld
  const vehicles = character.vehicles
  const starships = character.starships
  const url = character.url

  return {
    films: films,
    homeworld: homeworld,
    vehicles: vehicles,
    starships: starships,
    url: url
  }
}

export const removeCharacter = (direction) => {
  if (direction === 'left') {
    return {
      left: null,
      leftFilms: [],
      leftHomeworld: null,
      leftVehicles: [],
      leftStarships: [],
      leftUrl: null,
    };
  } else if (direction === 'right') {
    return {
      right: null,
      rightFilms: [],
      rightHomeworld: null,
      rightVehicles: [],
      rightStarships: [],
      rightUrl: null,
    };
  }

}