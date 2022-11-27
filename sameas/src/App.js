import {Squares} from './components'
import { Home, Footer} from './containers';
import { useState, useEffect} from 'react';
import './App.css'
import {nanoid} from "nanoid"

const App = () => {
  
  const [noOfBox, setNoOfBox] = useState(2);
  const [timer, setTimer] = useState(60);
  const [score, setScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  const [buttonlist, setButtonlist] = useState([]);
  const [numberSelected, setNumberSelected] = useState([]);
  

  const [start, setStart] = useState(true);

 
  //Use put the box in our DOM
  const box = buttonlist.map(list => {
    return(<Squares 
      key= {list.id}
      value = {list.value} 
      isHeld = {list.isHeld}
      revealValue= {() => revealValue(list.id, list.value)}
      />)
      
  })

  useEffect(() => {
    const checkSquares = buttonlist.every(value => value.isHeld === true)

      if(checkSquares && buttonlist.length !== 0 && timer > 0){
        setTimer(60);
        setNoOfBox(noOfBox => noOfBox+2)
        StartGame(noOfBox);
        setNumberSelected([]);
        setScore(score => score + timer)
      }
      
      if(timer === 0){
        setTimer(60);
        setNoOfBox(2);
        setStart(true);
        setCurrentScore(score);
        setScore(0);
      }

  }, [buttonlist, timer, noOfBox, score]);

  useEffect(() => {
    if(!start){
      const interval = setInterval(() => {
        setTimer(prev => prev-1)
       
      }, 1000);
    
      return () => clearInterval(interval);
    }

  }, [start])
  

  //Start Game function to generathe an array of random numbers
  const StartGame = (numberOfBox) =>{
    
    setStart(false);

      let ListOfNumbers = [];
      let count = 1;

      while(count <= numberOfBox){

        let number = Math.ceil(Math.random()*99)

        if(ListOfNumbers.filter(e => e.value === number).length <= 0){
            ListOfNumbers.push({
                      value: number,
                      isHeld: false,
                      id:nanoid()
                    });
            ListOfNumbers.push({
                    value: number,
                    isHeld: false,
                    id:nanoid()
                  });
            
            count++
        }
                
      }

      const shuffledArray = ListOfNumbers.sort((a, b) => 0.5 - Math.random());
      setButtonlist(shuffledArray);

     
  }

  //------Reveal the button value if click--------
  const revealValue = (id, value) =>{

    //-------Use to Add value in the array------------------------------------
    const addedNumber =(id, value) =>{
      setButtonlist(oldValue => oldValue.map(value => {
        return value.id === id ? {...value, isHeld:!value.isHeld} : value
      }))

      if(numberSelected.map(arr => arr.id).includes(id)){
        setNumberSelected(oldValue => oldValue.slice(0, numberSelected.length-1));
      }else{
        setNumberSelected(oldValue => [...oldValue, {value: value, id:id}]);
      }
      
    }

    let con1 = numberSelected.map(arr => arr.value).length-1;
    let con2 = numberSelected.map(arr => arr.value).length-2;
    let arr = numberSelected.map(arr => arr.value)

    if(numberSelected.length === 0){
    
      addedNumber(id, value);

    }else if(numberSelected.map(arr => arr.value).includes(value)){

      addedNumber(id, value);  
      

    }else if( arr[con1] === arr[con2]){
      addedNumber(id, value); 
    }
    else{
      
      setButtonlist(oldValue => oldValue.map(value => {
        return numberSelected.map(arr => arr.value).filter(val => val === value.value) > 2 ? {...value, isHeld:false} : value
      
      }))

      setNumberSelected(oldValue => oldValue.slice(0, numberSelected.length-1));
    }
  }

  
  return (
    <div className="container">
        
        {!start &&
        <div className='game__mode'>
          <div className='game__mode_widget'>
            <div className='game__mode_widget-score'>{score}</div>
            <div className='game__mode_widget-timer'>{timer}</div>
          </div>
          <div className='square__button'>
            {box}
          </div>
        </div>
        }

        {start && <Home
                  key={() => nanoid()}
                  score={score}
                  currentScore={currentScore}
                  toggleButton={() => {StartGame(noOfBox)}}/>}
      <Footer/>
    </div>
    )
}

export default App