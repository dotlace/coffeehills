// components/Contact.tsx
'use client';

import React, { useState } from 'react';
import MessageSentButton from '../components/MessageSentButton';
import Loading from '../components/Loading'; // Import the Loading component

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to track loading

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    setIsLoading(true); // Show the loading spinner

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Clear the form
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false); // Hide the loading spinner once the process is complete
    }
  };

  return (
    <section
      id="contact"
      className="h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/images/coffee1.jpeg')" }}
    >
      {isLoading && <Loading />} {/* Show the loading spinner when isLoading is true */}

      <div className="max-w-lg w-full bg-accent-stone/80 shadow-lg rounded-lg p-6 text-center relative z-10">
        {/* Logo above the Contact Us heading */}
        <div className="flex justify-center mb-4">
          <img
            src="/images/CMH_Logo_Re.png"
            alt="Cafe Mandalay Hills Logo"
            className="w-32 h-28"
          />
        </div>
        <h2 className="text-4xl font-bold mb-4 text-accent-deepCoffee">Contact Us</h2>
        <p className="text-lg mb-6 text-accent-beige">
          Have questions? Get in touch with us to learn more about our coffee and sustainable practices.
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded bg-white bg-opacity-90 focus:bg-opacity-100 transition-all"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded bg-white bg-opacity-90 focus:bg-opacity-100 transition-all"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-2 border border-gray-300 rounded bg-white bg-opacity-90 focus:bg-opacity-100 transition-all"
          ></textarea>

          {/* Use the MessageSentButton instead of the default button */}
          <MessageSentButton onClick={handleSubmit} />
        </form>

        {/* Status Message */}
        {status && <p className="mt-4 text-sm text-gray-600">{status}</p>}
      </div>
    </section>
  );
};

export default Contact;


// // Contact.tsx
// 'use client';

// import React, { useState } from 'react';
// import MessageSentButton from '../components/MessageSentButton';
// import Loading from '../components/Loading'; // Import the Loading component

// const Contact: React.FC = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });

//   const [status, setStatus] = useState('');
//   const [isLoading, setIsLoading] = useState(false); // State to track loading

//   // Handle input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setStatus('Sending...');
//     setIsLoading(true); // Show the loading spinner

//     try {
//       const response = await fetch('/api/sendEmail', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       if (data.success) {
//         setStatus('Message sent successfully!');
//         setFormData({ name: '', email: '', message: '' }); // Clear the form
//       } else {
//         setStatus('Failed to send message. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setStatus('An error occurred. Please try again later.');
//     } finally {
//       setIsLoading(false); // Hide the loading spinner once the process is complete
//     }
//   };

//   return (
//     <section
//       id="contact"
//       className="h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
//       style={{ backgroundImage: "url('/images/coffee1.jpeg')" }}
//     >
//       {isLoading && <Loading />} {/* Show the loading spinner when isLoading is true */}

//       <div className="max-w-lg w-full bg-accent-darkGreen/60 shadow-lg rounded-lg p-6 text-center relative z-10">
        
//         <h2 className="text-4xl font-bold mb-4 text-accent-deepCoffee">Contact Us</h2>
//         <p className="text-lg mb-6 text-accent-beige">
//           Have questions? Get in touch with us to learn more about our coffee and sustainable practices.
//         </p>

//         {/* Contact Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Your Name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border border-gray-300 rounded bg-white bg-opacity-90 focus:bg-opacity-100 transition-all"
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Your Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border border-gray-300 rounded bg-white bg-opacity-90 focus:bg-opacity-100 transition-all"
//           />

//           <textarea
//             name="message"
//             placeholder="Your Message"
//             value={formData.message}
//             onChange={handleChange}
//             required
//             rows={4}
//             className="w-full p-2 border border-gray-300 rounded bg-white bg-opacity-90 focus:bg-opacity-100 transition-all"
//           ></textarea>

//           {/* Use the MessageSentButton instead of the default button */}
//           <MessageSentButton onClick={handleSubmit} />
//         </form>

//         {/* Status Message */}
//         {status && <p className="mt-4 text-sm text-gray-600">{status}</p>}
//       </div>
//     </section>
//   );
// };

// export default Contact;


