async function loadData() {
  const quran = await fetch('data/quran/quran-uthmani.json').then(r => r.json());
  const tafsirIbn = await fetch('data/tafsir/ibn-kathir.json').then(r => r.json());
  const tafsirSaadi = await fetch('data/tafsir/saadi.json').then(r => r.json());
  const asbab = await fetch('data/asbab-alnuzul/asbab.json').then(r => r.json());

  const container = document.getElementById('content');

  Object.keys(quran["2"]).forEach(ayah => {
    const div = document.createElement('div');
    div.className = 'ayah';
    div.innerHTML = `
      <p><strong>الآية:</strong> ${quran["2"][ayah]}</p>
      <p><strong>تفسير ابن كثير:</strong> ${tafsirIbn["2"][ayah]}</p>
      <p><strong>تفسير السعدي:</strong> ${tafsirSaadi["2"][ayah]}</p>
      <p><strong>سبب النزول:</strong> ${asbab["2"][ayah]}</p>
    `;
    container.appendChild(div);
  });
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}

loadData();
