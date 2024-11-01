const totalStartDate = new Date('2024-07-01').getTime();
const totalEndDate = new Date('2024-12-01T23:59:59').getTime(); // Fin total el 1 de diciembre a medianoche

const lote1EndDate = new Date('2024-08-31').getTime();
const lote2StartDate = new Date('2024-09-01').getTime();
const lote2EndDate = new Date('2024-10-31T23:59:59').getTime(); // Fin de lote 2 el 31 de octubre a medianoche
const lote3StartDate = new Date('2024-11-01').getTime();        // Inicio de lote 3 el 1 de noviembre
const lote3EndDate = new Date('2024-11-18T23:59:59').getTime();  // Fin de lote 3 el 1 de diciembre a medianoche

function updateProgress() {
    const now = new Date().getTime();

    function formatTimeRemaining(timeRemaining) {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        const formattedDays = days.toString().padStart(2, '0');
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        return `${formattedDays} : ${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`;
    }

    const totalTimeRemaining = totalEndDate - now;
    document.getElementById('total-timer').innerText = totalTimeRemaining > 0
        ? formatTimeRemaining(totalTimeRemaining)
        : 'Finalizado';

    const lote1Duration = lote1EndDate - totalStartDate;
    const lote2Duration = lote2EndDate - lote2StartDate;
    const lote3Duration = lote3EndDate - lote3StartDate;

    const totalDuration = lote1Duration + lote2Duration + lote3Duration;

    const lote1Percentage = (lote1Duration / totalDuration) * 100;
    const lote2Percentage = (lote2Duration / totalDuration) * 100;
    const lote3Percentage = (lote3Duration / totalDuration) * 100;

    document.getElementById('lote1-segment').style.width = lote1Percentage + '%';
    document.getElementById('lote2-segment').style.width = lote2Percentage + '%';
    document.getElementById('lote3-segment').style.width = lote3Percentage + '%';

    if (now <= lote1EndDate) {
        document.getElementById('lote1-segment').classList.add('active');
        document.getElementById('lote2-segment').classList.add('active');
        document.getElementById('lote3-segment').classList.add('inactive');
    } else if (now <= lote3EndDate) {
        const lote3Elapsed = now - lote3StartDate;
        const lote3Progress = (lote3Elapsed / lote3Duration) * 100;

        document.getElementById('lote1-segment').classList.add('active');
        document.getElementById('lote2-segment').classList.add('active');
        document.getElementById('lote3-segment').classList.add('active');
        document.getElementById('lote3-segment').style.background = `linear-gradient(to right, #00ff7f ${lote3Progress}%, #008f4d ${lote3Progress}%)`;
    } else {
        document.getElementById('lote1-segment').classList.add('active');
        document.getElementById('lote2-segment').classList.add('active');
        document.getElementById('lote3-segment').classList.add('active');
    }

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

setInterval(updateProgress, 1000);
