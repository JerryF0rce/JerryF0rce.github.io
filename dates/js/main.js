function getDates( weekDays, lastDate) {
  if(typeof lastDate === 'string') lastDate = new Date(lastDate);
  
  var today = new Date(), dow, i, D, datesPool = [], result = [];
  dow = today.getDay(); 
  for(i=0; i<7; i++) {
	 if( !~weekDays.indexOf( (dow + i)%7)) continue;
	 D = new Date();
	 D.setTime( today.getTime());
	 D.setDate( D.getDate() + i);
	 if( D.getTime() > lastDate.getTime()) continue;
	 datesPool.push( D);
  }
  
  if( datesPool.length === 0) return result;
  
  while(true) {
	 for( i = 0; i < datesPool.length; i++) {
		D = datesPool[i];
		if( D.getTime() > lastDate.getTime()) {
			return result.join('');
		};
		if( result.length > 1000) return result;
		result.push( "<br>" + "<pre>" + D.getDate() + "." + (1 + D.getMonth())
		 + "." +  D.getFullYear().toString().substr(2));
		D.setDate( D.getDate() + 7);
	 }
  }
}


document.addEventListener("DOMContentLoaded", function() { 
  var one = +prompt("Введите дeнь недели в числовом формате (1-7)");
  var two = +prompt("Введите дeнь недели в числовом формате (1-7)");

	document.getElementById('name').innerHTML = getDates( [one,two], '2018-05-25');
	
});