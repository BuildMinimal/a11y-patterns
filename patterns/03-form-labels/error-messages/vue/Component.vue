<!-- vue/Component.vue -->
<!-- Pattern: 03-form-labels/error-messages -->
<!-- 
  BAD: Error messages not associated with inputs
  GOOD: Error messages associated with inputs via aria-describedby and role="alert"
-->

<script setup>
// ❌ BEFORE: Error messages not associated with inputs
const Before = () => {
  return {
    template: `
      <div class="form-card">
        <h1 class="form-title">Create Account</h1>
        <p class="form-subtitle">Join us today and get started.</p>

        <form class="registration-form">
          <!-- BAD: Error message not associated with input -->
          <div class="form-field">
            <label for="email" class="form-label">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="you@example.com" 
              class="input-error"
            />
            <div class="error-message">Please enter a valid email address</div>
          </div>

          <!-- BAD: Error message not associated with input -->
          <div class="form-field">
            <label for="password" class="form-label">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="•••••••" 
              class="input-error"
            />
            <div class="error-message">Password must be at least 8 characters</div>
          </div>

          <!-- BAD: Error message not associated with input -->
          <div class="form-field">
            <label for="confirm-password" class="form-label">Confirm Password</label>
            <input 
              type="password" 
              id="confirm-password" 
              name="confirm-password" 
              placeholder="•••••••" 
              class="input-error"
            />
            <div class="error-message">Passwords do not match</div>
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

// ✅ AFTER: Error messages associated with inputs via aria-describedby
const After = () => {
  return {
    template: `
      <div class="form-card">
        <h1 class="form-title">Create Account</h1>
        <p class="form-subtitle">Join us today and get started.</p>

        <form class="registration-form">
          <!-- GOOD: Error message associated with input via aria-describedby -->
          <div class="form-field">
            <label for="email" class="form-label">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="you@example.com" 
              class="input-error"
              aria-describedby="email-error"
            />
            <div id="email-error" class="error-message" role="alert">
              <span class="error-icon">⚠</span>
              Please enter a valid email address
            </div>
          </div>

          <!-- GOOD: Error message associated with input via aria-describedby -->
          <div class="form-field">
            <label for="password" class="form-label">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="•••••••" 
              class="input-error"
              aria-describedby="password-error"
            />
            <div id="password-error" class="error-message" role="alert">
              <span class="error-icon">⚠</span>
              Password must be at least 8 characters
            </div>
          </div>

          <!-- GOOD: Error message associated with input via aria-describedby -->
          <div class="form-field">
            <label for="confirm-password" class="form-label">Confirm Password</label>
            <input 
              type="password" 
              id="confirm-password" 
              name="confirm-password" 
              placeholder="•••••••" 
              class="input-error"
              aria-describedby="confirm-error"
            />
            <div id="confirm-error" class="error-message" role="alert">
              <span class="error-icon">⚠</span>
              Passwords do not match
            </div>
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
