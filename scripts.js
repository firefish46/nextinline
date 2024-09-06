document.getElementById('appointmentForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const reason = document.getElementById('reason').value;
    
    const appointment = { name, email, date, time, reason };
  
    try {
      const response = await fetch('http://localhost:3000/NEXTINLINE', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointment)
      });
      
      if (response.ok) {
        alert('Appointment successfully booked!');
        this.reset();
      } else {
        alert('Failed to book appointment');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  });
  