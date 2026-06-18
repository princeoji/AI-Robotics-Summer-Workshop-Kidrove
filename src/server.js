const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = Number(process.env.PORT || 3000);
const ENQUIRY_DB_PATH = path.join(process.cwd(), "data", "enquiries.json");

ensureEnquiryDb();

app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));

app.post("/api/enquiry", (req, res) => {
  const name = clean(req.body.name);
  const email = clean(req.body.email).toLowerCase();
  const phone = clean(req.body.phone);

  if (!name) return res.status(400).json({ error: "Name is required" });
  if (!isValidEmail(email)) return res.status(400).json({ error: "Valid email is required" });
  if (!isValidPhone(phone)) return res.status(400).json({ error: "Valid phone number is required" });

  const enquiry = {
    id: `enquiry_${crypto.randomBytes(8).toString("hex")}`,
    name,
    email,
    phone,
    workshop: "AI & Robotics Summer Workshop",
    createdAt: new Date().toISOString()
  };

  const db = readEnquiries();
  db.enquiries.push(enquiry);
  writeEnquiries(db);

  res.status(201).json({
    success: true,
    message: "Registration enquiry submitted successfully.",
    enquiry
  });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Workshop page running at http://localhost:${PORT}`);
});

function ensureEnquiryDb() {
  fs.mkdirSync(path.dirname(ENQUIRY_DB_PATH), { recursive: true });
  if (!fs.existsSync(ENQUIRY_DB_PATH)) writeEnquiries({ enquiries: [] });
}

function readEnquiries() {
  const raw = fs.readFileSync(ENQUIRY_DB_PATH, "utf8").replace(/^\uFEFF/, "").trim();
  if (!raw) return { enquiries: [] };
  const db = JSON.parse(raw);
  return { enquiries: Array.isArray(db.enquiries) ? db.enquiries : [] };
}

function writeEnquiries(db) {
  fs.writeFileSync(ENQUIRY_DB_PATH, JSON.stringify(db, null, 2), { encoding: "utf8" });
}

function clean(value) {
  return String(value || "").trim().replace(/[<>]/g, "");
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value) {
  return /^[+]?[0-9\s()-]{7,16}$/.test(value);
}
