//_________________________________//
//////////-- MODIFIER ICI --/////////

//// Variables communues ////

// Temps min et max entre l'affichage de deux "épreuves"
// Temps en Milisecondes, donc 15000 = 15 secondes (pas d'espaces)
const tempsMin = 15000;
//const tempsMin = 1000;
const tempsMax = 40000;
//const tempsMax = 2000;

////

//// Variables pour l'ordre des chiffres ////
//
// Chiffre minimal pour l'ordre des chiffres
const chiffreMin = 1;
//
// Chiffre maximal pour l'ordre des chiffres
const chiffreMax = 50;
//
// Nombre de chiffres pour l'ordre des chiffres
const nombreDeChiffres = 5;
//
// Temps d'affichage des chiffres
const tempsAffichageChiffres = 5000;
//
////

//// Variables pour les calculs ////
//
// Chiffre minimal pour l'ordre des chiffres
const chiffreMinCalculs = 1;
//
// Chiffre maximal pour l'ordre des chiffres
const chiffreMaxCalculs = 20;
//
// Nombre de calculs
const nombreDeCalculs = 5;
//
// Types d'opérations (mettre deux // pour commenter)
const operations = ['+', '-'];
//const operations = ['+', '-', '*', '/'];
//
// Temps d'affichage des chiffres
const tempsAffichageCalculs = 10000;
//
////

/////////////////////////////////////


//_________________________________//
///////////NE PAS TOUCHER////////////
let entiers = [];
let oldTime = 0;
let randomTime = 0;
let iNbChiffre = 0;
let iNbCalculs = 0;
let calculsArray = [];

document.addEventListener('DOMContentLoaded', (event) => {
    const ordreChiffre = document.getElementById('ordreChiffre');
    const symboles = document.getElementById('symboles');
    const calculs = document.getElementById('calculs');

    console.log("Démarrage du script");
    generateCalculs();

    generateChiffre();

    // at random times, display a number in the ordreChiffre div
    // Then show the whole number list

    for (let i = 0; i < (nombreDeChiffres + nombreDeCalculs); i++) {
        // Generate a random time between 15 seconds (15000 ms) and 40 seconds (40000 ms)
        randomTime = generateRandomTime();
        oldTime = randomTime;

        if (iNbChiffre < nombreDeChiffres) {
            if (iNbCalculs < nombreDeCalculs) {
                if (Math.random() < 0.5) {
                    showChiffre(iNbChiffre);
                    iNbChiffre++;
                } else {
                    showCalcul(iNbCalculs);
                    iNbCalculs++;
                }
            } else {
                showChiffre(iNbChiffre);
                iNbChiffre++;
            }
        } else {
            if (iNbCalculs < nombreDeCalculs) {
                showCalcul(iNbCalculs);
                iNbCalculs++;
            }
        }
    }


    showFormChiffre();

    showFormCalculs();

});

function generateRandomTime() {
    return oldTime + Math.floor(Math.random() * (tempsMax - tempsMin + 1) + tempsMin);
}

function generateChiffre() {
    // générer nombreDeChiffres entiers entre 1 et chiffreMax
    entiers = Array.from({ length: nombreDeChiffres }, () => generateRandomChiffre(chiffreMin, chiffreMax));
}

function generateRandomChiffre(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showChiffre(i) {
    setTimeout(() => {
        ordreChiffre.innerHTML = entiers[i];
        console.log("Showed :", entiers[i]);
        if (i !== nombreDeChiffres - 1) {
            setTimeout(() => {
                ordreChiffre.innerHTML = "";
            }, tempsAffichageChiffres);
        }
    }, randomTime);
}

function showFormChiffre() {
    setTimeout(() => {
        const form = document.createElement('form');
        const label = document.createElement('label');
        const input = document.createElement('input');
        const submit = document.createElement('input');

        label.for = 'ordre';
        label.innerHTML = 'Suite de chiffres séparés par des espaces<br>';

        input.type = 'text';
        input.id = 'ordre';
        input.required = true;

        submit.type = 'submit';
        submit.value = 'Valider';
        ordreChiffre.innerHTML = "";

        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(submit);

        ordreChiffre.appendChild(form);


        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const ordre = input.value.split(' ').map(Number);

            ordreChiffre.innerHTML = "Ordre correct : " + entiers.join(' - ');
            ordreChiffre.innerHTML += "<br>Ordre entré&nbsp;&nbsp;&nbsp;&nbsp;: " + ordre.join(' - ');

            if (JSON.stringify(ordre) === JSON.stringify(entiers)) {
                ordreChiffre.innerHTML += "<br>Bravo !";
            } else {
                ordreChiffre.innerHTML += "<br>Dommage !";
            }
        });
    }, randomTime + 3000);
}

function generateCalculs() {
    for (let i = 0; i <= nombreDeCalculs - 1; i++) {
        let operation = operations[Math.floor(Math.random() * operations.length)];
        let chiffre1 = generateRandomChiffre(chiffreMinCalculs, chiffreMaxCalculs);
        let chiffre2 = generateRandomChiffre(chiffreMinCalculs, chiffreMaxCalculs);

        if ((operation === "-" || operation === "/") && chiffre1 < chiffre2) {
            [chiffre1, chiffre2] = [chiffre2, chiffre1];
        }

        calculsArray.push([chiffre1, operation, chiffre2]);
    }
    console.log(calculsArray);
}

function showCalcul(i) {
    setTimeout(() => {
        calculs.innerHTML = calculsArray[i][0] + " " + calculsArray[i][1] + " " + calculsArray[i][2];
        console.log("Showed :", calculsArray[i][0] + " " + calculsArray[i][1] + " " + calculsArray[i][2]);

        if (i !== nombreDeCalculs - 1) {
            setTimeout(() => {
                calculs.innerHTML = "";
            }, tempsAffichageCalculs);
        }
    }, randomTime);
}

function showFormCalculs() {
    setTimeout(() => {
        const form = document.createElement('form');
        const submit = document.createElement('input');

        calculsArray.forEach(calcul => {
            let i = calculsArray.indexOf(calcul);
            const label = document.createElement('label');
            const input = document.createElement('input');

            label.for = 'calc' + i;
            label.innerHTML = 'Calcul ' + i + ' : ';

            input.type = 'text';
            input.id = 'calc' + i;
            input.required = true;

            form.appendChild(label);
            form.appendChild(input);
            form.appendChild(document.createElement('br'));
        });

        submit.type = 'submit';
        submit.value = 'Valider';
        calculs.innerHTML = "";


        form.appendChild(submit);

        calculs.appendChild(form);


        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const userResults = [];
            const correctResults = [];

            for (let i = 0; i < nombreDeCalculs; i++) {
                const input = document.getElementById('calc' + i);
                const userResult = Number(input.value);
                const [num1, operation, num2] = calculsArray[i];
                let correctResult;

                switch (operation) {
                    case '+':
                        correctResult = num1 + num2;
                        break;
                    case '-':
                        correctResult = num1 - num2;
                        break;
                    case '*':
                        correctResult = num1 * num2;
                        break;
                    case '/':
                        correctResult = num1 / num2;
                        break;
                    default:
                        break;
                }

                userResults.push(userResult);
                correctResults.push(correctResult);
            }

            calculs.innerHTML = "Résultats corrects : " + correctResults.join(' - ');
            calculs.innerHTML += "<br>Résultats entrés&nbsp;&nbsp;&nbsp;&nbsp;: " + userResults.join(' - ');
        });
    }, randomTime + 3000);
}