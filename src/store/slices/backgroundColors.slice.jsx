import { createSlice } from "@reduxjs/toolkit";

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const backgroundColorsSlice = createSlice({
  name: "backgroundColor",
  initialState: {
    ground: [
      { backgroundColor: "#5C4D48" },
      {
        filter:
          "filter: invert(29%) sepia(27%) saturate(276%) hue-rotate(329deg) brightness(96%) contrast(90%);",
      },
    ],
    fighting: [
      { backgroundColor: "#C02D01" },
      {
        filter:
          "filter: invert(17%) sepia(74%) saturate(4098%) hue-rotate(20deg) brightness(98%) contrast(103%);",
      },
    ],
    ice: [
      { backgroundColor: "#00618E" },
      {
        filter:
          "filter: invert(28%) sepia(20%) saturate(6130%) hue-rotate(175deg) brightness(87%) contrast(101%);",
      },
    ],
    normal: [
      { backgroundColor: "#870126" },
      {
        filter:
          "filter: invert(14%) sepia(45%) saturate(7488%) hue-rotate(334deg) brightness(64%) contrast(106%);",
      },
    ],
    psychic: [
      { backgroundColor: "#8E004C" },
      {
        filter:
          "filter: invert(10%) sepia(71%) saturate(6621%) hue-rotate(319deg) brightness(72%) contrast(103%);",
      },
    ],
    poison: [
      { backgroundColor: "#3C0086" },
      {
        filter:
          "filter: invert(15%) sepia(36%) saturate(6256%) hue-rotate(261deg) brightness(79%) contrast(128%);",
      },
    ],
    fire: [
      { backgroundColor: "#FF4B5A" },
      {
        filter:
          "filter: invert(54%) sepia(41%) saturate(5709%) hue-rotate(324deg) brightness(99%) contrast(118%);",
      },
    ],
    flying: [
      { backgroundColor: "#0086E5" },
      {
        filter:
          "filter: invert(38%) sepia(88%) saturate(3289%) hue-rotate(186deg) brightness(96%) contrast(101%);",
      },
    ],
    fairy: [
      { backgroundColor: "#FF4B94" },
      {
        filter:
          "filter: invert(57%) sepia(87%) saturate(4411%) hue-rotate(310deg) brightness(102%) contrast(101%);",
      },
    ],
    dragon: [
      { backgroundColor: "#006A78" },
      {
        filter:
          "filter: invert(23%) sepia(58%) saturate(2907%) hue-rotate(166deg) brightness(93%) contrast(103%);",
      },
    ],
    bug: [
      { backgroundColor: "#00BC29" },
      {
        filter:
          "filter: invert(60%) sepia(32%) saturate(4760%) hue-rotate(91deg) brightness(90%) contrast(105%);",
      },
    ],
    dark: [
      { backgroundColor: "#595A79" },
      {
        filter:
          "filter: invert(34%) sepia(12%) saturate(1126%) hue-rotate(200deg) brightness(95%) contrast(84%);",
      },
    ],
    ghost: [
      { backgroundColor: "#9C00A1" },
      {
        filter:
          "filter: invert(13%) sepia(92%) saturate(5019%) hue-rotate(293deg) brightness(79%) contrast(115%);",
      },
    ],
    steel: [
      { backgroundColor: "#018458" },
      {
        filter:
          "filter: invert(33%) sepia(11%) saturate(6921%) hue-rotate(127deg) brightness(101%) contrast(99%);",
      },
    ],
    electric: [
      { backgroundColor: "#5A5A00" },
      {
        filter:
          "filter: invert(33%) sepia(17%) saturate(2702%) hue-rotate(25deg) brightness(92%) contrast(101%);",
      },
    ],
    water: [
      { backgroundColor: "#0146EC" },
      {
        filter:
          "filter: invert(20%) sepia(100%) saturate(6163%) hue-rotate(225deg) brightness(93%) contrast(102%);",
      },
    ],
    rock: [
      { backgroundColor: "#CD3800" },
      {
        filter:
          "filter: invert(30%) sepia(83%) saturate(6695%) hue-rotate(27deg) brightness(99%) contrast(108%);",
      },
    ],
    grass: [
      { backgroundColor: "#00721B" },
      {
        filter:
          "filter: invert(28%) sepia(91%) saturate(829%) hue-rotate(99deg) brightness(93%) contrast(106%)",
      },
    ],
  },
  reducers: {},
});

export const {} = backgroundColorsSlice.actions;

export default backgroundColorsSlice.reducer;
