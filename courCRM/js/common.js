(function workDay(){
  let template = document.getElementById('workDayTemplate'),
      workDay = template.content.querySelector('.workDay'),
      article = document.querySelector('article'),
      weekSalary = document.getElementById('weekSalary'),
      storageDOM = localStorage.getItem('content');

  if(storageDOM) article.innerHTML = storageDOM;
  
  let observer = new MutationObserver(function(mutation){
    localStorage.setItem('content', article.innerHTML);
  });

  observer.observe(article, {childList: true, characterData: true, subtree: true, attributeFilter: ['value']});

  document.addEventListener('click', function(e){
    let tar = e.target;

    //close all select boxes in the document, except the current
    if(!tar.closest('.selectSelected')){
      closeAllSelect();
    }

    setTimeout(() => {

     //custom slider
      if(tar.closest('.selectSelected')){
        closeAllSelect(tar);
        let hideList = tar.nextElementSibling;
        tar.classList.toggle('select-arrow-active');
        hideList.classList.toggle('selectHide');
      }

        if(tar.closest('.selectItems')){
          let selfSelect = tar.parentElement.parentElement.querySelector('.selectSelected'),
              currentDelevery = tar.closest('.delivery'),
              listEl = tar.parentElement.children,
              tarValue = tar.getAttribute('value'),
              mkad = currentDelevery.querySelector('input[name=mkad]'),
              cost = currentDelevery.querySelector('input[name=cost]');


          for (let i = 0; i < listEl.length; i++) {
            listEl[i].classList.remove('currentSelect');
          }

          tar.classList.add('currentSelect');
          selfSelect.innerHTML = tar.innerHTML;
          selfSelect.setAttribute('value', tarValue);
          cost.setAttribute('value', calc(tarValue, mkad.value));
          cost.value = cost.getAttribute('value');

          //calc dayProfit
          calcProfit(tar);
          calcSalary()
        }
      //slider end

      function calc(value, distance){
        if(!isNumeric(distance)) distance = 0;
        return distance * 40 + +value;
      }

    },);

    if(tar.closest('#createDay')) {
      let copyWorkDay = workDay.cloneNode(true);
      copyWorkDay.querySelector('.date').innerHTML = getTime();
      article.prepend(copyWorkDay);

      calcSalary();
    }
    if(tar.closest('.close')) {
      let current = tar.closest('.workDay');
      if(confirm('Are you sure?')) current.remove();

      calcSalary();
    }
    if(tar.closest('.addDelivery')){
      let copy = workDay.querySelector('.delivery').cloneNode(true);

      tar.closest('.addDelivery').before(copy);

      calcProfit(tar);
      calcSalary();
    }
    if(tar.closest('.invoiceNum')){
      tar.addEventListener('input', function(){
        this.setAttribute('value', this.value)
      })
    }
    if(tar.closest('.mkadOutside')){
      let selectValue = tar.closest('.delivery').querySelector('.selectSelected').getAttribute('value'),
          cost = tar.closest('.delivery').querySelector('input[name=cost]');

      tar.addEventListener('input', function(){
        cost.value = this.value * 40 + +selectValue;
        cost.setAttribute('value', cost.value);
        this.setAttribute('value', this.value);

        calcProfit(tar);
        calcSalary();
      });

    }
    if(tar.closest('.cost')){
      let selectSelected = tar.closest('.delivery').querySelector('.selectSelected');

      tar.addEventListener('input', function(){
        this.setAttribute('value', this.value);
        selectSelected.setAttribute('value', this.value);

        calcProfit(tar);
        calcSalary();
      });
    }

  });

  function calcSalary(){

    let allDayProfit = document.querySelectorAll('.todayValue'),
        total = 0;
        
    if(allDayProfit){
      for (let i = 0; i < allDayProfit.length; i++) {
        total += +allDayProfit[i].innerHTML;
      }
      weekSalary.innerHTML = total;
    }

  }

  function calcProfit(currentTar){
    let dayCostEl = currentTar.closest('.workDay').querySelectorAll('input[name=cost]'),
        todayValue = currentTar.closest('.workDay').querySelector('.todayValue'),
        dayProfit = 0;

    for (let i = 0; i < dayCostEl.length; i++) {
      dayProfit += +dayCostEl[i].value;
    }
    todayValue.innerHTML = dayProfit;
  };

  function isNumeric(km) {
    return !isNaN(parseFloat(km)) && isFinite(km);
  };

  function getTime() {

    const DATE = new Date();
    const WEEK = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];

    let day = WEEK[DATE.getDay()];

    let numDay = DATE.getDate();
    if(numDay < 10) numDay = '0'+ numDay;

    let month = DATE.getMonth() + 1;
    if(month < 10) month = '0'+ month;

    let seconds = DATE.getSeconds();
    if(seconds < 10) seconds = '0'+ seconds;
    return  day + ' ' + numDay + '.' + month;
    
  };

  function closeAllSelect(el) {
    let i, 
        arrNo = [],
        allSelect = document.querySelectorAll('.selectSelected'),
        allList = document.querySelectorAll('.selectItems');
    for (i = 0; i < allSelect.length; i++) {
      if (el == allSelect[i]) {
        arrNo.push(i)
      } else {
        allSelect[i].classList.remove('select-arrow-active');
      }
    }
    for (i = 0; i < allList.length; i++) {
      if (arrNo.indexOf(i)) {
        allList[i].classList.add('selectHide');
      }
    }
  };


})();

console.log('\n \
                            \n  \
        ROFL:ROFL:ROFL:ROFL \n  \
              ___^___ _     \n  \
    L     ____/      [] \\   \n  \
  L O L===____           \\  \n  \
    L         \\___ ___ ___] \n  \
                  I   I      \n  \
              ----------/    \n  \
')