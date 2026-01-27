# User Guide - Quran Web App

## Getting Started

### 1. Open the App
- Open `index.html` in your web browser
- The app loads automatically with the Surah list displayed

### 2. Browse Surahs
The left sidebar shows all available Surahs (chapters) of the Quran:
- **Surah Name** - Arabic name of the chapter
- **Verse Count** - Number of verses in that Surah
- Hover over any Surah to see it highlight
- The active Surah gets a green background

### 3. Select a Surah
Click on any Surah in the sidebar to:
- Display all verses from that Surah
- See the Surah name and total verse count at the top
- View verses in sequential order (numbered 1, 2, 3, etc.)

### 4. Read Verses
Each verse card shows:
- **Verse Number** - In a circular green badge on the left
- **Uthmani Arabic Text** - The Quran text in traditional Uthmani script
- Right-to-left text direction for proper Arabic display

### 5. Expand Verse Details
Click on any verse card to toggle additional information:

**Tafsir (التفسير)** - Interpretation
- If available, the verse's interpretation appears below the text
- Slide animation for smooth expansion
- Click again to hide

**Asbab Al-Nuzul (أسباب النزول)** - Reasons for Revelation
- If available, the reason for the verse's revelation appears
- Shows historical context and revelation details
- Click again to hide

## Features Explained

### Responsive Design
The app works on all devices:

**Desktop**
- Sidebar on the left with full Surah list
- Content area on the right with verses
- Optimized for reading on large screens

**Tablet**
- Sidebar adjusts to fit smaller screens
- Verses remain readable
- Touch-friendly spacing

**Mobile**
- Single column layout
- Sidebar scrolls vertically
- Optimized font sizes and spacing
- Perfect for reading on phones

### Navigation
- **Mouse/Trackpad**: Click to select Surahs and expand verses
- **Touch**: Tap to select Surahs and expand verses
- **Scroll**: Scroll through Surahs and verses
- **Keyboard**: Tab through elements and Enter to activate

## Tips & Tricks

### 1. Quick Navigation
- Use the Surah name to quickly find specific chapters
- Scroll through sidebar to browse available Surahs
- Click the header to go back to the Surah selection

### 2. Read Multiple Interpretations
- Click a verse to see its Tafsir
- The interpretation appears with a book icon (📖)
- Click again to collapse and see clean text only

### 3. Understand Context
- Check the Asbab Al-Nuzul (📜 icon) for historical background
- Understand WHY a verse was revealed
- Learn about the circumstances and context

### 4. Study Mode
- Keep the app open in a window
- Use fullscreen for focused reading
- Zoom in/out using browser controls (Ctrl/Cmd + +/-)

### 5. Print Quran
- Use your browser's print function (Ctrl/Cmd + P)
- Select the verses you want to print
- Arabic text prints clearly
- Perfect for making copies

## Keyboard Shortcuts

| Key | Function |
|-----|----------|
| Tab | Navigate between elements |
| Enter | Select/Click active element |
| Ctrl/Cmd + A | Select all text |
| Ctrl/Cmd + C | Copy selected text |
| Ctrl/Cmd + P | Print current page |
| Ctrl/Cmd + F | Find text on page |

## Understanding the Layout

### Sidebar (Left Panel)
```
┌──────────────────┐
│     السور        │  ← Header
├──────────────────┤
│ الفاتحة  6 آية   │  ← Surah item
│ البقرة   286 آية │
│ آل عمران 200 آية│
│      ...         │
└──────────────────┘
```

### Main Content (Right Panel)
```
┌────────────────────────────┐
│  السورة ١ • ٦ آيات         │  ← Surah header
├────────────────────────────┤
│ ┌──────────────────────────┐│
│ │ ① الحمد لله رب العالمين ││
│ └──────────────────────────┘│  ← Verse card
│ ┌──────────────────────────┐│
│ │ ② الرحمن الرحيم         ││
│ │ ┌────────────────────────┤│
│ │ │📖 التفسير: ...        ││  ← Expanded tafsir
│ │ │📜 سبب النزول: ...      ││
│ │ └────────────────────────┤│
│ └──────────────────────────┘│
└────────────────────────────┘
```

## Troubleshooting

### Verses Not Showing?
- **Check**: Is a Surah selected? Click a Surah in the sidebar
- **Check**: Browser console for errors (F12 → Console)
- **Fix**: Refresh the page (F5 or Ctrl+R)

### Arabic Text Not Displaying?
- **Check**: Browser encoding is UTF-8 (usually automatic)
- **Check**: Font support in your browser
- **Fix**: Try a different browser (Chrome, Firefox, Safari)

### Tafsir/Asbab Not Showing?
- **Normal**: Not all verses have tafsir or asbab available
- **Check**: Try a different verse from Surah 1 or 2
- **Note**: Sample data is included for demo purposes

### App Loading Slowly?
- **Check**: Internet connection
- **Check**: Browser is up to date
- **Fix**: Clear browser cache and reload

### Sidebar/Content Not Scrolling?
- **On Mobile**: Use two-finger scroll or drag
- **On Desktop**: Use mouse wheel or scroll bar
- **On Tablet**: Touch and drag to scroll

## Data Information

### Quran Text Source
- **Script**: Uthmani (عثماني)
- **Complete**: Includes all 114 Surahs (when using full dataset)
- **Verses**: 6,236 verses total
- **Language**: Arabic (original revelation language)

### Tafsir Information
- **Content**: Classical and modern interpretations
- **Languages**: Primarily Arabic with English translations
- **Availability**: Not all verses have tafsir

### Asbab Al-Nuzul Information
- **Content**: Historical reasons and contexts
- **Scholars**: Based on classical Islamic scholarly work
- **Availability**: Primarily for verses from Surahs 1-9

## Best Practices

### For Learning
1. Read the verse first (Arabic text)
2. Understand the verse number in context
3. Read the Tafsir to understand meaning
4. Check Asbab Al-Nuzul for historical context
5. Note connections between related verses

### For Research
1. Use Find function (Ctrl+F) to search
2. Take notes on important verses
3. Print for reference
4. Compare different interpretations
5. Study context and related verses

### For Memorization
1. Read verses aloud (sound reinforces memory)
2. Repeat reading same verses multiple times
3. Cover text and try to recite
4. Use flashcard method with verse numbers
5. Practice regularly for consistency

## Browser Requirements

✓ Modern browser with:
- ES6 JavaScript support
- Fetch API support
- CSS Grid support
- UTF-8 encoding support

**Tested Browsers:**
- Google Chrome 90+
- Mozilla Firefox 88+
- Apple Safari 14+
- Microsoft Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Privacy & Data

✓ **Your Privacy Protected:**
- No data sent to servers
- All processing done locally in your browser
- No tracking or analytics
- No cookies or personal data collection
- Completely offline-capable (when data available)

## Getting Help

If you encounter issues:
1. Check browser console (F12)
2. Review troubleshooting section above
3. Try different browser
4. Refresh page completely
5. Check data file paths are correct

## Tips for Best Experience

1. **Adjust Zoom** for comfortable reading
   - Use Ctrl/Cmd + +/- to zoom
   - Most comfortable at 100-125% zoom

2. **Dark Mode** (if your browser supports)
   - Check browser settings
   - May reduce eye strain during long sessions

3. **Full Screen** for distraction-free reading
   - Press F11 on desktop
   - Maximize browser window on mobile

4. **Font Size** adjustments
   - Use browser zoom controls
   - Verses adjust automatically

## Feedback

The app is designed for:
- Students of Islamic sciences
- Quran learners and memorizers
- Researchers and scholars
- General readers interested in the Quran

Enjoy exploring the Quran! 📖

---

**Last Updated:** January 2026
**Version:** 1.0
**Status:** Production Ready
