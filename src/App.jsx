import { useState } from 'react'
import { cardList as originalCards } from './data.js'
import './App.css'

// Function to calculate Levenshtein distance
const levenshteinDistance = (a, b) => {
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const matrix = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,    // Deletion
        matrix[i][j - 1] + 1,    // Insertion
        matrix[i - 1][j - 1] + cost // Substitution
      );
    }
  }

  return matrix[a.length][b.length];
};

// Check if two answers are similar
const isSimilarAnswer = (userInput, correctAnswer) => {
  const threshold = 2; // Allow up to 2 letter differences
  return levenshteinDistance(userInput.toLowerCase().trim(), correctAnswer.toLowerCase().trim()) <= threshold;
};

function App() {
  const [cards, setCards] = useState([...originalCards])
  const [cardIndex, setIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);

  let card =  cards[cardIndex];

  // const getRandomIndex = () => {
  //   let randomIndex;
  //   do {
  //     randomIndex = Math.floor(Math.random() * cardList.length);
  //   } while (randomIndex === cardIndex); // Ensure different card
  //   return randomIndex;
  // };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  }

  const handleGuessSubmit = () => {
    if (isSimilarAnswer(userGuess, card.answer)) {
      setFeedback('✅ Correct!');
    } else {
      setFeedback('❌ Incorrect. Try again!');
    }
  };

  const handlePrevArrow = () => {
    if (cardIndex > 0) {
      setIsFlipped(false);
      setIndex(cardIndex - 1);
      setUserGuess('');
      setFeedback('');
    }
  }
  
  const handleNextArrow = () => {
    if (cardIndex < cards.length - 1) {
      setIsFlipped(false);
      setIndex(cardIndex + 1 < cards.length ? cardIndex + 1 : cardIndex);
      setUserGuess('');
      setFeedback('');
    }
  }

  const handleShuffle = () => {
    const shuffled = [...originalCards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setIndex(0);
    setIsFlipped(false);
    setUserGuess('');
    setFeedback('');
  }

  return (
    <>
      <div>
        <h1>Trivia Time!</h1>
        <h2>Are you a knowledge master?</h2>
        <p>Number of cards: {cards.length}</p>
        <p>Current streak: {2+2}, Longest streak: {3}</p>
        <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick}>
          <div className={`card-inner ${card.category.toLowerCase()}`}>
            <div className="front">
            {card.image ? <img src={`./assets/${card.image}`} alt="Flashcard" className="card-image" /> : null}
            {card.question && <p>{card.question}</p>}
            </div>
            <div className="back">
              <p>{card.answer}</p>
            </div>
          </div>
        </div>
        <div className="guessing">
          <input
            type="text"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            placeholder="Enter your guess"
          />
          <button onClick={handleGuessSubmit} disabled={isFlipped}>Submit</button>
        </div>
        <p>{feedback}</p>
        <div className="controls">
          <button onClick={handlePrevArrow} disabled={cardIndex === 0}>←</button>
          <button onClick={handleNextArrow} disabled={cardIndex === cards.length - 1}>→</button>
          <button onClick={handleShuffle}>🔀 Shuffle</button>
        </div>  
      </div>
    </>
  )
}

export default App
