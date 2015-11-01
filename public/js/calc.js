var input      = 0,
    result     = 0,
    expression = new Array();
$(".calc-button").click(function() {
  input = $(this).children('p').text();
  if ($.isNumeric(input)) {
    input = parseInt(input);
    result = result * 10 + input;
  }
  else if (expression.length <= 0) {
    expression.push(result);
  }
  else {
    switch (input) {
      case "=":
        expression.push(result)
        result = 0;
        $.each(expression, function( index, value ) {
          result += parseInt(value);
          console.log( index + ": " + value );
        });
        expression = result;
        break;
      case "＋":
        expression.push(result);
        result = 0;
        break;
      case "−":
        expression.push(-result);
        result = 0;
        break;
      case "÷":
        var len = expression.length;
        if (expression[len-1] == 0) {
          break;
        };
        expression[len-1] = expression[len-1] / result;
        result = 0;
        break;
      case "×":
        var len = expression.length;
        expression[len-1] = expression[len-1] * result;
        result = 0;
        break;
      default:
        console.log("Input Error: " + input);
    };
  };
  $('.result > p').text(result);
  console.log("exp: " + expression);
  console.log("rslt: " + result);
});
