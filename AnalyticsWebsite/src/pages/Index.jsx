import React, { useRef, useEffect } from "react";
import * as d3 from 'd3';
import * as dc from 'dc';
import { useState } from "react";
import { PieChart, RowChart, BubbleChart, BarChart, ChartContext } from 'react-dc-js'
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
			<h1>Dashboard</h1>

			<ChartContext>
			<h3>Purchases Made By Each Customer</h3>
			<div style={{display: "inline-flex"}}>
			<RowChart 
				dimension={senderDim} 
				group={senderDim.group()}
				elasticX={true}
				elasticY={true}
				width={600}
				height={400}
				
			/>
			<PieChart 
				dimension={amountDim} 
				group={amountDim.group()}
				elasticX={true}
				elasticY={true}
				height={400}
				// x={d3.scaleLinear([0,100])}
				// xAxis={d3.ticks(100)}
			/>
			</div>
			
			{/* <button onClick={()=>{cardReset()}}>Reset Row</button> */}
			{/* <button onClick={()=>{senderReset()}}>Reset Pie</button> */}
			{/* <h3>Purchases Made By Each Customer</h3>
			<RowChart 
				dimension={amountDim} 
				group={amountDim.group()}
				elasticX={true}
				elasticY={true}
				height={400}
			/> */}

			{/* <BarChart
			dimension={moveMonths}
			group={volumeByMonthGroup}
			width={990}
			height={180}
			radius={80}
			centerBar={true}
			gap={1}
			x={d3
				.scaleTime()
				.domain([new Date(2024, 1, 1), new Date(2024, 12, 31)])}
			round={d3.timeMonth.round}
			alwaysUseRounding={true}
			xUnits={d3.timeMonths}
			/> */}
			</ChartContext>
		</div>
	)
};