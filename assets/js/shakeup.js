// Create a new style sheet for the keyframes we're making
var myReuseableStylesheet = document.createElement('style');
document.head.appendChild(myReuseableStylesheet)

// Creates a center based off the location of the image.
function generateCenter(x, y){
  return [x + Math.round(Math.random() * -1) * Math.round(Math.random() * 20) + 20, y - Math.round(Math.random() * 30) - 50]
}

// Find the Euclidean distance between two points
function eucDist(pair1, pair2){
  let distance = Math.sqrt(Math.pow(pair1[0] - pair2[0], 2) + Math.pow(pair1[1] - pair2[1], 2))
  return distance
}

// Provides the location of an element given one
function getOffset(el) {
  const rect = el.getBoundingClientRect()
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  }
}

function addKeyFrames(name, frames) {
  myReuseableStylesheet.innerHTML += "@keyframes " + name + "{" + frames + "}\n"
  
  myReuseableStylesheet.remove()
  document.head.prepend(myReuseableStylesheet)
}

function blastNEW(id){
  const ANIMATION_TIME = 1
  const BASE_DISTANCE_X = 200

  let xDistance = Math.round(Math.random() * 1) == 1 ? BASE_DISTANCE_X + Math.round(Math.random() * 200) : -1*BASE_DISTANCE_X + -1*Math.round(Math.random() * 200)

  document.getElementById(id).classList.toggle('shaky')
  document.getElementById(id).classList.toggle('launch')

  myReuseableStylesheet.innerHTML = `.launch{ --animation-time: ${ANIMATION_TIME}s; --launch-distance-x: ${xDistance}px;}`

  // We're trying to match the animation time in custom.css
  setTimeout(() => {
    document.getElementById(id).classList.toggle('shaky')
    document.getElementById(id).classList.toggle('launch')
  }, 1000)
}