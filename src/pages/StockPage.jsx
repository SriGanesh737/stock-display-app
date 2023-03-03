import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import finnHub from '../apis/finnHub';
import StockChart from '../components/StockChart';
import { StockDescription } from '../components/StockDescription';





export default function StockDetailPage() {
  const [stockData, setStockData] = useState('');
  const { symbol } = useParams();

  const formatData = (data) => {
    //console.log(data);
    return data.t.map((el, index) => {
      return {
        x: el * 1000,
        y: Math.floor(data.c[index])
      }
    })
  }


  useEffect(() => {
    const getData = async () => {

      const date = new Date()
      const currentTime = Math.floor(date.getTime() / 1000);
      let oneDayAgo = currentTime - 24 * 60 * 60;
      if (date.getDay() == 6) oneDayAgo = currentTime - 2 * 24 * 60 * 60;
      else if (date.getDay() === 0) oneDayAgo = currentTime - 3* 24 * 3600;

      const oneWeekAgo = currentTime - 7 * 24 * 3600;
      const oneYearAgo = currentTime - 365 * 24 * 3600;

      try {
        let responses = await Promise.all(
          [
            finnHub.get('/stock/candle', {
              params: {
                symbol,
                from: oneDayAgo,
                to: currentTime,
                resolution:30
               }
            }),
            finnHub.get('/stock/candle', {
              params: {
                symbol,
                from: oneWeekAgo,
                to: currentTime,
                resolution:60
               }
            }),
            finnHub.get('/stock/candle', {
              params: {
                symbol,
                from: oneYearAgo,
                to: currentTime,
                resolution:'W'
               }
            })
           ]
        )
        responses = responses.map((ele) => {
          let { data } = ele;
          return data;
        })
        //console.log(responses)
        return responses;
      } catch (error) {
        console.log(error);
      }
    }

    getData().then(responses => {
      //console.log(responses)
      setStockData({
        day: formatData(responses[0]),
        week: formatData(responses[1]),
        year: formatData(responses[2])
      })
    });
  }, [symbol]);


  return (
    <div>
     {stockData && (
      <div>
        <StockChart chartData={stockData} symbol={symbol} />
        <StockDescription symbol={symbol} />
      </div>
    )}
    </div>
  )
}
