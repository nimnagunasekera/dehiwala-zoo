/*Javascript object to store ticket prices and sizes
prices of products based on the small sizes
extra amounts for medium and large
*/
let tickets = {
    price : [500,250,2500],
    price2 : [1000,500,5000],
    duration : [250,500,1000]
}
   var no_of_adults=0;
   var no_of_children=0;

function calcCost(){
    var tick_price = tickets["price"];
    var tick_price2 = tickets["price2"];
    var dur_price = tickets["duration"]; 

    var cost = 0;

    var tick = document.getElementById("cmbTick").value;

    if(tick == ""){
        alert("Please select the ticket");
        document.getElementById("cmbTick").focus();
        return;
    }
    
    var dur = document.getElementById("cmbDur").value;
    var children = document.getElementById("txtChildren").value; // units="5"
    var adults = document.getElementById("txtAdults").value;
    
    if(children == "")
        children = 0;
    else
        children = parseInt(children); //convert to integer, units=5

    if(adults == "")
        adults = 0;
    else
        adults = parseInt(adults); //convert to integer, units=5

    //validation    
    if( adults < 0 || children < 0){
        alert("Error! Cannot input negative values");
        return;
    } 

    
    tick = parseInt(tick);
    uprice1 = tick_price[tick];
    uprice12 = tick_price2[tick];
   
    if(dur==""){
        dur_price[dur] = 0;
    }

    /*Annual Pass and Food Tokens*/
    
    var annual = document.getElementById("txtAnnual").value;
    var food = document.getElementById("txtFood").value;

    if(annual == "")
        annual = 0;
    else
        annual = parseInt(annual);

    if( annual < 0){
        alert("Invalid Format");
        return ;
    }

    if(food == "")
        food = 0;
    else
        food = parseInt(food);

    if( food < 0){
        alert("Invalid Format");
        return ;
    }

    uprice13 = parseInt(5000);
    uprice14 = parseInt(500);

    cost = parseFloat((children * uprice1)+(adults * uprice12)+dur_price[dur]+(annual * uprice13)+(food * uprice14));
    document.getElementById("spCost").innerHTML = cost.toFixed(2);
    
    no_of_adults = adults;
    no_of_children = children;
}

function extras(){
    var divExtras = document.getElementById("divExtras");
    divExtras.style.display = optional.checked? "block" : "none";
}

function addToOrder(){
    
    var adults = document.getElementById("txtAdults").value;
    var children = document.getElementById("txtChildren").value;

    //Alerts the user to enter no. of adults/children 
    if(adults == "" && children == ""){
        alert("Please select the number of adults/children");
        return;
    }

    //validation
    if( adults < 0 || children < 0){
        alert("Error! Cannot input negative values");
        return;
    } 

    //Displays the table when Add to Order is clicked
    document.getElementById("div_1").style = "display:block";

    var grand_total = parseFloat(document.getElementById("GrandTotal").innerHTML);

    var ctrl_tick = document.getElementById("cmbTick");
    var tick_name = ctrl_tick.options[ctrl_tick.selectedIndex].text;

    var ctrl_dur = document.getElementById("cmbDur");
    var dur_name = ctrl_dur.options[ctrl_dur.selectedIndex].text;

    var tbody = document.getElementById("tbody_1");
    var trow = tbody.insertRow(-1);

    td1 = trow.insertCell(0);
    td1.innerHTML = tick_name;

    td2 = trow.insertCell(1);
    td2.innerHTML = document.getElementById("txtAdults").value;

    td3 = trow.insertCell(2);
    td3.innerHTML = document.getElementById("txtChildren").value;

    td4 = trow.insertCell(3);
    td4.innerHTML = dur_name;

    td5 = trow.insertCell(4);
    td5.innerHTML = document.getElementById("txtAnnual").value;

    td6 = trow.insertCell(5);
    td6.innerHTML = document.getElementById("txtFood").value;

    var total = parseFloat(document.getElementById("spCost").innerHTML);
    grand_total = grand_total + total;

    td7 = trow.insertCell(6);
    td7.innerHTML=total.toFixed(2);
    td7.style = "text-align:right";

    td8 = trow.insertCell(7);
    td8.innerHTML = "<a href='javascript:void(0)' style='color:red;font-weight:bold' onclick='removeRecord(this.parentElement);'>X</a>";

    document.getElementById("GrandTotal").innerHTML = grand_total.toFixed(2);

    calcLp();
    resetPurchaseForm();
}


function resetPurchaseForm(){
    document.getElementById("frmPurchase").reset();
    document.getElementById("spCost").innerHTML = "0.00";
}


function removeRecord(item){
    var result = confirm("Do you want to remove this record?");
    
    if(result == true){
        var table = document.getElementById("tbl_brdr");
        var grand_total = parseFloat(document.getElementById("GrandTotal").innerHTML);
        var total = parseFloat(item.parentElement.cells[6].innerHTML);
        grand_total = grand_total - total;
        document.getElementById("GrandTotal").innerHTML = grand_total.toFixed(2);
        table.deleteRow(item.parentElement.rowIndex);
    }
}

function placeOrder(){
    var Table = document.getElementById("tbody_1");
    var grandTotal = document.getElementById("GrandTotal");
        grandTotal.innerHTML = "0.00";
        Table.innerHTML = "";
        alert("Thank you")
}

function donVal(){

    var name = document.getElementById("name").value;

    var name_pattern = /^[A-Za-z\s\.]{10,}$/; 
    if(!name.match(name_pattern)){
        if(name.length<10){
            alert("Please enter your full name");
        }
        else{
            alert("Please enter a valid name");
        }
        document.getElementById("name").focus();
        return false;
    }

    var address = document.getElementById("address").value;
    var add_pattern = /^[A-Za-z\d\.\-\/\#\,\s]+$/;

    if(!address.match(add_pattern)){
        alert("Please enter a valid address");
        document.getElementById("address").focus();
        return false;
    }

    var cc_number = document.getElementById("cc-number").value;
    
    if(cc_number.length<19){
            alert("Please enter the card number");
    }


    var cc_expire = document.getElementById("cc-expire").value;
    var expire_pattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if(!cc_expire.match(expire_pattern)){
        if(cc_expire.length<5){
            alert("Please enter the expiry date");
        }
        else{
            alert("Please enter a valid expiry date");
        }
        document.getElementById("cc-expire").focus();
        return false;
    }
    

    var cc_cvv = document.getElementById("cc-cvv").value;
    if(cc_cvv == "" || cc_cvv.length < 3){
        alert("Enter CVV");
        return false;
    } 

    var don_value = document.getElementById("cmbDon").value;
    if(don_value == ""){
        alert("Select a fixed amount");
        document.getElementById("cmbDon").focus();
        return;
    }
    else
        alert("Thankyou for your donation!")

        document.getElementById("frmDon").reset();
}

//Creating Local Storage
const formId = "frmPurchase"; 
const formDetector = `formstorage`; 
const saveButton = document.querySelector("#addFavourite");
const retrieveButton = document.querySelector("#retriveFavourite"); 
let form = document.querySelector(`#${formId}`); 
let formElements = form.elements; 

 const getFormData = () => {
  let data = { [formDetector]: {} }; 
  for (const element of formElements) {
    if (element.name.length > 0) {
      data[formDetector][element.name] = element.value;
    }
  }
  return data;
};

saveButton.onclick = event => {
  event.preventDefault();
  data = getFormData();
  localStorage.setItem(formDetector, JSON.stringify(data[formDetector]));
  alert("You're order has been saved!");
};


 const formautoRefill = () => {
  if (localStorage.key(formDetector)) {
    const savedData = JSON.parse(localStorage.getItem(formDetector)); 
    for (const element of formElements) {
      if (element.name in savedData) {
        element.value = savedData[element.name];
      }
    }
    alert("You're order has been retrieved!");
  }
};

retrieveButton.onclick = function(){
    formautoRefill(); 
    calcCost();
}

//loyalty point calculation
var total_Lp = 0;
var lp =0;
var tot_no_of_tick = 0;


function calcLp(){

  tot_no_of_tick = tot_no_of_tick + no_of_adults + no_of_children;
  if(tot_no_of_tick > 3){
    lp = 20 * tot_no_of_tick;
    total_Lp = total_Lp + lp;
    localStorage.setItem("loyalty",total_Lp);
  }

}

//display loyalty points
function displayLp(){
  total_Lp = JSON.parse(localStorage.getItem(`loyalty`));

  if(total_Lp>0){
    alert("Congratulations! You have earned "+  total_Lp + " loyalty points so far");
  }
  else{
      alert("Sorry! You don't have any loyalty points so far");
  }
}