<!-- vue/Component.vue -->
<!-- Pattern: 03-form-labels/autocomplete-attributes -->
<!-- 
  BAD: No autocomplete attributes
  GOOD: Proper autocomplete attributes for personal information fields
-->

<script setup>
// ❌ BEFORE: No autocomplete attributes
const Before = () => {
  return {
    template: `
      <div class="form-card">
        <h1 class="form-title">Create Account</h1>
        <p class="form-subtitle">Join us today and get started.</p>

        <form class="registration-form">
          <!-- BAD: No autocomplete attribute -->
          <div class="form-field">
            <label for="name" class="form-label">Full Name</label>
            <input type="text" id="name" name="name" placeholder="John Doe" />
          </div>

          <!-- BAD: No autocomplete attribute -->
          <div class="form-field">
            <label for="email" class="form-label">Email Address</label>
            <input type="email" id="email" name="email" placeholder="you@example.com" />
          </div>

          <!-- BAD: No autocomplete attribute -->
          <div class="form-field">
            <label for="phone" class="form-label">Phone Number</label>
            <input type="tel" id="phone" name="phone" placeholder="+1 (555) 000-0000" />
          </div>

          <!-- BAD: No autocomplete attributes for address fields -->
          <div class="form-section">
            <h2 class="section-title">Address</h2>
            <div class="address-fields">
              <div class="form-field">
                <label for="street" class="form-label">Street Address</label>
                <input type="text" id="street" name="street" placeholder="123 Main St" />
              </div>
              <div class="form-field">
                <label for="city" class="form-label">City</label>
                <input type="text" id="city" name="city" placeholder="New York" />
              </div>
              <div class="form-field">
                <label for="zip" class="form-label">ZIP Code</label>
                <input type="text" id="zip" name="zip" placeholder="10001" />
              </div>
            </div>
          </div>

          <!-- BAD: No autocomplete attribute -->
          <div class="form-field">
            <label for="password" class="form-label">Password</label>
            <input type="password" id="password" name="password" placeholder="••••••" />
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

// ✅ AFTER: Proper autocomplete attributes
const After = () => {
  return {
    template: `
      <div class="form-card">
        <h1 class="form-title">Create Account</h1>
        <p class="form-subtitle">Join us today and get started.</p>

        <form class="registration-form">
          <!-- GOOD: Proper autocomplete attribute for name -->
          <div class="form-field">
            <label for="name" class="form-label">Full Name</label>
            <input type="text" id="name" name="name" placeholder="John Doe" autocomplete="name" />
          </div>

          <!-- GOOD: Proper autocomplete attribute for email -->
          <div class="form-field">
            <label for="email" class="form-label">Email Address</label>
            <input type="email" id="email" name="email" placeholder="you@example.com" autocomplete="email" />
          </div>

          <!-- GOOD: Proper autocomplete attribute for phone -->
          <div class="form-field">
            <label for="phone" class="form-label">Phone Number</label>
            <input type="tel" id="phone" name="phone" placeholder="+1 (555) 000-0000" autocomplete="tel" />
          </div>

          <!-- GOOD: Proper autocomplete attributes for address fields -->
          <div class="form-section">
            <h2 class="section-title">Address</h2>
            <div class="address-fields">
              <div class="form-field">
                <label for="street" class="form-label">Street Address</label>
                <input type="text" id="street" name="street" placeholder="123 Main St" autocomplete="street-address" />
              </div>
              <div class="form-field">
                <label for="city" class="form-label">City</label>
                <input type="text" id="city" name="city" placeholder="New York" autocomplete="address-level2" />
              </div>
              <div class="form-field">
                <label for="zip" class="form-label">ZIP Code</label>
                <input type="text" id="zip" name="zip" placeholder="10001" autocomplete="postal-code" />
              </div>
            </div>
          </div>

          <!-- GOOD: Proper autocomplete attribute for new password -->
          <div class="form-field">
            <label for="password" class="form-label">Password</label>
            <input type="password" id="password" name="password" placeholder="••••••" autocomplete="new-password" />
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
