import cloudinary from '../../lib/cloudinary';
import { IncomingForm } from 'formidable';
import fs from 'fs';

// Helper to upload via stream to Cloudinary
const streamUpload = (filePath) => new Promise((resolve, reject) => {
  const stream = cloudinary.uploader.upload_stream({ folder: 'tkayverse' }, (error, result) => {
    if (error) reject(error);
    else resolve(result);
  });
  fs.createReadStream(filePath).pipe(stream);
});

export const config = {
  api: { bodyParser: false }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new IncomingForm({ multiples: false });

  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    let fileObj = files.file;
    if (Array.isArray(fileObj)) fileObj = fileObj[0];
    const filePath = fileObj?.filepath || fileObj?.path;
    if (!filePath) {
      return res.status(400).json({ error: 'No file path found' });
    }


    // Upload via stream to avoid missing file errors
    const result = await streamUpload(filePath);
    fs.unlinkSync(filePath);

    return res.status(200).json({ location: result.secure_url, url: result.secure_url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Upload error', details: error.message });
  }
}
