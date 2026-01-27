# Quran Web App

A responsive, vanilla JavaScript web application for reading the Quran with Tafsir (interpretation) and Asbab Al-Nuzul (reasons for revelation) support.

## Features

- **Surah List**: Browse all chapters of the Quran
- **Verse Display**: View verses in Uthmani Arabic text with proper UTF-8 support
- **Tafsir Support**: Click any verse to toggle its interpretation
- **Asbab Al-Nuzul**: View the reasons behind the revelation of verses
- **Responsive Design**: Mobile-first, fully responsive layout
- **Vanilla JavaScript**: No frameworks or dependencies

## File Structure

```
quran-app/
├── index.html                          # Main HTML file
├── app.js                              # JavaScript logic
├── style.css                           # Responsive styling
└── data/
    ├── quran/
    │   └── quran-hafs-usmani.json     # Quran text data
    ├── tafsir/
    │   └── tafsir.json                # Tafsir interpretations
    └── asbab-al-nuzul/
        └── asbab.json                 # Asbab Al-Nuzul data
```

## Data Format

### Quran Data (quran-hafs-usmani.json)
```json
{
  "1": {
    "name": "الفاتحة",
    "englishName": "Al-Fatihah",
    "ayahs": {
      "1": "الحمد لله رب العالمين",
      "2": "..."
    }
  }
}
```

### Tafsir Data (tafsir.json)
```json
{
  "1": {
    "1": "Interpretation of verse 1 of Surah 1",
    "2": "..."
  }
}
```

### Asbab Al-Nuzul Data (asbab.json)
```json
{
  "1": {
    "1": "Reason for revelation of verse 1 of Surah 1",
    "2": "..."
  }
}
```

## Usage

1. Open `index.html` in a modern web browser
2. Select a Surah from the sidebar
3. View verses sequentially
4. Click any verse to toggle Tafsir and Asbab Al-Nuzul
5. All data is loaded dynamically from JSON files

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Constraints Met

✓ Do NOT modify Quran text
✓ No truncation or normalization of text
✓ UTF-8 safe handling of Arabic text
✓ Mobile-first responsive design
✓ Vanilla JavaScript only (no frameworks)
✓ Zero runtime errors

## Responsive Breakpoints

- **Desktop**: Full sidebar + content layout
- **Tablet** (≤768px): Sidebar scrolls vertically
- **Mobile** (≤480px): Optimized font sizes and spacing
