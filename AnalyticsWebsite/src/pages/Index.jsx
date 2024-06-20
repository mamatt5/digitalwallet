import React, { useRef, useEffect } from "react";
import * as d3 from 'd3';
import * as dc from 'dc';
import { useState } from "react";
import { PieChart, RowChart, BubbleChart, BarChart } from 'react-dc-js'
import crossfilter from 'crossfilter2'
import axios from 'axios'

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
    const [transactions, setTransactions] = useState([])

	const endpoint = "http://localhost:8000/transactions/gettransactions"
	const requestOptions = {}

	axios.get(endpoint, requestOptions)
		.then(response => {setTransactions(response.data); console.log(response.data)})
		.catch(error => console.log(error))

	
	let data = generateTransactions(100)

	let ndx = crossfilter(data);
	let all = ndx.groupAll();

	// const [cardIdDim, setCardIdDim] = useState(ndx.dimension(function (d) {return d["card_id"]}))
	let cardIdDim = ndx.dimension(function (d) {return d["card_id"]})
	let senderDim = ndx.dimension(function (d) {return d["sender"]})
	// let amountDim = ndx.dimension(function (d) {return d["amount"]}).filter([100])

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

	return <>
		<h1>Dashboard</h1>
        
        <RowChart 
			dimension={cardIdDim} 
			group={cardIdDim.group()}
			elasticX={true}
			elasticY={true}
			width={600}
			height={400}
		/>
        {/* <button onClick={()=>{cardReset()}}>Reset Row</button> */}
		{/* <button onClick={()=>{senderReset()}}>Reset Pie</button> */}
		<PieChart 
			dimension={senderDim} 
			group={senderDim.group()}
			elasticX={true}
			elasticY={true}
			height={400}
		/>
	</>
};