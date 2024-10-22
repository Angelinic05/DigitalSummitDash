const totalStartDate = new Date('2024-07-01').getTime();
const totalEndDate = new Date('2024-12-02').getTime();

const lote1EndDate = new Date('2024-08-31').getTime();
const lote2StartDate = new Date('2024-09-01').getTime();
const lote2EndDate = new Date('2024-10-31').getTime();
const lote3StartDate = new Date('2024-11-01').getTime();
const lote3EndDate = new Date('2024-12-02').getTime();

function updateProgress() {
    const now = new Date().getTime();

    // Función para calcular días, horas, minutos y segundos
    function formatTimeRemaining(timeRemaining) {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        return `${days}:${hours}:${minutes}:${seconds}`;
    }

    // Tiempo restante total hasta el 2 de diciembre
    const totalTimeRemaining = totalEndDate - now;
    document.getElementById('total-timer').innerText = totalTimeRemaining > 0
        ? formatTimeRemaining(totalTimeRemaining)
        : 'Finalizado';

    // Calculamos las duraciones de cada lote
    const lote1Duration = lote1EndDate - totalStartDate;
    const lote2Duration = lote2EndDate - lote2StartDate;
    const lote3Duration = lote3EndDate - lote3StartDate;

    const totalDuration = lote1Duration + lote2Duration + lote3Duration;

    // Calculamos el porcentaje de la barra para cada lote
    const lote1Percentage = (lote1Duration / totalDuration) * 100;
    const lote2Percentage = (lote2Duration / totalDuration) * 100;
    const lote3Percentage = (lote3Duration / totalDuration) * 100;

    // Actualizamos los anchos de cada segmento
    document.getElementById('lote1-segment').style.width = lote1Percentage + '%';
    document.getElementById('lote2-segment').style.width = lote2Percentage + '%';
    document.getElementById('lote3-segment').style.width = lote3Percentage + '%';

    // Determinamos el lote actual y aplicamos opacidades
    if (now <= lote1EndDate) {
        document.getElementById('lote1-segment').classList.add('active');
        document.getElementById('lote2-segment').classList.add('inactive');
        document.getElementById('lote3-segment').classList.add('inactive');
    } else if (now <= lote2EndDate) {
        // Progreso dentro del lote 2
        const lote2Elapsed = now - lote2StartDate;
        const lote2Progress = (lote2Elapsed / lote2Duration) * 100;

        // Establecer la parte activa del lote 2 con base en el progreso actual
        document.getElementById('lote1-segment').classList.add('active');
        document.getElementById('lote2-segment').classList.add('active');
        document.getElementById('lote2-segment').style.background = `linear-gradient(to right, #4d4d4d ${lote2Progress}%, #008f4d ${lote2Progress}%)`;
        document.getElementById('lote3-segment').classList.add('inactive');
    } else {
        document.getElementById('lote1-segment').classList.add('active');
        document.getElementById('lote2-segment').classList.add('active');
        document.getElementById('lote3-segment').classList.add('active');
    }

    // Tiempo restante para el lote actual
    let currentLoteEnd, loteName;
    if (now <= lote1EndDate) {
        currentLoteEnd = lote1EndDate;
        loteName = 'Lote 1';
    } else if (now <= lote2EndDate) {
        currentLoteEnd = lote2EndDate;
        loteName = 'Lote 2';
    } else {
        currentLoteEnd = lote3EndDate;
        loteName = 'Lote 3';
    }

    const currentLoteTimeRemaining = currentLoteEnd - now;
    document.getElementById('current-lote-timer').innerText = currentLoteTimeRemaining > 0
        ? `${formatTimeRemaining(currentLoteTimeRemaining)}`
        : 'Finalizado';
}

// Actualizamos el temporizador cada segundo
setInterval(updateProgress, 1000);
