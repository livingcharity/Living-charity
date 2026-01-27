/**
 * Quran Web App - Vanilla JavaScript Implementation
 * Displays Quran text with Tafsir and Asbab Al-Nuzul support
 */

// State Management
const appState = {
  quranData: null,
  tafsirData: null,
  asbaabData: null,
  currentSurah: null,
  expandedVerses: new Set(),
};

// DOM Elements
const surahListEl = document.getElementById('surahList');
const versesContainerEl = document.getElementById('versesContainer');

/**
 * Initialize the application
 */
async function init() {
  try {
    console.log('Initializing Quran app...');
    
    // Load all data files
    await Promise.all([
      loadQuranData(),
      loadTafsirData(),
      loadAsbaabData(),
    ]);

    if (!appState.quranData) {
      showError('فشل تحميل بيانات القرآن الكريم');
      return;
    }

    // Render surah list
    renderSurahList();
    
    console.log('App initialized successfully');
  } catch (error) {
    console.error('Error initializing app:', error);
    showError('حدث خطأ أثناء تحميل التطبيق');
  }
}

/**
 * Load Quran data from JSON file
 */
async function loadQuranData() {
  try {
    // Try to load the simple structured data first
    let response = await fetch('data/quran/quran-simple.json');
    if (response.ok) {
      appState.quranData = await response.json();
      console.log('Quran data loaded successfully from quran-simple.json');
      return;
    }
    
    // Fall back to the complete Quran data (114 surahs, 6236 ayahs)
    response = await fetch('data/quran/hafs_smart_v8.json');
    if (response.ok) {
      const rawData = await response.json();
      // Transform array format to structured format
      appState.quranData = transformQuranData(rawData);
      console.log('Quran data loaded successfully from hafs_smart_v8.json');
    } else {
      console.warn('Could not load quran data files');
    }
  } catch (error) {
    console.warn('Quran data not found at expected path:', error.message);
  }
}

/**
 * Transform Quran data from array format to structured format
 */
function transformQuranData(rawData) {
  const structured = {};
  
  rawData.forEach(item => {
    const surah = item.sura_no;
    const ayah = item.aya_no;
    
    if (!structured[surah]) {
      structured[surah] = {
        name: item.sura_name_ar,
        englishName: item.sura_name_en,
        ayahs: {}
      };
    }
    
    structured[surah].ayahs[ayah] = item.aya_text_emlaey;
  });
  
  return structured;
}

/**
 * Load Tafsir data from JSON file
 */
async function loadTafsirData() {
  try {
    // Try to load the complete tafsir data
    const response = await fetch('data/tafsir/tafsir_complete.json');
    if (response.ok) {
      appState.tafsirData = await response.json();
      console.log('Tafsir data loaded successfully');
    } else {
      console.warn('Could not load tafsir_complete.json');
    }
  } catch (error) {
    console.warn('Tafsir data not found at expected path:', error.message);
  }
}

/**
 * Load Asbab Al-Nuzul data from JSON file
 */
async function loadAsbaabData() {
  try {
    const response = await fetch('data/asbab-al-nuzul/asbab.json');
    if (response.ok) {
      appState.asbaabData = await response.json();
      console.log('Asbab Al-Nuzul data loaded successfully');
    } else {
      console.warn('Could not load asbab.json');
    }
  } catch (error) {
    console.warn('Asbab Al-Nuzul data not found at expected path:', error.message);
  }
}

/**
 * Generate Quran data structure if no external file is available
 */
function generateSampleQuranData() {
  // Sample structure: { surahNumber: { verseNumber: "text" } }
  return {
    "1": {
      "name": "الفاتحة",
      "englishName": "Al-Fatihah",
      "ayahs": {
        "1": "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        "2": "الرَّحْمَٰنِ الرَّحِيمِ",
        "3": "مَالِكِ يَوْمِ الدِّينِ",
        "4": "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        "5": "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        "6": "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ"
      }
    },
    "2": {
      "name": "البقرة",
      "englishName": "Al-Baqarah",
      "ayahs": {
        "1": "الم",
        "2": "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ",
        "3": "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ"
      }
    }
  };
}

/**
 * Render the surah list in the sidebar
 */
function renderSurahList() {
  surahListEl.innerHTML = '';

  const data = appState.quranData;
  if (!data) {
    surahListEl.innerHTML = '<p style="padding: 1.5rem; color: #999;">لا توجد بيانات</p>';
    return;
  }

  // Get surahs and sort by number
  const surahs = Object.entries(data)
    .filter(([_, surah]) => surah && surah.name && surah.ayahs)
    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

  surahs.forEach(([surahNum, surah]) => {
    const ayahCount = Object.keys(surah.ayahs || {}).length;
    
    const surahItem = document.createElement('div');
    surahItem.className = 'surah-item';
    surahItem.innerHTML = `
      <span class="surah-name">${surah.name}</span>
      <span class="surah-info">${ayahCount} آية</span>
    `;
    
    surahItem.addEventListener('click', () => {
      selectSurah(parseInt(surahNum), surah, surahItem);
    });
    
    surahListEl.appendChild(surahItem);
  });
}

/**
 * Select and display a surah
 */
function selectSurah(surahNum, surah, element) {
  appState.currentSurah = surahNum;
  appState.expandedVerses.clear();
  
  // Update active styling
  document.querySelectorAll('.surah-item').forEach((item) => {
    item.classList.remove('active');
  });

  element.classList.add('active');
  
  renderSurah(surahNum, surah);
}

/**
 * Render surah verses
 */
function renderSurah(surahNum, surah) {
  versesContainerEl.innerHTML = '';

  // Surah header
  const header = document.createElement('div');
  header.className = 'surah-header';
  header.innerHTML = `
    <h2>${surah.name}</h2>
    <div class="meta">
      <p>السورة ${surahNum} • ${Object.keys(surah.ayahs || {}).length} آية</p>
    </div>
  `;
  versesContainerEl.appendChild(header);

  // Render verses
  const ayahs = surah.ayahs || {};
  const verses = Object.entries(ayahs)
    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

  if (verses.length === 0) {
    versesContainerEl.appendChild(createEmptyStateElement('لا توجد آيات لهذه السورة'));
    return;
  }

  verses.forEach(([ayahNum, text]) => {
    const verseElement = createVerseElement(surahNum, ayahNum, text);
    versesContainerEl.appendChild(verseElement);
  });
}

/**
 * Create a verse element with click handlers
 */
function createVerseElement(surahNum, ayahNum, text) {
  const verseId = `${surahNum}:${ayahNum}`;
  const isExpanded = appState.expandedVerses.has(verseId);

  const verseDiv = document.createElement('div');
  verseDiv.className = 'verse';
  
  let verseHTML = `
    <div class="verse-header">
      <span class="verse-number">${ayahNum}</span>
    </div>
    <div class="verse-text" dir="rtl">${escapeHtml(text)}</div>
  `;

  // Add tafsir if available
  if (isExpanded && appState.tafsirData) {
    const tafsir = getTafsir(surahNum, ayahNum);
    if (tafsir) {
      verseHTML += `
        <div class="verse-details">
          <div class="detail-section tafsir-section">
            <span class="detail-label">التفسير</span>
            <div class="detail-content" dir="rtl">${escapeHtml(tafsir)}</div>
          </div>
        </div>
      `;
    }
  }

  // Add asbab if available
  if (isExpanded && appState.asbaabData) {
    const asbab = getAsbab(surahNum, ayahNum);
    if (asbab) {
      verseHTML += `
        <div class="verse-details">
          <div class="detail-section asbab-section">
            <span class="detail-label">سبب النزول</span>
            <div class="detail-content" dir="rtl">${escapeHtml(asbab)}</div>
          </div>
        </div>
      `;
    }
  }

  verseDiv.innerHTML = verseHTML;

  // Click handler to toggle expansion
  verseDiv.addEventListener('click', (e) => {
    e.preventDefault();
    toggleVerseDetails(verseId, surahNum, ayahNum, text);
  });

  return verseDiv;
}

/**
 * Toggle verse details (tafsir and asbab)
 */
function toggleVerseDetails(verseId, surahNum, ayahNum, text) {
  if (appState.expandedVerses.has(verseId)) {
    appState.expandedVerses.delete(verseId);
  } else {
    appState.expandedVerses.add(verseId);
  }

  // Re-render the verse
  const verseElement = createVerseElement(surahNum, ayahNum, text);
  
  // Find the exact verse element by matching its text content
  const allVerses = document.querySelectorAll('.verse');
  for (let verse of allVerses) {
    const verseTextEl = verse.querySelector('.verse-text');
    if (verseTextEl && verseTextEl.textContent.includes(text)) {
      verse.replaceWith(verseElement);
      break;
    }
  }
}

/**
 * Get tafsir for a specific verse
 */
function getTafsir(surahNum, ayahNum) {
  if (!appState.tafsirData) return null;
  
  // Support multiple tafsir structures
  if (appState.tafsirData[surahNum] && appState.tafsirData[surahNum][ayahNum]) {
    return appState.tafsirData[surahNum][ayahNum];
  }
  
  return null;
}

/**
 * Get asbab al-nuzul for a specific verse
 */
function getAsbab(surahNum, ayahNum) {
  if (!appState.asbaabData) return null;
  
  if (appState.asbaabData[surahNum] && appState.asbaabData[surahNum][ayahNum]) {
    return appState.asbaabData[surahNum][ayahNum];
  }
  
  return null;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, char => map[char]);
}

/**
 * Show error message
 */
function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error';
  errorDiv.textContent = message;
  versesContainerEl.innerHTML = '';
  versesContainerEl.appendChild(errorDiv);
}

/**
 * Create empty state element
 */
function createEmptyStateElement(message) {
  const div = document.createElement('div');
  div.className = 'empty-state';
  div.textContent = message;
  return div;
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Load sample data if no external data is available
    if (!appState.quranData) {
      appState.quranData = generateSampleQuranData();
    }
    init();
  });
} else {
  // DOM is already loaded
  if (!appState.quranData) {
    appState.quranData = generateSampleQuranData();
  }
  init();
}
