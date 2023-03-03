import React from 'react'
import { useState, useEffect, useContext } from 'react';
import finnHub from '../apis/finnHub';
import { WatchListContext } from '../context/WatchListContextProvider';

export default function SearchBar() {

  const [searchResult, setSearchResult] = useState([]);

  const [searchValue, setSearchValue] = useState('');

  const { addToWatchList } = useContext(WatchListContext);

   useEffect(() => {


     if (searchValue !== '') {
      //  console.log('here loading')
       const getSearchData = async () => {
         try {
          //  console.log('search value is ...'+searchValue)
           let dropdownresults = await finnHub.get('/search', { params: { q: searchValue } });
           dropdownresults = dropdownresults.data.result;
           //console.log(dropdownresults);
           dropdownresults = dropdownresults.filter((ele) => {
             let str = ele.symbol;
            // console.log(str);
             return !str.includes('.');
           })
           setSearchResult(dropdownresults);

         }
         catch (error) {
           console.log(error);
         }
       }

       getSearchData();
     }

     else setSearchResult([])

   }, [searchValue]);


  const updateSearchResult = (e) => {
    setSearchValue(e.target.value);
  }

  const clickHandler = async(e) => {


    const sym = e.target.getAttribute('symbol')
    console.log(sym)


    if(sym!=null) addToWatchList(sym);
    setSearchResult([])
    setSearchValue('')
  }

  return (
    <div >
    <div className="input-group w-50 mx-auto myInputBox">
      <input type="search" className="form-control rounded mySearchBar" placeholder="Search for a Company" aria-label="Search" aria-describedby="search-addon"  value={searchValue} onChange={ updateSearchResult} />
      </div>
      <div className='searchSuggestionsBox'>
             {searchResult.map((srchVal)=>{
                   return <div onClick={clickHandler} symbol={srchVal.symbol} key={srchVal.symbol} className='searchSuggestion'>{srchVal.description}
                   <div className='searchResultSymbol'>{srchVal.symbol}</div>
                   </div>
             })}
      </div>
      </div>
  )
}
