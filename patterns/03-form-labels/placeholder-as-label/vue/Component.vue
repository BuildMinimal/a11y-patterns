<!-- vue/Component.vue -->
<!-- Pattern: 03-form-labels/placeholder-as-label -->
<!-- 
  BAD: Using placeholder as the only label - no proper label element
  GOOD: Using proper label with placeholder as supplementary helper text
-->

<script setup>
// ❌ BEFORE: Placeholder as the only label
const Before = () => {
  return {
    template: `
      <div class="form-card">
        <h1 class="form-title">Contact Us</h1>
        <p class="form-subtitle">We'd love to hear from you. Send us a message.</p>

        <form class="contact-form">
          <!-- BAD: Using placeholder as the only label - no proper label element -->
          <div class="form-field">
            <input type="text" name="name" placeholder="Your Name" />
          </div>

          <div class="form-field">
            <input type="email" name="email" placeholder="Your Email" />
          </div>

          <div class="form-field">
            <textarea name="message" rows="4" placeholder="Your Message"></textarea>
          </div>

          <button type="submit" class="submit-button">Send Message</button>
        </form>

        <p class="form-footer">
          We'll get back to you within 24 hours.
        </p>
      </div>
    `,
  };
};

// ✅ AFTER: Proper label with placeholder as supplementary helper text
const After = () => {
  return {
    template: `
      <div class="form-card">
        <h1 class="form-title">Contact Us</h1>
        <p class="form-subtitle">We'd love to hear from you. Send us a message.</p>

        <form class="contact-form">
          <!-- GOOD: Proper label with placeholder as supplementary helper text -->
          <div class="form-field">
            <label for="name" class="form-label">Your Name</label>
            <input type="text" id="name" name="name" placeholder="e.g., John Doe" />
          </div>

          <div class="form-field">
            <label for="email" class="form-label">Your Email</label>
            <input type="email" id="email" name="email" placeholder="e.g., john@example.com" />
          </div>

          <div class="form-field">
            <label for="message" class="form-label">Your Message</label>
            <textarea id="message" name="message" rows="4" placeholder="How can we help you?"></textarea>
          </div>

          <button type="submit" class="submit-button">Send Message</button>
        </form>

        <p class="form-footer">
          We'll get back to you within 24 hours.
        </p>
      </div>
    `,
  };
};
</script>
