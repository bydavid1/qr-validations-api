const db = require('../config/db')

const validate = async (req, res, next) => {
  const { hash, detail } = req.query;

  console.log(hash, detail);

  if (!hash) {
    return res.status(400).json({ message: 'QR hash is required' });
  }

  const request = await db.request();

  // query to the database
  const result = await request.query`SELECT * FROM qrs WHERE hash = ${hash}`;

  if (result.recordset.length === 0) {
    return res.status(404).json({ message: 'El codigo no es valido' });
  }

  if (detail && detail === 'true') {
    return res.status(200).json(result.recordset[0]);
  }

  const request2 = await db.request();

  await request2.query`UPDATE qrs SET verified_at = ${new Date()} WHERE hash = ${hash}`;

  return res.status(200).json({ message: 'QR valido' });
}

module.exports = {
  validate,
};