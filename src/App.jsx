import { useState } from 'react'
import { cardList } from './data.js'
import './App.css'

function App() {
  const [cardIndex, setIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);

  let card =  cardList[cardIndex];

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
    if (userGuess.trim().toLowerCase() === card.answer.toLowerCase()) {
      setFeedback('Correct!');
    } else {
      setFeedback('Incorrect!');
    }
  }

  const handlePrevArrow = () => {
    setIsFlipped(false);
    setIndex(cardIndex - 1 < 0 ? cardIndex : cardIndex - 1);
    }
  
  const handleNextArrow = () => {
    setIsFlipped(false);
    setIndex(cardIndex + 1 < cardList.length ? cardIndex + 1 : cardIndex);
  }

  // const handleShuffle = () => {
  //   setIndex(getRandomIndex());
  // }

  return (
    <>
      <div>
        <h1>Trivia Time!</h1>
        <h2>Are you a knowledge master?</h2>
        <p style={{fontWeight: 'bold'}}>Number of cards: {cardList.length}</p>
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
          <button onClick={handleGuessSubmit}>Submit</button>
        </div>
        <p>{feedback}</p>
        <div>
          <button onClick={handlePrevArrow}>←</button>
          <button onClick={handleNextArrow}>→</button>
          {/* <button onClick={handleShuffle}>Shuffle Cards</button> */}
        </div>  
      </div>
    </>
  )
}

export default App
