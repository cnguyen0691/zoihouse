import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      "service_lwpyuyk",
      "template_bbddg4u",
      form,
      "JUFb24thfLNsG_JoB"
    )
    .then(() => {
      alert("Message sent successfully!");
      setForm({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: ""
      });
    })
    .catch((error) => {
      console.log("FAILED...", error);
      alert("Failed to send message.");
    });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-20">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="grid grid-cols-2 gap-4">
          <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />
        </div>

        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          required
        />

        <textarea
          name="message"
          placeholder="How can we help you?"
          value={form.message}
          onChange={handleChange}
          className="border p-3 rounded w-full h-32"
          required
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}