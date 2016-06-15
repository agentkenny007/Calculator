var operation, operationComplete = false, x, y, $ = function(selector){ return document.querySelector(selector); },
    clear = function(){
        x = undefined;
        y = undefined;
        operationComplete = false;
        $('#window').innerHTML = '';
    },
    display = function(str){
        if (operationComplete) clear();
        $('#window').innerHTML += str;
    },
    operate = function(op, str){
        var data = $('#window').innerHTML;
        if (data != '' && !data.includes('+') && !data.includes('-') && !data.includes('/') && !data.includes('*')){
            if (operationComplete) operationComplete = false;
            operation = op;
            x = Number(data);
            $('#window').innerHTML += str;
        }
    },
    float = function(){
        var data = $('#window').innerHTML;
        if (x == undefined){
            if (!data.includes('.')) display('.');
        } else {
            var lastNumber = data.substr(data.lastIndexOf(' '));
            if (!lastNumber.includes('.')) display('.');
        }
    },
    equate = function(op){
        var answer, data = $('#window').innerHTML, lastNumber = data.lastIndexOf(' ');
        y = lastNumber == -1 ? undefined : Number(data.substr(lastNumber));
        switch (op) {
            case 'add':
                answer = x + y;
                break;
            case 'subtract':
                answer = x - y;
                break;
            case 'multiply':
                answer = x * y;
                break;
            case 'divide':
                answer = x / y;
                break;
        }
        if (answer){ // if answer is a number
            $('#window').innerHTML = answer;
            operationComplete = true;
        }
    };

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

$('#add').addEventListener('click', function(){ operate('add', ' + '); });
$('#subtract').addEventListener('click', function(){ operate('subtract', ' - '); });
$('#multiply').addEventListener('click', function(){ operate('multiply', ' * '); });
$('#divide').addEventListener('click', function(){ operate('divide', ' / '); });

$('#clear').addEventListener('click', clear);
$('#decimal').addEventListener('click', float);
$('#equals').addEventListener('click', function(){ equate(operation); });
