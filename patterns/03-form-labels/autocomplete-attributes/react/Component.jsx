// react/Component.jsx
// Pattern: 03-form-labels/autocomplete-attributes
//
// BAD: No autocomplete attributes
// GOOD: Proper autocomplete attributes for personal information fields

// ❌ BEFORE: No autocomplete attributes
export const Before = () => {
  return (
    <div className="form-card">
      <h1 className="form-title">Create Account</h1>
      <p className="form-subtitle">Join us today and get started.</p>

      <form className="registration-form">
        {/* BAD: No autocomplete attribute */}
        <div className="form-field">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input type="text" id="name" name="name" placeholder="John Doe" />
        </div>

        {/* BAD: No autocomplete attribute */}
        <div className="form-field">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input type="email" id="email" name="email" placeholder="you@example.com" />
        </div>

        {/* BAD: No autocomplete attribute */}
        <div className="form-field">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input type="tel" id="phone" name="phone" placeholder="+1 (555) 000-0000" />
        </div>

        {/* BAD: No autocomplete attributes for address fields */}
        <div className="form-section">
          <h2 className="section-title">Address</h2>
          <div className="address-fields">
            <div className="form-field">
              <label htmlFor="street" className="form-label">Street Address</label>
              <input type="text" id="street" name="street" placeholder="123 Main St" />
            </div>
            <div className="form-field">
              <label htmlFor="city" className="form-label">City</label>
              <input type="text" id="city" name="city" placeholder="New York" />
            </div>
            <div className="form-field">
              <label htmlFor="zip" className="form-label">ZIP Code</label>
              <input type="text" id="zip" name="zip" placeholder="10001" />
            </div>
          </div>
        </div>

        {/* BAD: No autocomplete attribute */}
        <div className="form-field">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" id="password" name="password" placeholder="•••••••" />
        </div>

        <button type="submit" className="submit-button">Create Account</button>
      </form>

      <p className="form-footer">
        Already have an account? <a href="#">Sign in</a>
      </p>
    </div>
  );
};

// ✅ AFTER: Proper autocomplete attributes
export const After = () => {
  return (
    <div className="form-card">
      <h1 className="form-title">Create Account</h1>
      <p className="form-subtitle">Join us today and get started.</p>

      <form className="registration-form">
        {/* GOOD: Proper autocomplete attribute for name */}
        <div className="form-field">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input type="text" id="name" name="name" placeholder="John Doe" autoComplete="name" />
        </div>

        {/* GOOD: Proper autocomplete attribute for email */}
        <div className="form-field">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input type="email" id="email" name="email" placeholder="you@example.com" autoComplete="email" />
        </div>

        {/* GOOD: Proper autocomplete attribute for phone */}
        <div className="form-field">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input type="tel" id="phone" name="phone" placeholder="+1 (555) 000-0000" autoComplete="tel" />
        </div>

        {/* GOOD: Proper autocomplete attributes for address fields */}
        <div className="form-section">
          <h2 className="section-title">Address</h2>
          <div className="address-fields">
            <div className="form-field">
              <label htmlFor="street" className="form-label">Street Address</label>
              <input type="text" id="street" name="street" placeholder="123 Main St" autoComplete="street-address" />
            </div>
            <div className="form-field">
              <label htmlFor="city" className="form-label">City</label>
              <input type="text" id="city" name="city" placeholder="New York" autoComplete="address-level2" />
            </div>
            <div className="form-field">
              <label htmlFor="zip" className="form-label">ZIP Code</label>
              <input type="text" id="zip" name="zip" placeholder="10001" autoComplete="postal-code" />
            </div>
          </div>
        </div>

        {/* GOOD: Proper autocomplete attribute for new password */}
        <div className="form-field">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" id="password" name="password" placeholder="•••••••" autoComplete="new-password" />
        </div>

        <button type="submit" className="submit-button">Create Account</button>
      </form>

      <p className="form-footer">
        Already have an account? <a href="#">Sign in</a>
      </p>
    </div>
  );
};
