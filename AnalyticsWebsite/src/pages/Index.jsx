import React, { useState, useEffect } from "react";
import Chart from 'react-apexcharts';
import axios from 'axios';
import * as d3 from 'd3';
import DonutChart from '../components/Charts/DonutChart';
import LineChart from '../components/Charts/LineChart';
import AreaChart from '../components/Charts/AreaChart';
import crossfilter from 'crossfilter2';
import { calculateRevenueALL, 
         calculateRevenueByDay, 
         calculateRevenueByMonth, 
         calculateRevenueBySixMonth, 
         calculateRevenueYTD } from '../utils/utils';
import PieChart from "../components/Charts/PieChart";

import '../../src/index.css'
import '../../src/debugging.css'
import '../components/Charts/charts.css'

export default function Index() {
    const API_BASE_URL = `http://${process.env.REACT_APP_LOCAL_IP}:8000`;
    const [tranactionData, setTransactions] = useState(null);
    const [ndx, setNdx] = useState(null);
    const [itemAmount, setItemAmount] = useState([]);
    const [itemNames, setItemNames] = useState([]);
    const [netItemsSold, setNetItemsSold] = useState(0);
    const [netRevenueSum, setNetRevenueSum] = useState(0);
    const [returningUsers, setReturningUsers] = useState([1, 1])
    const [timePeriod, setTimePeriod] = useState('one_week')

    const [barChartData, setBarChartData] = useState({
        options: {
            chart: {
                id: "barchart"
            },
            xaxis: {
                labels: {
                    style: {
                        colors: "var(--desat-secondary)",
                        fontSize: "0.9rem",
                    }
                }
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        var units = ["","K","M","B"]
                        var unit = (value / 1.0e+1).toFixed(0).toString().length
                        var r = unit%3
                        var x =  Math.abs(Number(value))/Number('1.0e+'+(unit-r)).toFixed(2)
                        return "$"+((Math.round(x)==x) ? x : x.toFixed(2))+ ' ' + units[Math.floor(unit / 3)]
                    },
                    style: {
                        colors: "var(--desat-secondary)",
                        fontSize: "0.9rem",
                    }
                }
            },
            dataLabels: {
                enabled: false,
            },
            plotOptions: {
                bar: {
                    colors: {
                        ranges: [{
                            color: '#000'
                        }],
                        backgroundBarColors: [],
                        backgroundBarOpacity: 0,
                    },
                    horizontal: false,
                    endingShape: 'flat',
                    columnWidth: '55%',
                    barHeight: '75%',
                    distributed: true,
                }
            },
            grid: {
                borderColor: 'var(--desat-secondary)',
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: false
                    }
                },
                yaxis: {
                    lines: {
                        show: true,
                        dashArray: 5,
                    }
                }
            },
            tooltip: {
                enabled: true,
                theme: 'dark',
                style: {
                    fontSize: '0.9rem',
                    fontFamily: undefined
                },
                y: {
                    formatter: (value) => {
                        return "$" + value.toFixed(2);
                    }
                }
            },
            legend: {
                show: false
            }
        },
        series: [
            {
                name: "Revenue",
                data: []
            }
        ]
    });

    useEffect(() => {
        const fetchData = async () => {
            const endpoint = `${API_BASE_URL}/transactions/gettransactions`;
            try {
                const response = await axios.get(endpoint);
                const processingData = response.data;
                setTransactions(response.data)
                const dateFormatParser = d3.timeParse("%m/%d/%Y");
                let itemHolder = crossfilter();

                processingData.forEach((d) => {
                    if (d.time.includes("M")) {
                        d.date = "0"+d.date.split("/")[1]+"/0"+d.date.split("/")[0]+"/24"
                    }
                    
                    d.dd = new Date(dateFormatParser(d.date).setFullYear(dateFormatParser(d.date).getFullYear() + 2000))
                    d.month = d3.timeMonth(d.dd);
                    d.amount = parseFloat(d.amount).toFixed(2);
                    
                    // Not made within today
                    if (Math.random() * 2 > 1 && new Date(d.dd) - new Date(Date.now()) < 24*60*60*1000) {
                        d.sender = parseInt(Math.random() * 1000000 + 71)
                    }

                    d.items.map((i) => {
                        i.price = parseFloat(i.price);
                        itemHolder.add([i]);
                    });
                });
                
                setNdx(crossfilter(processingData));
                setTimePeriod('six_months')

                let itemDim = itemHolder.dimension(function (d) { return d.name });

                var netItemCount = itemDim.group().reduce(
                    function (p, v) {
                        p = (parseInt(p) || 0) + v.quantity;
                        return p;
                    },
                    function (p, v) {
                        p -= v.quantity;
                        return p;
                    },
                    function () {
                        return 0;
                    }
                );

                let donutData = netItemCount.order((p) => { return p }).top(5);

                let itemCount = [];
                let itemName = [];

                for (let i = 0; i < donutData.length; i++) {
                    itemCount.push(donutData[i].value);
                    itemName.push(donutData[i].key);
                }

                setItemAmount(itemCount);
                setItemNames(itemName);

                let totalItemData = netItemCount.order((p) => { return p }).top(Infinity);

                let totalItemCount = 0;

                for (let i = 0; i < totalItemData.length; i++) {
                    totalItemCount += (totalItemData[i].value);
                }

                setNetItemsSold(totalItemCount);
                

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const updateChartData = (revenueData) => {
        const categories = Object.keys(revenueData).sort((a, b) => {
            const dateA = new Date(a.split(" ")[0]+"20"+a.split(" ")[1])
            const dateB = new Date(b.split(" ")[0]+"20"+b.split(" ")[1])
            return dateA - dateB;
        });
        const data = Object.values(revenueData);

        setBarChartData({
            ...barChartData,
            options: {
                ...barChartData.options,
                xaxis: {
                    categories: categories
                }
            },
            series: [
                {
                    name: "Revenue",
                    data: data
                }
            ]
        });
    };

    useEffect(()=>{
        handleViewModeChange(timePeriod)
        ndx !== null && handleRevenueItemChange()
        
    }, [timePeriod])

    const handleViewModeChange = async (mode) => {
        if (ndx !== null) {
            let processedData = {};
            switch (mode) {
                case 'one_week':
                    processedData = calculateRevenueByDay(await ndx.all());
                    break;
                case 'six_months':
                    processedData = calculateRevenueBySixMonth(await ndx.all());
                    break;
                case 'one_year':
                    processedData = calculateRevenueByMonth(await ndx.all());
                    break;
                case 'ytd':
                    processedData = calculateRevenueYTD(await ndx.all());
                    break;
                default:
                    processedData = calculateRevenueALL(await ndx.all());
                    break;
            }

            setNetRevenueSum(Object.values(processedData).reduce((a, b) => a + b, 0).toFixed(2));
            updateChartData(processedData);
        }
    };

    const handleRevenueItemChange = () => {
        
        let dateDim = ndx.dimension(d => new Date(d.dd));
        let itemDim = ndx.dimension(d => d.name);

        const now = new Date(Date.now())
        
        switch (timePeriod) {
            case 'one_week':
            dateDim.filterFunction((d)=>{
                    return d > new Date(now - 7 * 24 * 60 * 60 * 1000)
                });
                break;
            case 'six_months':
                dateDim.filterFunction((d)=>{
                    return new Date(d).getMonth() > (now.getMonth() - 6) % 12
                })
                break;
            case 'one_year':
                dateDim.filterFunction((d)=>{
                    return d > new Date(now - 365 * 24 * 60 * 60 * 1000)
                });
                break;
            case 'ytd':
                dateDim.filterFunction((d)=>{
                    return new Date(d).getFullYear() === now.getFullYear()
                })
                break;
            default:
                break;
        }
        // console.log(ndx.all())
        let tmpNdx = crossfilter(itemDim.top(Infinity))

        let senderDim = tmpNdx.dimension((d)=>d.sender)
        let filteredSenders = senderDim.group().reduce(
            (p) => (p + 1),
            (p) => (p - 1),
            () => 0
        )

        let newUsers = 0, returningUsers = 0
        filteredSenders.top(Infinity).map((d)=>{
            d.value > 1 ? returningUsers = returningUsers + d.value : newUsers++
        })
        setReturningUsers([newUsers, returningUsers])

        // num of new vs old users
        // let newUsers = 0, returningUsers = 0
        // filteredSenders.top(Infinity).map((d)=>{
        //     d.value > 1 ? returningUsers++ : newUsers++
        // })
        // setReturningUsers([newUsers, returningUsers])


        // Clear filters to display all the sorted data
        dateDim.filterAll()
        
        let itemHolder = crossfilter();

        tmpNdx.all().forEach((d) => {
            d.items.map((i) => { itemHolder.add([i]) })
        })
        
        let filteredItems = itemHolder.dimension(function (d) { return d.name });

        var netItemCount = filteredItems.group().reduce(
            (p, v) => (p + v.quantity),
            (p, v) => (p - v.quantity),
            () => 0
        );
        
        updateItemDate(netItemCount)
    }

    const updateItemDate = (netItemCount) => {
        let donutData = netItemCount.order((p) => { return p }).top(5);
        
        let itemCount = [];
        let itemName = [];

        for (let i = 0; i < donutData.length; i++) {
            itemCount.push(donutData[i].value);
            itemName.push(donutData[i].key);
        }

        setItemAmount(itemCount);
        setItemNames(itemName);

        let totalItemData = netItemCount.order((p) => { return p }).top(Infinity);

        let totalItemCount = 0;

        for (let i = 0; i < totalItemData.length; i++) {
            totalItemCount += (totalItemData[i].value);
        }

        setNetItemsSold(totalItemCount);
    }

    if (!ndx) {
        return <div>Loading...</div>;
    }


    return (
        <div className="page-container">

            <div className="dashboard-page-container">

                <h1>Analytics</h1>

                <div className="toolbar">
                    <button id="one_week"
                        onClick={() => setTimePeriod('one_week')} className={(timePeriod === 'one_week' ? 'active' : '')}>
                        1W
                    </button>
                    <button id="six_months"
                        onClick={() => setTimePeriod('six_months')} className={(timePeriod === 'six_months' ? 'active' : '')}>
                        6M
                    </button>
                    <button id="one_year"
                        onClick={() => setTimePeriod('one_year')} className={(timePeriod === 'one_year' ? 'active' : '')}>
                        1Y
                    </button>
                    <button id="ytd"
                        onClick={() => setTimePeriod('ytd')} className={(timePeriod === 'ytd' ? 'active' : '')}>
                        YTD
                    </button>
                    <button id="all"
                        onClick={() => setTimePeriod('all')} className={(timePeriod === 'all' ? 'active' : '')}>
                        ALL
                    </button>
                </div>

                <div className="dashboard-container">

                    {netRevenueSum >= 0.0 ? 
                        <div className="revenue-summary-card">
                            <p>Net Revenue</p> 
                            <p className="number-display gain">${netRevenueSum}</p>
                        </div>
                        
                    : 
                        <div className="revenue-summary-card">
                            <p>Net Revenue</p> 
                            <p className="number-display loss">-${netRevenueSum}</p>
                        </div>
                    }

                    <div className="revenue-summary-card">
                        <p>Total Items Sold</p> 
                        <p className="number-display normal">{netItemsSold}</p>
                    </div>
                    
                </div>

                <h2>Total Transaction Value</h2>

                <AreaChart 
                    time={timePeriod}
                    transactions={tranactionData}
                />

                <Chart
                    options={barChartData.options}
                    series={barChartData.series}
                    type="bar"
                    width="100%"
                />

                <div className="dashboard-container">
                    <div className="chart-card">
                        <h2>Transactions By New VS Returning Customers</h2>
                        <PieChart 
                            names={["New Customers", "Returning Customers"]}
                            amounts={returningUsers}
                        />
                    </div>

                    <div className="chart-card">
                        <h2>Top 5 Items</h2>
                        <DonutChart
                            names={itemNames}
                            amounts={itemAmount}
                        />
                    </div>
                    
                </div>

            </div>
        </div>
    );
}
