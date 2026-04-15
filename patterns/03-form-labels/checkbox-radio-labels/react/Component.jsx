// react/Component.jsx
// Pattern: 03-form-labels/checkbox-radio-labels
//
// BAD: Checkboxes and radio buttons not grouped with fieldset/legend
// GOOD: Proper fieldset/legend grouping for related options

// ❌ BEFORE: Missing fieldset/legend grouping
export const Before = () => {
  return (
    <div className="form-card">
      <h1 className="form-title">Preferences</h1>
      <p className="form-subtitle">Manage your notification and delivery settings.</p>

      <form className="preferences-form">
        {/* BAD: <h2> looks like a group label but has no programmatic connection
            to the inputs. A screen reader user navigating by form controls
            has no way to know which group they belong to. */}
        <div className="form-section">
          <h2 className="section-heading">Newsletter</h2>
          <div className="option-list">
            <label className="option-row">
              <input type="checkbox" name="newsletter" value="weekly" />
              <span className="option-text">
                <span className="option-label">Weekly digest</span>
                <span className="option-desc">A roundup of top stories every Monday</span>
              </span>
            </label>
            <label className="option-row">
              <input type="checkbox" name="newsletter" value="monthly" />
              <span className="option-text">
                <span className="option-label">Monthly highlights</span>
                <span className="option-desc">Product updates and company news</span>
              </span>
            </label>
            <label className="option-row">
              <input type="checkbox" name="newsletter" value="product" />
              <span className="option-text">
                <span className="option-label">Product updates</span>
                <span className="option-desc">New features and improvements</span>
              </span>
            </label>
          </div>
        </div>

        {/* BAD: Same issue — radio buttons share a name but there's no
            programmatic group label. The <h2> is invisible to AT in this context. */}
        <div className="form-section">
          <h2 className="section-heading">Delivery method</h2>
          <div className="option-list">
            <label className="option-row">
              <input type="radio" name="delivery" value="email" />
              <span className="option-text">
                <span className="option-label">Email</span>
                <span className="option-desc">Delivered to your inbox</span>
              </span>
            </label>
            <label className="option-row">
              <input type="radio" name="delivery" value="sms" />
              <span className="option-text">
                <span className="option-label">SMS</span>
                <span className="option-desc">Text messages to your phone</span>
              </span>
            </label>
            <label className="option-row">
              <input type="radio" name="delivery" value="push" />
              <span className="option-text">
                <span className="option-label">Push notification</span>
                <span className="option-desc">In-app and browser alerts</span>
              </span>
            </label>
          </div>
        </div>

        <button type="submit" className="submit-button">Save preferences</button>
      </form>
    </div>
  );
};

// ✅ AFTER: Proper fieldset/legend grouping
export const After = () => {
  return (
    <div className="form-card">
      <h1 className="form-title">Preferences</h1>
      <p className="form-subtitle">Manage your notification and delivery settings.</p>

      <form className="preferences-form">
        {/* GOOD: <fieldset> + <legend> provide a programmatic group label.
            Screen readers announce the legend when the user enters the group,
            so "Weekly digest" becomes "Newsletter, Weekly digest, checkbox". */}
        <fieldset className="form-section">
          <legend className="section-heading">Newsletter</legend>
          <div className="option-list">
            <label className="option-row">
              <input type="checkbox" id="newsletter-weekly" name="newsletter" value="weekly" />
              <span className="option-text">
                <span className="option-label">Weekly digest</span>
                <span className="option-desc">A roundup of top stories every Monday</span>
              </span>
            </label>
            <label className="option-row">
              <input type="checkbox" id="newsletter-monthly" name="newsletter" value="monthly" />
              <span className="option-text">
                <span className="option-label">Monthly highlights</span>
                <span className="option-desc">Product updates and company news</span>
              </span>
            </label>
            <label className="option-row">
              <input type="checkbox" id="newsletter-product" name="newsletter" value="product" />
              <span className="option-text">
                <span className="option-label">Product updates</span>
                <span className="option-desc">New features and improvements</span>
              </span>
            </label>
          </div>
        </fieldset>

        {/* GOOD: Radio buttons are mutually exclusive — the legend tells AT
            users what question they're answering across all options. */}
        <fieldset className="form-section">
          <legend className="section-heading">Delivery method</legend>
          <div className="option-list">
            <label className="option-row">
              <input type="radio" id="delivery-email" name="delivery" value="email" />
              <span className="option-text">
                <span className="option-label">Email</span>
                <span className="option-desc">Delivered to your inbox</span>
              </span>
            </label>
            <label className="option-row">
              <input type="radio" id="delivery-sms" name="delivery" value="sms" />
              <span className="option-text">
                <span className="option-label">SMS</span>
                <span className="option-desc">Text messages to your phone</span>
              </span>
            </label>
            <label className="option-row">
              <input type="radio" id="delivery-push" name="delivery" value="push" />
              <span className="option-text">
                <span className="option-label">Push notification</span>
                <span className="option-desc">In-app and browser alerts</span>
              </span>
            </label>
          </div>
        </fieldset>

        <button type="submit" className="submit-button">Save preferences</button>
      </form>
    </div>
  );
};
