var hourSpan = document.getElementById('hourSpan');

var minSpan = document.getElementById('minSpan');

var secSpan = document.getElementById('secSpan');

var amPmSpan = document.getElementById('amPmSpan');

// digital Clock logic
function digitalClock() {

  var currentTime = new Date();
  var hour = currentTime.getHours();
  var amPm = "";

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

  //--------------------------------
  if (hour < 10){
    
    hourSpan.innerText = "0" + hour;
    
  } else {
    hourSpan.innerText = hour;
  }
  
  if (currentTime.getMinutes()<10){
    
    minSpan.innerText = "0" + currentTime.getMinutes();
    
  } else {
    minSpan.innerText = currentTime.getMinutes();
  }
  
  if (currentTime.getSeconds()<10) {
    
    secSpan.innerText = "0" + currentTime.getSeconds();
    
  } else {
    
    secSpan.innerText = currentTime.getSeconds();
    
  }

  amPmSpan.innerText = amPm;
  
}  
  setInterval(digitalClock, 1000);

  var dateObj = new Date();
  
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
