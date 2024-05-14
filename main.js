let parameters = null;

document.addEventListener('DOMContentLoaded', (event) => {
    setCustomMode(false);
    document.getElementById('formParametre').addEventListener('submit', (event) => {
        event.preventDefault();
        parameters = getParameters();
        console.log(parameters);
        console.log(parameters.memoire_nombre_max)
    });
});

function setCustomMode(isCustom) {
    if (isCustom) {
        document.getElementById('custom').classList.add = 'active';
        document.getElementById('default').classList.remove = 'active';
        document.getElementById('parametrages').style.display = 'block';
    } else {
        document.getElementById('default').classList.add = 'active';
        document.getElementById('custom').classList.remove = 'active';
        document.getElementById('parametrages').style.display = 'none';
    }
}

function getParameters() {
    // Epreuves
    const epreuve_temps_min = document.getElementById('epreuve_temps_min').value * 1000;
    const epreuve_temps_max = document.getElementById('epreuve_temps_max').value * 1000;

    // Mémoire
    const memoire_nombre_min = document.getElementById('memoire_nombre_min').value;
    const memoire_nombre_max = document.getElementById('memoire_nombre_max').value;
    const memoire_temps = document.getElementById('memoire_temps').value * 1000;

    // Calculs
    const calculs_nombre_min = document.getElementById('calculs_nombre_min').value;
    const calculs_nombre_max = document.getElementById('calculs_nombre_max').value;
    const calculs_nb = document.getElementById('calculs_nb').value;
    const calcul_temps = document.getElementById('calcul_temps').value * 1000;
    const calculs_types = [];
    
    if (document.getElementById('calculs_type_addition').checked) {
        calculs_types.push('+');
    }
    if (document.getElementById('calculs_type_soustraction').checked) {
        calculs_types.push('-');
    }
    if (document.getElementById('calculs_type_multiplication').checked) {
        calculs_types.push('*');
    }
    if (document.getElementById('calculs_type_division').checked) {
        calculs_types.push('/');
    }

    return {
        epreuve_temps_min,
        epreuve_temps_max,
        memoire_nombre_min,
        memoire_nombre_max,
        memoire_temps,
        calculs_nombre_min,
        calculs_nombre_max,
        calculs_nb,
        calcul_temps,
        calculs_types
    };

}

function startGame() {
    script();
}