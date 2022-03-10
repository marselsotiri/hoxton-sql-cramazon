import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
  log: ['query', 'error', 'info', 'warn']
});

const PORT = 4000;

const app = express();
app.use(cors());
app.use(express.json());
// - Get a list of items
app.get('/items', async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    res.send(items);
  } catch (error) {
    //@ts-ignore
    res.status(400).send({ error: error.message });
  }
});

app.get('/items/:title', async (req, res) => {
  const title = req.params.title;
  try {
    const item = await prisma.item.findUnique({ where: { title } });
    if (item) res.send(item);
    else res.status(404).send({ error: 'Item not found' });
  } catch (error) {
    //@ts-ignore
    res.status(400).send({ error: error.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.send(users);
  } catch (error) {
    //@ts-ignore
    res.status(400).send({ error: error.message });
  }
});

app.get('/users/:email', async (req, res) => {
  const email = req.params.email;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { orders: { select: { quantity: true, id: true, item: true } } }
    });
    if (user) res.send(user);
    else res.status(404).send({ error: 'User not found' });
  } catch (error) {
    //@ts-ignore
    res.status(400).send({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server up: http://localhost:${PORT}`));