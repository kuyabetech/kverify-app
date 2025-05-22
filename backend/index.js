require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./firebase');

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('KSUSTADOCS API Proxy running');
});

// Authentication endpoint
app.post('/auth', async (req, res) => {
  const { matric, password } = req.body;
  // Dummy authentication logic for demo
  if (matric === 'test' && password === 'password') {
    // Save login event to Firestore
    try {
      await db.collection('logins').add({
        matric,
        timestamp: new Date(),
      });
      // Return user and token for frontend compatibility
      res.json({
        user: { matric, name: 'Test User' },
        token: 'dummy-jwt-token',
        success: true,
        message: 'Authenticated',
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error logging in', error: error.message });
    }
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Sample resources endpoint (Firestore integration)
app.get('/resources', async (req, res) => {
  try {
    const { department, level } = req.query;
    let query = db.collection('resources');
    if (department) query = query.where('department', '==', department);
    if (level) query = query.where('level', '==', level);
    const snapshot = await query.get();
    const resources = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
