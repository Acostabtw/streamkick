// Config: cambia `TARGET_DATE` con la fecha y hora de tu stream (ISO 8601)
// Ejemplo: const TARGET_DATE = '2026-03-01T20:00:00';
const TARGET_DATE = '';
const KICK_URL = document.getElementById('watch-now')?.href || 'https://kick.com/tu_canal';

function getTargetDate(){
  if(TARGET_DATE && Date.parse(TARGET_DATE)) return new Date(TARGET_DATE);
  // Por defecto, 24h desde ahora
  const now = new Date();
  return new Date(now.getTime() + 24*60*60*1000);
}

const target = getTargetDate();

function updateCountdown(){
  const now = new Date();
  const diff = Math.max(0, target - now);
  const s = Math.floor(diff/1000);
  const days = Math.floor(s / (24*3600));
  const hours = Math.floor((s % (24*3600)) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;

  document.getElementById('days').textContent = String(days).padStart(2,'0');
  document.getElementById('hours').textContent = String(hours).padStart(2,'0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2,'0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2,'0');

  if(diff === 0){
    // Cuando empiece el stream, cambia el CTA
    const watch = document.getElementById('watch-now');
    watch.textContent = 'Live — Ir ahora';
    watch.classList.add('live');
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Follow button: abre el enlace de Kick en nueva ventana
const followBtn = document.getElementById('follow-btn');
if(followBtn){
  followBtn.addEventListener('click', ()=>{
    try{window.open(KICK_URL, '_blank','noopener');}
    catch(e){window.location.href = KICK_URL}
  });
}

// Opcional: carga avatar desde meta o atributo (si lo añades en index.html)
const avatar = document.getElementById('avatar');
if(avatar && avatar.src){ avatar.hidden = false }
