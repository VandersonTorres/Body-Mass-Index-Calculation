function myEscope() {                                   // Function of not interviewing at Global Escope

    /* IMC = Índice de Massa Corporal (Body Mass Index) */
    const form = document.querySelector("#form");
    const inputWeight = document.querySelector(".weight");
    const inputHeight = document.querySelector(".height");
    const result = document.querySelector(".result");
    const info = document.querySelector("#ideal-weight");
    const liquid = document.querySelector("#liquid");
    const kcal = document.querySelector("#kcal");
    const slimmingKCAL = 30;
    const maintenanceKCAL = 35;
    const mlWater = 35;

    function calculateIMC(weight, height) {             // Function to calculate Body Mass Index (portuguese - IMC)
        const calculation = (weight / (height ** 2));
        return calculation.toFixed(2);
    };

    function situationIMC(imc) {                        // To verify weight situation
        const situation = [
            "Abaixo do peso!", "Peso normal!",
            "Sobrepeso!", "Obesidade grau 1!",
            "Obesidade grau 2!", "Obesidade grau 3!",
        ];

        if (imc < 18.5) return situation[0];
        if (imc >= 18.5 && imc <= 24.9) return situation[1];
        if (imc > 24.9 && imc <= 29.9) return situation[2];
        if (imc > 29.9 && imc <= 34.9) return situation[3];
        if (imc > 34.9 && imc <= 39.9) return situation[4];
        if (imc > 39.9) return situation[5];
    };

    function maxWeight(weight, height) {
        info.classList.remove("hide");
        const calcMax = (24.9 * (height ** 2));
        const action = (weight - calcMax);
        const paragraph = document.createElement("p");
        paragraph.innerHTML = `Peso Máximo Recomendado: <mark> ${calcMax.toFixed(2)}Kg </mark> <br />`;
        if (action > 0) {
            paragraph.innerHTML += `Situação: Emagrecer <mark> ${action.toFixed(2)}Kg </mark>`;        }
        info.appendChild(paragraph);
    };

    function minWeight(weight, height) {
        info.classList.remove("hide");
        const calcMin = (18.5 * (height ** 2));
        const action = (calcMin - weight);
        const paragraph = document.createElement("p");
        paragraph.innerHTML = `
        Peso Mínimo Recomendado: <mark> ${calcMin.toFixed(2)}Kg </mark> <br />
        Situação: Ganhar <mark> ${action.toFixed(2)}Kg </mark>
        `;
        info.appendChild(paragraph);
    };

    function verifyWater(weight) {
        liquid.classList.remove("hide");
        liquid.innerHTML = "";
        const amountWater = ((weight * mlWater) / 1000);
        const paragraph = document.createElement("p");
        paragraph.innerHTML = `
        Ingestão de líquido: <mark> ${amountWater.toFixed(2)}L </mark>/ Dia`;
        liquid.appendChild(paragraph);
    };

    function kcalLoseWeight(weight) {
        kcal.classList.remove("hide");
        kcal.innerHTML = "";
        let amountKCAL = (weight * slimmingKCAL);
        const paragraph = document.createElement("p");
        paragraph.innerHTML = `
        Necessidade calórica: <mark> ${Math.round(amountKCAL)}Kcal </mark>/ Dia`;
        kcal.appendChild(paragraph);
    };

    function kcalMaintenance(weight) {
        kcal.classList.remove("hide");
        kcal.innerHTML = "";
        let amountKCAL = (weight * maintenanceKCAL);
        const paragraph = document.createElement("p");
        paragraph.innerHTML = `
        Necessidade calórica: <mark> ${Math.round(amountKCAL)}Kcal </mark>/ Dia`;
        kcal.appendChild(paragraph);
    };

    function setResult(msg, isValid) {
        result.innerHTML = "";
        info.innerHTML = "";
        info.classList.add("hide");
        const paragraph = document.createElement("p");
        if (isValid === true) paragraph.classList.add("result-true");
        if (isValid === false) paragraph.classList.add("result-false");
        paragraph.innerHTML = msg;
        result.appendChild(paragraph);
    };

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const weight = Number(inputWeight.value);
        let height = Number(inputHeight.value);

        if (height > 3) {
            height /= 100;
        };

        if (!weight || weight <= 0) {                   // Weight Value Unexpected
            let msg = "Peso Inválido!";
            setResult(msg, false);
            return;
        };

        if (!height || height <= 0) {                   // Height Value Unexpected
            let msg = "Altura Inválida!";
            setResult(msg, false);
            return;
        };

        const imc = calculateIMC(weight, height);
        const situation = situationIMC(imc);
        const maxIMC = (imc <= 24.9);
        const minIMC = (imc >= 18.5);
        let msg = `IMC: ${imc}<br /> Diagnóstico: ${situation}`;
        setResult(msg, true);
        verifyWater(weight);

        if (maxIMC === false && minIMC === true) {
            return maxWeight(weight, height),
            kcalLoseWeight(weight);
        } else if (maxIMC === true && minIMC === true) {
            return kcalMaintenance(weight), 
            maxWeight(weight, height);
        } else if (maxIMC === true && minIMC === false) {
            return minWeight(weight, height),
            kcal.classList.add("hide");
        };

    });

};

myEscope();
