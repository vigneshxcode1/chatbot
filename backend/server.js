import express from 'express'
import cors from 'cors'

import mongoose from "mongoose";
import Message from "./model.js";
import path from 'path'
const app = express();


app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.use((req, res, next) => {
  const contentType = mime.getType(req.path);
  if (contentType) {
    res.setHeader('Content-Type', contentType);
  }
  next();
});


mongoose.connect("mongodb+srv://vicky:test123@cluster0.epdrsry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;


  const userMessage = new Message({ sender: "user", text: message });
  await userMessage.save();

  let reply;
  if (message.toLowerCase().includes("hello")) {
    reply = "Hi there! How can I assist you today?";
  } else if (message.toLowerCase().includes("help")) {
    reply = "Sure! Please tell me what you need help with.";
  }
  else if (message.toLowerCase().includes("hi")) {
    reply = " Please tell me what you need help with.";
  } 
  else if (message.toLowerCase().includes("bye")) {
    reply = "tata bye byee";
  } else if (message.toLowerCase().includes("hi")) {
    reply = "hi, Please tell me what you need help with.";
  }
    else if (message.toLowerCase().includes("your name")) {
        reply = "my name is chatty";
  } else {
    reply = "I'm sorry, I didn't understand that. Can you rephrase?";
  }


  const botMessage = new Message({ sender: "bot", text: reply });
  await botMessage.save();


  res.json({ reply });
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});
