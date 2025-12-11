# Assets Folder

This folder contains all the custom assets for the portfolio website.

## 📁 Structure

```
assets/
├── fonts/
│   ├── GeneralSans/
│   │   ├── GeneralSans-Regular.woff2
│   │   ├── GeneralSans-Medium.woff2
│   │   ├── GeneralSans-Semibold.woff2
│   │   └── GeneralSans-Bold.woff2
│   └── PlusJakartaSans/
│       ├── PlusJakartaSans-Regular.woff2
│       ├── PlusJakartaSans-Medium.woff2
│       ├── PlusJakartaSans-Semibold.woff2
│       └── PlusJakartaSans-Bold.woff2
└── images/
    ├── intro.gif (Your animated intro GIF)
    └── (other images as needed)
```

## 📝 Instructions

### Fonts
1. Upload **General Sans** font files to `assets/fonts/GeneralSans/`
2. Upload **Plus Jakarta Sans** font files to `assets/fonts/PlusJakartaSans/`
3. Supported formats: `.woff2`, `.woff`, `.ttf`

### Images
1. Upload your animated intro GIF as `intro.gif` to `assets/images/`
2. The GIF will loop automatically in the hero section
3. Format: GIF (animated)
4. Recommended: Transparent or dark background to match the theme

## 🔄 After Uploading

Once you've uploaded the assets:
1. The fonts will automatically be loaded via `app/layout.tsx`
2. The hero image will be displayed in the Hero section
3. Restart the dev server if needed: `npm run dev`

## ✅ Current Status

- [ ] General Sans fonts uploaded
- [ ] Plus Jakarta Sans fonts uploaded  
- [ ] Animated intro GIF (intro.gif) uploaded
