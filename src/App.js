import './App.css';
import Main from './Main';
import React from 'react';
import Die from './Die';
import { nanoid } from "nanoid";
import Confetti from 'react-confetti';

function App() {

  const [dice, setDice] = React.useState(newDice);
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allSameValue && allHeld) {
      setTenzies(true);

    }
  }, [dice])

  function newDice() {
    const newDiceArray = [];
    for (let i = 0; i < 10; i++) {
      newDiceArray.push(
        generateNewDie()
      );
    }
    return newDiceArray;
  }
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }
  function holdDie(id) {
    setDice(oldDice => oldDice.map((die) => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }))
  }

  const dieElements = dice.map(die => <Die value={die.value} isHeld={die.isHeld} id={die.id} holdDie={() => holdDie(die.id)} />)

  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map((die) => {
        return die.isHeld ?
          die : generateNewDie()
      }))
    }
    else {
      setTenzies(false);
      setDice(newDice);

    }
  }

  return (
    <main>
      <Main />
      <div className='dice-container' >
        {dieElements}
      </div>
      <button className="roll" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      {tenzies && <Confetti />}
    </main>

  );
}

export default App;
