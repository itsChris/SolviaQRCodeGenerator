document.addEventListener('DOMContentLoaded', function () {
    console.log("Document loaded. Setting up event listeners...");

    const qrElement = document.getElementById('qrCode');
    const textInput = document.getElementById('textInput');
    const downloadButton = document.getElementById('downloadButton');

    const colorPicker = document.getElementById('colorPicker');
    const colorPickerTrigger = document.getElementById('colorPickerTrigger');

    colorPickerTrigger.addEventListener('click', function() {
        colorPicker.click();
    });

    function generateQRCode() {
        console.log("Generating QR code...");
        while (qrElement.firstChild) {
            console.log("Removing existing QR code...");
            qrElement.removeChild(qrElement.firstChild);
        }

        try {
            let qr = new QRious({
                element: document.createElement('canvas'),
                size: 200,
                value: textInput.value || ' ', // Ensure there's always a value to generate a QR code
                level: 'H',
                background: 'white',
                foreground: colorPicker.value,
            });

            qrElement.appendChild(qr.element);
            document.getElementById('qrText').textContent = "User Input: " + textInput.value;
            console.log("QR code generated successfully.");
        } catch (error) {
            console.error("Error generating QR code: ", error);
        }
    }

    function downloadQRCode() {
        let canvas = qrElement.querySelector('canvas');
        if (!canvas) {
            alert('Please generate a QR code first.');
            return;
        }

        // Use toBlob for a more compatible approach
        canvas.toBlob(function(blob) {
            // Create a new URL for the blob object
            let url = URL.createObjectURL(blob);
            // Create a temporary anchor element
            let a = document.createElement('a');
            a.href = url;
            a.download = 'QRCode.png';
            document.body.appendChild(a); // Append anchor to body.
            a.click(); // Trigger download
            document.body.removeChild(a); // Remove anchor from body
            URL.revokeObjectURL(url); // Clean up by revoking the blob URL
        }, 'image/png');
    }

    // Remove or comment out the following line
    // generateButton.addEventListener('click', generateQRCode);

    // Add these lines to generate QR code on text input or color change
    textInput.addEventListener('input', generateQRCode);
    colorPicker.addEventListener('input', generateQRCode);

    downloadButton.addEventListener('click', downloadQRCode);

    console.log("Event listeners set up.");
});
