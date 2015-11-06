var input      = 0,
    result     = 0,
    expression = new Array();
    prev_value = 0;
    prev_prev_value =0;
    signFlg = false;
    sign = "=";
    prev_sign = "=";

$(".reset").click(function() {
    input      = 0,
    result     = 0,
    expression = new Array();
    prev_value = 0;
    prev_prev_value =0;
    signFlg = false;
    sign = "=";
    $('.result > p').text(result);
});

$(".calc-button").click(function() {
  input = $(this).children('p').text();
  if ($.isNumeric(input)) {
    console.log('num'+input);
    if(signFlg){
      signFlg = false;
      result = 0;
    }

    // if(sign == "="){
    //   result = 0;
    // }
    input = parseInt(input);
    result = result * 10 + input;
  }
  else {
    switch (input) {
      case "=":
        calc();
        signFlg = false;
        prev_sign = sign;
        sign = "=";
        prev_value = 0;
        break;
      case "＋":
      if(!signFlg){
        //prev_prev_value = prev_value;
        calc();
        prev_sign = sign;
        sign = "+";
        signFlg = true;
      }
        break;
      case "−":
      if(!signFlg){
        //prev_prev_value = prev_value;
        signFlg = true;
        calc();
        prev_sign = sign;
        sign = "-";
        signFlg = true;
      }
        break;
      case "÷":
      if(!signFlg){
        //prev_prev_value = prev_value;
        signFlg = true;
        calc();
        sign = "/";
        signFlg = true;
      }
        break;
      case "×":
      if(!signFlg){
        //prev_prev_value = prev_value;
        signFlg = true;
        calc();
        prev_sign = sign;
        sign = "*";
        signFlg = true;
        break;
      }
      default:
        console.log("Input Error: " + input);
    };
  };
  $('.result > p').text(result);
  console.log("result: "+result);
  console.log("prev: "+prev_value);
  console.log("prev_prev_value: " + prev_prev_value);
});

function calc(){
  switch(sign){
    case "=":
      if(signFlg){
        prev_value = 0;
      }
      prev_value += result;
      break;
    case "+":
      prev_prev_value += prev_value;
      prev_value = result;
      result = prev_prev_value + prev_value;
      break;
    case"-":
      prev_prev_value += prev_value;
      prev_value = -result;
      result = prev_prev_value + prev_value;
     break;
    case"*":
      prev_value *= result;
      result = prev_prev_value + prev_value;
     break;
    case"/":
      prev_value /= result;
      prev_value = Math.round(prev_value);
      result = prev_prev_value + prev_value;
     break;
  }
}
