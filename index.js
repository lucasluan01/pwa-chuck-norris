const urlBase = "https://api.chucknorris.io/jokes";

const favoriteElement = document.getElementById("favorite-icon");
const categoryElement = document.getElementById("category");
const jokeElement = document.getElementById("joke");
const createdAt = document.getElementById("created-at");
const dataInput = document.getElementById("favorite");

getRandomJoke = function () {
  fetch(`${urlBase}/random`)
    .then((response) => response.json())
    .then((data) => {
      categoryElement.innerHTML = data.categories[0] ?? "Uninformed";
      jokeElement.innerHTML = `"${data.value}"`;
      createdAt.innerHTML = `Data criação: ${data.created_at}`;
      // dataInput.value = data.id;
    });
};

getJokeByCategory = function (category) {
  fetch(`${urlBase}/random?category=${category}`)
    .then((response) => response.json())
    .then((data) => {
      categoryElement.innerHTML = category;
      jokeElement.innerHTML = `"${data.value}"`;
      createdAt.innerHTML = `Data criação: ${data.created_at}`;
    });
};

getJokeBySearch = function (search) {
  const containerSearch = document.getElementById("result-search");

  fetch(`${urlBase}/search?query=${search}`)
    .then((response) => response.json())
    .then((data) => {
      data.result.forEach((item) => {
        containerSearch.innerHTML += createCardJoke(item);
      });

      containerSearch.innerHTML = contentHTML;
    });
};

createFilter = function () {
  let contentHTML = "";
  const containerChip = document.getElementById("container__chip");

  fetch(`${urlBase}/categories`)
    .then((response) => response.json())
    .then((data) => {
      data.unshift("all");
      data.forEach((item) => {
        const radioButton = `<input class="input" type="radio" id="radio-${item}" name="switch-categories" value="${item}" ${
          item === "all" ? "checked" : ""
        }/>`;
        const label = `<label class="label" for="radio-${item}">${item}</label>`;
        contentHTML += radioButton + label;
      });

      containerChip.innerHTML = contentHTML;
    });
};

createCardJoke = (item) => {
  return `
  <div class="container__joke">
    <div class="top">
        <p id="category">${item.categories[0] ?? "Uninformed"}</p>
        <div class="container__favorite">
            <svg class="favorite-icon" id="favorite-icon" width="25" height="22" viewBox="0 0 25 22" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M14.1865 21.3564C13.2369 22.2166 11.7749 22.2166 10.8253 21.3439L10.6879 21.2193C4.12788 15.2975 -0.157975 11.4204 0.0044621 6.58327C0.0794333 4.46392 1.16652 2.43184 2.92834 1.23503C6.22707 -1.00899 10.3005 0.0382159 12.4997 2.60637C14.6988 0.0382159 18.7722 -1.02146 22.071 1.23503C23.8328 2.43184 24.9199 4.46392 24.9949 6.58327C25.1698 11.4204 20.8714 15.2975 14.3115 21.2442L14.1865 21.3564Z" />
            </svg>
        </div>
    </div>
    <p class="joke" id="joke">${item.value}</p>
    <div class="bottom">
        <p class="created-at" id="created-at">${item.created_at}</p>
    </div>
  </div>
  `;
};

window.onload = function () {
  console.log(createFilter());
};

document.getElementById("generate-joke").addEventListener("click", () => {
  const category = document.querySelector(
    'input[name="switch-categories"]:checked'
  )?.value;
  category === "all" ? getRandomJoke() : getJokeByCategory(category);
});

document.getElementById("search-joke").addEventListener("keyup", () => {
  const query = document.getElementById("search-joke").value;

  if (query.length >= 3) getJokeBySearch(query);

  if (query.trim().length === 0) {
    document.getElementById("result-search").innerHTML = "";
  }
});

// favoriteElement.addEventListener("click", (e) => {
//   favoriteElement.classList.toggle("active");

//   console.log('e', e);
//   const favorite = document.getElementById('input[name="favorite"]:checked')?.value;

//   if (favorite === "true") {
//     // TODO: Salvar no localStorage
//     console.log("Adicionado aos favoritos");
//   } else {
//     // TODO: Remover do localStorage
//     console.log("Removido dos favoritos");
//   }
// });
