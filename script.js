console.log("SCRIPT LOADED");

const letterDiv = document.getElementById("letterText");
const question = document.getElementById("question");
const yesMsg = document.getElementById("yesMsg");

let text = "";
let i = 0;

// Load letter text from file
fetch("assets/letter.txt")
  .then(response => response.text())
  .then(data => {
    text = data;
  })
  .catch(err => console.error("Error loading letter:", err));

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("letter").style.display = "none";
  question.style.display = "none";
  yesMsg.style.display = "none";
});

function startLetter() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("letter").style.display = "block";
  letterDiv.innerHTML = "";
  i = 0;
  typeWriter();
}

function typeWriter() {
  if (i < text.length) {
    letterDiv.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 25);
  } else {
    question.style.display = "block";
    // Set initial NO button position to avoid overlap
    setTimeout(moveNo, 100);
  }
}

function moveNo() {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.querySelector(".yesBtn");
  const question = document.getElementById("question");
  
  if (!question) return;
  
  const qRect = question.getBoundingClientRect();
  const yesBtnRect = yesBtn.getBoundingClientRect();
  const btnWidth = 60;
  const btnHeight = 40;
  const safeDistance = 120;
  
  let left, top, tooClose;
  
  do {
    tooClose = false;
    left = Math.random() * (qRect.width - btnWidth - 20);
    top = Math.random() * (qRect.height - btnHeight - 20);
    
    const noBtnRect = {
      left: qRect.left + left,
      top: qRect.top + top,
      right: qRect.left + left + btnWidth,
      bottom: qRect.top + top + btnHeight
    };
    
    // Check if too close to YES button
    if (noBtnRect.right + safeDistance > yesBtnRect.left &&
        noBtnRect.left < yesBtnRect.right + safeDistance &&
        noBtnRect.bottom + safeDistance > yesBtnRect.top &&
        noBtnRect.top < yesBtnRect.bottom + safeDistance) {
      tooClose = true;
    }
  } while (tooClose);
  
  noBtn.style.left = left + "px";
  noBtn.style.top = top + "px";
}

// Track mouse over NO button and move it responsively
document.addEventListener("DOMContentLoaded", () => {
  const noBtn = document.getElementById("noBtn");
  noBtn.addEventListener("mouseenter", moveNo);
  noBtn.addEventListener("mousemove", moveNo);
});

function yes() {
  question.style.display = "none";
  yesMsg.style.display = "block";

  // wait 2 seconds then go to birthday page
  setTimeout(() => {
    window.location.href = "birthday.html";
  }, 2000);
}
