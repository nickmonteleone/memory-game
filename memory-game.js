"use strict";

// find boxes and set start button event listener
const startButton = document.getElementById("start-button");
const startBox = document.getElementById("start-box");
const instructBox = document.getElementById("instruct-box");
const gameBox = document.getElementById("game");
const endBox = document.getElementById("end-box");
startButton.addEventListener('click', startGame);
// text for showing scores
const scoreText = document.getElementById("score-text");
// constants for wait time and number of items
const FOUND_MATCH_WAIT_MSECS = 1000;
const IMAGE_FILES_COUNT = 14;
const IMAGES_TO_MATCH = 6;
// initialize variables for during game
let flippedCardIds;
let flippedCardImages;
let matchesRemaining;
let attemptsCount;

/** Memory game: find matching pairs of cards and flip both of them. */
function startGame() {
  // clear game element to allow for second play
  for (let i = 0; gameBox.childNodes.length > 0; i++){
    gameBox.childNodes[0].remove();
  }
  // decide which images will be in the game
  const imageOptions = chooseImages(IMAGE_FILES_COUNT, IMAGES_TO_MATCH);
  // shuffle the images (2 of each) so they are mixed for matching
  const shuffledImages = shuffle(imageOptions.concat(imageOptions));
  // create cards from the shuffled images
  createCards(shuffledImages);
  // show and hide boxes to start
  gameBox.style.display = "flex";
  instructBox.style.display = "flex";
  startBox.style.display = "none";
  endBox.style.display = "none";
}

/** Choose images randomly from file options */
function chooseImages(options, selections) {
  // shuffle and slice array of options
  let selectedImages = Array.from({length: options}, (_,i) => i+1)
  selectedImages = shuffle(selectedImages).slice(0, selections);
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

/** Make all the cards with a button and a hidden result */
function createCards(imageNumbers) {
  let button;
  let recordImage;
  let matchImage;
  // reset variables for during game
  flippedCardIds = [];
  flippedCardImages = [];
  matchesRemaining = IMAGES_TO_MATCH;
  attemptsCount = 0;
  scoreText.innerText = `Attempts: ${attemptsCount}`;
  // iterate to build elements for image options
  for (let i = 0; i < imageNumbers.length; i++) {
    // create button element and set classes/attributes
    button = document.createElement('button');
    button.classList.add("btn", "btn-dark", "click", "match-option");
    button.setAttribute('id', `option-${i}`);
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
    matchImage.classList.add("match-option", "album-image", "rounded-2");
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
    attemptsCount++;
    scoreText.innerText = `Attempts: ${attemptsCount}`;
    if (flippedCardImages[0] == flippedCardImages[1]) {
      // subtract from matches remaining and check for victory
      matchesRemaining--;
      if (matchesRemaining === 0) gameCompletion();
      // clear id and image arrays
      flippedCardIds = [];
      flippedCardImages = [];
    }
    else setTimeout(unFlipCards, FOUND_MATCH_WAIT_MSECS);
  }
}

/** unflip cards by reversing visibility of image and button */
function unFlipCards() {
  for (let id of flippedCardIds) {
    document.getElementById(`option-${id}`).style.display = 'flex';
    document.getElementById(`result-${id}`).style.display = 'none';
  }
  // clear id and image arrays
  flippedCardIds = [];
  flippedCardImages = [];
}

/** Set up the game for the next play upon completion */
function gameCompletion() {
  scoreText.innerText = `Your score: ${attemptsCount} attempts`;
  startBox.style.display = "flex";
  instructBox.style.display = "none";
  endBox.style.display = "flex";
}