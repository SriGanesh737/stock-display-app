import React from 'react'
import '../styles/HomePage.css'

export default function TitleLetter(props) {
    const sym = props.children;
  return (
      <div className={'title-letter-div text-pop-up-top-'+sym}>
             {props.children}
      </div>
  )
}
