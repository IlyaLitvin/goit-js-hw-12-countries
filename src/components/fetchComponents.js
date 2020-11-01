import template from "../templates/listTemplate.hbs";
import { alert, info } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

export default function fetchConutries(serachQuery) {
  const input = document.querySelector(".input");
  const containerList = document.querySelector(".container-list");
  const debounce = require("lodash.debounce");

  const findCountries = function (e) {
    if (e.target.value.length >= 1) {
      fetch(`https://restcountries.eu/rest/v2/name/${e.target.value}`)
        .then((data) => data.json())
        .then((array) => {
          if (array.length > 10) {
            alert("Too many matches found.Please enter a more specific query");
          }

          if (array.length >= 0) {
            containerList.innerHTML = "";
          }
          array.forEach((el) => {
            if (array.length >= 2 && array.length < 10) {
              containerList.innerHTML += `<li class=country-list-item>${el.name}</li>`;
              const items = document.querySelectorAll(".country-list-item");
              items.forEach((el) => {
                const clearListItems = function () {
                  input.value = el.textContent;
                  containerList.innerHTML = "";
                  fetch(
                    `https://restcountries.eu/rest/v2/name/${el.textContent}`,
                  )
                    .then((data) => data.json())
                    .then((array) => {
                      containerList.insertAdjacentHTML(
                        "beforeend",
                        template(array),
                      );
                    });
                };
                el.addEventListener("click", clearListItems);
              });
            } else if (array.length === 1) {
              containerList.insertAdjacentHTML("beforeend", template(array));
            }
          });
        })
        .catch(() => {
          input.value = "";
          containerList.innerHTML = "";
          info("Enter another country name!");
        });
    } else {
      containerList.innerHTML = "";
    }
  };
  document.querySelector("input").addEventListener(
    "input",
    debounce((e) => {
      findCountries(e);
    }, 500),
  );
}
