router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // check if the user exists
    const user = await user.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid Username or Password" });
    }

    // Compare the provided password with the hashed password

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username and password" });
    }

    // User authenticated, generate a token or session
    // ... Implement your authentication logic here ...

    res.status(200).json({ message: "Login Successful" });
  } catch (error) {
    res.status(500).json({ message: "An error occured" });
  }
});

module.exports = router;
