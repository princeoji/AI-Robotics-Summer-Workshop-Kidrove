const { useState } = React;

const details = [
  ["Age Group", "8-14 Years"],
  ["Duration", "4 Weeks"],
  ["Mode", "Online"],
  ["Fee", "Rs. 2,999"],
  ["Start Date", "15 July 2026"]
];

const outcomes = [
  "Build beginner-friendly AI projects using visual logic and prompts.",
  "Design simple robots and understand sensors, motors, and controllers.",
  "Learn coding fundamentals through hands-on automation challenges.",
  "Explore real-world uses of machine learning, robotics, and smart devices.",
  "Create a final mini project to present at the end of the workshop.",
  "Practice problem-solving, teamwork, and creative engineering thinking."
];

const faqs = [
  {
    question: "Does my child need previous coding experience?",
    answer: "No. The workshop starts from the basics and gradually introduces AI, coding, and robotics concepts."
  },
  {
    question: "What does my child need for online classes?",
    answer: "A laptop or desktop, stable internet, and access to a browser are enough for most sessions."
  },
  {
    question: "Will students receive a certificate?",
    answer: "Yes. Students who complete the workshop and final project receive a participation certificate."
  }
];

function App() {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Header),
    React.createElement(
      "main",
      null,
      React.createElement(Hero),
      React.createElement(WorkshopDetails),
      React.createElement(LearningOutcomes),
      React.createElement(RegistrationForm),
      React.createElement(FaqSection)
    ),
    React.createElement(Footer)
  );
}

function Header() {
  return React.createElement(
    "header",
    { className: "site-header" },
    React.createElement("a", { className: "brand", href: "/" }, "Kidrove"),
    React.createElement(
      "nav",
      { "aria-label": "Page sections" },
      React.createElement("a", { href: "#details" }, "Details"),
      React.createElement("a", { href: "#outcomes" }, "Outcomes"),
      React.createElement("a", { href: "#register" }, "Register"),
      React.createElement("a", { href: "#faq" }, "FAQ")
    )
  );
}

function Hero() {
  return React.createElement(
    "section",
    { className: "hero" },
    React.createElement(
      "div",
      { className: "hero-content" },
      React.createElement("p", { className: "eyebrow" }, "Summer Workshop for Young Innovators"),
      React.createElement("h1", null, "AI & Robotics Summer Workshop"),
      React.createElement(
        "p",
        { className: "hero-copy" },
        "A live online 4-week program where children explore artificial intelligence, robotics, coding, and project-based problem solving in a fun, guided environment."
      ),
      React.createElement(
        "div",
        { className: "hero-actions" },
        React.createElement("a", { className: "primary-button", href: "#register" }, "Enroll Now"),
        React.createElement("span", { className: "seat-note" }, "Limited batch size")
      )
    ),
    React.createElement(
      "div",
      { className: "hero-visual", "aria-hidden": "true" },
      React.createElement("div", { className: "robot-head" },
        React.createElement("span", null),
        React.createElement("span", null)
      ),
      React.createElement("div", { className: "code-card" }, "AI + Robotics"),
      React.createElement("div", { className: "circuit-card" }, "4 Weeks")
    )
  );
}

function WorkshopDetails() {
  return React.createElement(
    "section",
    { className: "section details-band", id: "details" },
    React.createElement("div", { className: "section-heading" },
      React.createElement("p", { className: "eyebrow" }, "Workshop Details"),
      React.createElement("h2", null, "Everything parents need to know")
    ),
    React.createElement(
      "div",
      { className: "detail-grid" },
      details.map(([label, value]) =>
        React.createElement("article", { className: "detail-card", key: label },
          React.createElement("p", null, label),
          React.createElement("strong", null, value)
        )
      )
    )
  );
}

function LearningOutcomes() {
  return React.createElement(
    "section",
    { className: "section split-section", id: "outcomes" },
    React.createElement("div", { className: "section-heading" },
      React.createElement("p", { className: "eyebrow" }, "Learning Outcomes"),
      React.createElement("h2", null, "What children will build and understand"),
      React.createElement("p", null, "Each week balances concepts with playful experiments, so children leave with working ideas instead of only theory.")
    ),
    React.createElement(
      "ul",
      { className: "outcome-list" },
      outcomes.map((outcome) =>
        React.createElement("li", { key: outcome }, React.createElement("span", null, "✓"), outcome)
      )
    )
  );
}

function RegistrationForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setSubmitting] = useState(false);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submitForm(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to submit enquiry.");
      setStatus({ type: "success", message: data.message });
      setForm({ name: "", email: "", phone: "" });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return React.createElement(
    "section",
    { className: "section registration-band", id: "register" },
    React.createElement("div", { className: "registration-copy" },
      React.createElement("p", { className: "eyebrow" }, "Registration"),
      React.createElement("h2", null, "Reserve a seat for the summer batch"),
      React.createElement("p", null, "Share your details and the Kidrove team will contact you with class timings, payment steps, and onboarding information.")
    ),
    React.createElement(
      "form",
      { className: "registration-form", onSubmit: submitForm },
      React.createElement(Field, { label: "Name", name: "name", value: form.name, onChange: updateField, autoComplete: "name" }),
      React.createElement(Field, { label: "Email", name: "email", type: "email", value: form.email, onChange: updateField, autoComplete: "email" }),
      React.createElement(Field, { label: "Phone Number", name: "phone", type: "tel", value: form.phone, onChange: updateField, autoComplete: "tel" }),
      React.createElement("button", { className: "submit-button", type: "submit", disabled: isSubmitting }, isSubmitting ? "Submitting..." : "Submit Registration"),
      status.message && React.createElement("p", { className: `form-status ${status.type}` }, status.message)
    )
  );
}

function Field({ label, name, type = "text", value, onChange, autoComplete }) {
  return React.createElement(
    "label",
    { className: "field" },
    React.createElement("span", null, label),
    React.createElement("input", { name, type, value, onChange, autoComplete, required: true })
  );
}

function FaqSection() {
  return React.createElement(
    "section",
    { className: "section faq-section", id: "faq" },
    React.createElement("div", { className: "section-heading" },
      React.createElement("p", { className: "eyebrow" }, "FAQ"),
      React.createElement("h2", null, "Questions parents often ask")
    ),
    React.createElement(
      "div",
      { className: "faq-list" },
      faqs.map((faq) =>
        React.createElement("details", { key: faq.question, open: faq === faqs[0] },
          React.createElement("summary", null, faq.question),
          React.createElement("p", null, faq.answer)
        )
      )
    )
  );
}

function Footer() {
  return React.createElement(
    "footer",
    { className: "site-footer" },
    React.createElement("p", null, "Kidrove workshops, camps, and courses for curious children.")
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
