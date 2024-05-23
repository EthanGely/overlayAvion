//_________________________________//
//////////-- MODIFIER ICI --/////////

//// Variables communues ////

// Temps min et max entre l'affichage de deux "épreuves"
// Temps en Milisecondes, donc 15000 = 15 secondes (pas d'espaces)
let tempsMin = 15000;
//const tempsMin = 1000;
let tempsMax = 40000;
//const tempsMax = 2000;

////

//// Variables pour l'ordre des chiffres ////
//
// Chiffre minimal pour l'ordre des chiffres
let chiffreMin = 1;
//
// Chiffre maximal pour l'ordre des chiffres
let chiffreMax = 50;
//
// Nombre de chiffres pour l'ordre des chiffres
let nombreDeChiffres = 5;
//
// Temps d'affichage des chiffres
let tempsAffichageChiffres = 5000;
//
////

//// Variables pour les calculs ////
//
// Chiffre minimal pour l'ordre des chiffres
let chiffreMinCalculs = 1;
//
// Chiffre maximal pour l'ordre des chiffres
let chiffreMaxCalculs = 20;
//
// Nombre de calculs
let nombreDeCalculs = 5;
//
// Types d'opérations (mettre deux // pour commenter)
let operations = ['+', '-'];
//const operations = ['+', '-', '*', '/'];
//
// Temps d'affichage des chiffres
let tempsAffichageCalculs = 10000;
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


function loadParameters(parameters) {
    if (!parameters) {
        console.log("Pas de paramètres");
        return;
    }
    console.log("Chargement des paramètres");
    tempsMin = parameters.epreuve_temps_min ? parameters.epreuve_temps_min : 15000;
    console.log("Temps min :", tempsMin);
    tempsMax = parameters.epreuve_temps_max ? parameters.epreuve_temps_max : 40000;
    console.log("Temps max :", tempsMax);
    chiffreMin = parameters.memoire_nombre_min ? parameters.memoire_nombre_min : 1;
    console.log("Chiffre min :", chiffreMin);
    chiffreMax = parameters.memoire_nombre_max ? parameters.memoire_nombre_max : 50;
    console.log("Chiffre max :", chiffreMax);
    nombreDeChiffres = parameters.memoire_nombre_nb ? parameters.memoire_nombre_nb : 5;
    console.log("Nombre de chiffres :", nombreDeChiffres);
    tempsAffichageChiffres = parameters.memoire_temps ? parameters.memoire_temps : 5000;
    console.log("Temps affichage chiffres :", tempsAffichageChiffres);
    chiffreMinCalculs = parameters.calculs_nombre_min ? parameters.calculs_nombre_min : 1;
    console.log("Chiffre min calculs :", chiffreMinCalculs);
    chiffreMaxCalculs = parameters.calculs_nombre_max ? parameters.calculs_nombre_max : 20;
    console.log("Chiffre max calculs :", chiffreMaxCalculs);
    nombreDeCalculs = parameters.calculs_nb ? parameters.calculs_nb : 5;
    console.log("Nombre de calculs :", nombreDeCalculs);
    tempsAffichageCalculs = parameters.calcul_temps ? parameters.calcul_temps : 10000;
    console.log("Temps affichage calculs :", tempsAffichageCalculs);
    operations = parameters.calculs_types ? parameters.calculs_types : ['+', '-'];
    console.log("Opérations :", operations);
    console.log("Paramètres chargés");
}

function game() { 
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
}

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
            document.getElementById('title').innerHTML = "Terminé !";
        });
    }, randomTime + 3000);
}