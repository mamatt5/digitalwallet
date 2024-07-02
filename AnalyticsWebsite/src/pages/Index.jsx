import React, { useRef, useEffect } from "react";
import { useState } from "react";
import crossfilter from 'crossfilter2'
import axios from 'axios'

import '../../src/index.css'
import '../../src/debugging.css'

function generateTransactions(numTransactions) {
	const transactions = [];
  
	for (let i = 1; i <= numTransactions; i++) {
	  const transaction = {
		transaction_id: i,
		vender: 13,
		date: `2024-06-${Math.floor(Math.random() * 30) + 1}`,
		time: `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
		amount: parseFloat((Math.random() * 1000).toFixed(2)),
		description: `Transaction ${i}`,
		card_id: "Card "+Math.floor(Math.random() * 20),
		sender: "Customer "+Math.floor(Math.random() * 10),
		recipient: 13,
	  };
  
	  transactions.push(transaction);
	}
  
	return transactions;
}

export default function Index() {
    const [data, setData] = useState([])

	useEffect(()=>{
		const endpoint = "http://localhost:8000/transactions/gettransactions"
		const requestOptions = {}

		axios.get(endpoint, requestOptions)
		.then(response => {
			const processingData = response.data;
			const dateFormatParser = d3.timeParse("%m/%d/%Y");

			processingData.forEach((d) => {
			  d.dd = dateFormatParser(d.date);
			  d.month = d3.timeMonth(d.dd);
			})

			setData(processingData)
			console.log(processingData)
		})
		.catch(error => console.log(error))
	}, [])

	let ndx = crossfilter(data);
	// let all = ndx.groupAll();

	let cardIdDim = ndx.dimension(function (d) {return d["card_id"]})
	let senderDim = ndx.dimension(function (d) {return "Customer "+d["sender"]})
	let amountDim = ndx.dimension(function (d) {return parseFloat(d["amount"]) > 10 ? "Over $10" : "Under $10"})

	const moveMonths = ndx.dimension((d) => d.month);
  	const volumeByMonthGroup = moveMonths.group()

    const cardReset = () => {
        // cardIdDim = ndx.dimension(function (d) {return d["card_id"]})
	    // senderDim = ndx.dimension(function (d) {return d["sender"]})
		cardIdDim.filterAll()
		dc.redrawAll()
    }

	const senderReset = () => {
        // cardIdDim = ndx.dimension(function (d) {return d["card_id"]})
	    // senderDim = ndx.dimension(function (d) {return d["sender"]})
		senderDim.filterAll()
		dc.redrawAll()
    }

	return (
		<div>
		</div>
	)
};