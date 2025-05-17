const express=require("express");
const dotenv=require("dotenv");


const app = express();
app.use(express.json());
dotenv.config();

app.get("/page", (req, res) => {
  res.send("Bienvenue dans la page");
});

const securityTokens = {
  67322: "uAivzhwm0uGtzOvt6PLI5HQSf8jSX8GwD0z7hXWX73c2d45f",
};

app.post('/webhooks/whatsapp/:security_token', async (req, res) => {
  const { security_token } = req.params;
  const { instanceId, event, data } = req.body;

  if (!security_token || !instanceId || !event || !data) {
    console.log('Requête invalide');
    return res.sendStatus(400);
  }

  if (securityTokens[instanceId] !== security_token) {
    console.log('Authentification échouée');
    return res.sendStatus(401);
  }

  if (event === 'message') {
    const messageData = data.message;

    if (messageData.type === 'chat') {
      const from = messageData.from.replace('@c.us', '');
      const content = messageData.body;
      const timestamp = new Date(messageData.timestamp * 1000);

      const message = {
        from,
        content,
        timestamp
      };

      console.log('Message reçu :', message);

      // Émettre le message vers React via WebSocket
      io.emit('whatsapp_message', message);
    }

    return res.sendStatus(200);
  }

  console.log('Événement non géré : ' + event);
  res.sendStatus(404);
});

app.post('/instance/67322/webhook', (req, res) => {
    console.log('Webhook reçu :', req.body); // données envoyées par WaAPI
    res.status(200).send('OK'); // répondre à WaAPI
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port: ${PORT}`);
});
