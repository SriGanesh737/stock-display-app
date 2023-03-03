import React from 'react'
import finnHub from '../apis/finnHub'
import { useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import Watchlist from '../components/Watchlist';
import '../styles/HomePage.css'
import Title from '../components/Title';


export default function HomePage() {

    // const token = "cfijakhr01qjvrn4tgbgcfijakhr01qjvrn4tgc0";


    // const fetchData = () => {
    //     const data = finnHub.get('/quote?symbol=AAPL').then((response) => {
    //         console.log(response);
    //     });
    // }


    return (

      <div className='homePage'>
          {/* <div className='imageContainer mx-auto'>

          </div> */}

           <Title></Title>
          <SearchBar />
          <Watchlist />
      </div>
  )
}
