import React from 'react'
import { BiTrendingDown, BiTrendingUp } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { WatchListContext } from '../context/WatchListContextProvider';



export default function WatchListRow(props) {


    const { deleteFromWatchList } = useContext(WatchListContext);
    const navigateTo = useNavigate();

    const posOrNeg=() => {
        if (props.rowdata.data.d > 0) return 'success';
        else if (props.rowdata.data == 0) return 'info';
        else return 'danger';
    }

    const rowClickHandler = (symbol) => {
        // console.log("here"+symbol)

        navigateTo('detail\\' + symbol)
    }

    const deleteRowHandler = (sym) => {
        console.log("deleted " + sym);
        deleteFromWatchList(sym);
    }
    const showDeleteIcon = (sym) => {
        //console.log("mouseOvered " + sym);
        document.getElementById("delete" + sym).style.display = "block";
    }
    const hideDeleteIcon = (sym) => {
        document.getElementById("delete" + sym).style.display = "none";
    }

    return (
        <tr className='watchlistRow' onMouseOver={() => showDeleteIcon(props.rowdata.symbol)}
            onMouseOut={() => hideDeleteIcon(props.rowdata.symbol)}
            style={{ cursor: 'pointer' }} onClick={(e) => {
            if (e.target.className === "fa-solid fa-trash" || e.target.className === "deleteIcon") deleteRowHandler(props.rowdata.symbol);
            else rowClickHandler(props.rowdata.symbol)
        }} >
            <th className= { 'text-' + posOrNeg() + " p-1" } scope="row">{props.rowdata.symbol}{ posOrNeg()==='success'?<BiTrendingUp/>:<BiTrendingDown/>}</th>

            <td >{props.rowdata.data.c}</td>
            <td className={'text-' + posOrNeg()}>{props.rowdata.data.d}</td>
            <td className={'text-'+posOrNeg()}>{props.rowdata.data.dp}</td>
            <td>{props.rowdata.data.h}</td>
            <td>{props.rowdata.data.l}</td>
            <td>{props.rowdata.data.o}</td>
            <td>{props.rowdata.data.pc}</td>
            <td id={'delete'+props.rowdata.symbol} className='deleteIcon'  onClick={() => {
                // console.log("clicked");
            }}><i className="fa-solid fa-trash"></i></td>
        </tr>
    )
}



