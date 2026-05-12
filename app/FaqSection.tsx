import React from 'react';
import { faqs } from './data';

export default function FaqSection() {
  return (
    <section className="section faq" id="faq">
      <h2>FAQ</h2>
      <div className="faqWrapper">
        {faqs.map(([q, a]) => (
          <details className="faqItem" key={q}>
            <summary className="faqQuestion">
              {q}
              <div className="faqToggle">+</div>
            </summary>
            <p className="faqAnswer">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
