import "./Home.css"
import { useState, useEffect } from "react"
import {nanoid} from "nanoid"
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io"
import { client} from '../../client';

const Home = (props) =>{

      const [player, setPlayer] = useState({id:nanoid(), name:"", score:""});
      const [isFormSubmitted, setIsFormSubmitted] = useState(false);
      const [dropDown, setDropDown] = useState(false);

      const [rankings, setRankings] = useState([])
      const [errorInput, setErrorInput] = useState(false)

      const playerContentHeight = dropDown ? {height:"20rem"} : {height:"10rem"};

      //import data to Sanity
      const {name, score} =  player;

      const handleChangeInput = (e) => {
          const {name, value} = e.target;
          setPlayer({...player, [name]:value, score:String(props.currentScore)})

    }


    useEffect(() => {
      const query = "*[_type == 'rankings']" 
      client.fetch(query)
        .then((data) => setRankings(data))   
    }, [])
    


    const handleSubmit =()=>{

      const rankings = {
        _type:'rankings',
        name: name,
        score: score
      }
      if(rankings.name !== '' && score !==''){
        client.create(rankings)
        .then(() => {
          setIsFormSubmitted(true)
        })

      }else{
          setErrorInput(true);
      }
      
    }


    return(
        <div className='Home__page'>
          <div className="player__container" style={playerContentHeight}>
            <span>Rankings</span>
            <ul className="player__ranking">
              <li className="player__ranking_profile">
                <span className="player__ranking_profile-label">Name:</span>
                <span className="player__ranking_profile-label">Score:</span>
              </li>

              {rankings.map(data => (
                              <li className="player__ranking_profile">
                                  <span className="player__ranking_profile-name">{data.name}</span>
                                  <span className="player__ranking_profile-score">{data.score}</span>
                              </li>
              ))}
            </ul>
            <div className="drop__button">
              <button className="drop__button"  onClick={()=>setDropDown(dropDown => !dropDown)}>
                  {dropDown ? <IoIosArrowUp/> : <IoIosArrowDown/>}
              </button>
            </div>
          </div>
          {
          !isFormSubmitted ?
          <>
          {errorInput ? 
            <div className="player__error">
              Please put your name and play the game
            </div> : ""}
          <form className="player__name">
            <input type='text' 
                  placeholder="name"
                  value={name}
                  name="name"
                  onChange={handleChangeInput}
                  />
          </form>
          <div className="game__mode_current-score">
            <span>Score: {props.currentScore}</span> 
            {props.currentScore !== 0 ? <button type="button" onClick={handleSubmit}>Submit Score</button> : ""}
          </div>
          <button type='button' className='button__start' onClick={props.toggleButton}>PLAY</button>
          <h3>Please play the game before you input your name</h3>
          </> : <h1>Thank you for playing your score has been recorded</h1>}
          
       </div>
    )
}


export default Home