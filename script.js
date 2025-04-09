const WHITE_KEYS = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "z", "x", "c", "v", "b"];
const BLACK_KEYS = ["2", "3", "5", "6", "7", "9", "0", "s", "d", "f"];
const keys = document.querySelectorAll(".key");
const whiteKeys = document.querySelectorAll(".key.white");
const blackKeys = document.querySelectorAll(".key.black");
let activeNotes = [];

function updateBackground() {
  const colors = activeNotes.map((note) => `var(--${note})`);
  if (colors.length === 0) {
    document.body.style.background = "";
  } else if (colors.length === 1) {
    document.body.style.background = colors[0];
  } else {
    const stops = colors
      .map((color, index) => `${color} ${(index / (colors.length - 1)) * 100}%`)
      .join(", ");
    document.body.style.background = `linear-gradient(45deg, ${stops})`;
  }
}

function playNote(key) {
  const noteAudio = document.getElementById(key.dataset.note);
  noteAudio.currentTime = 0;
  noteAudio.play();
  key.classList.add("active");

  const baseNote = key.dataset.note.replace(/\d+$/, "");
  if (!activeNotes.includes(baseNote)) {
    activeNotes.push(baseNote);
    updateBackground();
  }
}

function stopNote(key) {
  key.classList.remove("active");
  const baseNote = key.dataset.note.replace(/\d+$/, "");
  const index = activeNotes.indexOf(baseNote);
  if (index > -1) {
    activeNotes.splice(index, 1);
    updateBackground();
  }
}

// Event Listeners
document.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  const key = e.key;
  const whiteKeyIndex = WHITE_KEYS.indexOf(key);
  const blackKeyIndex = BLACK_KEYS.indexOf(key);

  if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex]);
  if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex]);
});

document.addEventListener("keyup", (e) => {
  const key = e.key;
  const whiteKeyIndex = WHITE_KEYS.indexOf(key);
  const blackKeyIndex = BLACK_KEYS.indexOf(key);

  if (whiteKeyIndex > -1) stopNote(whiteKeys[whiteKeyIndex]);
  if (blackKeyIndex > -1) stopNote(blackKeys[blackKeyIndex]);
});

keys.forEach((key) => {
  key.addEventListener("touchstart", () => {
    playNote(key);
  });

  key.addEventListener("touchend", () => {
    stopNote(key);
  });
});
