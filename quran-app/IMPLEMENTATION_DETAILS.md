# Implementation Details

## Architecture Overview

The Quran Web App follows a modular, single-page application (SPA) architecture with the following components:

### 1. State Management
```javascript
appState = {
  quranData: null,        // Loaded Quran text
  tafsirData: null,       // Loaded Tafsir interpretations
  asbaabData: null,       // Loaded Asbab Al-Nuzul data
  currentSurah: null,     // Currently selected Surah number
  expandedVerses: Set()   // Verses with expanded details
}
```

### 2. Data Loading
- **Async/Await Pattern**: Non-blocking data fetching
- **Error Handling**: Graceful degradation if files are missing
- **Fallback**: Sample data generated if external files unavailable

### 3. Rendering Pipeline

#### Surah List Rendering
```
renderSurahList()
├─ Get quranData
├─ Filter valid Surahs
├─ Sort by number
└─ Create DOM elements with click handlers
```

#### Verse Rendering
```
selectSurah() → renderSurah() → createVerseElement()
├─ Create header with Surah name
├─ Sort verses by number
└─ Create interactive verse cards
```

#### Detail Expansion
```
verse click → toggleVerseDetails()
├─ Toggle expandedVerses Set
├─ Create new verse element (with tafsir/asbab)
└─ Replace old element with new one
```

## HTML Structure

```
html (dir="rtl" lang="ar")
├── head
│   ├── charset: UTF-8
│   ├── viewport: responsive
│   └── stylesheet: style.css
└── body
    └── .container (grid container)
        ├── header (gradient background)
        └── main (2-column grid)
            ├── .sidebar (scrollable surah list)
            │   ├── .sidebar-header
            │   └── .surah-list#surahList (dynamic)
            └── .content (verse display area)
                └── .verses-container#versesContainer (dynamic)
```

## CSS Architecture

### Methodology: Mobile-First Progressive Enhancement

1. **Base Styles** (mobile)
   - Minimal viewport width
   - Single column layout
   - Touch-friendly spacing
   - Optimized font sizes

2. **Tablet Breakpoint** (≤768px)
   - Adjusted sidebar height
   - Maintained readability
   - Responsive grid layout

3. **Desktop Styles** (>768px)
   - Full sidebar + content layout
   - Optimal content width
   - Enhanced typography

### CSS Components

| Component | Class | Purpose |
|-----------|-------|---------|
| Layout | `.container`, `main` | Grid-based layout |
| Header | `header` | Navigation and branding |
| Sidebar | `.sidebar`, `.surah-item` | Chapter selection |
| Content | `.content`, `.verses-container` | Verse display |
| Verse Card | `.verse`, `.verse-text` | Individual verse |
| Details | `.detail-section`, `.tafsir-section`, `.asbab-section` | Expandable content |

## JavaScript Functions

### Initialization
```javascript
init() - Main entry point, loads all data

// DOM Ready Detection
if (document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', init)
else
  init()
```

### Data Loading
```javascript
loadQuranData()      - Fetch quran-hafs-usmani.json
loadTafsirData()     - Fetch tafsir.json
loadAsbaabData()     - Fetch asbab.json
generateSampleQuranData() - Fallback sample data
```

### Rendering Functions
```javascript
renderSurahList()           - Populate sidebar with Surahs
renderSurah(surahNum, surah)    - Display verses of selected Surah
createVerseElement(surahNum, ayahNum, text) - Create verse DOM
```

### Interaction Handlers
```javascript
selectSurah(surahNum, surah, element) - Surah click handler
toggleVerseDetails(verseId, surahNum, ayahNum, text) - Verse click handler
```

### Data Retrieval
```javascript
getTafsir(surahNum, ayahNum)  - Get tafsir for verse
getAsbab(surahNum, ayahNum)   - Get asbab for verse
```

### Utilities
```javascript
escapeHtml(text)         - XSS prevention
createEmptyStateElement() - Empty state UI
showError(message)       - Error messaging
```

## Data Flow

```
┌─────────────────────────────────────┐
│      Page Load (DOMContentLoaded)   │
└──────────────────┬──────────────────┘
                   ↓
        ┌──────────────────────┐
        │   init() function    │
        └────────┬─────────────┘
                 ↓
     ┌───────────────────────────┐
     │ Fetch 3 JSON files        │
     │ (Quran, Tafsir, Asbab)    │
     └────────┬──────────────────┘
              ↓
    ┌─────────────────────────┐
    │  renderSurahList()      │
    │  (Populate sidebar)     │
    └────────┬────────────────┘
             ↓
    ┌──────────────────────────┐
    │ User clicks Surah        │
    │ selectSurah() triggered  │
    └────────┬─────────────────┘
             ↓
    ┌──────────────────────────┐
    │ renderSurah() displays   │
    │ all verses in order      │
    └────────┬─────────────────┘
             ↓
    ┌──────────────────────────┐
    │ User clicks verse        │
    │ toggleVerseDetails()     │
    └────────┬─────────────────┘
             ↓
    ┌──────────────────────────┐
    │ getTafsir() + getAsbab() │
    │ Insert/Remove HTML       │
    └──────────────────────────┘
```

## Error Handling

### Network Errors
```javascript
try {
  const response = await fetch(path)
  if (response.ok) {
    data = await response.json()
  } else {
    console.warn('Could not load file')
  }
} catch (error) {
  console.warn('Error:', error.message)
}
```

### Missing Data
```javascript
if (!appState.quranData) {
  showError('فشل تحميل بيانات القرآن الكريم')
  return
}
```

### XSS Prevention
```javascript
// Escape HTML in all user-facing data
const escaped = escapeHtml(text)
element.innerHTML = `<div>${escaped}</div>`
```

## Performance Optimizations

1. **Event Delegation**: Use single event listeners where possible
2. **DOM Batching**: Minimize reflows by updating DOM in batches
3. **Set Data Structure**: O(1) lookup for expanded verses
4. **Lazy Loading**: Data loaded only when needed
5. **CSS Animations**: Hardware-accelerated transitions

## Accessibility Considerations

✓ Semantic HTML (header, main, nav)
✓ Proper heading hierarchy (h1, h2)
✓ Right-to-left support (dir="rtl")
✓ Color contrast ratios meet WCAG standards
✓ Keyboard navigable (tab, enter)
✓ Clear focus indicators
✓ Proper text alternatives

## Browser Compatibility

### Required Features
- ES6 Promise (async/await)
- Fetch API
- CSS Grid
- CSS Flexbox
- Set object

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Testing Methodology

### Manual Testing
1. Load index.html in browser
2. Verify no console errors
3. Test Surah selection
4. Test verse expansion
5. Test responsive breakpoints
6. Test on mobile device

### Console Checks
```javascript
// Should see:
// ✓ App initialized successfully
// ✓ Quran data loaded successfully
// ✓ Tafsir data loaded successfully
// ✓ Asbab Al-Nuzul data loaded successfully
```

## Deployment

### Prerequisites
- Web server (any HTTP server)
- UTF-8 encoding support
- CORS enabled (if data hosted separately)

### File Structure Required
```
quran-app/
├── index.html
├── app.js
├── style.css
└── data/
    ├── quran/quran-hafs-usmani.json
    ├── tafsir/tafsir.json
    └── asbab-al-nuzul/asbab.json
```

### Local Testing
```bash
cd quran-app
python3 -m http.server 8000
# Visit http://localhost:8000
```

## Future Enhancements

### Short-term
- Complete Quran dataset (all 30 Juz)
- Search functionality
- Bookmarking system
- Translation support

### Medium-term
- Audio recitation integration
- Sharing functionality
- User preferences/settings
- Progressive Web App (PWA)

### Long-term
- Offline support with Service Worker
- Sync cloud storage
- Community features
- Multiple language support
