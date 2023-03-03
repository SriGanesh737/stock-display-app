import React from 'react'
import TitleLetter from './TitleLetter'
import '../styles/HomePage.css'

export default function Title() {

  const title = ['S', 'T', 'O', 'C', 'K', ' ', 'W', 'I', 'Z', 'A', 'R', 'D'];
  let letterInd = 0;
  return (
      <div className='title-container'>

      {title.map((ele) => {
        letterInd++;
              return <TitleLetter key={letterInd} >{ele}</TitleLetter>
            })}
    </div>
  )
}
