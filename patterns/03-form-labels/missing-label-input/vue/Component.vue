<!-- vue/Component.vue -->
<!-- Pattern: 03-form-labels/missing-label-input -->
<!-- 
  BAD: Using div instead of label - no programmatic association
  GOOD: Using label with for/id - proper association
-->

<script setup>
// ❌ BEFORE: Missing label association
const Before = () => {
  return {
    template: `
      <div class="form-card">
        <h1 class="form-title">Sign In</h1>
        <p class="form-subtitle">Welcome back! Please enter your details.</p>

        <form class="login-form">
          <!-- BAD: Using div instead of label - no programmatic association -->
          <div class="form-field">
            <div class="form-label">Username</div>
            <input type="text" name="username" placeholder="Enter your username" />
          </div>

          <div class="form-field">
            <div class="form-label">Email</div>
            <input type="email" name="email" placeholder="Enter your email" />
          </div>

          <div class="form-field">
            <div class="form-label">Password</div>
            <input type="password" name="password" placeholder="Enter your password" />
          </div>

          <button type="submit" class="submit-button">Sign In</button>
        </form>

        <p class="form-footer">
          Don't have an account? <a href="#">Sign up</a>
        </p>
      </div>
    `,
  };
};

// ✅ AFTER: Proper label association
const After = () => {
  return {
    template: `
      <div class="form-card">
        <h1 class="form-title">Sign In</h1>
        <p class="form-subtitle">Welcome back! Please enter your details.</p>

        <form class="login-form">
          <!-- GOOD: Label properly associated with input via for/id -->
          <div class="form-field">
            <label for="username" class="form-label">Username</label>
            <input type="text" id="username" name="username" placeholder="Enter your username" />
          </div>

          <div class="form-field">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" />
          </div>

          <div class="form-field">
            <label for="password" class="form-label">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" />
          </div>

          <button type="submit" class="submit-button">Sign In</button>
        </form>

        <p class="form-footer">
          Don't have an account? <a href="#">Sign up</a>
        </p>
      </div>
    `,
  };
};
</script>
