"use strict";

// find boxes and set start button event listener
const startButton = document.getElementById("start-button");
const startBox = document.getElementById("start-box");
const startText = document.getElementById("start-text");
const gameBox = document.getElementById("game");
const endBox = document.getElementById("end-box")
startButton.addEventListener('click', startGame);

// constants for wait time and number of items
const FOUND_MATCH_WAIT_MSECS = 1000;
const IMAGE_FILES_COUNT = 14;
const IMAGES_TO_MATCH = 6;

// initialize variables for during game
let flippedCardIds;
let flippedCardImages;
let matchesRemaining;

/** Memory game: find matching pairs of cards and flip both of them. */
function startGame() {
  console.log('starting game');
  // decide which images will be in the game
  const imageOptions = chooseImages(IMAGE_FILES_COUNT, IMAGES_TO_MATCH);
  console.log(`Selected images: ${imageOptions}`);
  // shuffle the images so they are mixed for matching
  const shuffledImages = shuffle(imageOptions);
  console.log(`Shuffled images: ${shuffledImages}`);
  // create cards from the shuffled images
  createCards(shuffledImages);
  console.log("set cards");
  // show and hide boxes to start
  gameBox.style.display = "flex";
  startText.style.display = "flex";
  startBox.style.display = "none";
  endBox.style.display = "none";
}

/* choose images randomly from file options */
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

/* make all the cards with a button and a hidden result */
function createCards(imageNumbers) {
  let button;
  let recordImage;
  let matchImage;
  // reset variables for during game
  flippedCardIds = [];
  flippedCardImages = [];
  matchesRemaining = IMAGES_TO_MATCH;
  // iterate to build elements for image options
  for (let i = 0; i < imageNumbers.length; i++) {
    // create button element and set classes/attributes
    button = document.createElement('button');
    button.classList.add("btn", "btn-dark", "click", "match-option");
    button.setAttribute('id', `option-${i}`);
    button.setAttribute('image-number', imageNumbers[i]);
    recordImage = document.createElement('img');
    recordImage.classList.add("record-image");
    recordImage.setAttribute('src', `images/vinyl.svg`);
    // add event listener for when user clicks button
    button.addEventListener('click', function () {
      flipCard(i, imageNumbers[i]);
    });
    button.appendChild(recordImage);
    // button.style.display = "none";
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
function flipCard(id, imageNumber) {
  // only flip if less than two cards have been flipped
  if (flippedCardIds.length >= 2) return;
  // flip the card by switching visibility of button and image
  let buttonId = `option-${id}`;
  let resultId = `result-${id}`;
  console.log('button clicked');
  console.log(buttonId);
  console.log(resultId);
  console.log(imageNumber);
  // show the result and hide the button
  const buttonElement = document.getElementById(buttonId);
  buttonElement.style.display = 'none';
  const resultElement = document.getElementById(resultId);
  resultElement.style.display = '';
  // add to flipped cards array
  flippedCardIds.push(id);
  flippedCardImages.push(imageNumber);
  // once two cards flipped, wait set time and check for match
  if (flippedCardIds.length === 2) {
    setTimeout(checkForMatch, FOUND_MATCH_WAIT_MSECS);
  }
}

/** Flip a card face-down. */
function unFlipCard(id) {
  // hide the result and show the button
  document.getElementById(`option-${id}`).style.display = 'flex';
  document.getElementById(`result-${id}`).style.display = 'none';
}

/* check for match when two cards are flipped */
function checkForMatch() {
  console.log('checking for match');
  console.log(flippedCardImages);
  // if not a match then unflip the cards
  if (flippedCardImages[0] !== flippedCardImages[1]) {
    for (let flippedId of flippedCardIds) {
      unFlipCard(flippedId);
    }
  }
  else {
    // subtract from matches remaining and check for victory
    matchesRemaining--;
    if (matchesRemaining === 0) gameCompletion();
  }
  // clear id and image arrays
  flippedCardIds = [];
  flippedCardImages = [];
}

/* set up the game for the next play upon completion */
function gameCompletion(){
  startBox.style.display = "flex";
  startText.style.display = "none";
  endBox.style.display = "flex";
}