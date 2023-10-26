const datetimeUrl = (dataInicial, dataFinal) =>{
    var startTimestamp = new Date(dataInicial); 
    var endTimestamp = new Date(dataFinal); 
    
    var startDate = startTimestamp.getTime();
    var endDate = endTimestamp.getTime();
    response = `https://clarity.microsoft.com/projects/view/823hv5v6lm/dashboard?date=Custom&end=${endDate}&start=${startDate}`

    return response
}

//console.log(datetimeUrl('2020-11-05', '2020-12-05'));
module.exports = datetimeUrl; 
