function myEscope() {                                    // Function of not interviewing at Global Escope

    /* IMC = Índice de Massa Corporal (Body Mass Index) */

    const title = document.querySelector(".title");
    title.innerHTML = "Tabela IMC";

    const info = document.querySelector("#ideal-weight");
    info.innerHTML = "";
    info.classList.add("hide");

    const form = document.querySelector("#form")
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const inputWeight = document.querySelector(".weight");
        const inputHeight = document.querySelector(".height");
        const weight = Number(inputWeight.value);
        const height = Number(inputHeight.value);

        if (!weight) {                                   // Weight Value Unexpected
            let msg = "Peso Inválido!";
            setResult(msg, false);
            return;
        }
        if (!height) {                                   // Height Value Unexpected
            let msg = "Altura Inválida!";
            setResult(msg, false);
            return;
        }

        const imc = calculateIMC(weight, height);
        const situation = situationIMC(imc);
        const maxIMC = (imc <= 24.9);
        const minIMC = (imc >= 18.5);
        let msg = `Seu IMC é ${imc}! ${situation}`;
        setResult(msg, true);
        
        if (maxIMC === false) {
            return maxWeight(weight, height);
        }
        if (minIMC === false) {
            return minWeight(weight, height);
        }
    });

    function calculateIMC(weight, height) {             // Function to calculate Body Mass Index (portuguese - IMC)
        const calculation = (weight / (height ** 2));
        return calculation.toFixed(2);
    };

    function situationIMC(imc) {                        // To verify weight situation
        const situation = [
            "Você está abaixo do peso!", "Você está com um peso normal!",
            "Você está com sobrepeso!", "Você está com obesidade grau 1!",
            "Você está com obesidade grau 2!", "Você está com obesidade grau 3!",
        ];

        if (imc < 18.5) return situation[0];
        if (imc >= 18.5 && imc <= 24.9) return situation[1];
        if (imc > 24.9 && imc <= 29.9) return situation[2];
        if (imc > 29.9 && imc <= 34.9) return situation[3];
        if (imc > 34.9 && imc <= 39.9) return situation[4];
        if (imc > 39.9) return situation[5];
    };

    function maxWeight (weight, height) {
        info.classList.remove("hide");
        const calcMax = (24.9 * (height ** 2));
        const action = (weight - calcMax);
        const paragraph = document.createElement("p");
        paragraph.innerHTML = `
        O seu 'peso máximo' ideal, seria de: <mark> ${calcMax.toFixed(2)}Kg </mark> <br />
        Você precisa emagrecer <mark> ${action.toFixed(2)}Kg </mark>
        `;
        info.appendChild(paragraph);
    };

    function minWeight (weight, height) {
        info.classList.remove("hide");
        const calcMin = (18.5 * (height ** 2));
        const action = (calcMin - weight);
        const paragraph = document.createElement("p");
        paragraph.innerHTML = `
        O seu 'peso mínimo' ideal, seria de: <mark> ${calcMin.toFixed(2)}Kg </mark> <br />
        Você precisa ganhar <mark> ${action.toFixed(2)}Kg </mark>
        `;
        info.appendChild(paragraph);
    };

    function setResult(msg, isValid) {
        const result = document.querySelector(".result");
        result.innerHTML = "";
        info.innerHTML = "";
        info.classList.add("hide");
        const paragraph = document.createElement("p");
        if (isValid === true) paragraph.classList.add("result-true");
        if (isValid === false) paragraph.classList.add("result-false");
        paragraph.innerHTML = msg;
        result.appendChild(paragraph);
    };

}

myEscope();
