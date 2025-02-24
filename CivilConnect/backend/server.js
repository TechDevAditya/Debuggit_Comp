const express = require("express");       //Web framework 
const cors = require("cors");              //Front end communicate with backend
const fs = require("fs");                   //read/write data from a file
const bodyParser = require("body-parser");        //to access req.body

const app = express();                      //Initialises app
const PORT = 3000;                          //port where server will run

app.use(cors());
app.use(bodyParser.json());

const FEEDBACK_FILE = "feedback.json";

if (!fs.existsSync(FEEDBACK_FILE)) {
    fs.writeFileSync(FEEDBACK_FILE, "[]");
}

//Handle feedback submission, and store it.
app.post("/submit-feedback", (req, res) =>{
    const {name, message} = req.body;
    const timestamp = new Date().toISOSString();

    //read feeback
    const feedbackData = JSON.parse(fs.readFileSync(FEEDBACK_FILE));

    //Add new feedback
    feedbackData.push({name, message, timestamp});

    //Save back to file
    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedbackData, null, 2));

    res.json({ message: "Feedback successfully submitted! Thank you for your invaluable suggestion, we will surely look into it!"});
})

//Get all feedback for the govt. to see
app.get("/feedback", (req, res) => {
    const feedbackData = JSON.parse(fs.readFileSync(FEEDBACK_FILE));
    //sort latest
    feedbackData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    res.json(feedbackData);
});

//Start the Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
    