const database = require('../config/database.js');

async function getAllHistory(){

    try{
        const [historyData] = await database.query(`SELECT * FROM history`);
        return historyData;
    }
    catch(error){
        return {"message": `failed to fetch history`};
    }
}

async function getFilteredHistory(filterType){

    try{
        const [history] = await getAllHistory();
        const filteredHistory = history.filter(item => 
            item.date >= startDate && item.date <= endDate 
        );
        return filteredHistory;
    }
    catch(error){
        return {"message": `failed to fetch history`};
    }
}

async function getReportData(startDate, endDate, reportType){

    try{
        const history = await getAllHistory();
        //get range of date
        const filtered = history.filter(item => {
            const dateSplit = item.transact_date.split(' ')[0];
        
            return (reportType === 'sales') ?
                item.action_type === "sold" && dateSplit >= startDate && dateSplit <= endDate 

            : (reportType === 'purchase') ? 
                item.action_type === "order" && dateSplit >= startDate && dateSplit <= endDate

            : dateSplit >= startDate && dateSplit <= endDate 
        });
        return filtered;
    }
    catch(error){
        return {"message": `failed to fetch history, ${error.message}`};
    }
}

async function funct3(param1, param2){

    try{

    }
    catch(error){
        
    }
}

module.exports = {
    getAllHistory,
    getFilteredHistory,
    getReportData
}