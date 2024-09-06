const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/appointmentsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
  time: String,
  reason: String
});

// Appointment Model
const Appointment = mongoose.model('Appointment', appointmentSchema);

// Routes
app.post('/appointments', async (req, res) => {
  const { name, email, date, time, reason } = req.body;
  
  const newAppointment = new Appointment({
    name,
    email,
    date,
    time,
    reason
  });

  try {
    await newAppointment.save();
    res.status(201).send('Appointment booked successfully');
  } catch (error) {
    res.status(400).send('Error booking appointment');
  }
});

app.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.json(appointments);
  } catch (error) {
    res.status(500).send('Error fetching appointments');
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
