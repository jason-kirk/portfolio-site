// Adding listeners here
document.getElementById('exit-full').addEventListener('click', exitFullscreen)

document.getElementById('right-arrow').addEventListener('click', nextImgFull)
document.getElementById('left-arrow').addEventListener('click', prevImgFull)

// On click, toggle the carousel to span most of the screen
let displays = Array.from(document.getElementById('proj-display').children)
displays.forEach(display => {
  display.addEventListener('click', (event) => {
    // Clone the element
    let fullscreenElem = event.target.cloneNode()
    let siblings = Array.from(event.target.parentNode.children)

    // Apply the class to the new element + remove ID
    fullscreenElem.classList.toggle('fullscreen')

    // Toggle the backdrop
    document.getElementById('fullscreenBack').style.display = 'block'
    document.getElementById('exit-full').style.display = 'block'
    document.getElementById('left-arrow').style.display = 'block'
    document.getElementById('right-arrow').style.display = 'block'

    // Apply the element to the document
    siblings.forEach(sibling => {
      if(sibling === event.target){
        document.getElementById('fullscreen-elems').append(fullscreenElem)
        return
      }

      document.getElementById('fullscreen-elems').append(sibling.cloneNode())
    })
  })
})



function exitFullscreen(){
  // Hide the backdrop / exit button / arrows
  document.getElementById('fullscreenBack').style.display = 'none'
  document.getElementById('exit-full').style.display = 'none'
  document.getElementById('left-arrow').style.display = 'none'
  document.getElementById('right-arrow').style.display = 'none'

  // Get the fullscreen elem and hide it
  let fullscreenElems = Array.from(document.getElementById('fullscreen-elems').children)
  // fullscreenElem.style.display = 'none'
  fullscreenElems.forEach(elem => {
    elem.remove()
  })
}

// Gets the next image in full-screen display
function nextImgFull(){
  let fullscreenElems = Array.from(document.getElementById('fullscreen-elems').children)

  let curDisplay = document.getElementsByClassName('fullscreen')[0]

  let next = fullscreenElems.indexOf(curDisplay) + 1

  let newIndex = next >= fullscreenElems.length ? 0 : next

  // Hide current one and show the other
  curDisplay.classList.toggle('fullscreen')
  curDisplay.style.display = 'none'
  fullscreenElems[newIndex].style.display = 'block'
  fullscreenElems[newIndex].classList.toggle('fullscreen')
}

// Gets the previous image in the full-screen display
function prevImgFull(){
  let fullscreenElems = Array.from(document.getElementById('fullscreen-elems').children)

  let curDisplay = document.getElementsByClassName('fullscreen')[0]

  let prev = fullscreenElems.indexOf(curDisplay) - 1

  let newIndex = prev < 0 ? fullscreenElems.length - 1 : prev

  // Hide current one and show the other
  curDisplay.classList.toggle('fullscreen')
  curDisplay.style.display = 'none'
  fullscreenElems[newIndex].style.display = 'block'
  fullscreenElems[newIndex].classList.toggle('fullscreen')
}
