const login = async (req, res) => {
  const { email, password } = req.body;
  

  return res.status(200).json({ message: 'Login successful' });

};

module.exports = {
  login,
};
