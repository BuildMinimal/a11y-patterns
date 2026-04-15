<!-- vue/Component.vue -->
<!-- Pattern: 03-form-labels/checkbox-radio-labels -->
<!--
  BAD: Checkboxes and radio buttons not grouped with fieldset/legend
  GOOD: Proper fieldset/legend grouping for related options
-->

<script setup>
// ❌ BEFORE: Missing fieldset/legend grouping
const Before = () => {
  return {
    template: `
      <div class="form-card">
        <h1 class="form-title">Preferences</h1>
        <p class="form-subtitle">Manage your notification and delivery settings.</p>

        <form class="preferences-form">
          <!-- BAD: <h2> looks like a group label but has no programmatic connection
               to the inputs. A screen reader user navigating by form controls
               has no way to know which group they belong to. -->
          <div class="form-section">
            <h2 class="section-heading">Newsletter</h2>
            <div class="option-list">
              <label class="option-row">
                <input type="checkbox" name="newsletter" value="weekly" />
                <span class="option-text">
                  <span class="option-label">Weekly digest</span>
                  <span class="option-desc">A roundup of top stories every Monday</span>
                </span>
              </label>
              <label class="option-row">
                <input type="checkbox" name="newsletter" value="monthly" />
                <span class="option-text">
                  <span class="option-label">Monthly highlights</span>
                  <span class="option-desc">Product updates and company news</span>
                </span>
              </label>
              <label class="option-row">
                <input type="checkbox" name="newsletter" value="product" />
                <span class="option-text">
                  <span class="option-label">Product updates</span>
                  <span class="option-desc">New features and improvements</span>
                </span>
              </label>
            </div>
          </div>

          <!-- BAD: Same issue — radio buttons share a name but there's no
               programmatic group label. The <h2> is invisible to AT in this context. -->
          <div class="form-section">
            <h2 class="section-heading">Delivery method</h2>
            <div class="option-list">
              <label class="option-row">
                <input type="radio" name="delivery" value="email" />
                <span class="option-text">
                  <span class="option-label">Email</span>
                  <span class="option-desc">Delivered to your inbox</span>
                </span>
              </label>
              <label class="option-row">
                <input type="radio" name="delivery" value="sms" />
                <span class="option-text">
                  <span class="option-label">SMS</span>
                  <span class="option-desc">Text messages to your phone</span>
                </span>
              </label>
              <label class="option-row">
                <input type="radio" name="delivery" value="push" />
                <span class="option-text">
                  <span class="option-label">Push notification</span>
                  <span class="option-desc">In-app and browser alerts</span>
                </span>
              </label>
            </div>
          </div>

          <button type="submit" class="submit-button">Save preferences</button>
        </form>
      </div>
    `,
  };
};

// ✅ AFTER: Proper fieldset/legend grouping
const After = () => {
  return {
    template: `
      <div class="form-card">
        <h1 class="form-title">Preferences</h1>
        <p class="form-subtitle">Manage your notification and delivery settings.</p>

        <form class="preferences-form">
          <!-- GOOD: <fieldset> + <legend> provide a programmatic group label.
               Screen readers announce the legend when the user enters the group,
               so "Weekly digest" becomes "Newsletter, Weekly digest, checkbox". -->
          <fieldset class="form-section">
            <legend class="section-heading">Newsletter</legend>
            <div class="option-list">
              <label class="option-row">
                <input type="checkbox" id="newsletter-weekly" name="newsletter" value="weekly" />
                <span class="option-text">
                  <span class="option-label">Weekly digest</span>
                  <span class="option-desc">A roundup of top stories every Monday</span>
                </span>
              </label>
              <label class="option-row">
                <input type="checkbox" id="newsletter-monthly" name="newsletter" value="monthly" />
                <span class="option-text">
                  <span class="option-label">Monthly highlights</span>
                  <span class="option-desc">Product updates and company news</span>
                </span>
              </label>
              <label class="option-row">
                <input type="checkbox" id="newsletter-product" name="newsletter" value="product" />
                <span class="option-text">
                  <span class="option-label">Product updates</span>
                  <span class="option-desc">New features and improvements</span>
                </span>
              </label>
            </div>
          </fieldset>

          <!-- GOOD: Radio buttons are mutually exclusive — the legend tells AT
               users what question they're answering across all options. -->
          <fieldset class="form-section">
            <legend class="section-heading">Delivery method</legend>
            <div class="option-list">
              <label class="option-row">
                <input type="radio" id="delivery-email" name="delivery" value="email" />
                <span class="option-text">
                  <span class="option-label">Email</span>
                  <span class="option-desc">Delivered to your inbox</span>
                </span>
              </label>
              <label class="option-row">
                <input type="radio" id="delivery-sms" name="delivery" value="sms" />
                <span class="option-text">
                  <span class="option-label">SMS</span>
                  <span class="option-desc">Text messages to your phone</span>
                </span>
              </label>
              <label class="option-row">
                <input type="radio" id="delivery-push" name="delivery" value="push" />
                <span class="option-text">
                  <span class="option-label">Push notification</span>
                  <span class="option-desc">In-app and browser alerts</span>
                </span>
              </label>
            </div>
          </fieldset>

          <button type="submit" class="submit-button">Save preferences</button>
        </form>
      </div>
    `,
  };
};
</script>
