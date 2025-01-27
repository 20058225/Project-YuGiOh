// Load cards
document.addEventListener("DOMContentLoaded", function () {
  const charactersList = document.querySelector(".charactersList");
  fetch("src/data/cards.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((cardsData) => {
      // Add cards to the DOM
      charactersList.innerHTML = cardsData
        .map((card, index) => createCardHTML(card, index === 0))
        .join("");

      // Initialize card navigation logic AFTER the cards are loaded
      initializeCardNavigation();
    })
    .catch((error) => console.error("Error fetching card data:", error));

  function createCardHTML(card, isSelected) {
    const stars = Array(card.level)
      .fill('<span class="star"></span>')
      .join("");
    return `
      <li class="card ${card.id} ${isSelected ? "selected" : ""}">
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

  function initializeCardNavigation() {
    const btnAdvance = document.getElementById("btnAdvance");
    const btnGoBack = document.getElementById("btnGoBack");
    const cards = document.querySelectorAll(".card");
    let cardCurrent = 0;

    btnAdvance.addEventListener("click", function () {
      if(cardCurrent === cards.length - 1) return;      
      hideSelectedCard();
      cardCurrent ++; 
      showCard(cards, cardCurrent);
    });
    btnGoBack.addEventListener("click", function () {
      if(cardCurrent === 0) return;
      hideSelectedCard();
      cardCurrent --; 
      showCard(cards, cardCurrent);
    });
  }
});
function showCard(cards, cardCurrent) {
  cards[cardCurrent].classList.add("selected");
}
function hideSelectedCard() {
  const selectedCard = document.querySelector(".selected");
  selectedCard.classList.remove("selected");
}

