// react/Component.jsx
// Pattern: 03-form-labels/placeholder-as-label
//
// BAD: Using placeholder as the only label - no proper label element
// GOOD: Using proper label with placeholder as supplementary helper text

// ❌ BEFORE: Placeholder as the only label
export const Before = () => {
  return (
    <div className="form-card">
      <h1 className="form-title">Contact Us</h1>
      <p className="form-subtitle">We'd love to hear from you. Send us a message.</p>

      <form className="contact-form">
        {/* BAD: Using placeholder as the only label - no proper label element */}
        <div className="form-field">
          <input type="text" name="name" placeholder="Your Name" />
        </div>

        <div className="form-field">
          <input type="email" name="email" placeholder="Your Email" />
        </div>

        <div className="form-field">
          <textarea name="message" rows="4" placeholder="Your Message"></textarea>
        </div>

        <button type="submit" className="submit-button">Send Message</button>
      </form>

      <p className="form-footer">
        We'll get back to you within 24 hours.
      </p>
    </div>
  );
};

// ✅ AFTER: Proper label with placeholder as supplementary helper text
export const After = () => {
  return (
    <div className="form-card">
      <h1 className="form-title">Contact Us</h1>
      <p className="form-subtitle">We'd love to hear from you. Send us a message.</p>

      <form className="contact-form">
        {/* GOOD: Proper label with placeholder as supplementary helper text */}
        <div className="form-field">
          <label htmlFor="name" className="form-label">Your Name</label>
          <input type="text" id="name" name="name" placeholder="e.g., John Doe" />
        </div>

        <div className="form-field">
          <label htmlFor="email" className="form-label">Your Email</label>
          <input type="email" id="email" name="email" placeholder="e.g., john@example.com" />
        </div>

        <div className="form-field">
          <label htmlFor="message" className="form-label">Your Message</label>
          <textarea id="message" name="message" rows="4" placeholder="How can we help you?"></textarea>
        </div>

        <button type="submit" className="submit-button">Send Message</button>
      </form>

      <p className="form-footer">
        We'll get back to you within 24 hours.
      </p>
    </div>
  );
};
