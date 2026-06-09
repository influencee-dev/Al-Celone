import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON payloads
  app.use(express.json());

  // API ROUTE: Send subscription/booking data securely to Brevo
  app.post("/api/brevo/subscribe", async (req, res) => {
    try {
      const {
        email,
        nome,
        telefono,
        tipoForm,
        persone,
        data,
        ora,
        ospiti,
        periodo,
        note,
        messaggio,
      } = req.body;

      if (!email) {
        return res.status(400).json({ success: false, error: "L'indirizzo e-mail è richiesto." });
      }

      const apiKey = process.env.BREVO_API_KEY;
      if (!apiKey) {
        console.error("Missing BREVO_API_KEY environment variable");
        return res.status(500).json({ success: false, error: "Server configuration error." });
      }

      // Read List ID from environment or fallback to 41
      const listIdVal = process.env.BREVO_LIST_ID;
      const listId = listIdVal ? parseInt(listIdVal, 10) : 41;

      // Extract firstname and lastname safely
      const nameParts = nome ? nome.trim().split(/\s+/) : [];
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      // Construct contact attributes
      // Brevo standard uppercase attributes are: FIRSTNAME, LASTNAME, SMS, TELEFONO, NOTE
      const attributes: Record<string, any> = {
        FIRSTNAME: firstName,
        LASTNAME: lastName,
      };

      if (telefono) {
        const cleanPhone = telefono.trim();
        attributes.TELEFONO = cleanPhone;
        attributes.SMS = cleanPhone;
      }

      // Compose details into a unified descriptive note
      let noteValue = "";
      if (tipoForm === "tavolo") {
        noteValue = `[Prenotazione Tavolo] Ospiti: ${persone || 2} | Giorno: ${data || ""} | Ora: ${ora || ""}. Note: ${note || "nessuna"}`;
      } else if (tipoForm === "camere") {
        noteValue = `[Richiesta Soggiorno] Ospiti: ${ospiti || 2} | Periodo: ${periodo || ""}. Note: ${note || "nessuna"}`;
      } else if (tipoForm === "contatti") {
        noteValue = `[Messaggio di Contatto] Messaggio: ${messaggio || ""}`;
      } else {
        noteValue = `Iscrizione generica dalla piattaforma Al Celone.`;
      }

      attributes.NOTE = noteValue;

      // Brevo Create/Update Contacts API v3 payload
      const brevoPayload = {
        email: email.trim().toLowerCase(),
        attributes,
        listIds: [listId],
        updateEnabled: true,
      };

      console.log(`Sending to Brevo matching input type: [${tipoForm}] for user: [${email}] on List: [${listId}]`);

      const response = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify(brevoPayload),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("Brevo API error response:", errText);
        return res.status(response.status).json({
          success: false,
          error: "Errore durante l'invio a Brevo",
          details: errText,
        });
      }

      const responseData = await response.json().catch(() => ({}));
      return res.status(200).json({ success: true, data: responseData });
    } catch (error: any) {
      console.error("Internal API /brevo/subscribe error:", error);
      return res.status(500).json({
        success: false,
        error: "Si è verificato un errore interno del server.",
        details: error.message,
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
