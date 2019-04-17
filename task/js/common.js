let xhr = new XMLHttpRequest();
let response = '';
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      response = JSON.parse(xhr.responseText);
      getData();
    }
};
xhr.open("GET", "https://raw.githubusercontent.com/Zykli/data/master/data.json",);
xhr.send();

function getData(){
  
  let personName = document.querySelectorAll('.person-name');
  let personValue = document.querySelectorAll('.person-value');

  for (let i = 0; i < personName.length; i++) {
    personName[i].innerHTML = response[i].displayName + '<br>'
    personValue[i].innerHTML = response[i].curValue
  }

}
