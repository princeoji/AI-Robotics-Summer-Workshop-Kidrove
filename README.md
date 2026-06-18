# Kidrove Workshop Landing Page

Responsive React workshop page for the **AI & Robotics Summer Workshop** with a simple Express.js enquiry API.

## Run locally

```bash
npm install
npm start
```

Open:

```text
http://localhost:3000
```

## API

```http
POST /api/enquiry
Content-Type: application/json
```

Body:

```json
{
  "name": "Parent Name",
  "email": "parent@example.com",
  "phone": "9876543210"
}
```

The endpoint validates required fields, stores successful enquiries in `data/enquiries.json`, and returns a success response.
