import { faqs } from './data';

export default function FaqSection() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(([q, a]) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": a
      }
    }))
  };

  return (
    <section className="section faq" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h2>FAQ</h2>
      <div className="faqWrapper">
        {faqs.map(([q, a]) => (
          <details className="faqItem" key={q}>
            <summary className="faqQuestion">
              <h3>{q}</h3>
              <div className="faqToggle"></div>
            </summary>
            <p className="faqAnswer">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
