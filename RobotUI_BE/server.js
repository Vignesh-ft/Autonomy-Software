const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const loginRoutes = require('./common/routes/loginRoutes')
const userRoutes = require('./common/routes/userRoutes')
const mapRoutes = require('./application/routes/mapRoutes')
const transitionRoutes = require('./application/routes/transitionRoutes')
const missionRoutes = require('./application/routes/missionsRoutes')
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  cors({
    origin:["http://localhost:4200"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use('/api', userRoutes);
app.use('/auth', loginRoutes); // Use the new login route
app.use('/maps', mapRoutes);
app.use('/transitions',transitionRoutes);
app.use('/mission',missionRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
