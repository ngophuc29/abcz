const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const request = require('request');
const db = require("./models");

const app = express();

// Import user credentials for React front end
const credentials = require('fs').existsSync(path.join(__dirname, 'credentials.js'))
    ? require('./credentials')
    : console.log('No credentials.js file present');

// Cors allows all urls 
const corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

// Connect to MongoDB database
db.mongoose.connect(db.cloudUrl, { useUnifiedTopology: true })
    .then(() => {
        // Get list of collection names when connected successfully
        db.mongoose.connection.db.listCollections().toArray((err, collections) => {
            if (err) {
                console.error("Error fetching collection names:", err);
                return;
            }
            // Create an array containing names of collections
            const collectionNames = collections.map(collection => collection.name);
            console.log("Collections:", collectionNames);

            // Set up route to display collection names
            app.get("/zz", (req, res) => {
                res.json({ message: "Welcome to Revit MongoDB Server", collections: collectionNames });
            });
        });
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

// Register door model
require("./models/doorModel");
// Import door routes 
require("./routes/doorRoutes")(app);

// Get access token for React front end
app.get('/token', (req, res) => {
    request.post(
        credentials.Authentication,
        { form: credentials.credentials },
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                res.json(JSON.parse(body));
            }
        }
    );
});

// Set up for production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '/client', 'build', 'index.html'));
    });
}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

// Route to serve the HTML file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to get documents from selected collection
app.get("/collections/:name", async (req, res) => {
    const collectionName = req.params.name;
    try {
        const collection = db.mongoose.connection.db.collection(collectionName);
        const documents = await collection.find({}).toArray();
        res.json(documents);
    } catch (err) {
        res.status(500).send(err);
    }
});


//


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
