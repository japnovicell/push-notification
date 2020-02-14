const express = require ('express');
const webpush = require ('web-push');
const bodyParser = require ('body-parser');
const path = require ('path');

const app = express();

// set static path
app.use(express.static(path.join(__dirname,"client")));

app.use(bodyParser.json());

const publicVapidKey =
    'BNC7KAmWT-9bGW2Glx-0nf8_ELDt27IDYAR9GRul8pFsd387kvG1ce11q8R4cUUI87e9mJp1qcOKdXLbVVDKP98';
const privateVapidKey='w5BL4V2ji-iscbYrmKYeUiKglKt5xRVd7RAxmVyj92w';

webpush.setVapidDetails(
    'mailto:jannick_sp@live.dk',
     publicVapidKey,
     privateVapidKey
     );

// Subscribee Route
app.post('/subscribe', (reg, res) => {
    // Get pushSubscription Object
    const subscription = reg.body;

    // send 201 resoruce created
    res.status(201).json({});

   // create payload
   const payload = JSON.stringify ({title: 'Push Test'});

   //pass object into sendNotification
   webpush
   .sendNotification(subscription, payload)
   .catch(err => console.error(err));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
