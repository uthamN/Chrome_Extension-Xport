chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "download_csv") {
        let blob = new Blob([message.data], { type: "text/csv" });

        try {
            let reader = new FileReader();
            reader.onload = function () {
                let url = reader.result; 

                chrome.downloads.download({
                    url: url,
                    filename: message.filename,
                    saveAs: true,
                    conflictAction: "uniquify"
                });
            };

        reader.readAsDataURL(blob);
        } catch (error) {
            console.error('unable to download the data:' + error)
        }
        
    }
});
