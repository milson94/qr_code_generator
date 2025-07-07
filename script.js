// Get references to the HTML elements we need to interact with
const qrForm = document.getElementById('qrForm');
const urlInput = document.getElementById('urlInput');
const qrcodeContainer = document.getElementById('qrcode');
const downloadBtn = document.getElementById('downloadBtn');

// This function will handle the form submission
qrForm.addEventListener('submit', function(event) {
    // Prevent the form from submitting in the traditional way (which would reload the page)
    event.preventDefault();

    // Get the text/URL from the input field and remove any extra whitespace
    const url = urlInput.value.trim();

    // Check if the input is empty
    if (url === '') {
        alert('Please enter a URL or text!');
        return;
    }

    // Clear any previous QR code
    qrcodeContainer.innerHTML = '';
    downloadBtn.classList.add('hidden');

    // Use the qrcode.js library to create the QR code
    // The library will generate a <canvas> element inside our 'qrcode' div
    const qrcode = new QRCode(qrcodeContainer, {
        text: url,
        width: 256,
        height: 256,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H // High correction level for better readability
    });

    // The QR code generation can take a fraction of a second.
    // We use a small timeout to ensure the canvas element has been created
    // before we try to create the download link for it.
    setTimeout(() => {
        // Find the canvas element that the library created
        const canvas = qrcodeContainer.querySelector('canvas');
        if (canvas) {
            // Convert the canvas to a PNG image data URL
            const pngUrl = canvas.toDataURL('image/png');
            
            // Set the download link's href to the PNG data
            downloadBtn.href = pngUrl;
            
            // Make the download button visible
            downloadBtn.classList.remove('hidden');
        }
    }, 100); // 100 milliseconds is plenty of time
});