const wordsToTranslate = [
{ german: 'Besucher/-in', english: 'visitor' },
{ german: 'Jugendherberge', english: 'youth hostel' },
{ german: 'mieten', english: 'rent' },
{ german: 'Seilbahn', english: 'cable car' },
{ german: 'treffen', english: 'meet past: met' },
{ german: 'einige, etwas', english: 'some/any' },
{ german: 'etwas', english: 'something/anything' },
{ german: 'jemand, irgendjemand', english: 'somebody/anybody' },
{ german: 'irgendwo', english: 'somewhere/anywhere' },
{ german: 'Führer/-in', english: 'guide' },
{ german: 'Frau', english: 'woman pl. women' },
{ german: 'Mann', english: 'man pl. men' },
{ german: 'Schlagzeile', english: 'headline' },
{ german: 'Tragödie', english: 'tragedy pl. tragedies' },
{ german: 'Bergsteiger/-in', english: 'mountaineer' },
{ german: 'Ferienziel, Reiseziel', english: 'holiday destination' },
{ german: 'Höhepunkt, Highlight', english: 'highlight' },
{ german: 'allgemeine Information', english: 'general information' },
{ german: 'schön', english: 'beautiful' },
{ german: 'Sicht, Aussicht', english: 'view' },
{ german: 'sollte nicht verpassen', english: "shouldn't miss" }

  // Add more words here
];

// Shuffle words array to randomize the order
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleArray(wordsToTranslate);

let currentWordIndex = 0;
let correctCount = 0;
let attemptCount = 0;
let lastIncorrectWord = null;

const progressBar = document.getElementById('progress-bar');
const progressLabel = document.getElementById('progress-label');
const wordInput = document.getElementById('word-input');
const feedbackDiv = document.getElementById('feedback');
const summaryDiv = document.createElement('div');
const okButton = document.getElementById('ok-button');

function updateProgressBar() {
  const progress = (currentWordIndex / wordsToTranslate.length) * 100;
  progressBar.value = progress;
  progressLabel.textContent = `To translate: ${wordsToTranslate.length - currentWordIndex}`;
}

function displayNextWord() {
  if (currentWordIndex < wordsToTranslate.length) {
    wordInput.value = '';
    const nextWord = wordsToTranslate[currentWordIndex].german;
    wordInput.placeholder = `${nextWord}`;
  } else {
    displaySummary();
  }
}

function displaySummary() {
  summaryDiv.innerHTML = '<h2>Words to learn:</h2>';
  const wordCounts = {};

  wordsToTranslate.forEach(word => {
    if (wordCounts[word.german]) {
      wordCounts[word.german]++;
    } else {
      wordCounts[word.german] = 1;
    }
  });

  const sortedWords = Object.keys(wordCounts).sort((a, b) => wordCounts[b] - wordCounts[a]);

  sortedWords.forEach(word => {
    if (wordCounts[word] > 1) {
      const attempts = wordCounts[word];
      summaryDiv.innerHTML += `<p>${word}: ${attempts} attempts</p>`;
    }
  });

  feedbackDiv.innerHTML = '';
  feedbackDiv.appendChild(summaryDiv);
}

function handleOkButtonClick() {
  checkTranslationLogic()
}

function checkTranslationLogic(){
  const userTranslation = wordInput.value.trim();
  const currentWord = wordsToTranslate[currentWordIndex];

  if (userTranslation === currentWord.english) {
    feedbackDiv.textContent = `Very good! `;
    correctCount++;
    currentWordIndex++;
  } else {
    feedbackDiv.textContent = `Incorrect. The correct translation of "${currentWord.german}" is "${currentWord.english}", you provided "${userTranslation}".`;  
    wordsToTranslate.push(wordsToTranslate[currentWordIndex]);
  }
  updateProgressBar();
  displayNextWord();

}

function checkTranslation(event) {
  event.preventDefault();
  checkTranslationLogic()
}

okButton.addEventListener('click', handleOkButtonClick);
document.getElementById('translation-form').addEventListener('submit', checkTranslation);

updateProgressBar();
displayNextWord();
