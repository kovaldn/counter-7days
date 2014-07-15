function CountdownTimer(elm,tl,mes){
  this.initialize.apply(this,arguments);
}

CountdownTimer.prototype={ 
  initialize:function(elm,tl,mes) {
    var elem = document.getElementById(elm);
    // console.log(elem);
    if(elem){
      this.elem = elem;
      this.tl = tl;
      this.mes = mes;   
      this.countDown();
    }
  },
  countDown:function(){
    // console.log('in countDown');
    var timer='',
        today=new Date(),
        day=Math.floor((this.tl-today)/(24*60*60*1000)),
        hour=Math.floor(((this.tl-today)%(24*60*60*1000))/(60*60*1000)),
        min=Math.floor(((this.tl-today)%(24*60*60*1000))/(60*1000))%60,
        sec=Math.floor(((this.tl-today)%(24*60*60*1000))/1000)%60%60,
        me=this;

    if( ( this.tl - today ) > 0 ){
      timer = '<span class="number-wrapper"><div class="caption">Дней</div><span class="number day">'+this.addZero(day)+'</span></span><span class="separator">:</span>' + 
      '<span class="number-wrapper"><div class="caption">Часов</div><span class="number hour">'+this.addZero(hour)+'</span></span><span class="separator">:</span>' + 
      '<span class="number-wrapper"><div class="caption">Минут</div><span class="number min">'+this.addZero(min)+'</span></span><span class="separator">:</span>' + 
      '<span class="number-wrapper"><div class="caption">Секунд</div><span class="number sec">'+this.addZero(sec)+'</span></span>';
      if(this.elem){
        this.elem.innerHTML = timer;
        tid = setTimeout( function(){me.countDown();},10 );
      }else{
        this.elem.innerHTML = this.mes;
        return;
      }
    }else{
      return false;
    }
  },
  addZero:function(num){ 
    return ('0'+num).slice(-2); 
  }
}

window.onload=function(){
  var endmes = '<span class="number-wrapper"><span class="number end">Акция закончилась!</span></span>', // сообщение, которое появится в конце акции
      t, // объект даты, по достижению которой акция закончится
      today = new Date(),
      day = today.getDate(), // день сейчас 
      month = today.getMonth(), // месяц сейчас
      year = today.getFullYear(); // год сейчас 

  // Акция длится не более 7 - 9 дней
  if(day<7){
    t = new Date(year, month, 7, 23, 59, 59 );
  }else if(7<=day && day<14){    
    t = new Date(year, month, 14, 23, 59, 59 );
  }else if(14<=day && day<21){ 
    t = new Date(year, month, 21, 23, 59, 59 );
  }else if(21<=day && day<31){ // если в месяце меньше 31 дня, то Date просто перейдет на следующий месяц
    t = new Date(year, month, 31, 23, 59, 59 );
  }

  new CountdownTimer('countdown1', t, endmes);
}
