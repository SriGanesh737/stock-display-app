import React from 'react'
import { useEffect, useState,useContext } from 'react';
import finnHub from '../apis/finnHub';
import "../styles/HomePage.css";
import WatchListRow from './WatchListRow';
import { WatchListContext } from '../context/WatchListContextProvider';



export default function Watchlist() {

    const { watchListItems } = useContext(WatchListContext);
    const [watchListStockData, setWatchListStockData] = useState([]);

    useEffect(() => {



        const getData = async () => {
            try {
                const stocksData = await Promise.all(watchListItems.map((listItem) => {
                    console.log(listItem)
                    return finnHub.get('/quote', {
                        params: { symbol: listItem }
                    })
                    // return data;
                }))
                console.log(stocksData);

                const watchListInfo = stocksData.map((stock) => {
                    return { data: stock.data, symbol: stock.config.params.symbol };
                })
               console.log(watchListInfo);

                setWatchListStockData(watchListInfo);

            } catch (error) {
                console.log(error);
            }
        }
        getData();

    }, [watchListItems]);




  return (
      <div className='w-75 mx-auto'>
          <div className='yourWatchlist'>Your Watchlist</div>
  <table className="table table-hover table-responsive">
  <thead>
    <tr className='text-dark'>
      <th scope="col">Symbol</th>
      <th scope="col">CurrentPrice</th>
      <th scope="col">Change</th>
      <th scope="col">Percent Change</th>
      <th scope="col">High Price Of the Day</th>
      <th scope="col">Low Price Of the Day</th>
      <th scope="col">Open price of the Day</th>
                      <th scope="col">Previous close Price</th>
      <th scope="col"></th>
    </tr>
  </thead>
              <tbody>

                  {
                      watchListStockData.map((stock) => {
                          return <WatchListRow key={stock.symbol} rowdata={stock}/>
                      })
                  }

              </tbody>
          </table>

    </div>
  )
}
