
let publicKey = null;
let privateKey = null;
let encryptedData = null;
let finalOperationResult = null;


function encryptData() {
    const data1 = document.getElementById('data-input-1').value;
    const data2 = document.getElementById('data-input-2').value;

    if (!data1 || isNaN(data1) || !data2 || isNaN(data2)) {
        alert("Please enter valid numbers.");
        return;
    }

   
    const value1 = new BigNumber(data1);
    const value2 = new BigNumber(data2);

    
    encryptedData = {
        value1: value1.times(10).toString(), 
        value2: value2.times(10).toString() 
    };

    document.getElementById('encrypted-output').innerText = `Encrypted Value 1: ${encryptedData.value1}, Encrypted Value 2: ${encryptedData.value2}`;

    
    document.getElementById('operation-section').style.display = "block";
    document.getElementById('output-section').style.display = "block";
}

function generateKeys() {
   
    publicKey = "PUB_KEY_" + Math.floor(Math.random() * 1000000);
    privateKey = "PRI_KEY_" + Math.floor(Math.random() * 1000000);

    
    document.getElementById('public-key').innerText = publicKey;
    document.getElementById('private-key').innerText = privateKey;
    document.getElementById('key-info').style.display = "block";
}

function performOperation() {
    const operation = document.getElementById('operation-select').value;

    if (!encryptedData) {
        alert("Please encrypt data first.");
        return;
    }

    
    let result = null;

    const encryptedValue1 = new BigNumber(encryptedData.value1);
    const encryptedValue2 = new BigNumber(encryptedData.value2);

    if (operation === "add") {
        result = {
            value1: encryptedValue1.plus(10).toString(), 
            value2: encryptedValue2.plus(10).toString()  
        };
    } else if (operation === "multiply") {
        result = {
            value1: encryptedValue1.times(2).toString(), 
            value2: encryptedValue2.times(2).toString()  
        };
    }

    finalOperationResult = result;

    
    document.getElementById('encrypted-output').innerText = `Encrypted Result - Value 1: ${result.value1}, Value 2: ${result.value2}`;
}

function decryptData() {
    const privateKeyInput = document.getElementById('private-key-input').value;

    if (privateKeyInput !== privateKey) {
        alert("Invalid private key.");
        return;
    }

    if (!finalOperationResult) {
        alert("No operation result to decrypt.");
        return;
    }

   
    const decryptedValue1 = new BigNumber(finalOperationResult.value1).dividedBy(10).toString();
    const decryptedValue2 = new BigNumber(finalOperationResult.value2).dividedBy(10).toString();

    
    document.getElementById('decrypted-output').innerText = `Decrypted Final Result - Value 1: ${decryptedValue1}, Value 2: ${decryptedValue2}`;
    document.getElementById('decrypted-output').style.display = "block";
}
