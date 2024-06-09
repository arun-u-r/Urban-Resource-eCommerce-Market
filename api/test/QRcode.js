// Require the package
import QRCode from 'qrcode';

const QRcodeGenerator = (req, res, next) => {
    const data = req.body;

    // Converting the data into String format
    let stringdata = JSON.stringify(data);

    // Generate the QR code
    QRCode.toString(stringdata, { type: 'terminal' }, function (err, QRcode) {
        if (err) {
            console.error("Error occurred:", err);
            return res.status(500).json({ success: false, message: "Error generating QR code" });
        }

        // Sending the generated QR code as a text response
        res.status(200).send(QRcode);
    });
};

export default QRcodeGenerator;
