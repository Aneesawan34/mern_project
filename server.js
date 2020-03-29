const express = require("express");
const app = express();
const user = require("./router/User");
const connectDB = require("./config/db");
// require("./model/User");
const PORT = process.env.PORT || 5000;
connectDB();
app.use(express.json({ extended: false }));

// require("./router/User")(app);
app.use(user);
///

app.listen(PORT, () => console.log(`Express is running on ${PORT}`));
