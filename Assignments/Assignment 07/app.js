var hourSpan = document.getElementById('hourSpan');

var minSpan = document.getElementById('minSpan');

var secSpan = document.getElementById('secSpan');

var amPmSpan = document.getElementById('amPmSpan');

// digital Clock logic
function digitalClock() {

  var dateObj = new Date();
  var hour = dateObj.getHours();
  var amPm = "";

  // am pm logic
  
if(hour == 0){
  hour = 12;
  amPm = "AM";
}
else if(hour >=1 && hour <=11){
  amPm = "AM";
}
else{
  if(hour == 12){
    amPm = "PM";
  } else {
    hour -= 12;
    amPm = "PM";
  }
}


  if (hour < 10){
    
    hourSpan.innerText = "0" + hour;
    
  } else {
    hourSpan.innerText = hour;
  }
  
  if (dateObj.getMinutes()<10){
    
    minSpan.innerText = "0" + dateObj.getMinutes();
    
  } else {
    minSpan.innerText = dateObj.getMinutes();
  }
  
  if (dateObj.getSeconds()<10) {
    
    secSpan.innerText = "0" + dateObj.getSeconds();
    
  } else {
    
    secSpan.innerText = dateObj.getSeconds();
    
  }

  amPmSpan.innerText = amPm;
  
  var days = ['Sun', 'Mon', 'Tue', 'Wed','Thur', 'Fri', 'Sat' ];

  var months = ['Jan', 'Feb', 'March', 'Apr','May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

  var today = dateObj.getDay();
  var currentMonth = dateObj.getMonth();
  var date = dateObj.getDate();
  var currentYear = dateObj.getFullYear();

  var daySpan = document.getElementById('daySpan');
  var monthSpan = document.getElementById('monthSpan');
  var dateSpan = document.getElementById('dateSpan');
  var yearSpan = document.getElementById('yearSpan');

  daySpan.innerText = days[today];
  monthSpan.innerText = months[currentMonth];
  dateSpan.innerText = date;
  yearSpan.innerText = currentYear;
  
}  
  setInterval(digitalClock, 1000);