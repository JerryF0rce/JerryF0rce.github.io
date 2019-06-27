(function workDay(){
   let template = document.getElementById('workDayTemplate'),
       workDay = template.content.querySelector('.workDay'),
       article = document.querySelector('article'),
       weekSalary = document.getElementById('weekSalary'),
       storageDOM = localStorage.getItem('content');
       storageSalary = localStorage.getItem('salary'),
       clearArticleStorage = document.getElementById('clearArticleStorage');
 
   if (storageDOM) article.innerHTML = storageDOM;
   if (storageSalary) weekSalary.innerHTML = storageSalary;
   
   let observer = new MutationObserver(function(mutation){
     localStorage.setItem('content', article.innerHTML);
 
     calcSalary();
     localStorage.setItem('salary', weekSalary.getAttribute('value'))
   });
 
   observer.observe(article, {childList: true, characterData: true, subtree: true, attributeFilter: ['value']});
 
   document.addEventListener('click', function(e){
     let tar = e.target;
 
 
     if (tar.closest('#clearArticleStorage')) {
       if (confirm('Удалить все сохраненные данные?')) {
         localStorage.removeItem('content');
         article.innerHTML = '';
       }
     }
 
     //close all select boxes in the document, except the current
     if (!tar.closest('.selectSelected')){
       closeAllSelect(tar);
     }
 
     setTimeout(() => {
 
      //custom slider
       if (tar.closest('.selectSelected')){
         closeAllSelect(tar);
         let hideList = tar.nextElementSibling;
         tar.classList.toggle('select-arrow-active');
         hideList.classList.toggle('selectHide');
       }
 
         if (tar.closest('.selectItems')){
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
         }
       //slider end
 
       function calc(value, distance){
         if (!isNumeric(distance)) distance = 0;
         return distance * 40 + +value;
       }
 
     },);
 
     if (tar.closest('#createDay')) {
       let copyWorkDay = workDay.cloneNode(true);
       copyWorkDay.querySelector('.date').innerHTML = getTime();
       article.prepend(copyWorkDay);
     }
     if (tar.closest('.close')) {
       let current = tar.closest('.workDay');
       if (confirm('Are you sure?')) current.remove();
     }
     if (tar.closest('.removeDelievery')) {
        //tar.closest('.workDay') ===> <div class="workDay">...</div>
       const workDay = tar.closest('.workDay'); 
       tar.closest('.delivery').remove();
       //tar.closest('.workDay') ===> null
       calcProfit(workDay); //calcProfit(workDay)
     }
     if (tar.closest('.addDelivery')){
       let copy = workDay.querySelector('.delivery').cloneNode(true);
 
       tar.closest('.addDelivery').before(copy);
 
       calcProfit(tar);
     }
     if (tar.closest('.invoiceNum')) {
       tar.addEventListener('input', function(){
         this.setAttribute('value', this.value)
       })
     }
     if (tar.closest('.mkadOutside')) {
       let selectValue = tar.closest('.delivery').querySelector('.selectSelected').getAttribute('value'),
           cost = tar.closest('.delivery').querySelector('input[name=cost]');
 
       tar.addEventListener('input', function(){
         cost.value = this.value * 40 + +selectValue;
         cost.setAttribute('value', cost.value);
         this.setAttribute('value', this.value);
 
         calcProfit(tar);
       });
 
     }
     if (tar.closest('.cost')) {
       let selectSelected = tar.closest('.delivery').querySelector('.selectSelected');
 
       tar.addEventListener('input', function(){
         this.setAttribute('value', this.value);
         selectSelected.setAttribute('value', this.value);
 
         calcProfit(tar);
       });
     }
 
   });
 
   function calcSalary() {
 
     let allDayProfit = document.querySelectorAll('.todayValue'),
         total = 0;
         
     if (allDayProfit) {
       for (let i = 0; i < allDayProfit.length; i++) {
         total += +allDayProfit[i].innerHTML;
       }
       weekSalary.innerHTML = total;
       weekSalary.setAttribute('value', weekSalary.innerHTML)
     }
 
   }
 
   function calcProfit(currentTar) {
      let dayCostEl = currentTar.closest('.workDay').querySelectorAll('input[name=cost]'),
         todayValue = currentTar.closest('.workDay').querySelector('.todayValue'),
         dayProfit = 0;
   
      for (let i = 0; i < dayCostEl.length; i++) {
         dayProfit += +dayCostEl[i].value;
      }
      todayValue.innerHTML = dayProfit;
      todayValue.setAttribute('value', todayValue.innerHTML);
   };
 
   function isNumeric(km) {
     return !isNaN(parseFloat(km)) && isFinite(km);
   };
 
   function getTime() {
 
     const DATE = new Date();
     const WEEK = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
 
     let day = WEEK[DATE.getDay()];
 
     let numDay = DATE.getDate();
     if (numDay < 10) numDay = '0'+ numDay;
 
     let month = DATE.getMonth() + 1;
     if (month < 10) month = '0'+ month;
 
     let seconds = DATE.getSeconds();
     if (seconds < 10) seconds = '0'+ seconds;
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