// H.M.C. Traders Website JavaScript

// Sample invoice data
const sampleInvoiceData = {
  "2223": {
    invoiceNo: "2223",
    date: "31/01/2025",
    customer: "R. D Enterprises",
    address: "New Sabji Mandi Solarpur",
    items: [
      {
        description: "Ginger Congo",
        hsn: "210",
        qty: "2833 kg",
        rate: "21.00",
        amount: "59500"
      }
    ],
    total: "59500",
    totalWords: "Fifty Nine Thousand Five Hundred Only"
  }
};

// Global variables for DOM elements
let mobileMenuToggle, mobileNav, loginBtn, loginModal, modalOverlay, modalClose;
let loginForm, contactForm, invoiceModal, invoiceModalOverlay, invoiceModalClose;
let closeInvoiceBtn, downloadInvoiceBtn, createInvoiceBtn, zohoIntegrationBtn, connectZohoBtn;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing application...');
    
    // Get DOM elements
    getDOMElements();
    
    // Initialize features
    initializeNavigation();
    initializeModals();
    initializeForms();
    initializeInvoiceSystem();
    initializeZohoIntegration();
    initializeUI();
    
    console.log('Application initialized successfully');
});

// Get all DOM elements
function getDOMElements() {
    mobileMenuToggle = document.getElementById('mobileMenuToggle');
    mobileNav = document.getElementById('mobileNav');
    loginBtn = document.getElementById('loginBtn');
    loginModal = document.getElementById('loginModal');
    modalOverlay = document.getElementById('modalOverlay');
    modalClose = document.getElementById('modalClose');
    loginForm = document.getElementById('loginForm');
    contactForm = document.getElementById('contactForm');
    invoiceModal = document.getElementById('invoiceModal');
    invoiceModalOverlay = document.getElementById('invoiceModalOverlay');
    invoiceModalClose = document.getElementById('invoiceModalClose');
    closeInvoiceBtn = document.getElementById('closeInvoiceBtn');
    downloadInvoiceBtn = document.getElementById('downloadInvoiceBtn');
    createInvoiceBtn = document.getElementById('createInvoiceBtn');
    zohoIntegrationBtn = document.getElementById('zohoIntegrationBtn');
    connectZohoBtn = document.getElementById('connectZohoBtn');
    
    console.log('DOM elements retrieved');
}

// Navigation functionality
function initializeNavigation() {
    console.log('Initializing navigation...');
    
    // Mobile menu toggle
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            console.log('Mobile menu toggle clicked');
            mobileNav.classList.toggle('hidden');
        });

        // Close mobile menu when clicking on a link
        const mobileNavLinks = mobileNav.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.add('hidden');
            });
        });
    }

    // Smooth scrolling for all navigation links
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    console.log('Found navigation links:', allNavLinks.length);
    
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            console.log('Navigation clicked:', targetId, 'Element found:', !!targetElement);
            
            if (targetElement) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active link
                updateActiveNavLink(this);
                
                // Close mobile menu if open
                if (mobileNav && !mobileNav.classList.contains('hidden')) {
                    mobileNav.classList.add('hidden');
                }
            }
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', debounce(function() {
        const sections = document.querySelectorAll('section[id]');
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 80;
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        if (currentSection) {
            const activeLink = document.querySelector(`.nav-link[href="#${currentSection}"]`);
            if (activeLink) {
                updateActiveNavLink(activeLink);
            }
        }
    }, 100));
    
    console.log('Navigation initialized');
}

function updateActiveNavLink(activeLink) {
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current link
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Modal functionality
function initializeModals() {
    console.log('Initializing modals...');
    
    // Login modal
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Login button clicked');
            showModal(loginModal);
        });
    }

    // Mobile login button
    const mobileLoginBtn = document.querySelector('.mobile-login-btn');
    if (mobileLoginBtn) {
        mobileLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Mobile login button clicked');
            showModal(loginModal);
            if (mobileNav) {
                mobileNav.classList.add('hidden');
            }
        });
    }

    // Modal close handlers
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            console.log('Login modal close clicked');
            hideModal(loginModal);
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function() {
            console.log('Login modal overlay clicked');
            hideModal(loginModal);
        });
    }

    // Invoice modal close handlers
    if (invoiceModalClose) {
        invoiceModalClose.addEventListener('click', function() {
            console.log('Invoice modal close clicked');
            hideModal(invoiceModal);
        });
    }

    if (closeInvoiceBtn) {
        closeInvoiceBtn.addEventListener('click', function() {
            console.log('Close invoice button clicked');
            hideModal(invoiceModal);
        });
    }

    if (invoiceModalOverlay) {
        invoiceModalOverlay.addEventListener('click', function() {
            console.log('Invoice modal overlay clicked');
            hideModal(invoiceModal);
        });
    }

    // ESC key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideModal(loginModal);
            hideModal(invoiceModal);
        }
    });
    
    console.log('Modals initialized');
}

function showModal(modal) {
    if (modal) {
        console.log('Showing modal');
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Focus first input in modal
        const firstInput = modal.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

function hideModal(modal) {
    if (modal) {
        console.log('Hiding modal');
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Form handling
function initializeForms() {
    console.log('Initializing forms...');
    
    // Login form
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Login form submitted');
            handleLogin(new FormData(this));
        });
    }

    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Contact form submitted');
            handleContactForm(new FormData(this));
        });
    }
    
    console.log('Forms initialized');
}

function handleLogin(formData) {
    const username = formData.get('username');
    const password = formData.get('password');

    console.log('Processing login for:', username);

    // Simple client-side validation (in real app, this would be server-side)
    if (username && password) {
        // Simulate login process
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Logging in...';

        setTimeout(() => {
            // Simulate successful login
            hideModal(loginModal);
            showNotification('Login successful! Redirecting to invoice dashboard...', 'success');
            
            // Reset form and button
            loginForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            
            // Scroll to invoice section
            setTimeout(() => {
                const invoiceSection = document.getElementById('invoice');
                if (invoiceSection) {
                    invoiceSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 1000);
        }, 1500);
    } else {
        showNotification('Please enter both username and password.', 'error');
    }
}

function handleContactForm(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');

    console.log('Processing contact form for:', name);

    if (name && email && phone && message) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // Simulate form submission
        setTimeout(() => {
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }, 1500);
    } else {
        showNotification('Please fill in all required fields.', 'error');
    }
}

// Invoice system
function initializeInvoiceSystem() {
    console.log('Initializing invoice system...');
    
    if (createInvoiceBtn) {
        createInvoiceBtn.addEventListener('click', function() {
            console.log('Create invoice button clicked');
            showNotification('Invoice creation feature coming soon!', 'info');
        });
    }

    if (downloadInvoiceBtn) {
        downloadInvoiceBtn.addEventListener('click', function() {
            console.log('Download invoice button clicked');
            downloadInvoice();
        });
    }
    
    console.log('Invoice system initialized');
}

// Global function to view invoice (called from HTML onclick)
function viewInvoice(invoiceId) {
    console.log('View invoice called for ID:', invoiceId);
    const invoiceData = sampleInvoiceData[invoiceId];
    
    if (invoiceData && invoiceModal) {
        const invoicePreview = document.getElementById('invoicePreview');
        
        if (invoicePreview) {
            invoicePreview.innerHTML = generateInvoiceHTML(invoiceData);
            showModal(invoiceModal);
        }
    } else {
        showNotification('Invoice not found.', 'error');
    }
}

// Make viewInvoice globally available
window.viewInvoice = viewInvoice;

function generateInvoiceHTML(invoiceData) {
    return `
        <div class="invoice-header">
            <h2>H.M.C. Traders</h2>
            <p>Fresh Ginger & Dry Ginger Merchants</p>
            <p>Anavatti to Shivamogga Main Road, CHIKKAIDAGODU-577413</p>
            <p>GSTIN: 29CYPPS9466P1ZS</p>
        </div>
        
        <div class="invoice-details">
            <div>
                <strong>Invoice No:</strong> ${invoiceData.invoiceNo}<br>
                <strong>Date:</strong> ${invoiceData.date}
            </div>
            <div>
                <strong>Bill To:</strong><br>
                ${invoiceData.customer}<br>
                ${invoiceData.address}
            </div>
        </div>
        
        <table class="invoice-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>HSN Code</th>
                    <th>Quantity</th>
                    <th>Rate (₹)</th>
                    <th>Amount (₹)</th>
                </tr>
            </thead>
            <tbody>
                ${invoiceData.items.map(item => `
                    <tr>
                        <td>${item.description}</td>
                        <td>${item.hsn}</td>
                        <td>${item.qty}</td>
                        <td>${item.rate}</td>
                        <td>${item.amount}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        <div class="invoice-total">
            <p><strong>Total Amount: ₹${invoiceData.total}</strong></p>
            <p><em>Amount in Words: ${invoiceData.totalWords}</em></p>
        </div>
        
        <div style="margin-top: 40px; text-align: center; font-size: 12px; color: #666;">
            <p>Thank you for your business!</p>
            <p>Contact: 9740459661 / 9972200610 | Email: sadiqhmc83@gmail.com</p>
        </div>
    `;
}

function downloadInvoice() {
    // Simulate PDF download
    showNotification('Preparing invoice for download...', 'info');
    
    setTimeout(() => {
        showNotification('Invoice download complete!', 'success');
        // In a real application, this would trigger actual PDF generation and download
    }, 2000);
}

// Zoho Integration
function initializeZohoIntegration() {
    console.log('Initializing Zoho integration...');
    
    if (zohoIntegrationBtn) {
        zohoIntegrationBtn.addEventListener('click', function() {
            console.log('Zoho integration button clicked');
            showNotification('Zoho Invoice integration coming soon!', 'info');
        });
    }

    if (connectZohoBtn) {
        connectZohoBtn.addEventListener('click', function() {
            console.log('Connect Zoho button clicked');
            handleZohoConnection();
        });
    }
    
    console.log('Zoho integration initialized');
}

function handleZohoConnection() {
    const originalText = connectZohoBtn.textContent;
    const statusElement = document.querySelector('.integration-status .status');
    
    connectZohoBtn.disabled = true;
    connectZohoBtn.textContent = 'Connecting...';
    
    // Simulate connection process
    setTimeout(() => {
        // Update status
        if (statusElement) {
            statusElement.textContent = 'Connected';
            statusElement.className = 'status status--success';
        }
        
        connectZohoBtn.textContent = 'Reconnect';
        connectZohoBtn.disabled = false;
        
        showNotification('Successfully connected to Zoho Invoice!', 'success');
        
        // Create iframe placeholder for Zoho integration
        const integrationPlaceholder = document.querySelector('.integration-placeholder');
        if (integrationPlaceholder) {
            integrationPlaceholder.innerHTML = `
                <div style="border: 2px dashed var(--color-border); padding: 40px; text-align: center; border-radius: var(--radius-lg);">
                    <h4>Zoho Invoice Dashboard</h4>
                    <p>Integration placeholder - This would contain the embedded Zoho Invoice interface</p>
                    <div style="background: var(--color-bg-2); padding: 20px; margin: 20px 0; border-radius: var(--radius-base);">
                        <p><strong>Features Available:</strong></p>
                        <ul style="text-align: left; display: inline-block;">
                            <li>Create and manage invoices</li>
                            <li>Track payments</li>
                            <li>Generate reports</li>
                            <li>Customer management</li>
                        </ul>
                    </div>
                    <button class="btn btn--secondary" onclick="showNotification('Opening Zoho Invoice in new tab...', 'info')">
                        Open Zoho Invoice
                    </button>
                </div>
            `;
        }
    }, 2000);
}

// UI Enhancements
function initializeUI() {
    console.log('Initializing UI enhancements...');
    
    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled) {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.service-card, .info-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    console.log('UI enhancements initialized');
}

// Notification system
function showNotification(message, type = 'info') {
    console.log('Showing notification:', message, type);
    
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification status status--${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 2000;
        max-width: 350px;
        padding: 16px;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        animation: slideInRight 0.3s ease-out;
        cursor: pointer;
        font-weight: 500;
    `;
    
    notification.textContent = message;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
    
    // Remove on click
    notification.addEventListener('click', function() {
        this.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (this.parentNode) {
                this.remove();
            }
        }, 300);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add notification animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification {
        transition: all 0.3s ease;
    }
    
    .notification:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
    }
`;
document.head.appendChild(style);

// Make showNotification globally available for inline onclick handlers
window.showNotification = showNotification;

console.log('JavaScript file loaded successfully');