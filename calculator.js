var units = Apperyio('billUnits').val();

var ranges = [
    {
        start: 1,
        end: 75,
        rate: 3.8
    },
    {
        start: 76,
        end: 200,
        rate: 5.14
    },
    {
        start: 201,
        end: 300,
        rate: 5.36
    },
    {
        start: 301,
        end: 400,
        rate: 5.63
    },
    {
        start: 401,
        end: 600,
        rate: 8.7
    },
    {
        start: 601,
        end: 10000,
        rate: 9.98
    }
];
var lifeLineEnd = 50;
var lifeLineRate = 3.33;
var minimumCharge = 100;
var demandCharge = 15;
var serviceCharge = 30;
var vatMultiplier = 1.05;
var totalAmount = 0;
var charge = 0;

if (units <= lifeLineEnd) {
    // within life line
    charge += units * lifeLineRate;
} else {
    for (var i = 0; i < ranges.length; i++) {
        if (units >= ranges[i].start) {
            charge += (Math.min(ranges[i].end, units) - ranges[i].start + 1) * ranges[i].rate;
        }
    }
}
charge = Math.max(charge, minimumCharge);

totalAmount = (charge + demandCharge + serviceCharge) * vatMultiplier;

Apperyio('billAmount').text(totalAmount.toFixed(2).toLocaleString() + " Tk");
Apperyio('billAmount').show();
Apperyio('billClear').show();