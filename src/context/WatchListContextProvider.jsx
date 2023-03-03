import React from 'react'
import { createContext, useState } from 'react'


export const WatchListContext = createContext();

const WatchListContextProvider = (props) => {

    const [watchListItems, setWatchListItems] = useState(['AMZN', 'TSLA', 'MSFT', 'GOOGL', 'NUZE']);


    const addToWatchList = (stock) => {
        let is_present = false;
        watchListItems.forEach(listItem => { if (listItem === stock) is_present = true })
        if(is_present) return
        setWatchListItems([...watchListItems, stock]);
    }

    const deleteFromWatchList=(sym)=> {
        const newWatchListItems = watchListItems.filter((stock) => {
            return stock != sym;
        })
        setWatchListItems(newWatchListItems);
    }


    return (
        <WatchListContext.Provider value={{ watchListItems,addToWatchList,deleteFromWatchList}
}>
         {props.children}
        </WatchListContext.Provider>
    )
}



export default WatchListContextProvider;