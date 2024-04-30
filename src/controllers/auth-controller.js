const db = require('../config/db')

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const request = await db.request();

  // query to the database
  const result = await request.query`SELECT * FROM users WHERE username = ${username} AND password = ${password}`;

  if (result.recordset.length === 0) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  return res.status(200).json({ message: 'Login successful' });
};

module.exports = {
  login,
};
