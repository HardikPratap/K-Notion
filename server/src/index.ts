import express from"express"
import { dbConnect } from "./config/db"

const app = express()
dbConnect();

app.get("/",(req,res)=>{
    console.log("App is running")
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

