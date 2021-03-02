//create request
var req;
if (window.XMLHttpRequest) {
    req = new XMLHttpRequest();
}
else if (window.ActiveXObject) {
    req = new ActiveXObject("Msxml2.XMLHTTP");
}
else {
    console.log("Ajax not supported");
}
//state change listener
req.onreadystatechange = function() {
  var txt = "";
  if (this.readyState == 4 && this.status == 200) {
    var response = this.responseText;
    console.log(response);
    document.getElementById("answer").innerHTML = response;
  }
};

//get checked boxes
var bookButton = document.getElementById('priceCheck');
bookButton.onclick = function(){
  var checkboxes = document.getElementsByClassName('bookCheckbox');
  var checkboxesChecked = [];
  for (var i=0; i<checkboxes.length; ++i) {
     if (checkboxes[i].checked) {
        checkboxesChecked.push(checkboxes[i].value);
     }
  }
  //create a POST with checkboxes as parameters
  var params = 'bookArray=' + checkboxesChecked;
    req.open('POST', "/?", true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.send(params);
}
