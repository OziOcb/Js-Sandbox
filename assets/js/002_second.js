function basicOp(operator, value1, value2) {
  switch (operator) {
    case '+':
      return(value1 + value2);
      break;
    case '-':
      return(value1 - value2);
      break;
    case '*':
      return(value1 * value2);
      break;
    case '/':
      return(value1 / value2);
      break;
    default:
      return 'Invalid Operator';
      break;
  }
};



console.log('score: ' + basicOp('+',10,5)); 
