import express from "express";

const router = express.Router();

router.post("/offer", (req, res) => {
  const { senderId, recipientId, sdp } = req.body;

  const recipientSocket = clients.get(recipientId);
  if (recipientSocket && recipientSocket.readyState === WebSocket.OPEN) {
    recipientSocket.send(JSON.stringify({ type: "offer", sdp, senderId }));
    res.status(200).json({ message: "Offer relayed" });
  } else {
    res.status(404).json({ message: "Recipient not connected" });
  }
});

router.post("/answer", (req, res) => {
  const { senderId, recipientId, sdp } = req.body;

  const recipientSocket = clients.get(recipientId);
  if (recipientSocket && recipientSocket.readyState === WebSocket.OPEN) {
    recipientSocket.send(JSON.stringify({ type: "answer", sdp, senderId }));
    res.status(200).json({ message: "Answer relayed" });
  } else {
    res.status(404).json({ message: "Recipient not connected" });
  }
});

router.post("/candidate", (req, res) => {
  const { senderId, recipientId, candidate } = req.body;

  const recipientSocket = clients.get(recipientId);
  if (recipientSocket && recipientSocket.readyState === WebSocket.OPEN) {
    recipientSocket.send(
      JSON.stringify({ type: "candidate", candidate, senderId })
    );
    res.status(200).json({ message: "Candidate relayed" });
  } else {
    res.status(404).json({ message: "Recipient not connected" });
  }
});

export default router;
