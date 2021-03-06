/**
 * Created by feng on 2017/7/31.
 */

//个人花费记录
function PersonalFiance(info) {
    var my = this;
    my.payLog = {};
    my.getLog = {};
    my.card = info.card; //4071.61
    my.cash = info.cash; //1700
    my.yct = info.yct; //110
};
PersonalFiance.prototype = {
    constructor : PersonalFiance,
    cost : function (type, num, date, purpose) {

        if (type == 'card') {
            this.card -= num;
        } else if (type == 'cash') {
            this.cash -= num;
        } else if (type == 'yct') {
            this.yct -= num;
        } else {
            throw new Error('this is not your pay');
        }
        var logObject = {};
        var costDate = new Date(date);
        var costDay = costDate.getFullYear() + ' ' + (costDate.getMonth() + 1) + ' ' + costDate.getDate();
        logObject.type = type;
        logObject.cost = num;
        logObject.costDay =costDay;
        logObject.costPurpose = purpose;

        if (this.payLog[costDay]) {
            this.payLog[costDay].push(logObject);
        } else {
            this.payLog[costDay] = [];
            this.payLog[costDay].push(logObject);
        };
        return this;
    },
    get : function (type, num, date, source) {

        if (type == 'card') {
            this.card += num;
        } else if (type == 'cash') {
            this.cash += num;
        } else {
            throw new Error('this is not your get');
        };
        var logObject = {};
        var getDate = new Date(date);
        var getDay = getDate.getFullYear() + ' ' + (getDate.getMonth() + 1) + ' ' + getDate.getDate();
        logObject.type = type;
        logObject.get = num;
        logObject.getDay =getDay;
        logObject.getSource = source;

        if (this.getLog[getDay]) {
            this.getLog[getDay].push(logObject);
        } else {
            this.getLog[getDay] =[];
            this.getLog[getDay].push(logObject);
        };
        return this;
    },
    check : function (type, date) {

    },
    checkCard : function () {
        return this.card;
    },
    checkCash : function () {
        return this.cash;
    },
    checkYct : function () {
        return this.yct;
    },
    checkAll : function () {
        return this.card + this.cash;
    },
    checkAllCost : function () {

        var totalCost = 0;
        for (var i in this.payLog) {
            for (var j = 0; j < this.payLog[i].length; j++) {
                totalCost += this.payLog[i][j].cost;
            }
        };
        return totalCost;
    },
    checkCostLip : function () {
        var totalCostStr = '';
        for (var i in this.payLog) {
            for (var j = 0; j < this.payLog[i].length; j++) {
                totalCostStr += ('I paid ' + this.payLog[i][j].cost + ' of ' + this.payLog[i][j].type + ' to do ' + this.payLog[i][j].costPurpose +' in ' +this.payLog[i][j].costDay  + '\n');
            };
        };
        totalCostStr += 'The total is: ' + this.checkAllCost();
        console.log(totalCostStr);
    },
    ifCanSubway : function () {

        if (this.yct <= 2) {
            alert('羊城通余额已不足'); //这里可用作观察者模式
        }
    }
};