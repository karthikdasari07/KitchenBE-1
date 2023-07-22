const express = require("express");
const bodyParser = require("body-parser");
const KitchenController = require("./KitchenController");
const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = 3000;


app.use(bodyParser.json());

// GET method to call the Python script
app.get('/process', (req, res) => {
  const inputData = req.query.input; // Assuming the input is passed as a query parameter named 'input'

  // Call the Python script using the child_process module
  exec(`python process_data.py ${inputData}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing the Python script: ${error.message}`);
      return res.status(500).json({ error: 'Internal server error' });
    }
    
    // Process the output received from the Python script
    const processedData = stdout.trim();
    
    // Return the processed data as a JSON response
    return res.json({ processedData });
  });
});

app.get("/", (req, res) => {
  const controller = new KitchenController();
  controller.convertArrayToJSON(req, res);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
