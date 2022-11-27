import { useState } from 'react'
import {motion} from 'framer-motion'

import './Squares.css'


const Squares = (props) => {

  const [shortReveal, setShortReveal] = useState(!props.isHeld);
  setTimeout(() => {setShortReveal(false)},2000)

  return (
    <motion.button 
    whileInView={{scale:[0, 1], opacity:[0, 1]}}
    transition={{duration: 0.5}} 
    className="square" 
    onClick={props.revealValue}>
      <motion.span
      whileInView={{scale:[0,1]}}
      transition={{duration:1}}
      >
        {shortReveal ? props.value : ""}
        {!shortReveal&&props.isHeld ? props.value : ""}
      </motion.span>
    </motion.button>
    )
}

export default Squares