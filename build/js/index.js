"use strict";var menuItems=Array.from(document.querySelectorAll(".options__item")),menuList=document.querySelector(".options__list");function clickMenuItem(t){var e=t.target;if(e.classList.contains("options__title")){var n=e.closest(".options__item");n.classList.toggle("options__item--active"),menuItems.filter((function(t){return t!==n})).forEach((function(t){return t.classList.remove("options__item--active")}))}}menuList.addEventListener("click",clickMenuItem);var form=document.getElementById("form");function cleanInput(t){var e=t.target.closest(".input__btn-clean");if(e){console.log(e);var n=e.closest(".form__input").querySelector("input");0!==n.value.length&&(n.value="")}}form.addEventListener("click",cleanInput);