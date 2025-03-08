import { useState } from 'react'
import { cardList } from './data.js'
import './App.css'

function App() {
  const [cardIndex, setIndex] = useState(0);
  let card =  cardList[cardIndex];

  const getRandomIndex = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * cardList.length);
    } while (randomIndex === cardIndex); // Ensure different card
    return randomIndex;
  };

  const handlePrevArrow = () => {
    setIndex(getRandomIndex());
  
    }
  
  const handleNextArrow = () => {
    // Set to front without animation
    setIsFlipped(false);
    
    // Change card after a slight delay to avoid animation effect on transition
    setTimeout(() => {
      setIndex(getRandomIndex());
    }, 10); // 10ms delay for smooth transition without seeing the back
  }

  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  }

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
        <button onClick={handlePrevArrow}>←</button>
        <button onClick={handleNextArrow}>→</button>
      </div>

    </>
  )
}

export default App
