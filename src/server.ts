import express from "express";
import { config } from 'dotenv';
import { routers } from "./routes/index";
import sequelize from "./config/database";
import { User } from "./models/userModel";
import { Blog } from "./models/blogModel";
import { Comment } from "./models/commentModel";
import { Like } from "./models/likesModel";

config();

const app = express();
app.locals.db = {
  User,
  Blog,
  Comment,
  Like
}

app.use(express.json());

app.use(routers);

// app.use((req, res) => {
//   res.status(404).json({ 
//     error: "Not Found",
//     success: false,
//     message: "The requested resource was not found"
//   });
// });

const port = parseInt(process.env.PORT as string) || 5500;
app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Unable to connect to the database', error);
  }
});


