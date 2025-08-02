# Now let's create the updated CSS file with additional styles for the invoice creation modal

css_content = '''/* Import existing styles and add new ones for invoice creation */
:root {
  /* Primitive Color Tokens */
  --color-white: rgba(255, 255, 255, 1);
  --color-black: rgba(0, 0, 0, 1);
  --color-cream-50: rgba(252, 252, 249, 1);
  --color-cream-100: rgba(255, 255, 253, 1);
  --color-gray-200: rgba(245, 245, 245, 1);
  --color-gray-300: rgba(167, 169, 169, 1);
  --color-gray-400: rgba(119, 124, 124, 1);
  --color-slate-500: rgba(98, 108, 113, 1);
  --color-brown-600: rgba(94, 82, 64, 1);
  --color-charcoal-700: rgba(31, 33, 33, 1);
  --color-charcoal-800: rgba(38, 40, 40, 1);
  --color-slate-900: rgba(19, 52, 59, 1);
  --color-teal-300: rgba(50, 184, 198, 1);
  --color-teal-400: rgba(45, 166, 178, 1);
  --color-teal-500: rgba(33, 128, 141, 1);
  --color-teal-600: rgba(29, 116, 128, 1);
  --color-teal-700: rgba(26, 104, 115, 1);
  --color-teal-800: rgba(41, 150, 161, 1);
  --color-red-400: rgba(255, 84, 89, 1);
  --color-red-500: rgba(192, 21, 47, 1);
  --color-orange-400: rgba(230, 129, 97, 1);
  --color-orange-500: rgba(168, 75, 47, 1);

  /* RGB versions for opacity control */
  --color-brown-600-rgb: 94, 82, 64;
  --color-teal-500-rgb: 33, 128, 141;
  --color-slate-900-rgb: 19, 52, 59;
  --color-slate-500-rgb: 98, 108, 113;
  --color-red-500-rgb: 192, 21, 47;
  --color-red-400-rgb: 255, 84, 89;
  --color-orange-500-rgb: 168, 75, 47;
  --color-orange-400-rgb: 230, 129, 97;

  /* Background color tokens (Light Mode) */
  --color-bg-1: rgba(59, 130, 246, 0.08); /* Light blue */
  --color-bg-2: rgba(245, 158, 11, 0.08); /* Light yellow */
  --color-bg-3: rgba(34, 197, 94, 0.08); /* Light green */
  --color-bg-4: rgba(239, 68, 68, 0.08); /* Light red */
  --color-bg-5: rgba(147, 51, 234, 0.08); /* Light purple */
  --color-bg-6: rgba(249, 115, 22, 0.08); /* Light orange */
  --color-bg-7: rgba(236, 72, 153, 0.08); /* Light pink */
  --color-bg-8: rgba(6, 182, 212, 0.08); /* Light cyan */

  /* Semantic Color Tokens (Light Mode) */
  --color-background: var(--color-cream-50);
  --color-surface: var(--color-cream-100);
  --color-text: var(--color-slate-900);
  --color-text-secondary: var(--color-slate-500);
  --color-primary: var(--color-teal-500);
  --color-primary-hover: var(--color-teal-600);
  --color-primary-active: var(--color-teal-700);
  --color-secondary: rgba(var(--color-brown-600-rgb), 0.12);
  --color-secondary-hover: rgba(var(--color-brown-600-rgb), 0.2);
  --color-secondary-active: rgba(var(--color-brown-600-rgb), 0.25);
  --color-border: rgba(var(--color-brown-600-rgb), 0.2);
  --color-btn-primary-text: var(--color-cream-50);
  --color-card-border: rgba(var(--color-brown-600-rgb), 0.12);
  --color-card-border-inner: rgba(var(--color-brown-600-rgb), 0.12);
  --color-error: var(--color-red-500);
  --color-success: var(--color-teal-500);
  --color-warning: var(--color-orange-500);
  --color-info: var(--color-slate-500);
  --color-focus-ring: rgba(var(--color-teal-500-rgb), 0.4);

  /* Common style patterns */
  --focus-ring: 0 0 0 3px var(--color-focus-ring);
  --focus-outline: 2px solid var(--color-primary);

  /* Typography */
  --font-family-base: "FKGroteskNeue", "Geist", "Inter", -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-family-mono: "Berkeley Mono", ui-monospace, SFMono-Regular, Menlo,
    Monaco, Consolas, monospace;
  --font-size-xs: 11px;
  --font-size-sm: 12px;
  --font-size-base: 14px;
  --font-size-md: 14px;
  --font-size-lg: 16px;
  --font-size-xl: 18px;
  --font-size-2xl: 20px;
  --font-size-3xl: 24px;
  --font-size-4xl: 30px;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 550;
  --font-weight-bold: 600;
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --letter-spacing-tight: -0.01em;

  /* Spacing */
  --space-0: 0;
  --space-1: 1px;
  --space-2: 2px;
  --space-4: 4px;
  --space-6: 6px;
  --space-8: 8px;
  --space-10: 10px;
  --space-12: 12px;
  --space-16: 16px;
  --space-20: 20px;
  --space-24: 24px;
  --space-32: 32px;

  /* Border Radius */
  --radius-sm: 6px;
  --radius-base: 8px;
  --radius-md: 10px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.02);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.04),
    0 2px 4px -1px rgba(0, 0, 0, 0.02);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.04),
    0 4px 6px -2px rgba(0, 0, 0, 0.02);

  /* Animation */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --ease-standard: cubic-bezier(0.16, 1, 0.3, 1);

  /* Layout */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;

  /* Custom color overrides for the business theme */
  --color-brand-primary: #1e40af; /* Professional blue */
  --color-brand-secondary: #ea580c; /* Orange accent */
  --color-brand-light: #f0f9ff; /* Light blue background */
  --color-brand-dark: #1e3a8a; /* Dark blue */
}

/* Base styles */
html {
  font-size: var(--font-size-base);
  font-family: var(--font-family-base);
  line-height: var(--line-height-normal);
  color: var(--color-text);
  background-color: var(--color-background);
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  margin: 0;
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  color: var(--color-text);
  letter-spacing: var(--letter-spacing-tight);
}

h1 { font-size: var(--font-size-4xl); }
h2 { font-size: var(--font-size-3xl); }
h3 { font-size: var(--font-size-2xl); }
h4 { font-size: var(--font-size-xl); }
h5 { font-size: var(--font-size-lg); }
h6 { font-size: var(--font-size-md); }

p {
  margin: 0 0 var(--space-16) 0;
}

a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-standard);
}

a:hover {
  color: var(--color-primary-hover);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-8) var(--space-16);
  border-radius: var(--radius-base);
  font-size: var(--font-size-base);
  font-weight: 500;
  line-height: 1.5;
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-standard);
  border: none;
  text-decoration: none;
  position: relative;
}

.btn:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}

.btn--primary {
  background: var(--color-primary);
  color: var(--color-btn-primary-text);
}

.btn--primary:hover {
  background: var(--color-primary-hover);
}

.btn--primary:active {
  background: var(--color-primary-active);
}

.btn--secondary {
  background: var(--color-secondary);
  color: var(--color-text);
}

.btn--secondary:hover {
  background: var(--color-secondary-hover);
}

.btn--secondary:active {
  background: var(--color-secondary-active);
}

.btn--outline {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

.btn--outline:hover {
  background: var(--color-secondary);
}

.btn--sm {
  padding: var(--space-4) var(--space-12);
  font-size: var(--font-size-sm);
  border-radius: var(--radius-sm);
}

.btn--lg {
  padding: var(--space-10) var(--space-20);
  font-size: var(--font-size-lg);
  border-radius: var(--radius-md);
}

.btn--full-width {
  width: 100%;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Form elements */
.form-control {
  display: block;
  width: 100%;
  padding: var(--space-8) var(--space-12);
  font-size: var(--font-size-md);
  line-height: 1.5;
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-base);
  transition: border-color var(--duration-fast) var(--ease-standard),
    box-shadow var(--duration-fast) var(--ease-standard);
}

textarea.form-control {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  resize: vertical;
}

select.form-control {
  padding: var(--space-8) var(--space-12);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23134252' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-12) center;
  background-size: 16px;
  padding-right: var(--space-32);
}

.form-control:focus {
  border-color: var(--color-primary);
  outline: var(--focus-outline);
}

.form-label {
  display: block;
  margin-bottom: var(--space-8);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
}

.form-group {
  margin-bottom: var(--space-16);
}

/* Container layout */
.container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: var(--space-16);
  padding-left: var(--space-16);
}

@media (min-width: 640px) {
  .container {
    max-width: var(--container-sm);
  }
}

@media (min-width: 768px) {
  .container {
    max-width: var(--container-md);
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: var(--container-lg);
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: var(--container-xl);
  }
}

/* Utility classes */
.hidden {
  display: none;
}

/* Status indicators */
.status {
  display: inline-flex;
  align-items: center;
  padding: var(--space-6) var(--space-12);
  border-radius: var(--radius-full);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
}

.status--success {
  background-color: rgba(var(--color-teal-500-rgb), 0.15);
  color: var(--color-success);
  border: 1px solid rgba(var(--color-teal-500-rgb), 0.25);
}

.status--error {
  background-color: rgba(var(--color-red-500-rgb), 0.15);
  color: var(--color-error);
  border: 1px solid rgba(var(--color-red-500-rgb), 0.25);
}

.status--warning {
  background-color: rgba(var(--color-orange-500-rgb), 0.15);
  color: var(--color-warning);
  border: 1px solid rgba(var(--color-orange-500-rgb), 0.25);
}

.status--info {
  background-color: rgba(var(--color-slate-500-rgb), 0.15);
  color: var(--color-info);
  border: 1px solid rgba(var(--color-slate-500-rgb), 0.25);
}

/* Header Styles */
.header {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-16) 0;
}

.logo h1 {
  color: var(--color-brand-primary);
  font-size: var(--font-size-2xl);
  margin: 0;
  font-weight: var(--font-weight-bold);
}

.logo .tagline {
  color: var(--color-brand-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  display: block;
  margin-top: var(--space-2);
}

.nav-list {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: var(--space-24);
}

.nav-link {
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
  transition: color var(--duration-fast) var(--ease-standard);
  text-decoration: none;
}

.nav-link:hover,
.nav-link.active {
  color: var(--color-brand-primary);
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: var(--font-size-xl);
  color: var(--color-text);
  cursor: pointer;
}

.mobile-nav {
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  z-index: 999;
  padding: var(--space-16);
}

.mobile-nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.mobile-nav-list li {
  margin-bottom: var(--space-12);
}

.mobile-nav-list .nav-link {
  display: block;
  padding: var(--space-8);
}

.mobile-login-btn {
  width: 100%;
  margin-top: var(--space-8);
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, var(--color-bg-1), var(--color-bg-2));
  padding: 120px 0 80px;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: var(--font-size-4xl);
  color: var(--color-text);
  margin-bottom: var(--space-16);
  font-weight: var(--font-weight-bold);
}

.hero-description {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-24);
  line-height: var(--line-height-normal);
}

.hero-location {
  margin-bottom: var(--space-32);
}

.hero-location p {
  color: var(--color-brand-secondary);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-md);
}

.hero-actions {
  display: flex;
  gap: var(--space-16);
  justify-content: center;
  margin-bottom: var(--space-32);
  flex-wrap: wrap;
}

.hero-contacts {
  display: flex;
  gap: var(--space-24);
  justify-content: center;
  flex-wrap: wrap;
}

.contact-item {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

/* Section Styles */
.section {
  padding: 80px 0;
}

.section-alt {
  background: var(--color-bg-1);
}

.section-title {
  text-align: center;
  font-size: var(--font-size-3xl);
  color: var(--color-text);
  margin-bottom: var(--space-32);
  font-weight: var(--font-weight-bold);
}

/* About Section */
.about-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--space-32);
  align-items: start;
}

.about-text h3 {
  color: var(--color-brand-primary);
  margin-bottom: var(--space-16);
  margin-top: var(--space-24);
}

.about-text h3:first-child {
  margin-top: 0;
}

.about-text p {
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
  margin-bottom: var(--space-16);
}

.about-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
}

.info-card {
  background: var(--color-surface);
  padding: var(--space-20);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.info-card h4 {
  color: var(--color-brand-primary);
  margin-bottom: var(--space-12);
  font-size: var(--font-size-lg);
}

.contact-person {
  margin-bottom: var(--space-12);
  padding-bottom: var(--space-12);
  border-bottom: 1px solid var(--color-border);
}

.contact-person:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

/* Services Section */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-24);
}

.service-card {
  background: var(--color-surface);
  padding: var(--space-24);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  text-align: center;
  transition: transform var(--duration-normal) var(--ease-standard),
    box-shadow var(--duration-normal) var(--ease-standard);
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.service-icon {
  font-size: 2.5rem;
  margin-bottom: var(--space-16);
}

.service-card h3 {
  color: var(--color-brand-primary);
  margin-bottom: var(--space-12);
}

.service-card p {
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
}

/* Invoice Section */
.invoice-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--space-32);
}

.invoice-dashboard h3,
.zoho-integration h3 {
  color: var(--color-brand-primary);
  margin-bottom: var(--space-20);
}

.invoice-list {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  overflow: hidden;
  margin-bottom: var(--space-24);
}

.invoice-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-16);
  border-bottom: 1px solid var(--color-border);
}

.invoice-item:last-child {
  border-bottom: none;
}

.invoice-details {
  flex: 1;
}

.invoice-number {
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: var(--space-4);
}

.invoice-customer {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--space-2);
}

.invoice-date {
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
}

.invoice-amount {
  font-weight: var(--font-weight-bold);
  color: var(--color-brand-primary);
  font-size: var(--font-size-lg);
  margin-right: var(--space-16);
}

.invoice-actions {
  display: flex;
  gap: var(--space-12);
  flex-wrap: wrap;
}

.zoho-integration {
  background: var(--color-surface);
  padding: var(--space-24);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.integration-placeholder {
  text-align: center;
  padding: var(--space-20);
}

.integration-placeholder p {
  color: var(--color-text-secondary);
  margin-bottom: var(--space-16);
}

.integration-status {
  margin-bottom: var(--space-20);
}

/* Contact Section */
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-32);
}

.contact-form-container h3,
.contact-info h3 {
  color: var(--color-brand-primary);
  margin-bottom: var(--space-20);
}

.contact-form {
  background: var(--color-surface);
  padding: var(--space-24);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-20);
}

.modal.hidden {
  display: none;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal-content {
  position: relative;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: 400px;
  max-height: 90vh;
  overflow: auto;
}

.invoice-modal-content {
  max-width: 600px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-20);
  border-bottom: 1px solid var(--color-border);
}

.modal-header h3 {
  color: var(--color-text);
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: var(--font-size-2xl);
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  color: var(--color-text);
}

.login-form {
  padding: var(--space-20);
}

.modal-body {
  padding: var(--space-20);
}

.modal-actions {
  padding: var(--space-20);
  border-top: 1px solid var(--color-border);
  display: flex;
  gap: var(--space-12);
  justify-content: flex-end;
}

/* Invoice Creation Modal Specific Styles */
.form-section {
  margin-bottom: var(--space-24);
  padding: var(--space-16);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-base);
  background: var(--color-bg-1);
}

.form-section h4 {
  margin: 0 0 var(--space-16) 0;
  color: var(--color-brand-primary);
  font-size: var(--font-size-lg);
  border-bottom: 2px solid var(--color-brand-primary);
  padding-bottom: var(--space-8);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  margin-bottom: var(--space-16);
}

.items-container {
  margin-top: var(--space-16);
}

.items-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: var(--space-16);
  background: var(--color-surface);
  border-radius: var(--radius-base);
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.items-table th,
.items-table td {
  padding: var(--space-8);
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.items-table th {
  background: var(--color-bg-2);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
}

.items-table input,
.items-table select {
  width: 100%;
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
}

.items-table select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23134252' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 12px;
  padding-right: 30px;
}

.tax-calculation {
  background: var(--color-bg-3);
  padding: var(--space-16);
  border-radius: var(--radius-base);
  border: 1px solid var(--color-border);
}

/* Invoice Preview Styles */
.invoice-preview {
  padding: var(--space-20);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  line-height: 1.4;
}

.invoice-header {
  text-align: center;
  margin-bottom: var(--space-20);
  padding-bottom: var(--space-16);
  border-bottom: 2px solid var(--color-border);
}

.invoice-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  margin-bottom: var(--space-20);
}

.invoice-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: var(--space-20);
}

.invoice-table th,
.invoice-table td {
  padding: var(--space-8);
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.invoice-table th {
  background: var(--color-bg-1);
  font-weight: var(--font-weight-bold);
}

.invoice-total {
  text-align: right;
  margin-top: var(--space-16);
}

/* Notification Toast */
.notification-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 2000;
  min-width: 300px;
  border-radius: var(--radius-base);
  box-shadow: var(--shadow-lg);
  transition: all var(--duration-normal) var(--ease-standard);
}

.notification-toast.hidden {
  transform: translateX(100%);
  opacity: 0;
}

.notification-content {
  padding: var(--space-16);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-12);
}

.notification-message {
  flex: 1;
  font-weight: var(--font-weight-medium);
}

.notification-close {
  background: none;
  border: none;
  font-size: var(--font-size-lg);
  cursor: pointer;
  opacity: 0.7;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-close:hover {
  opacity: 1;
}

/* Notification types */
.notification-toast.success {
  background: rgba(var(--color-teal-500-rgb), 0.9);
  color: white;
}

.notification-toast.error {
  background: rgba(var(--color-red-500-rgb), 0.9);
  color: white;
}

.notification-toast.warning {
  background: rgba(var(--color-orange-500-rgb), 0.9);
  color: white;
}

.notification-toast.info {
  background: rgba(var(--color-slate-500-rgb), 0.9);
  color: white;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav {
    display: none;
  }

  .mobile-menu-toggle {
    display: block;
  }

  .hero-title {
    font-size: var(--font-size-3xl);
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .hero-contacts {
    flex-direction: column;
    gap: var(--space-8);
  }

  .about-content {
    grid-template-columns: 1fr;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .invoice-content {
    grid-template-columns: 1fr;
  }

  .contact-content {
    grid-template-columns: 1fr;
  }

  .modal-content {
    margin: var(--space-16);
    max-width: none;
  }

  .invoice-details {
    grid-template-columns: 1fr;
  }

  .modal-actions {
    flex-direction: column;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .items-table {
    font-size: var(--font-size-xs);
  }

  .items-table th,
  .items-table td {
    padding: var(--space-4);
  }

  .notification-toast {
    left: 20px;
    right: 20px;
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .header-content {
    padding: var(--space-12) 0;
  }

  .logo h1 {
    font-size: var(--font-size-xl);
  }

  .hero {
    padding: 100px 0 60px;
  }

  .hero-title {
    font-size: var(--font-size-2xl);
  }

  .section {
    padding: 60px 0;
  }
}

/* Focus states for accessibility */
.btn:focus-visible,
.form-control:focus-visible,
.nav-link:focus-visible {
  outline: var(--focus-outline);
  outline-offset: 2px;
}

/* Animation for cards */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.service-card,
.info-card {
  animation: fadeInUp 0.6s ease-out;
}

/* Print styles for invoices */
@media print {
  .modal-header,
  .modal-actions {
    display: none;
  }

  .modal-content {
    box-shadow: none;
    border: none;
    max-width: none;
  }

  .invoice-preview {
    padding: 0;
  }
}'''

print("Updated CSS file created successfully!")