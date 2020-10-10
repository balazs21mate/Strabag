let payment = {
    hourlyWage : 0,
    days : 0,
    afternoonDays : 0,
    nightDays : 0,
    overtime : 0,
    sickPay : 0
}

function calculate(){
    var days = ((payment.days-payment.afternoonDays-payment.nightDays)*payment.hourlyWage)*8;
    if(days <= 0){
        days = 0;
    }
    var nightDays = ((payment.hourlyWage+(payment.hourlyWage*0.5))*payment.nightDays)*8;
    var afternoonDays = ((payment.hourlyWage+(payment.hourlyWage*0.3))*payment.afternoonDays)*8;
    var overtime = (payment.hourlyWage*2)*payment.overtime;
    if(document.getElementById('sick').checked === true){
        var sickPay = ((payment.hourlyWage*0.7)*payment.sickPay)*8;
    }else{
        var sickPay = ((payment.hourlyWage*0.6)*payment.sickPay)*8;
    }
    var brutto = nightDays+afternoonDays+days+overtime+sickPay;
    var deduction = brutto *0.335;
    var netto = brutto-deduction;
    return [brutto,deduction,netto];
}

function update(){
    const idArray = ["hourly-wage", "days", "afternoon-days", "night-days", "overtime", "sick-pay"]
    let counter = 0;

    for(const [key, value] of Object.entries(payment)){
        if(isNaN(payment[`${key}`] = parseInt(document.getElementById(`${idArray[counter]}`).value))){
            payment[`${key}`] = 0;
        }else{
            payment[`${key}`] = parseInt(document.getElementById(`${idArray[counter]}`).value);
        }
        counter++;
    }
    /*if(isNaN(payment.hourlyWage = parseInt(document.getElementById("hourly-wage").value))){
        payment.hourlyWage = 0;
    }else{
        payment.hourlyWage = parseInt(document.getElementById("hourly-wage").value);
    }
    if(isNaN(payment.days = parseInt(document.getElementById("days").value))){
        payment.days = 0;
    }else{
        payment.days = parseInt(document.getElementById("days").value);
    }
    if(isNaN(parseInt(document.getElementById("afternoon-days").value))){
        payment.afternoonDays = 0;
    }else{
        payment.afternoonDays = parseInt(document.getElementById("afternoon-days").value);
    }
    if(isNaN(payment.nightDays = parseInt(document.getElementById("night-days").value))){
        payment.nightDays = 0;
    }else{
        payment.nightDays = parseInt(document.getElementById("night-days").value);
    }
    if(isNaN(payment.overtime = parseInt(document.getElementById("overtime").value))){
        payment.overtime = 0;
    }else{
        payment.overtime = parseInt(document.getElementById("overtime").value);
    }
    if(isNaN(payment.sickPay = parseInt(document.getElementById("sick-pay").value))){
        payment.sickPay = 0;
    }else{
        payment.sickPay = parseInt(document.getElementById("sick-pay").value);
    }*/
}

function log(brutto){
    document.getElementById("my-form").style.display = "block";
    document.getElementById("my-form").innerHTML = `
    <div class="form-group">
        <label for="result">Fizetés(br)</label>
        <input type="text" class="form-control input-sm" id="result" placeholder="${brutto[0]}Ft", disabled>
    </div>
    <div class="form-group">
        <label for="result">Levonások</label>
        <input type="text" class="form-control input-sm" id="result" placeholder="${brutto[1]}Ft", disabled>
    </div>
    <div class="form-group">
        <label for="result">Fizetés(netto)</label>
        <input type="text" class="form-control input-sm" id="result" placeholder="${brutto[2]}Ft", disabled>
    </div>`;
    
}

document.getElementById('btn-result').addEventListener("click", function(){
    update();
    let brutto = calculate()
    log(brutto);
});
