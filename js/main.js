// get main variable
let controlBtns = document.querySelector(".control-btns"),
      startGameBtn = document.querySelector(".control-btns span"),
      personName = document.querySelector(".name span"),
      newGameBtn = document.querySelector(".info-container .reset span"),
      gameBlock = document.querySelector(".game-block"),
      tries = document.querySelector(".tries span"),
      duration = 1000,
      blocksContainer = document.querySelector(".memory-game-blocks"),

      blocks = Array.from(blocksContainer.children),
      orderRange = [...Array(blocks.length).keys()];

      shuffle(orderRange);

startGameBtn.addEventListener("click", function() {
  splashScreen();
  controlBtns.remove();

    
});

newGameBtn.addEventListener("click", function() {
  
  shuffle(orderRange);

  blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    block.classList.remove("has-match");
    block.classList.remove("is-flipped")
  });

  splashScreen();
  
  tries.textContent = 0;
  tries.style.color = 'black'
});

function splashScreen() {
  let yourName = prompt("what's your name?", 'ahmed');

  (yourName == null || yourName == "") ? personName.textContent = 'Unknown' : personName.textContent = yourName;
  // document.querySelector(".back-music").play();
}


blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  block.addEventListener("click", function() {
    flipBlock(block)
  });
  
});

function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");

  let allFilppedCards = blocks.filter(filppedBlock => filppedBlock.classList.contains('is-flipped'));
  if (allFilppedCards.length == 2) {

    stopClicking();
    
    checkMatchedBlocks(allFilppedCards[0], allFilppedCards[1]);
    
  }
}

function stopClicking() {
  blocksContainer.classList.add("no-clicking");

  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

function checkMatchedBlocks(firstBlock, secondBlock) {
  if (firstBlock.dataset.tech == secondBlock.dataset.tech) {
    firstBlock.classList.remove('is-flipped');
    secondBlock.classList.remove('is-flipped');

    firstBlock.classList.add('has-match');
    secondBlock.classList.add('has-match');

    // document.querySelector(".succses").play();
  } else {
    tries.textContent = parseInt(tries.textContent) + 1;
    tries.style.color = 'red'
    
    setTimeout(() => {
      firstBlock.classList.remove('is-flipped');
      secondBlock.classList.remove('is-flipped');
    }, duration);

    // document.querySelector(".fail").play();
  }
}

function shuffle(arr) {
  let current = arr.length,
      temp,
      random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;

    temp = arr[current];
    arr[current] = arr[random];
    arr[random] = temp;
  }
  return arr

// ---------------OR------------------
  // do{
  //   random = Math.floor(Math.random() * current);
  //   current--;

  //   temp = arr[current];
  //   arr[current] = arr[random];
  //   arr[random] = temp;
  // } while(current > 0)
}

