    function agregar(valor) {
        let pantalla = document.getElementById("pantalla");

        if (pantalla.textContent === "0") {
            pantalla.textContent = valor;
        } else {
            pantalla.textContent += valor;
        }
    }

    function calcular() {
        let pantalla = document.getElementById("pantalla");
        let expresion = pantalla.textContent;

        // Validar que la expresión no termine en operador
        if (/[+\-*/]$/.test(expresion)) {
            return;
        }

        let resultado = evaluarExpresion(expresion);
        
        if (resultado === null) {
            pantalla.textContent = "Error";
        } else {
            pantalla.textContent = Math.round(resultado * 100000000) / 100000000;
        }
    }

    function evaluarExpresion(expresion) {
        // Primero resolver multiplicaciones y divisiones
        let numeros = [];
        let operadores = [];
        let numeroActual = "";
        
        for (let i = 0; i < expresion.length; i++) {
            let char = expresion[i];
            
            if (char === '+' || char === '-' || char === '*' || char === '/') {
                // Manejar números negativos
                if (char === '-' && (i === 0 || '+-*/'.includes(expresion[i-1]))) {
                    numeroActual += char;
                } else {
                    if (numeroActual === "") return null;
                    numeros.push(parseFloat(numeroActual));
                    operadores.push(char);
                    numeroActual = "";
                }
            } else {
                numeroActual += char;
            }
        }
        
        if (numeroActual === "") return null;
        numeros.push(parseFloat(numeroActual));

        // Validar números
        for (let num of numeros) {
            if (isNaN(num)) return null;
        }

        // Resolver * y / primero
        let i = 0;
        while (i < operadores.length) {
            if (operadores[i] === '*') {
                numeros[i] = numeros[i] * numeros[i + 1];
                numeros.splice(i + 1, 1);
                operadores.splice(i, 1);
            } else if (operadores[i] === '/') {
                if (numeros[i + 1] === 0) return null; // División por cero
                numeros[i] = numeros[i] / numeros[i + 1];
                numeros.splice(i + 1, 1);
                operadores.splice(i, 1);
            } else {
                i++;
            }
        }

        // Resolver + y -
        let resultado = numeros[0];
        for (let i = 0; i < operadores.length; i++) {
            if (operadores[i] === '+') {
                resultado = resultado + numeros[i + 1];
            } else if (operadores[i] === '-') {
                resultado = resultado - numeros[i + 1];
            }
        }

        return isFinite(resultado) ? resultado : null;
    }

    function limpiar() {
        document.getElementById("pantalla").textContent = "0";
    }

