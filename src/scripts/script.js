document.addEventListener("DOMContentLoaded", function () {
  const charactersList = document.querySelector(".charactersList");

  fetch("src/data/cards.json")
    .then((response) => {
      if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`);}
      return response.json();
    })
    .then((cardsData) => {
      charactersList.innerHTML = cardsData
        .map((card, index) => createCardHTML(card, index === 0))
        .join("");
    })
    .catch((error) => console.error("Error fetching card data:", error));

  function createCardHTML(card, isSelected) {
    const stars = Array(card.level)
      .fill('<span class="star"></span>')
      .join("");
    return `
      <li class="card ${card.id} ${isSelected ? "select" : ""}">
        <div class="cardBack"></div>
        <h2 class="name">${card.name}</h2>
        <div class="cardLevel">${stars}</div>
        <img src="${card.image}" alt="${card.name}" class="cardImage">
        <div class="informations">
          <p class="description">${card.description}</p>
          <div class="atkInfo">
            <span>ATK/ ${card.atk}</span>
            <span>DEF/ ${card.def}</span>
          </div>
        </div>
      </li>
    `;
  }
});
