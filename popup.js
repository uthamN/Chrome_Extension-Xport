document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("run").addEventListener("click", () => {
        document.getElementById("loading").classList.remove("hidden");
        document.getElementById("tables-container").classList.add("hidden");
        document.getElementById("message").classList.add("hidden");

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript(
                { target: { tabId: tabs[0].id }, function: extractTablesFromPage },
                (injectionResults) => {
                    document.getElementById("loading").classList.add("hidden");
                    if (injectionResults && injectionResults[0].result.length > 0) {
                        displayTables(injectionResults[0].result);
                    } else {
                        document.getElementById("message").textContent = "No tables found on this page.";
                        document.getElementById("message").classList.remove("hidden");
                    }
                }
            );
        });
    });
});

function extractTablesFromPage() {
    return Array.from(document.querySelectorAll("table")).map((table, index) => {
        let rows = table.querySelectorAll("tr");
        let columns = new Set();

        let csvData = Array.from(rows).map((row, rowIndex) => {
            let cols = row.querySelectorAll("td, th");
            let rowData = [];
            cols.forEach((col, colIndex) => {
                let text = col.innerText.replace(/,/g, "");
                rowData.push(text);
                if (rowIndex === 0) columns.add(text);
            });
            return rowData;
        });

        return { filename: `table_${index + 1}.csv`, data: csvData, columns: Array.from(columns) };
    });
}

function displayTables(tables) {
    const container = document.getElementById("tables-container");
    container.innerHTML = "";
    container.classList.remove("hidden");

    tables.forEach((table, index) => {
        let div = document.createElement("div");
        let divMain = document.createElement("div");
        div.classList.add("table-outer");
        div.innerHTML = `<h4>Table ${index + 1}</h4>`;

        let tableElement = document.createElement("table");
        let thead = document.createElement("thead");
        let tbody = document.createElement("tbody");

        // Create headers
        let headerRow = document.createElement("tr");
        table.columns.forEach(col => {
            let th = document.createElement("th");
            th.textContent = col;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        // Create data rows
        table.data.slice(1, 6).forEach(row => { // Preview first 5 rows
            let tr = document.createElement("tr");
            row.forEach(cell => {
                let td = document.createElement("td");
                td.textContent = cell;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        tableElement.appendChild(thead);
        tableElement.appendChild(tbody);

        let button = document.createElement("button");
        button.textContent = `Download ${table.filename}`;
        button.onclick = () => downloadCSV(table);

        div.appendChild(tableElement);
        divMain.appendChild(div);
        divMain.appendChild(button);
        container.appendChild(divMain);
    });
}

function downloadCSV(table) {
    let csvData = table.data.map(row => row.join(",")).join("\n");

    chrome.runtime.sendMessage({
        action: "download_csv",
        filename: table.filename,
        data: csvData
    });
}
