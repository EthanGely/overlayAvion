let parameters = null;
let customMode = false;
let memoryOnMain = false;
let calculOnMain = false;

document.addEventListener('DOMContentLoaded', (event) => {
    setCustomMode(false);
    document.getElementById('formParametre').addEventListener('submit', (event) => {
        event.preventDefault();
        saveParameters();
        alert('Paramètres enregistrés');
    });
});

function setCustomMode(isCustom) {
    if (isCustom) {
        customMode = true;
        document.getElementById('custom').classList.add = 'active';
        document.getElementById('default').classList.remove = 'active';
        document.getElementById('parametrages').style.display = 'block';
    } else {
        customMode = false;
        document.getElementById('default').classList.add = 'active';
        document.getElementById('custom').classList.remove = 'active';
        document.getElementById('parametrages').style.display = 'none';
    }
}

function saveParameters() {
    parameters = {};
    // Epreuves
    parameters.epreuve_temps_min = document.getElementById('epreuve_temps_min').value ? parseInt(document.getElementById('epreuve_temps_min').value) * 1000 : 15000;
    parameters.epreuve_temps_max = document.getElementById('epreuve_temps_max').value ? parseInt(document.getElementById('epreuve_temps_max').value) * 1000 : 40000;

    parameters.memoryToggle = document.getElementById('memoryToggle').checked;

    if (parameters.memoryToggle) {
        // Mémoire
        parameters.memoire_nombre_min = parseInt(document.getElementById('memoire_nombre_min').value) || 1;
        parameters.memoire_nombre_max = parseInt(document.getElementById('memoire_nombre_max').value) || 50;
        parameters.memoire_temps = parseInt(document.getElementById('memoire_temps').value) * 1000 || 5000;
        parameters.memoire_nombre_nb = parseInt(document.getElementById('memoire_nombre_nb').value) || 5;
    }

    parameters.calculToggle = document.getElementById('calculToggle').checked;
    if (parameters.calculToggle) {
        // Calculs
        parameters.calculs_nombre_min = parseInt(document.getElementById('calculs_nombre_min').value) || 1;
        parameters.calculs_nombre_max = parseInt(document.getElementById('calculs_nombre_max').value) ||20;
        parameters.calculs_nb = parseInt(document.getElementById('calculs_nb').value) || 5;
        parameters.calcul_temps = parseInt(document.getElementById('calcul_temps').value) * 1000 || 10000;
        parameters.calculs_types = [];

        if (document.getElementById('calculs_type_addition').checked) {
            parameters.calculs_types.push('+');
        }
        if (document.getElementById('calculs_type_soustraction').checked) {
            parameters.calculs_types.push('-');
        }
        if (document.getElementById('calculs_type_multiplication').checked) {
            parameters.calculs_types.push('*');
        }
        if (document.getElementById('calculs_type_division').checked) {
            parameters.calculs_types.push('/');
        }

        if (parameters.calculs_types.length === 0) {
            parameters.calculToggle = false;
        }
    }

    //set parameters in local storage
    localStorage.setItem('parameters', JSON.stringify(parameters));

}

function loadParametersMain() {
    //check if parameters exist in local storage
    if (localStorage.getItem('parameters')) {
        parameters = JSON.parse(localStorage.getItem('parameters'));

        document.getElementById('epreuve_temps_min').value = parameters.epreuve_temps_min / 1000;
        document.getElementById('epreuve_temps_max').value = parameters.epreuve_temps_max / 1000;

        const memoryToggle = document.getElementById('memoryToggle');
        if ((memoryToggle.checked && !parameters.memoryToggle) || (!memoryToggle.checked && parameters.memoryToggle)) {
            activateMemory();
        }
        memoryToggle.checked = parameters.memoryToggle;
        if (parameters.memoryToggle) {
            // Mémoire
            document.getElementById('memoire_nombre_min').value = parameters.memoire_nombre_min;
            document.getElementById('memoire_nombre_max').value = parameters.memoire_nombre_max;
            document.getElementById('memoire_temps').value = parameters.memoire_temps  / 1000;
        }

        const calculToggle = document.getElementById('calculToggle');
        if ((calculToggle.checked && !parameters.calculToggle) || (!calculToggle.checked && calculToggle.memoryToggle)) {
            activateCalcul();
        }
        calculToggle.checked = parameters.calculToggle;

        if (parameters.calculToggle) {
            // Calculs
            document.getElementById('calculs_nombre_min').value = parameters.calculs_nombre_min;
            document.getElementById('calculs_nombre_max').value = parameters.calculs_nombre_max;
            document.getElementById('calculs_nb').value = parameters.calculs_nb;
            document.getElementById('calcul_temps').value = parameters.calcul_temps / 1000;

            // If calculs_types has "+" then check the checkbox for addition
            document.getElementById('calculs_type_addition').checked = parameters.calculs_types.includes('+');
            document.getElementById('calculs_type_soustraction').checked = parameters.calculs_types.includes('-');
            document.getElementById('calculs_type_multiplication').checked = parameters.calculs_types.includes('*');
            document.getElementById('calculs_type_division').checked = parameters.calculs_types.includes('/');
        }
    } else {
        alert('Pas de paramètres enregistrés');
    }
}

function startGame() {
    document.getElementById('mode').style.display = 'none';
    document.getElementById('parametrages').style.display = 'none';
    document.getElementById('startGame').style.display = 'none';
    document.getElementById('title').style.display = 'block';
    if (customMode && parameters) {
        loadParameters(parameters, memoryOnMain, calculOnMain);
    } else {
        loadParameters(null, null, null);
    }
    game();
}

function activateMemory() {
    memoryToggle = document.getElementById('memoryToggle');
    memoryGroup = document.getElementById('memoryGroup');
    activate(memoryToggle, memoryGroup, memoryOnMain);
}

function activateCalcul() {
    calculToggle = document.getElementById('calculToggle');
    calculGroup = document.getElementById('calculGroup');
    activate(calculToggle, calculGroup, calculOnMain);
}

function activate(toggleButton, targetElement, elementOn) {
    if (true) {
        elementOn = !elementOn;
        if (toggleButton.checked) {
            targetElement.style.display = 'block';
        } else {
            targetElement.style.display = 'none';
        }
    }
}