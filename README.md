# Weather App

This is a responsive **Weather App** project built using the **Visual Crossing Weather API** and **Leaflet.js**. The app allows users to search for any city and view its current weather on an interactive map.

## 🔗 Live Demo

[View on GitHub Pages](https://Faizulmd13.github.io/WeatherApp/)

---

## 📂 Features

- Search for any city to display current weather.
- Interactive **Leaflet map** with markers for searched cities.
- Weather info pop-ups dynamically displayed next to markers.
- Delete button to remove individual markers and pop-ups.
- Toggle markers: clicking a marker shows/hides the associated weather pop-up.
- Dynamic positioning of pop-ups **to the right of the marker**, vertically centered.

---

## 🚀 Tech Stack

- HTML5
- CSS3 (custom and responsive)
- JavaScript (ES6 Modules)
- Webpack (bundling and modular structure)
- Leaflet.js (interactive maps via CDN)
- Visual Crossing API (weather data)

---

## 🗂 Project Structure

```text
WeatherApp/
│
├─ dist/ # Webpack build output
├─ node_modules/ # Installed dependencies
├─ src/
│ ├─ index.js # Entry JS file, handles map, weather, and UI
│ ├─ template.html # HTML template for Webpack
│ ├─ styles.css # Global styles
│
├─ package.json # Project metadata and scripts
├─ package-lock.json
├─ webpack.config.cjs # Webpack configuration
└─ .gitignore
```

---

## 📦 How to Run Locally

1. Clone the repo:

   ```bash
   git clone https://github.com/Faizulmd13/WeatherApp.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the project:

   ```bash
   npm run build
   ```

4. Open `dist/index.html` in a browser to view the app locally.

---

## 🔧 Scripts

- `npm run build` – Bundle JS and CSS for production using Webpack.
- `npm run deploy` – Deploy the `dist` folder to GitHub Pages.

---

## 📝 Notes

- Leaflet is loaded via CDN in `template.html`.
- Markers toggle their weather pop-ups on click.
- Delete buttons are positioned at the top-right corner of each weather pop-up.
- Pop-ups are dynamically positioned to the right of markers, and remain correctly positioned when the map is zoomed or moved.

```

```
