const express = require(express);
const bcrypt = require(bcrypt);

const router = express.Router();

//User Registration
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    //Check if the username is already taken
    const existingUser = await username.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occured" });
  }
});
