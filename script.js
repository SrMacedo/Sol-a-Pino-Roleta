const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spinBtn');
const messageEl = document.getElementById('message');

const options = [
    { prize: 'Esfoliação', angle: 0 },
    { prize: 'Ops... não foi dessa vez', angle: 45 },
    { prize: 'Hidratação', angle: 90 },
    { prize: 'Banho de Lua', angle: 135 },
    { prize: 'Esfoliação', angle: 180 },
    { prize: 'Ops... não foi dessa vez', angle: 225 },
    { prize: 'Hidratação', angle: 270 },
    { prize: 'Banho de Lua', angle: 315 }
];

options.forEach((opt) => {
    const textEl = document.createElement('div');
    textEl.className = 'slice-text';
    textEl.style.setProperty('--angle', `${opt.angle}deg`);
    textEl.innerHTML = opt.prize;
    wheel.appendChild(textEl);
});

let isSpinning = false;
let currentRotation = 0;

spinBtn.addEventListener('click', () => {
    if (isSpinning) return;
    isSpinning = true;
    messageEl.classList.remove('show');
    
    const winningIndex = Math.floor(Math.random() * options.length);
    const winner = options[winningIndex];

    const extraSpins = 3600;
    const targetAngle = 360 - winner.angle;
    let diff = targetAngle - (currentRotation % 360);
    if (diff < 0) diff += 360;

    const totalRotation = currentRotation + extraSpins + diff;
    wheel.style.transform = `rotate(${totalRotation}deg)`;
    currentRotation = totalRotation;

    setTimeout(() => {
        if (winner.prize.includes('Ops')) {
            messageEl.textContent = winner.prize.toUpperCase() + "😢";
            messageEl.style.color = "#ff109b"; 
        } else {
            messageEl.textContent = `PARABÉNS! GANHOU ${winner.prize.toUpperCase()}!🎉`;
            messageEl.style.color = "#ff52b6";
        }
        messageEl.classList.add('show');
        isSpinning = false;
    }, 4000);
});