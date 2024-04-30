const db = require('../config/db')

const validate = async (req, res, next) => {
  const { hash } = req.body;

  if (!hash) {
    return res.status(400).json({ message: 'QR hash is required' });
  }

  const request = await db.request();

  // query to the database
  const result = await request.query`SELECT * FROM qr WHERE qr = ${qr}`;

  if (result.recordset.length === 0) {
    return res.status(404).json({ message: 'QR not found' });
  }

  return res.status(200).json({ message: 'QR found' });
}

module.exports = {
  validate,
};