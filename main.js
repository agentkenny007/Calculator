var in1 = document.getElementById("value-one"),
    in2 = document.getElementById("value-two"),
    btn = document.getElementById("calculate-button"),
    ans = document.getElementById("answer"),
    add = function(e){
        var val1 = in1.value, val2 = in2.value;
        if (isNaN(val1) || isNaN(val2)){
            alert("One of the values you entered is not a number!");
        } else {
            if (val1 == '') val1 = 0; if (val2 == '') val2 = 0;
            ans.innerHTML = val1 + " + " + val2 + " = " + (Number(val1) + Number(val2));
        }
        e.preventDefault();
    };

btn.addEventListener("click", add);
