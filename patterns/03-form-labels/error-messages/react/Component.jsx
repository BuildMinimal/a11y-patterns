// react/Component.jsx
// Pattern: 03-form-labels/error-messages
//
// BAD: Error messages not associated with inputs
// GOOD: Error messages associated with inputs via aria-describedby and role="alert"

// ❌ BEFORE: Error messages not associated with inputs
export const Before = () => {
  return (
    <div className="form-card">
      <h1 className="form-title">Create Account</h1>
      <p className="form-subtitle">Join us today and get started.</p>

      <form className="registration-form">
        {/* BAD: Error message not associated with input */}
        <div className="form-field">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="you@example.com" 
            className="input-error"
          />
          <div className="error-message">Please enter a valid email address</div>
        </div>

        {/* BAD: Error message not associated with input */}
        <div className="form-field">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="••••••••" 
            className="input-error"
          />
          <div className="error-message">Password must be at least 8 characters</div>
        </div>

        {/* BAD: Error message not associated with input */}
        <div className="form-field">
          <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
          <input 
            type="password" 
            id="confirm-password" 
            name="confirm-password" 
            placeholder="••••••••" 
            className="input-error"
          />
          <div className="error-message">Passwords do not match</div>
        </div>

        <button type="submit" className="submit-button">Create Account</button>
      </form>

      <p className="form-footer">
        Already have an account? <a href="#">Sign in</a>
      </p>
    </div>
  );
};

// ✅ AFTER: Error messages associated with inputs via aria-describedby
export const After = () => {
  return (
    <div className="form-card">
      <h1 className="form-title">Create Account</h1>
      <p className="form-subtitle">Join us today and get started.</p>

      <form className="registration-form">
        {/* GOOD: Error message associated with input via aria-describedby */}
        <div className="form-field">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="you@example.com" 
            className="input-error"
            aria-describedby="email-error"
          />
          <div id="email-error" className="error-message" role="alert">
            <span className="error-icon">⚠</span>
            Please enter a valid email address
          </div>
        </div>

        {/* GOOD: Error message associated with input via aria-describedby */}
        <div className="form-field">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="••••••••" 
            className="input-error"
            aria-describedby="password-error"
          />
          <div id="password-error" className="error-message" role="alert">
            <span className="error-icon">⚠</span>
            Password must be at least 8 characters
          </div>
        </div>

        {/* GOOD: Error message associated with input via aria-describedby */}
        <div className="form-field">
          <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
          <input 
            type="password" 
            id="confirm-password" 
            name="confirm-password" 
            placeholder="••••••••" 
            className="input-error"
            aria-describedby="confirm-error"
          />
          <div id="confirm-error" className="error-message" role="alert">
            <span className="error-icon">⚠</span>
            Passwords do not match
          </div>
        </div>

        <button type="submit" className="submit-button">Create Account</button>
      </form>

      <p className="form-footer">
        Already have an account? <a href="#">Sign in</a>
      </p>
    </div>
  );
};
