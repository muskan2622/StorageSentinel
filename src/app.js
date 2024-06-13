const express = require('express');
const app = express();

const backupRoutes = require('./routes/backupRoutes');

app.use(express.json());
app.use('/api',backupRoutes);


const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
})