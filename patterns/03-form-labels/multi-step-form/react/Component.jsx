// react/Component.jsx
// Pattern: 03-form-labels/multi-step-form
//
// BAD: No step indicators or progress indication
// GOOD: Proper step indicators, progress bar, and ARIA announcements

// ❌ BEFORE: No step indicators or progress indication
export const Before = () => {
  return (
    <div className="form-card">
      <h1 className="form-title">Checkout</h1>
      <p className="form-subtitle">Complete your purchase in a few steps.</p>

      <form className="checkout-form">
        {/* Step 1: Shipping */}
        <div className="form-section">
          <h2>Shipping Information</h2>
          <div className="form-field">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input type="text" id="name" name="name" placeholder="John Doe" />
          </div>
          <div className="form-field">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" id="address" name="address" placeholder="123 Main St" />
          </div>
          <div className="form-field">
            <label htmlFor="city" className="form-label">City</label>
            <input type="text" id="city" name="city" placeholder="New York" />
          </div>
          <button type="button" className="next-button">Continue to Payment</button>
        </div>

        {/* Step 2: Payment */}
        <div className="form-section" style={{ display: 'none' }}>
          <h2>Payment Information</h2>
          <div className="form-field">
            <label htmlFor="card-number" className="form-label">Card Number</label>
            <input type="text" id="card-number" name="card-number" placeholder="1234 5678 9012" />
          </div>
          <div className="form-field">
            <label htmlFor="expiry" className="form-label">Expiry Date</label>
            <input type="text" id="expiry" name="expiry" placeholder="MM/YY" />
          </div>
          <div className="form-field">
            <label htmlFor="cvv" className="form-label">CVV</label>
            <input type="text" id="cvv" name="cvv" placeholder="123" />
          </div>
          <button type="button" className="next-button">Continue to Review</button>
        </div>

        {/* Step 3: Review */}
        <div className="form-section" style={{ display: 'none' }}>
          <h2>Review Order</h2>
          <div className="order-summary">
            <div className="summary-item">
              <span className="summary-label">Subtotal:</span>
              <span className="summary-value">$99.99</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Shipping:</span>
              <span className="summary-value">$9.99</span>
            </div>
            <div className="summary-item total">
              <span className="summary-label">Total:</span>
              <span className="summary-value">$109.98</span>
            </div>
          </div>
          <button type="submit" className="submit-button">Place Order</button>
        </div>
      </form>
    </div>
  );
};

// ✅ AFTER: Proper step indicators, progress bar, and ARIA announcements
export const After = () => {
  return (
    <div className="form-card">
      <h1 className="form-title">Checkout</h1>
      <p className="form-subtitle">Complete your purchase in a few steps.</p>

      {/* GOOD: Step indicators with progress bar */}
      <div className="step-indicators" role="tablist" aria-label="Checkout steps">
        <div className="step step-active" role="tab" aria-current="step" aria-selected="true">
          <span className="step-number">1</span>
          <span className="step-label">Shipping</span>
        </div>
        <div className="step" role="tab" aria-selected="false">
          <span className="step-number">2</span>
          <span className="step-label">Payment</span>
        </div>
        <div className="step" role="tab" aria-selected="false">
          <span className="step-number">3</span>
          <span className="step-label">Review</span>
        </div>
      </div>

      {/* GOOD: Progress bar showing overall completion */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: '33%' }}></div>
        <span className="progress-text">Step 1 of 3</span>
      </div>

      <form className="checkout-form">
        {/* Step 1: Shipping */}
        <div className="form-section" role="tabpanel" aria-labelledby="step-1">
          <h2 id="step-1">Shipping Information</h2>
          <div className="form-field">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input type="text" id="name" name="name" placeholder="John Doe" />
          </div>
          <div className="form-field">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" id="address" name="address" placeholder="123 Main St" />
          </div>
          <div className="form-field">
            <label htmlFor="city" className="form-label">City</label>
            <input type="text" id="city" name="city" placeholder="New York" />
          </div>
          <button type="button" className="next-button" aria-live="polite">
            Continue to Payment
          </button>
        </div>

        {/* Step 2: Payment */}
        <div className="form-section" role="tabpanel" aria-labelledby="step-2" style={{ display: 'none' }}>
          <h2 id="step-2">Payment Information</h2>
          <div className="form-field">
            <label htmlFor="card-number" className="form-label">Card Number</label>
            <input type="text" id="card-number" name="card-number" placeholder="1234 5678 9012" />
          </div>
          <div className="form-field">
            <label htmlFor="expiry" className="form-label">Expiry Date</label>
            <input type="text" id="expiry" name="expiry" placeholder="MM/YY" />
          </div>
          <div className="form-field">
            <label htmlFor="cvv" className="form-label">CVV</label>
            <input type="text" id="cvv" name="cvv" placeholder="123" />
          </div>
          <button type="button" className="next-button" aria-live="polite">
            Continue to Review
          </button>
        </div>

        {/* Step 3: Review */}
        <div className="form-section" role="tabpanel" aria-labelledby="step-3" style={{ display: 'none' }}>
          <h2 id="step-3">Review Order</h2>
          <div className="order-summary">
            <div className="summary-item">
              <span className="summary-label">Subtotal:</span>
              <span className="summary-value">$99.99</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Shipping:</span>
              <span className="summary-value">$9.99</span>
            </div>
            <div className="summary-item total">
              <span className="summary-label">Total:</span>
              <span className="summary-value">$109.98</span>
            </div>
          </div>
          <button type="submit" className="submit-button">Place Order</button>
        </div>
      </form>
    </div>
  );
};
