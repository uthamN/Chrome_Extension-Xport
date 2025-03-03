# Table Extractor Chrome Extension

## Overview

The **Table Extractor** is a Chrome extension that allows users to extract tables from any webpage, filter columns, preview the data, and download it in **CSV format**. The extension only runs when the user clicks on the icon and selects the 'Run' option, ensuring efficient performance.

## Features 

### V1.2
- 📊 **Extract Tables:** Automatically detects and extracts tables from the current webpage.
- 🔍 **Column Filtering:** Users can select specific columns before downloading the CSV.
- 🖥 **Preview Feature:** Displays the extracted table before downloading.
- ⏳ **Loading Indicator:** A loader is displayed when the extraction process is running.
- ❌ **No Table Detection:** If no tables are found, the extension notifies the user.
- 🎨 **Minimalist UI:** A simple and user-friendly interface for easy use.
- 📥 **CSV Download:** Downloads the extracted table as a `.csv` file.

## Folder Structure

```
TableExtractorExtension/
│── manifest.json        # Chrome extension configuration
│── background.js        # Handles downloading functionality
│── content.js           # Extracts tables from the webpage
│── popup.html           # User interface for the extension
│── popup.js             # Controls UI interactions
│── styles.css           # UI styling
│── icons/               # Icons for the extension
│── README.md            # Project documentation
```

## Installation

1. **Download the repository** or clone it:
   ```sh
   git clone https://github.com/uthamN/Chrome_Extension-Xport.git
   ```
2. **Open Chrome and go to** `chrome://extensions/`.
3. Enable **Developer Mode** (top right corner).
4. Click **Load Unpacked** and select the **TableExtractorExtension** folder.
5. The extension is now installed and ready to use!

## Usage

1. Open a webpage containing tables.
2. Click on the extension icon in the Chrome toolbar.
3. Click **Run** to extract tables.
4. Preview the table and filter columns if needed.
5. Click **Download CSV** to save the extracted table.

## Troubleshooting

- **"No tables found" message?** The page might not have structured `<table>` elements.
- **CSV not downloading?** Ensure Chrome permissions allow downloads from extensions.
- **UI not appearing?** Try refreshing the webpage and restarting Chrome.

## Future Enhancements

- Support for **nested tables** and **multi-page extraction**.
- Option to save extracted tables in **JSON format**.
- Ability to handle dynamically loaded tables (via AJAX/JS).

## License

This project is open-source and available under the **MIT License**.

---

Happy Extracting! 🚀

