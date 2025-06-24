import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        setStatus('Message sent! Check your inbox for a surprise.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus(`Error: ${result.error}`);
      }
    } catch (err) {
      setStatus('Error: Something went wrong.');
    }
  };

  const socials = [
    { name: 'GitHub', link: 'https://github.com/tkay6677' },
    { name: 'LinkedIn', link: 'https://linkedin.com/in/tokoni-ebi' },
    { name: 'Twitter', link: 'https://twitter.com/_tkayverse' },
  ];

  return (
    <div className="max-w-lg mx-auto px-4">
      <p className="text-gray-300 text-center mb-6">Drop me a line—let’s build something crazy together.</p>
      <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg border border-purple-500">
        <div className="mb-4">
          <label htmlFor="name" className="block text-green-400 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-800 text-white rounded border border-green-500 focus:outline-none focus:border-green-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-green-400 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-800 text-white rounded border border-green-500 focus:outline-none focus:border-green-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-green-400 font-bold mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-2 bg-gray-800 text-white rounded border border-green-500 focus:outline-none focus:border-green-400"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 text-black font-bold py-2 rounded hover:bg-purple-400 transition-colors glitch data-[submitting=true]:animate-glitch"
          data-submitting={status === 'Sending...'}
        >
          Send It
        </button>
      </form>
      {status && (
        <p className="mt-4 text-center text-green-400 font-mono">{status}</p>
      )}
      <div className="mt-6 flex justify-center gap-6">
        {socials.map((social, index) => (
          <a
            key={index}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-300 transition-colors font-bold"
          >
            {social.name}
          </a>
        ))}
      </div>
    </div>
  );
}