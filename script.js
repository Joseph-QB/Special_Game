const boxes1 = document.querySelectorAll('#counter1 .box');
const boxes2 = document.querySelectorAll('#counter2 .box');
const allBoxes = document.querySelectorAll('.box');
const messageWrapper = document.querySelector('.messageWrapper');
const buttonWrapper = document.querySelector('.buttonWrapper');

const numberPatterns = {
  1: [10, 14, 18, 22, 26],
  2: [9, 10, 11, 15, 17, 18, 19, 21, 25, 26, 27],
  3: [9, 10, 11, 15, 17, 18, 19, 23, 25, 26, 27],
  4: [9, 11, 13, 15, 17, 18, 19, 23, 27],
  5: [9, 10, 11, 13, 17, 18, 19, 23, 25, 26, 27],
  6: [9, 10, 11, 13, 17, 18, 19, 21, 23, 25, 26, 27],
  7: [9, 10, 11, 15, 19, 23, 27],
  8: [9, 10, 11, 13, 15, 17, 18, 19, 21, 23, 25, 26, 27],
  9: [9, 10, 11, 13, 15, 17, 18, 19, 23, 25, 26, 27],
  0: [9, 10, 11, 13, 15, 17, 19, 21, 23, 25, 26, 27],
};

let counterIndex1 = 0;
let counterIndex2 = 0;
let counter2CompletedCycle = false;
let intervalId = null;
let started = false;

// Get all ❤️ boxes
const heartBoxes = Array.from(document.querySelectorAll('.box span'))
  .filter(span => span.textContent === '❤️')
  .map(span => span.parentElement);

function fillBoxes(counterId, boxes, counterIndex) {
  const number = counterIndex;
  const filledBoxes = numberPatterns[number] || [];

  boxes.forEach((box, index) => {
    if (filledBoxes.includes(index)) {
      box.classList.add('filled');
    } else {
      box.classList.remove('filled');
    }
  });
}

function rotateCounters() {
  fillBoxes('#counter1', boxes1, counterIndex1);
  fillBoxes('#counter2', boxes2, counterIndex2);

  if (counterIndex2 === 9) {
    counter2CompletedCycle = true;
  }

  if (counter2CompletedCycle) {
    counterIndex1 = (counterIndex1 + 1) % 10;
    counter2CompletedCycle = false;
  }

  counterIndex2 = (counterIndex2 + 1) % 10;
}

function startCounterOnClick() {
  if (!started) {
    intervalId = setInterval(rotateCounters, 1000);
    started = true;
  }
}

function checkAllHeartsSelected() {
  return heartBoxes.every(box => box.classList.contains('show-span'));
}

function stopCounterAndShowMessage() {
  clearInterval(intervalId);
  boxes1.forEach(box => box.classList.remove('filled'));
  boxes2.forEach(box => box.classList.remove('filled'));

  messageWrapper.style.display = 'flex';
  buttonWrapper.style.display = 'block';
}

// === Show span on click & toggle ===
document.querySelectorAll('.box span').forEach(span => {
  const box = span.parentElement;

  box.addEventListener('click', () => {
    span.style.display = span.style.display === 'block' ? 'none' : 'block';
    box.classList.toggle('show-span');

    startCounterOnClick();

    if (checkAllHeartsSelected()) {
      stopCounterAndShowMessage();
    }
  });
});

// === YES button click ===
document.querySelector('.buttonWrapper button:nth-child(1)').addEventListener('click', () => {
  applyRedStyles();

  // Show only ❤️ spans
  document.querySelectorAll('.box').forEach(box => {
    const span = box.querySelector('span');
    if (span) {
      span.style.display = 'none';
      if (span.textContent === '❤️') {
        span.style.display = 'block';
      }
    }
  });

  const messageH2 = document.querySelector('.messageWrapper h2');
  if (messageH2) {
    messageH2.innerHTML = "Thank you for choosing me Thakkuduu. I love you so much ❤️❤️❤️❤️"; // Customize this message
  }
    // Hide the message and buttons when "No 💔" is clicked
    // messageWrapper.style.display = 'none';
    buttonWrapper.style.display = 'none';
});

// === NO button click ===
document.querySelector('.buttonWrapper button:nth-child(2)').addEventListener('click', () => {
  // Show only 😭 spans
  document.querySelectorAll('.box').forEach(box => {
    const span = box.querySelector('span');
    if (span) {
      span.style.display = 'none';
      if (span.textContent === '😭') {
        span.style.display = 'block';
      }
    }
  });
  const messageH2 = document.querySelector('.messageWrapper h2');
  if (messageH2) {
    messageH2.innerHTML = "I am sorry if i don't meet your expectations. I will try my best to improve myself. Please don't leave me Kuttu 😭"; 
  }
 
  buttonWrapper.style.display = 'none';
});

// Apply red styles
function applyRedStyles() {
  const redIndices = [
    '#counter2 .box:nth-child(29)', '#counter2 .box:nth-child(26)', '#counter2 .box:nth-child(23)',
    '#counter2 .box:nth-child(12)', '#counter2 .box:nth-child(13)', '#counter2 .box:nth-child(7)',
    '#counter2 .box:nth-child(10)', '#counter2 .box:nth-child(20)',
    '#counter1 .box:nth-child(23)', '#counter1 .box:nth-child(28)', '#counter1 .box:nth-child(18)',
    '#counter1 .box:nth-child(13)', '#counter1 .box:nth-child(10)', '#counter1 .box:nth-child(7)',
    '#counter1 .box:nth-child(12)', '.endColumn .box:nth-child(4)'
  ];

  redIndices.forEach(selector => {
    const el = document.querySelector(selector);
    if (el) {
      el.classList.add('red');
    }
  });
}

// === Hide all emojis on load (just in case) ===
document.querySelectorAll('.box span').forEach(span => {
  span.style.display = 'none';
});
