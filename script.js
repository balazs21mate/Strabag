let payment = {
    hourlyWage : 0,
    days : 0,
    afternoonDays : 0,
    nightDays : 0,
    overtime : 0,
    sickPay : 0,
    travelExpenses : 0
}

function calculate(){
    var days = ((payment.days-payment.afternoonDays-payment.nightDays)*payment.hourlyWage)*8;
    if(days <= 0){
        days = 0;
    }
    var nightDays = ((payment.hourlyWage+(payment.hourlyWage*0.5))*payment.nightDays)*8;
    var afternoonDays = ((payment.hourlyWage+(payment.hourlyWage*0.3))+payment.afternoonDays)*4;
    var overtime = (payment.hourlyWage*2)*payment.overtime;
    if(document.getElementById('sick').checked === true && payment.sickPay <=15){
        var sickPay = ((payment.hourlyWage*0.7)*payment.sickPay)*8;
    }else if(document.getElementById('sick').checked === true && payment.sickPay > 15){
        var sickPay = (((payment.hourlyWage*0.6)*(payment.sickPay-15))*8) + (payment.hourlyWage*84);
    }else{
        var sickPay = ((payment.hourlyWage*0.6)*payment.sickPay)*8;
    }
    var travelExpenses = payment.travelExpenses*payment.days;
    var brutto = nightDays+afternoonDays+days+overtime+sickPay;
    var deduction = brutto *0.335;
    var netto = (brutto-deduction)+travelExpenses;
    return [brutto,deduction,netto];
}

function update(){
    const idArray = ["hourly-wage", "days", "afternoon-days", "night-days", "overtime", "sick-pay", "travel-expenses"]
    let counter = 0;

    for(const [key, value] of Object.entries(payment)){
        if(isNaN(payment[`${key}`] = parseInt(document.getElementById(`${idArray[counter]}`).value))){
            payment[`${key}`] = 0;
        }else{
            payment[`${key}`] = parseInt(document.getElementById(`${idArray[counter]}`).value);
        }
        counter++;
    }
}

function log(brutto){
    if (screen.height < 1000){
        document.getElementById('form').style.marginRight = '1rem';
    }else if(screen.height > 1000){
        document.getElementById('form').style.marginBottom = '1rem';
    }
    document.getElementById("my-form").style.display = "block";
    document.getElementById("my-form").innerHTML = `
    <div class="form-group">
        <label for="result">Fizetés(brutto)</label>
        <input type="text" class="form-control input-sm" id="result" placeholder="${parseInt(brutto[0])}Ft", disabled>
    </div>
    <div class="form-group">
        <label for="result">Levonások</label>
        <input type="text" class="form-control input-sm" id="result" placeholder="${parseInt(brutto[1])}Ft", disabled>
    </div>
    <div class="form-group">
        <label for="result">Fizetés(netto)</label>
        <input type="text" class="form-control input-sm" id="result" placeholder="${parseInt(brutto[2])}Ft", disabled>
    </div>`;
    
}

function deletePayment(){
    document.getElementById("my-form").style.display = "none";
    document.getElementById('form').style.margin = 'auto auto 1rem auto';
    document.getElementById('sick').checked = false;

    const idArray = ["hourly-wage", "days", "afternoon-days", "night-days", "overtime", "sick-pay", "travel-expenses"]
    let counter = 0;

    for(const [key, value] of Object.entries(payment)){
        payment[`${key}`] = document.getElementById(`${idArray[counter]}`).value = "";
        payment[`${key}`] = 0;
        counter++;
    }
}

(function(){
    document.addEventListener('keypress', function(event){
        if (event.keyCode === 13){
            update();
            let brutto = calculate();
            log(brutto);
        }
    });
})();

document.getElementById('btn-result').addEventListener("click", function(){
    update();
    let brutto = calculate();
    log(brutto);
})

document.getElementById('btn-delete').addEventListener("click", function(){
    deletePayment();
})
