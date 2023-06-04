export const capitalizeFirstLetter = (input = "") => {
  if (typeof input !== "string" || input.length === 0) {
    return input;
  }
  return input.charAt(0).toUpperCase() + input.toLowerCase()?.slice(1);
};

export const colorsByType = (type) => {
  const colors = {
    normal: {
      lighter: "#A8A878",
      light: "#A8A77A",
      dark: "#6D6D4E",
    },
    fire: {
      lighter: "#F5AC78",
      light: "#EE8130",
      dark: "#9C531F",
    },
    water: {
      lighter: "#9DB7F5",
      light: "#6390F0",
      dark: "#445E9C",
    },
    electric: {
      lighter: "#FAE078",
      light: "#F7D02C",
      dark: "#A1871F",
    },
    grass: {
      lighter: "#A7DB8D",
      light: "#7AC74C",
      dark: "#4E8234",
    },
    ice: {
      lighter: "#BCE6E6",
      light: "#96D9D6",
      dark: "#638D8D",
    },
    fighting: {
      lighter: "#D67873",
      light: "#C22E28",
      dark: "#7D1F1A",
    },
    poison: {
      lighter: "#C183C1",
      light: "#A33EA1",
      dark: "#682A68",
    },
    ground: {
      lighter: "#EBD69D",
      light: "#E2BF65",
      dark: "#927D44",
    },
    flying: {
      lighter: "#C6B7F5",
      light: "#A98FF3",
      dark: "#6D5E9C",
    },
    psychic: {
      lighter: "#FA92B2",
      light: "#F95587",
      dark: "#A13959",
    },
    bug: {
      lighter: "#C6D16E",
      light: "#A6B91A",
      dark: "#6D7815",
    },
    rock: {
      lighter: "#D1C17D",
      light: "#B6A136",
      dark: "#786824",
    },
    ghost: {
      lighter: "#A292BC",
      light: "#735797",
      dark: "#493963",
    },
    dragon: {
      lighter: "#A27DFA",
      light: "#6F35FC",
      dark: "#4924A1",
    },
    dark: {
      lighter: "#A29288",
      light: "#705746",
      dark: "#49392F",
    },
    steel: {
      lighter: "#D1D1E0",
      light: "#B7B7CE",
      dark: "#787887",
    },
  };
  return {
    lighter: colors[type]?.lighter || colors.normal.lighter,
    light: colors[type]?.light || colors.normal.light,
    dark: colors[type]?.dark || colors.normal.dark,
  };
};
