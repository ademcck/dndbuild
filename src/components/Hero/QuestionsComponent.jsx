import React, { useState } from 'react';
import { FaQuestionCircle, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export default function FAQSection() {
  const [expanded, setExpanded] = useState(null);

  const toggleAnswer = (index) => {
    if (expanded === index) {
      setExpanded(null);
    } else {
      setExpanded(index);
    }
  };

  const questions = [
    {
      question: 'How can I get started with your service?',
      answer: 'To get started, simply sign up on our website and follow the onboarding process.',
      icon: <FaQuestionCircle />
    },
    {
      question: 'What is your refund policy?',
      answer: 'We offer a 30-day money-back guarantee if you are not satisfied with our services.',
      icon: <FaCheckCircle />
    },
    {
      question: 'Do you offer customer support?',
      answer: 'Yes, we provide 24/7 customer support via email, live chat, and phone.',
      icon: <FaExclamationCircle />
    }
  ];

  return (
    <section className="bg-darkCyan py-16 px-6 text-white">
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-100 mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-gray-400">Have a question? We've got answers!</p>
      </div>

      <div className="max-w-3xl mx-auto">
        {questions.map((item, index) => (
          <div
            key={index}
            className={`bg-gray-800 rounded-lg shadow-lg mb-6 p-6 transition-all duration-300 ease-in-out transform ${
              expanded === index ? 'bg-gray-700' : 'bg-gray-800'
            }`}
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAnswer(index)}
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl">{item.icon}</div>
                <h3 className="text-xl font-semibold">{item.question}</h3>
              </div>
              <div className="text-2xl">
                {expanded === index ? '-' : '+'}
              </div>
            </div>

            {expanded === index && (
              <div className="mt-4 text-gray-300">{item.answer}</div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-2xl font-semibold text-gray-100 mb-4">Have another question?</h3>
        <input
          type="text"
          placeholder="Type your question here"
          className="w-1/2 p-4 rounded-md text-gray-900 placeholder-gray-500 bg-gray-100 shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>
    </section>
  );
}
