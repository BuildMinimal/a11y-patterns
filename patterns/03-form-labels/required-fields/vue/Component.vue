<!-- vue/Component.vue -->
<!-- Pattern: 03-form-labels/required-fields -->
<!-- 
  BAD: Required fields indicated only by color
  GOOD: Required fields indicated by asterisk, required attribute, and descriptive text
-->

<script setup>
// ❌ BEFORE: Required fields indicated only by color
const Before = () => {
  return {
    template: `
      <div class="form-card">
        <h1 class="form-title">Create Account</h1>
        <p class="form-subtitle">Join us today and get started.</p>

        <form class="registration-form">
          <!-- BAD: Required field indicated only by color -->
          <div class="form-field">
            <label for="name" class="label-required">Full Name</label>
            <input type="text" id="name" name="name" placeholder="John Doe" />
          </div>

          <!-- BAD: Required field indicated only by color -->
          <div class="form-field">
            <label for="email" class="label-required">Email Address</label>
            <input type="email" id="email" name="email" placeholder="you@example.com" />
          </div>

          <!-- Optional field (no color indicator) -->
          <div class="form-field">
            <label for="phone" class="label-optional">Phone Number</label>
            <input type="tel" id="phone" name="phone" placeholder="+1 (555) 000-0000" />
          </div>

          <!-- BAD: Required field indicated only by color -->
          <div class="form-field">
            <label for="password" class="label-required">Password</label>
            <input type="password" id="password" name="password" placeholder="•••••••" />
          </div>

          <button type="submit" class="submit-button">Create Account</button>
        </form>

        <p class="form-footer">
          Already have an account? <a href="#">Sign in</a>
        </p>
      </div>
    `,
  };
};

// ✅ AFTER: Required fields indicated by asterisk, required attribute, and descriptive text
const After = () => {
  return {
    template: `
      <div class="form-card">
        <h1 class="form-title">Create Account</h1>
        <p class="form-subtitle">Join us today and get started.</p>

        <!-- GOOD: Explains required indicator -->
        <p class="required-note">
          <span class="required-indicator">*</span> Required fields
        </p>

        <form class="registration-form">
          <!-- GOOD: Required field with asterisk and required attribute -->
          <div class="form-field">
            <label for="name" class="form-label">
              Full Name <span class="required-indicator" aria-hidden="true">*</span>
            </label>
            <input type="text" id="name" name="name" placeholder="John Doe" required />
          </div>

          <!-- GOOD: Required field with asterisk and required attribute -->
          <div class="form-field">
            <label for="email" class="form-label">
              Email Address <span class="required-indicator" aria-hidden="true">*</span>
            </label>
            <input type="email" id="email" name="email" placeholder="you@example.com" required />
          </div>

          <!-- Optional field with clear indication -->
          <div class="form-field">
            <label for="phone" class="form-label label-optional">
              Phone Number <span class="optional-text">(optional)</span>
            </label>
            <input type="tel" id="phone" name="phone" placeholder="+1 (555) 000-0000" />
          </div>

          <!-- GOOD: Required field with asterisk and required attribute -->
          <div class="form-field">
            <label for="password" class="form-label">
              Password <span class="required-indicator" aria-hidden="true">*</span>
            </label>
            <input type="password" id="password" name="password" placeholder="•••••••" required />
          </div>

          <button type="submit" class="submit-button">Create Account</button>
        </form>

        <p class="form-footer">
          Already have an account? <a href="#">Sign in</a>
        </p>
      </div>
    `,
  };
};
</script>
