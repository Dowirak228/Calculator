// Math Round
(function() {
   /**
    * Корректировка округления десятичных дробей.
    *
    * @param {String}  type  Тип корректировки.
    * @param {Number}  value Число.
    * @param {Integer} exp   Показатель степени (десятичный логарифм основания корректировки).
    * @returns {Number} Скорректированное значение.
    */
   function decimalAdjust(type, value, exp) {
     // Если степень не определена, либо равна нулю...
     if (typeof exp === 'undefined' || +exp === 0) {
       return Math[type](value);
     }
     value = +value;
     exp = +exp;
     // Если значение не является числом, либо степень не является целым числом...
     if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
       return NaN;
     }
     // Сдвиг разрядов
     value = value.toString().split('e');
     value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
     // Обратный сдвиг
     value = value.toString().split('e');
     return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
   }
 
   // Десятичное округление к ближайшему
   if (!Math.round10) {
     Math.round10 = function(value, exp) {
       return decimalAdjust('round', value, exp);
     };
   }
   // Десятичное округление вниз
   if (!Math.floor10) {
     Math.floor10 = function(value, exp) {
       return decimalAdjust('floor', value, exp);
     };
   }
   // Десятичное округление вверх
   if (!Math.ceil10) {
     Math.ceil10 = function(value, exp) {
       return decimalAdjust('ceil', value, exp);
     };
   }
 })();
////////////////////////////////////////


//Calculator code is below


let a = '' //first number
let b = '' //second number
let sign = '' // + - * /
let finish = false


const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['X', '/', '+', '-']


//display

const out = document.querySelector('.calc-screen p');

function clearAll() {
   a = ''
   b = ''
   sign = ''
   finish = false
   out.textContent = 0
}

document.querySelector('.ac').addEventListener('click', clearAll);

document.querySelector('.buttons').addEventListener('click', function(event) {
   if (!event.target.classList.contains('btn')) return;
   if (event.target.classList.contains('ac')) return;

   out.textContent = ''

   let key = event.target.textContent;

   if (digit.includes(key)) {
      if (b === '' && sign === '') {
         if (key === '.' && a.includes('.')) {
            a += '';
            out.textContent = a;
         } else {
            a += key;
            out.textContent = a;
         }
      } else if (a !== '' && b !== '' && finish) {
         finish = false
         if (key === '.' && b.includes('.')) {
            b += '';
            out.textContent = b;
         } else {
            b += key;
            out.textContent = b;
         }
      } else {

         if (key === '.' && b.includes('.')) {
            b += '';
            out.textContent = b;
         } else {
            b += key;
            out.textContent = b;
         }
      }
      console.log(a, b, sign);
      return
   }

   if (action.includes(key)) {
      sign = key
      out.textContent = sign
      console.log(a, b, sign);
      return
   }

   // clicked =
   if (key === '=') {
      if (b === '') b = a;
      switch (sign) {
         case '+':
            a = (+a) + (+b);
            break;
         case '-':
            a = a - b;
            break;
         case 'X':
            a = a * b;
            break;
         case '/':
            if (b === '0') {
               out.textContent = 'Ошибка'
               a = ''
               b = ''
               sign = ''
               return
            }
            a = a / b;
            break;
      }
      finish = true
      out.textContent =  Math.round10(a, -1)
      console.log(a, b, sign);
   }

   if (key === '+/-') {
      a = -a
      out.textContent = a
      return
   }

   if (key === '%') {
      a = a / 100
      out.textContent = a
      return
   }
})






















