function extractTables() {
    let tables = document.querySelectorAll("table");
    let extractedTables = [];

    tables.forEach((table, index) => {
        let rows = table.querySelectorAll("tr");
        let columns = new Set(); // Store unique column names

        let csvData = Array.from(rows).map((row, rowIndex) => {
            let cols = row.querySelectorAll("td, th");
            let rowData = [];
            cols.forEach((col, colIndex) => {
                let text = col.innerText.replace(/,/g, ""); // Remove commas for CSV formatting
                rowData.push(text);
                if (rowIndex === 0) columns.add(text); // Collect headers from the first row
            });
            return rowData;
        });

        extractedTables.push({ 
            filename: `table_${index + 1}.csv`, 
            data: csvData, 
            columns: Array.from(columns) 
        });
    });

    return extractedTables;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extract_tables") {
        sendResponse(extractTables());
    }
});
