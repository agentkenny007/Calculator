// declare some global variables
/*  x: the first number of the calculator's equation
 *  y: the second number of the equation
 *  operation: the operation to be performed once both numbers have been defined
 *  operationComplete: a boolean indicating whether an operation has been executed
 */
var x, y, operation, operationComplete = false,
    $ = function(selector){ return document.querySelector(selector); }, // selects an object within the DOM using a CSS selector
    clear = function(){ // clears the calculator's screen and reinitialises everything
        x = undefined; // the first number is cleared and is no longer defined
        y = undefined; // the second number is cleared and is no longer defined
        operationComplete = false; // any executed operations are reinitilialised
        $('#window').innerHTML = '0'; // the screen is cleared to zero
    },
    display = function(str){ // displays the parameter str on the screen of the calculator
        if (operationComplete) clear(); // if an operation has been executed, wipes the screen and reinitialises the calculator
        if ($('#window').innerHTML == '0') $('#window').innerHTML = ''; // if the screen is initilised at zero, clear the zero before adding another digit
        $('#window').innerHTML += str; // adds str to the end whatever is on the screen
    },
    operate = function(op, str){ // specifies which operation is to be performed and displays a representation on the screen
        var data = $('#window').innerHTML; // collects the number currently printed on the screen (a string)
        operation = op; // passes the operation to be performed to the global operation variable
        if (operationComplete) operationComplete = false; // any executed operation is reinitilialised
        // if the screen is not at zero and there is not an operation currently being performed
        if (data != '0' && !data.includes('+') && !data.includes('-') && !data.includes('*') && !data.includes('/')){
            x = Number(data); // determines the number on the screen (represented as a string) and coerces it to behave as a number (integer or floating point)
            $('#window').innerHTML += str; // adds the operation character (+,-,*, or /) to the end of the number on the screen
        // otherwise, if there is already an operation currently being performed
        } else if (data.includes('+') || data.includes('-') || data.includes('*') || data.includes('/'))
            $('#window').innerHTML = data.replace(/\s.\s/, str); // replace the current operation represented on the screen with the operation to be performed
    },
    float = function(){ // adds a decimal to the end of the number on the screen
        var data = $('#window').innerHTML; // collects whatever is currently printed on the screen
        if (x == undefined){ // if the first number is yet to be defined and operated upon
            if (data == '0') display('0.'); // and the screen is cleared at zero, just add a decimal to the end
            else if (!data.includes('.')) display('.'); // otherwise, add a decimal to the number on the screen, if one has not already been added
        } else { // if the first number has been operated upon
            var lastNumber = data.substr(data.lastIndexOf(' ')); // collect the second number (a string) in a local variable
            if (!lastNumber.includes('.')) display('.'); // if a decimal has not already been added to the second number, add a decimal to the second number
        }
    },
    equate = function(op){ // determines the answer to the equation on the screen based on it's operation
       /*   answer: stores the computed value of the calculator's equation
        *   data: collects whatever is currently printed on the screen, hopefully an equation
        *   lastNumber: the position just before the second number, if there are two separate numbers on the screen
        *               ^(will evaluate to -1 if there is only one number on the screen)
        */
        var answer, data = $('#window').innerHTML, lastNumber = data.lastIndexOf(' ');
        // uses lastNumber to determine the second number on the screen and converts it to an integer or floating point number
        y = lastNumber == -1 ? undefined : Number(data.substr(lastNumber)); // if there is only one number, y remains undefined
        switch (op) { // evaluates the operation to be performed
            case 'add': // if addition
                answer = x + y; // adds the two numbers
                break;
            case 'subtract': // if subtraction
                answer = x - y; // subtracts the two numbers
                break;
            case 'multiply': // if multiplication
                answer = x * y; // multiplies the two numbers
                break;
            case 'divide': // if division
                answer = x / y; // divides the two numbers
                break;
        }
        if (answer){ // if answer is a number (answer will not be a number if y remains undefined)
            $('#window').innerHTML = answer; // clears the screen and displays the variable answer on the screen
            operationComplete = true; // indicates that an operatation has been executed
        }
    };

// displays the given number after whatever is printed on the screen
$('#_0').addEventListener('click', function(){ display('0'); });
$('#_1').addEventListener('click', function(){ display('1'); });
$('#_2').addEventListener('click', function(){ display('2'); });
$('#_3').addEventListener('click', function(){ display('3'); });
$('#_4').addEventListener('click', function(){ display('4'); });
$('#_5').addEventListener('click', function(){ display('5'); });
$('#_6').addEventListener('click', function(){ display('6'); });
$('#_7').addEventListener('click', function(){ display('7'); });
$('#_8').addEventListener('click', function(){ display('8'); });
$('#_9').addEventListener('click', function(){ display('9'); });

// specifies the operation to be perfomed and displays a representation of said operation on the screen
$('#add').addEventListener('click', function(){ operate('add', ' + '); });
$('#subtract').addEventListener('click', function(){ operate('subtract', ' - '); });
$('#multiply').addEventListener('click', function(){ operate('multiply', ' * '); });
$('#divide').addEventListener('click', function(){ operate('divide', ' / '); });

$('#clear').addEventListener('click', clear); // clears the screen, reinitialises calculator
$('#decimal').addEventListener('click', float); // displays a decimal on the screen
$('#equals').addEventListener('click', function(){ equate(operation); }); // evaluates the equation on the screen
