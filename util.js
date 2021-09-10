class Util{

	constructor(){
		this.results = [];
		this.workPeriods = [
			{
				days:[{day:'MO'},{day:'TU'},{day:'WE'},{day:'TH'},{day:'FR'}],
				hours:[
					{order:1,from:'00:01',to:'09:00',value:25},
					{order:2,from:'09:01',to:'18:00',value:15},
					{order:3,from:'18:01',to:'24:00',value:20}
				]
			},
			{
				days:[{day:'SA'},{day:'SU'}],
				hours:[
					{order:1,from:'00:01',to:'09:00',value:30},
					{order:2,from:'09:01',to:'18:00',value:20},
					{order:3,from:'18:01',to:'24:00',value:25}
				]
			}
		];
	}
	
	processLine = function (input){
		let dataArray = input.split("=");
		let name = dataArray[0];
		let datesWork = dataArray[1].split(",")
		let totalValue = 0;
		datesWork.map ( resp => {
			let day = resp.substring(0,2);
			let rangeArray = resp.substring(2).split("-");
			this.getDataByDay(day,rangeArray[0],rangeArray[1]);
		})
		this.results.forEach( resp => {
			totalValue += resp.valueToPay;
		});
		console.log("The amount to pay " + name + " is " + totalValue + " USD");
		
	}
	
	getDataByDay = function (day,fromIn,to){
		let hoursPeriodEnd=0;
		let valueHoursEnd = 0;
		let valueHoursRemain=0;
		let hoursPeriodStart=0	
		let valueHoursStart=0;
		let difference = parseFloat(to)-parseFloat(fromIn);
		let period = this.workPeriods.find( resp =>  resp.days.find (item => item.day === day) );
		let periodStart = period.hours.find( resp => parseFloat(resp.from) <= parseFloat(fromIn) && parseFloat(fromIn) - parseFloat(resp.from) <=9);
		let periodEnd = period.hours.find( resp => parseFloat(resp.to) >= parseFloat(to) && parseFloat(resp.to) - parseFloat(to) <=9 );

		if (periodStart.order!=periodEnd.order){
			hoursPeriodStart = parseFloat(periodStart.to)- parseFloat(fromIn);
			valueHoursStart = periodStart.value * hoursPeriodStart;
			hoursPeriodEnd = parseFloat(to) - parseFloat(periodEnd.from);
			valueHoursEnd = parseFloat(periodEnd.value) * parseFloat(hoursPeriodEnd);
			let hoursPeriodRemain = difference-(hoursPeriodStart+hoursPeriodEnd);
			let periodRemain={};
			valueHoursRemain=0;
			if (hoursPeriodRemain>0){
				periodRemain = period.hours.find( resp => resp.order != periodStart.order && resp.order != periodEnd.order)
				valueHoursRemain = periodRemain.value*hoursPeriodRemain;
			}
		}else{
			hoursPeriodStart = difference;
			valueHoursStart = periodStart.value * hoursPeriodStart;
		}	
		let totalToPay = valueHoursStart+valueHoursEnd+valueHoursRemain;
		this.results.push( {"day":day, "hours": difference, "valueToPay": totalToPay} );
	}


}

module.exports = Util;