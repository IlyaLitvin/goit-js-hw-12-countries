import fetchCountries from "./components/fetchComponents.js";
import css from "./css/style.css";

document
  .querySelector(".container-list")
  .insertAdjacentHTML("beforeend", localStorage.getItem("html") || "");

fetchCountries();
