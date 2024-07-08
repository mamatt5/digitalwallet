const API_BASE_URL = `http://localhost:8000`;

const paypath_button_html = `
<button 
    id="paypath-button"
    style="
        background-color: #090644; 
        color: white; 
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        cursor: pointer;"
/>
    <div style="display:flex; justifyContent:center;">
        <img style="padding-right:12px; width: 30px" src="${API_BASE_URL}/static/ap_logo_resized.png" />Pay with PayPath
    </div>
</button>
`

let buttonDiv;
let isWindowOpened;
let popup;
// buttonDiv = document.getElementById("payPathApiDiv");
// buttonDiv.innerHTML = paypath_button_html;

// const paypathButton = document.getElementById('paypath-button');
// paypathButton.style.backgroundColor = "#090644";
// paypathButton.style.color = "#090644";
// paypathButton.style.borderRadius = "#090644";
// paypathButton.style.border = "1px solid transparent";
// paypathButton.style.padding = "0.6em 1.2em";
// paypathButton.style.fontSize = "1em";
// paypathButton.style.fontWeight = 500;
// paypathButton.style.fontFamily = "inherit";
// paypathButton.style.cursor = "pointer";

// const paypathDiv = document.getElementById('paypath-div');
// paypathDiv.style.display = "flex";
// paypathDiv.style.justifyContent = "center";

// const paypathLogo = document.getElementById('paypath-logo');
// paypathLogo.style.paddingRight = "12px";
// paypathLogo.style.width = "30px";

window.paypathButtonOnClick = () => {
    if (typeof getItems === "undefined") {
        console.error("must implement getItems to return an array of objects");
        return;
    }
    popup = window.open('http://localhost:5173/pay', '_blank', 'width=600,height=700');
    isWindowOpened = true;


    if (typeof windowOpened === "undefined") {
        console.log("Window has been opened, implement a `windowOpened` method to customise behavior");
    }
    else {
        windowOpened();
    }

    const paymentData = {
        items: getItems(),
        description: "web app",
        amount: 176.94,
        vendor: 13,
        merchant_name: "Lora's Cafe"
    }

    const postMessage = () => {
        popup.postMessage(paymentData, "http://localhost:5173/pay")
    }
    for (let timeout = 500; timeout < 5000; timeout += 500) {
        setTimeout(postMessage, timeout);
    }
};



const handleMessage = (event) => {
    if (event.data === "Success") {
        if (typeof transactionComplete === "undefined") {
            console.log("Transaction complete, implement a `transactionComplete` method to customise behavior");
        }
        else {
            if (transactionComplete()) {
                popup.close()
            }
        }
    }
    else if (event.data === "windowClosed") {
        if (isWindowOpened) {
            if (typeof windowClosed === "undefined") {
                console.log("Window has been closed, implement a `windowClosed` method to customise behavior");
            }
            else {
                windowClosed();
            }
            isWindowOpened = false;
        }
    }
    else {
        console.log("Unrecognised message received")
        console.log(event)
    }
};

window.addEventListener("message", handleMessage);