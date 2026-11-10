const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();

app.use(cors());
app.use(express.json());

// Підключення до Supabase за даними з вашого supabase.ts
const supabaseUrl = 'https://bkavonoyjfcnqqvyntnv.supabase.co';
const supabaseKey = 'sb_publishable_quQeFNKmcjiq1dM4OAykjA_6qDYPkmq';
const supabase = createClient(supabaseUrl, supabaseKey);

console.log('Підключення до Supabase успішне');

// Отримати список авто з Supabase
app.get('/api/cars', async (req, res) => {
    const { data, error } = await supabase.from('cars').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// Реєстрація через Supabase Auth
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Заповніть email та пароль' });
    }
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Реєстрація успішна!', user: data.user });
});

// Логін через Supabase Auth
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return res.status(401).json({ error: 'Невірний email або пароль' });
    res.json({ message: 'Вхід успішний!', user: data.user, session: data.session });
});

app.listen(5000, () => {
    console.log('СЕРВЕР ПРАЦЮЄ НА PORT 5000');
});