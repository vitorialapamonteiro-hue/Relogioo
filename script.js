// ===================================
// MOVIMENTO DO PONTEIRO
// ===================================

function atualizarRelogio() {
  const agora = new Date();
  const segundos = agora.getSeconds();

  document.querySelector(
    ".segundo"
  ).style.transform = `translateX(-50%) rotate(${segundos * 6}deg)`;
}

atualizarRelogio();
setInterval(atualizarRelogio, 1000);

// ===================================
// MÚSICA DE FUNDO
// ===================================

const musicaFundo = new Audio("https://files.catbox.moe/f3h7kx.mp3");

musicaFundo.loop = true;
musicaFundo.volume = 0.8;
musicaFundo.preload = "auto";

function iniciarMusica() {
  if (musicaFundo.paused) {
    musicaFundo.play().catch(() => {});
  }
}

// Tenta começar ao abrir a página
iniciarMusica();

// Se o navegador bloquear, tenta novamente no primeiro toque
document.addEventListener("pointerdown", iniciarMusica);

// ===================================
// SINO — UMA BADALADA POR TOQUE
// ===================================

const somSino = new Audio("https://files.catbox.moe/w5fz5c.mp3");

somSino.loop = false;
somSino.volume = 0.05;
somSino.preload = "auto";

const torreRelogio = document.querySelector(".relogio");

let pararSino;

if (torreRelogio) {
  torreRelogio.addEventListener("click", () => {
    clearTimeout(pararSino);

    somSino.pause();
    somSino.currentTime = 0;

    somSino
      .play()
      .then(() => {
        pararSino = setTimeout(() => {
          somSino.pause();
          somSino.currentTime = 0;
        }, 1200);
      })
      .catch(() => {});
  });
}

// ===================================
// CONTADOR DO TEMPO JUNTOS
// ===================================

function atualizarContador() {
  const inicio = new Date(2026, 5, 28, 0, 0, 0);
  const agora = new Date();

  let anos = agora.getFullYear() - inicio.getFullYear();
  let base = new Date(inicio);
  base.setFullYear(inicio.getFullYear() + anos);

  if (base > agora) {
    anos--;
    base = new Date(inicio);
    base.setFullYear(inicio.getFullYear() + anos);
  }

  let meses =
    (agora.getFullYear() - base.getFullYear()) * 12 +
    agora.getMonth() -
    base.getMonth();

  let baseMeses = new Date(base);
  baseMeses.setMonth(base.getMonth() + meses);

  if (baseMeses > agora) {
    meses--;
    baseMeses = new Date(base);
    baseMeses.setMonth(base.getMonth() + meses);
  }

  const dias = Math.floor((agora - baseMeses) / 86400000);

  const baseDias = new Date(baseMeses.getTime() + dias * 86400000);

  const restante = agora - baseDias;

  const horas = Math.floor(restante / 3600000);
  const minutos = Math.floor((restante % 3600000) / 60000);
  const segundos = Math.floor((restante % 60000) / 1000);

  document.getElementById("anos").textContent = anos;
  document.getElementById("meses").textContent = meses;
  document.getElementById("dias").textContent = dias;

  document.getElementById("horas").textContent = String(horas).padStart(2, "0");

  document.getElementById("minutos").textContent = String(minutos).padStart(
    2,
    "0"
  );

  document.getElementById("segundos").textContent = String(segundos).padStart(
    2,
    "0"
  );
}

atualizarContador();
setInterval(atualizarContador, 1000);