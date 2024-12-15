import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRouter.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config.js'
import cartRouter from "./routes/carRouter.js";
import orderRouter from "./routes/orderRouter.js";

// App configuration
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();




// API endpoints
app.use("/api/food", foodRouter); 
app.use("/image",express.static('uploads'))
app.use("/api/user", userRouter); 
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter)




// Root endpoint
app.get("/", (req, res) => {
    res.send("API WORKING NOW");
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
