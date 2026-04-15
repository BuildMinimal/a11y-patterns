// react/Component.jsx
// Pattern: 03-form-labels/required-fields
//
// BAD: Required fields indicated only by color
// GOOD: Required fields indicated by asterisk, required attribute, and descriptive text

// ❌ BEFORE: Required fields indicated only by color
export const Before = () => {
  return (
    <div className="form-card">
      <h1 className="form-title">Create Account</h1>
      <p className="form-subtitle">Join us today and get started.</p>

      <form className="registration-form">
        {/* BAD: Required field indicated only by color */}
        <div className="form-field">
          <label htmlFor="name" className="label-required">Full Name</label>
          <input type="text" id="name" name="name" placeholder="John Doe" />
        </div>

        {/* BAD: Required field indicated only by color */}
        <div className="form-field">
          <label htmlFor="email" className="label-required">Email Address</label>
          <input type="email" id="email" name="email" placeholder="you@example.com" />
        </div>

        {/* Optional field (no color indicator) */}
        <div className="form-field">
          <label htmlFor="phone" className="label-optional">Phone Number</label>
          <input type="tel" id="phone" name="phone" placeholder="+1 (555) 000-0000" />
        </div>

        {/* BAD: Required field indicated only by color */}
        <div className="form-field">
          <label htmlFor="password" className="label-required">Password</label>
          <input type="password" id="password" name="password" placeholder="••••••••" />
        </div>

        <button type="submit" className="submit-button">Create Account</button>
      </form>

      <p className="form-footer">
        Already have an account? <a href="#">Sign in</a>
      </p>
    </div>
  );
};

// ✅ AFTER: Required fields indicated by asterisk, required attribute, and descriptive text
export const After = () => {
  return (
    <div className="form-card">
      <h1 className="form-title">Create Account</h1>
      <p className="form-subtitle">Join us today and get started.</p>

      {/* GOOD: Explains required indicator */}
      <p className="required-note">
        <span className="required-indicator">*</span> Required fields
      </p>

      <form className="registration-form">
        {/* GOOD: Required field with asterisk and required attribute */}
        <div className="form-field">
          <label htmlFor="name" className="form-label">
            Full Name <span className="required-indicator" aria-hidden="true">*</span>
          </label>
          <input type="text" id="name" name="name" placeholder="John Doe" required />
        </div>

        {/* GOOD: Required field with asterisk and required attribute */}
        <div className="form-field">
          <label htmlFor="email" className="form-label">
            Email Address <span className="required-indicator" aria-hidden="true">*</span>
          </label>
          <input type="email" id="email" name="email" placeholder="you@example.com" required />
        </div>

        {/* Optional field with clear indication */}
        <div className="form-field">
          <label htmlFor="phone" className="form-label label-optional">
            Phone Number <span className="optional-text">(optional)</span>
          </label>
          <input type="tel" id="phone" name="phone" placeholder="+1 (555) 000-0000" />
        </div>

        {/* GOOD: Required field with asterisk and required attribute */}
        <div className="form-field">
          <label htmlFor="password" className="form-label">
            Password <span className="required-indicator" aria-hidden="true">*</span>
          </label>
          <input type="password" id="password" name="password" placeholder="••••••••" required />
        </div>

        <button type="submit" className="submit-button">Create Account</button>
      </form>

      <p className="form-footer">
        Already have an account? <a href="#">Sign in</a>
      </p>
    </div>
  );
};
