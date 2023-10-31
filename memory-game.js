"use strict";

// start button event listener
const startButton = document.getElementById("start-button");
const startBox = document.getElementById("start-box")
const gameBox = document.getElementById("game");
startButton.addEventListener('click', startGame);

function startGame() {
  console.log('starting game');
  // decide which images will be in the game
  const imageOptions = chooseImages(14, 6);
  console.log(`Selected images: ${imageOptions}`);
  // shuffle the images so they are mixed for matching
  const shuffledImages = shuffle(imageOptions);
  console.log(`Shuffled images: ${shuffledImages}`);
  // create cards from the shuffled images
  createCards(shuffledImages);
  console.log("set cards");
  // show and hide boxes to start
  gameBox.style.display = "flex";
  startBox.style.display = "none"
}

function chooseImages(options, selections) {
  let selectedImages = [];
  for (let i = 0; i < selections; i++) {
      let randomInt;
      do randomInt = Math.floor(Math.random() * options) + 1;
      while (selectedImages.includes(randomInt));
      // add twice so there are two to match
      selectedImages.push(randomInt, randomInt);
  }
  return selectedImages;
}
/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", from starter code
  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */
function createCards(imageNumbers) {
  let button;
  let recordImage;
  let matchImage;
  for (let i = 0; i < imageNumbers.length; i++){
    button = document.createElement('button');
    button.classList.add("btn", "btn-dark", "click", "match-option");
    button.setAttribute('id', `option-${i}`);
    button.setAttribute('image-number', imageNumbers[i]);
    recordImage = document.createElement('img');
    recordImage.classList.add("record-image");
    recordImage.setAttribute('src', `images/vinyl.svg`)
    button.appendChild(recordImage);
    gameBox.appendChild(button);
    // add image element for the match result, hide at start
    matchImage = document.createElement('img');
    matchImage.classList.add("match-option", "record-image");
    matchImage.setAttribute('id', `result-${i}`);
    matchImage.setAttribute('src', `game-images/${imageNumbers[i]}.jpg`);
    matchImage.style.display = "none";
    gameBox.appendChild(matchImage);
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  // ... you need to write this ...
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  // ... you need to write this ...
}
