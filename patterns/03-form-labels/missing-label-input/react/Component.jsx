// react/Component.jsx
// Pattern: 03-form-labels/missing-label-input
//
// BAD: Using div instead of label - no programmatic association
// GOOD: Using label with htmlFor/id - proper association

// ❌ BEFORE: Missing label association
export const Before = () => {
  return (
    <div className="form-card">
      <h1 className="form-title">Sign In</h1>
      <p className="form-subtitle">Welcome back! Please enter your details.</p>

      <form className="login-form">
        {/* BAD: Using div instead of label - no programmatic association */}
        <div className="form-field">
          <div className="form-label">Username</div>
          <input type="text" name="username" placeholder="Enter your username" />
        </div>

        <div className="form-field">
          <div className="form-label">Email</div>
          <input type="email" name="email" placeholder="Enter your email" />
        </div>

        <div className="form-field">
          <div className="form-label">Password</div>
          <input type="password" name="password" placeholder="Enter your password" />
        </div>

        <button type="submit" className="submit-button">Sign In</button>
      </form>

      <p className="form-footer">
        Don't have an account? <a href="#">Sign up</a>
      </p>
    </div>
  );
};

// ✅ AFTER: Proper label association
export const After = () => {
  return (
    <div className="form-card">
      <h1 className="form-title">Sign In</h1>
      <p className="form-subtitle">Welcome back! Please enter your details.</p>

      <form className="login-form">
        {/* GOOD: Label properly associated with input via htmlFor/id */}
        <div className="form-field">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" id="username" name="username" placeholder="Enter your username" />
        </div>

        <div className="form-field">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" />
        </div>

        <div className="form-field">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" />
        </div>

        <button type="submit" className="submit-button">Sign In</button>
      </form>

      <p className="form-footer">
        Don't have an account? <a href="#">Sign up</a>
      </p>
    </div>
  );
};
