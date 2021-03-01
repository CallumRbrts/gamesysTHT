var req;
if (window.XMLHttpRequest) {
    req = new XMLHttpRequest();
}
else if (window.ActiveXObject) {
    req = new ActiveXObject("Msxml2.XMLHTTP");
}
else {
    // Ajax not supported

}
req.onreadystatechange = function() {
  var txt = "";
  if (this.readyState == 4 && this.status == 200) {
    var response = this.responseText;
    console.log (response);
    document.getElementById("answer").innerHTML = response;
  }
};

var bookButton = document.getElementById('priceCheck');
bookButton.onclick = function(){
  var checkboxes = document.getElementsByClassName('bookCheckbox');
  var checkboxesChecked = [];
  for (var i=0; i<checkboxes.length; i++) {
     if (checkboxes[i].checked) {
        checkboxesChecked.push(checkboxes[i].value);
     }
  }
  var params = 'bookArray=' + checkboxesChecked;
    req.open('POST', "/?", true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.send(params);

}
