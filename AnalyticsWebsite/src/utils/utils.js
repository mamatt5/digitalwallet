import * as d3 from 'd3';

export const calculateRevenueByDay = (data) => {
    const revenueByDay = {
        "Monday": 0,
        "Tuesday": 0,
        "Wednesday": 0,
        "Thursday": 0,
        "Friday": 0,
        "Saturday": 0,
        "Sunday": 0
    };

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  
    data.forEach((d) => {
        let currDate = new Date(d.dd)

        if (currDate > sevenDaysAgo) {
            const dayOfWeek = d.dd.toLocaleString('en-UK', { weekday: 'long' });

            // Calculate total revenue for the transaction
            const transactionRevenue = d.items.reduce((sum, item) => {
                return sum + item.quantity * parseFloat(item.price);
            }, 0);
            
            // Sum the revenue for the appropriate day of the week
            if (revenueByDay[dayOfWeek] !== undefined) {
                revenueByDay[dayOfWeek] += transactionRevenue;
            }
        }
    });

    return revenueByDay;
};

export const calculateRevenueByMonth = (data) => {
    const revenueByMonth = {};
    const dateFormatParser = d3.timeParse("%m/%d/%Y");
    // console.log(data)
    // data.forEach((d,i)=>{console.log( i > 0 ? d.dd < data[i - 1].dd : "start")})
    const now = new Date(Date.now())
    const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1))

    data.forEach((d) => {
        
        let currDate = new Date(d.dd)

        if (currDate > oneYearAgo) {
        
            const monthYear = dateFormatParser(d.date).toLocaleString('en-UK', { month: 'short', year: 'numeric' });
            if (!revenueByMonth[monthYear]) {
                revenueByMonth[monthYear] = 0;
            }
            d.items.forEach(item => {
                revenueByMonth[monthYear] += item.quantity * parseFloat(item.price);
            });
        }
    });

    // console.log(revenueByMonth)
    return revenueByMonth;
};

export const calculateRevenueBySixMonth = (data) => {
    const revenueByMonth = {};
    const dateFormatParser = d3.timeParse("%m/%d/%Y");
  
    const now = new Date(Date.now())

    const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6))

    data.forEach((d) => {
        let currDate = new Date(d.dd)

        if (currDate > sixMonthsAgo) {
         
            const monthYear = dateFormatParser(d.date).toLocaleString('en-UK', { month: 'short', year: 'numeric' });
            if (!revenueByMonth[monthYear]) {
                revenueByMonth[monthYear] = 0;
            }
            d.items.forEach(item => {
                revenueByMonth[monthYear] += item.quantity * parseFloat(item.price);
            });
        }
    })

    return revenueByMonth;
};

export const calculateRevenueYTD = (data) => {
    const revenueByMonth = {};
    const dateFormatParser = d3.timeParse("%m/%d/%Y");
  
    const now = new Date(Date.now())

    data.forEach((d) => {
        let currDate = new Date(d.dd)

        if (currDate.getFullYear() === now.getFullYear()) {
         
            const monthYear = dateFormatParser(d.date).toLocaleString('en-UK', { month: 'short', year: 'numeric' });
            if (!revenueByMonth[monthYear]) {
                revenueByMonth[monthYear] = 0;
            }
            d.items.forEach(item => {
                revenueByMonth[monthYear] += item.quantity * parseFloat(item.price);
            });
        }
    })

    return revenueByMonth;
};

export const calculateRevenueALL = (data) => {
    const revenueByMonth = {};
    const dateFormatParser = d3.timeParse("%m/%d/%Y");
  
    const now = new Date(Date.now())

    data.forEach((d) => {
        let currDate = new Date(d.dd)
        currDate.setFullYear(currDate.getFullYear() + 2000)
         
        const year = "20" + dateFormatParser(d.date).toLocaleString('en-UK', { year: 'numeric' });
        if (!revenueByMonth[year]) {
            revenueByMonth[year] = 0;
        }
        d.items.forEach(item => {
            revenueByMonth[year] += item.quantity * parseFloat(item.price);
        });
    })

    return revenueByMonth;
};