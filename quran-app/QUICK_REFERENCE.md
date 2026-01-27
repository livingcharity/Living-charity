# Quick Reference - Quran Web App

## File Locations

| File | Path | Lines | Purpose |
|------|------|-------|---------|
| index.html | `/quran-app/index.html` | 40 | HTML structure |
| app.js | `/quran-app/app.js` | 374 | Core JavaScript logic |
| style.css | `/quran-app/style.css` | 435 | Responsive styling |

## Data Files

| Data | Path | Purpose |
|------|------|---------|
| Quran Text | `/quran-app/data/quran/quran-hafs-usmani.json` | Quran in Uthmani script |
| Tafsir | `/quran-app/data/tafsir/tafsir.json` | Verse interpretations |
| Asbab | `/quran-app/data/asbab-al-nuzul/asbab.json` | Reasons for revelation |

## How It Works

1. **Page Load**
   - HTML loads app.js and style.css
   - JavaScript initializes and loads JSON data files
   - Surah list populates in sidebar

2. **Surah Selection**
   - User clicks a Surah in the sidebar
   - Verses render sequentially in the main area
   - Each verse shows Arabic text and verse number

3. **Verse Interaction**
   - User clicks any verse to toggle details
   - Tafsir (if available) slides in with animation
   - Asbab Al-Nuzul (if available) displays below

## Key Functions

```javascript
// Load data
loadQuranData()
loadTafsirData()
loadAsbaabData()

// Render UI
renderSurahList()
renderSurah(surahNum, surah)
createVerseElement(surahNum, ayahNum, text)

// Interactions
selectSurah(surahNum, surah, element)
toggleVerseDetails(verseId, surahNum, ayahNum, text)

// Utilities
getTafsir(surahNum, ayahNum)
getAsbab(surahNum, ayahNum)
escapeHtml(text)
```

## Responsive Breakpoints

| Breakpoint | Layout | Notes |
|-----------|--------|-------|
| Desktop | 2 columns | Sidebar + Content |
| Tablet ≤768px | Stack vertical | Sidebar scrolls horizontally |
| Mobile ≤480px | Optimized | Smaller fonts, touch-friendly |

## Data JSON Format

### Quran Structure
```json
{
  "1": {
    "name": "الفاتحة",
    "englishName": "Al-Fatihah",
    "ayahs": {
      "1": "الحمد لله...",
      "2": "..."
    }
  }
}
```

### Tafsir & Asbab Structure
```json
{
  "surahNumber": {
    "verseNumber": "text content"
  }
}
```

## Important Notes

- ✓ No external frameworks (Vanilla JS only)
- ✓ No text modification (stored exactly as provided)
- ✓ UTF-8 safe (proper encoding throughout)
- ✓ Mobile-first design (works on all devices)
- ✓ Error handling included (graceful fallbacks)

## Testing Checklist

- [ ] Page loads without console errors
- [ ] Surah list displays in sidebar
- [ ] Clicking Surah shows verses
- [ ] Clicking verse toggles tafsir/asbab
- [ ] Responsive layout on mobile
- [ ] Arabic text displays correctly
- [ ] No truncation of Quran text

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

**Status**: Production Ready ✓
