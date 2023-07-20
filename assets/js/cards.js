// This file is to help control the cards on the page and keep them organized

// Create a new style sheet for the variables
var myReuseableStylesheet = document.createElement('style');
document.head.appendChild(myReuseableStylesheet)

let cardParent = document.getElementById('proj-lists')
let cardStack = Array.from(document.getElementsByClassName('card'))
reDisplay()
configureOnClick()

// Used to make the transitions more consistent. There is an issue with hovering that messes up calculations.
let cardDistHolder = 0 

// Take the card and move it to the back n times
async function shuffleBack(n){
  if(n == 0) return

  // TODO: Add in function that makes display static while this happens

  for(let i = 0; i < cardStack.length; i++){
    cardStack[i].removeAttribute('onclick')
    cardStack[i].style.pointerEvents = 'none';
  }

  for(let i = 0; i < n; i++){
    // Animation needs to happen first so that cardstack can be used by function
    await animateFront(n)

    // Let's remove from array and document
    let frontCard = cardStack.pop()
    frontCard.remove()

    // Let's add it back to the document
    cardParent.prepend(frontCard)
    cardStack.unshift(frontCard)

    reDisplay()
  }

  // Do this after the loop to prevent users from clicking between cycles
  configureOnClick()

  // Update the project display to reflect the front-most card.
  updateProjectDisplay()

  // Reset this once the call is over so we can get a new value on the next run.
  cardDistHolder = 0
}

// Actually rearrange the cards in the HTML code
function reDisplay(){
  console.log(cardStack)
  for(let i = 0; i < cardStack.length; i++){
    cardStack[i].removeAttribute('style')
    console.log(cardStack[i].getBoundingClientRect().height)
    cardStack[i].style.top = `${cardStack[i].style.top - (cardStack[i].getBoundingClientRect().height-50)*i}px`
  }
}

// Give cards the right function parameters
function configureOnClick(){
  for(let i = 0; i < cardStack.length; i++){
    cardStack[i].removeAttribute('onclick')
    cardStack[i].setAttribute('onclick', `shuffleBack(${cardStack.length - 1 - i})`)
    cardStack[i].style.pointerEvents = 'auto';
  }
}

// Make the front card placement cooler going up n cards
async function animateFront(){
  // Set the variables for css
  let frontCard = cardStack.pop() // Make sure to return this to the stack later in this method! Right where it was

  let heightDiff = -1 * Math.abs(cardStack[0].getBoundingClientRect().top - frontCard.getBoundingClientRect().top) + 5

  let singleHeightDiff = 0
  if(cardDistHolder == 0)
    singleHeightDiff = Math.abs(cardStack[cardStack.length - 2].getBoundingClientRect().top - cardStack[cardStack.length - 1].getBoundingClientRect().top) 
  else
    singleHeightDiff = cardDistHolder

  cardDistHolder = singleHeightDiff

  let horizontalMove = frontCard.getBoundingClientRect().width + 50

  let time = 750

  myReuseableStylesheet.innerHTML = `
    .card{ 
      --shuffle-height: ${heightDiff}px; 
      --stackMove-height: ${singleHeightDiff}px; 
      --horizontal-shuffle: ${horizontalMove}px; 
    }`
  myReuseableStylesheet.remove()
  document.head.appendChild(myReuseableStylesheet)

  frontCard.classList.toggle('shuffle')
  for(let i = 0; i < cardStack.length; i++){
    cardStack[i].classList.toggle('stackMove')
  }

  await new Promise(resolve => setTimeout(resolve, time));

  frontCard.classList.toggle('shuffle')
  for(let i = 0; i < cardStack.length; i++){
    cardStack[i].classList.toggle('stackMove')
  }

  cardStack.push(frontCard) // only doing this because we're supposed to handle it when this function returns
}

// Handles correcting display
async function updateProjectDisplay(){
  let frontCard = cardStack[cardStack.length - 1]

  let displays = document.getElementById("proj-display").getElementsByTagName('img')
  Array.from(displays).forEach(display => {
    display.style.display = 'none'
    if(frontCard.id + 'display' == display.id){
      display.style.display = 'block'
    }
  })
}

// We want cards to shuffle when clicked

// The bottom card is going to move to the left -> up -> right to the back of the stack.
// The other cards on the stack are going to move down
// If the bottom card is not the project needed, keep the animation going

