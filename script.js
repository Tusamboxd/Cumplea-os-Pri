// CLAVE SECRETA
var CORRECT_CODE = "Plaza Norte"; 

// TUS NUEVOS ENLACES DE IMÁGENES
var photos = [
  "https://i.postimg.cc/yWqR2SKT/6b7adb86-721a-440e-a557-065a4ac1c749.jpg",
  "https://i.postimg.cc/bJCHVJsX/92201926-0f2c-41a9-ae6c-54f00f0b123a.jpg",
  "https://i.postimg.cc/s1FWbZzc/BE879430-A629-4F1A-9D0B-94FDF8232D09.jpg",
  "https://i.postimg.cc/prvCn7hf/Whats-App-Image-2026-09-27-at-7-33-24-PM.jpg",
  "https://i.postimg.cc/sxGSn4k8/feebc010-5e12-49bd-b128-7d57f1094526.jpg"
];

let currentPhotoIndex = 0;

// PRECARGA DE IMÁGENES (Evita demoras al pasar las fotos)
function preloadImages() {
  photos.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}
preloadImages();

function checkPasscode() {
  const input = document.getElementById('passcode').value;
  const errorMsg = document.getElementById('error-msg');

  if (input === CORRECT_CODE) {
    // 1. Ocultar caja fuerte y mostrar sorpresa
    document.getElementById('lock-screen').classList.add('hidden');
    document.getElementById('secret-screen').classList.remove('hidden');
    
    // 2. Disparar el confeti
    lanzarConfetti();

    // 3. REPRODUCCIÓN AUTOMÁTICA INMEDIATA
    const audio = document.getElementById('birthday-song');
    audio.volume = 1.0;
    
    // Forzar inicio de reproducción aprovechando el clic en "Desbloquear"
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log("El navegador intentó bloquear la música:", error);
        // Si el celular es muy estricto, intenta sonar al tocar cualquier parte de la pantalla
        document.addEventListener('touchstart', function playOnTouch() {
          audio.play();
          document.removeEventListener('touchstart', playOnTouch);
        }, { once: true });
      });
    }

  } else {
    errorMsg.textContent = "❌ Clave incorrecta. ¡Piensa bien! 😉";
    document.getElementById('passcode').value = "";
  }
}

function changePhoto(direction) {
  currentPhotoIndex = (currentPhotoIndex + direction + photos.length) % photos.length;

  const imgElement = document.getElementById('gallery-img');
  imgElement.src = photos[currentPhotoIndex];
  document.getElementById('photo-counter').textContent = `${currentPhotoIndex + 1} / ${photos.length}`;
}

function lanzarConfetti() {
  confetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.6 }
  });
}

document.getElementById('passcode').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    checkPasscode();
  }
});
