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
let invoiceCreationModal, invoiceCreationForm, closeInvoiceCreationModal, cancelInvoiceCreation;

// Invoice counter for new invoices
let invoiceCounter = parseInt(localStorage.getItem('invoiceCounter')) || 2224;

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
    initializeInvoiceCreation();
    loadRecentInvoices();
    
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
    
    // Invoice creation modal elements
    invoiceCreationModal = document.getElementById('invoiceCreationModal');
    invoiceCreationForm = document.getElementById('invoiceCreationForm');
    closeInvoiceCreationModal = document.getElementById('closeInvoiceCreationModal');
    cancelInvoiceCreation = document.getElementById('cancelInvoiceCreation');
    
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
            hideModal(invoiceCreationModal);
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

    if (downloadInvoiceBtn) {
        downloadInvoiceBtn.addEventListener('click', function() {
            console.log('Download invoice button clicked');
            downloadInvoice();
        });
    }

    console.log('Invoice system initialized');
}

// Initialize invoice creation functionality
function initializeInvoiceCreation() {
    console.log('Initializing invoice creation...');

    // Create invoice button
    if (createInvoiceBtn) {
        createInvoiceBtn.addEventListener('click', function() {
            console.log('Create invoice button clicked');
            openInvoiceCreationModal();
        });
    }

    // Close modal handlers
    if (closeInvoiceCreationModal) {
        closeInvoiceCreationModal.addEventListener('click', function() {
            console.log('Close invoice creation modal clicked');
            hideModal(invoiceCreationModal);
        });
    }

    if (cancelInvoiceCreation) {
        cancelInvoiceCreation.addEventListener('click', function() {
            console.log('Cancel invoice creation clicked');
            hideModal(invoiceCreationModal);
        });
    }

    // Modal overlay click
    const creationOverlay = document.getElementById('invoiceCreationOverlay');
    if (creationOverlay) {
        creationOverlay.addEventListener('click', function() {
            console.log('Invoice creation overlay clicked');
            hideModal(invoiceCreationModal);
        });
    }

    // Form submission
    if (invoiceCreationForm) {
        invoiceCreationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Invoice creation form submitted');
            handleInvoiceCreation(new FormData(this));
        });
    }

    // Set default values
    setTimeout(() => {
        const invoiceNumberInput = document.getElementById('invoiceNumber');
        const invoiceDateInput = document.getElementById('invoiceDate');
        
        if (invoiceNumberInput) {
            invoiceNumberInput.value = invoiceCounter.toString();
        }
        
        if (invoiceDateInput) {
            invoiceDateInput.value = new Date().toISOString().split('T')[0];
        }
    }, 100);

    console.log('Invoice creation initialized');
}

function openInvoiceCreationModal() {
    if (invoiceCreationModal) {
        showModal(invoiceCreationModal);
        
        // Reset form and set defaults
        if (invoiceCreationForm) {
            invoiceCreationForm.reset();
            
            // Set default values
            setTimeout(() => {
                const invoiceNumberInput = document.getElementById('invoiceNumber');
                const invoiceDateInput = document.getElementById('invoiceDate');
                
                if (invoiceNumberInput) {
                    invoiceNumberInput.value = invoiceCounter.toString();
                }
                
                if (invoiceDateInput) {
                    invoiceDateInput.value = new Date().toISOString().split('T')[0];
                }
            }, 100);
        }
    }
}

// Update HSN code based on selected item
function updateHSN(selectElement) {
    const selectedOption = selectElement.selectedOptions[0];
    const hsnInput = selectElement.closest('tr').querySelector('.hsn-input');
    
    if (selectedOption && selectedOption.dataset.hsn) {
        hsnInput.value = selectedOption.dataset.hsn;
    } else {
        hsnInput.value = '';
    }
}

// Calculate amount for each item
function calculateAmount(input) {
    const row = input.closest('tr');
    const quantityInput = row.querySelector('.quantity-input');
    const rateInput = row.querySelector('.rate-input');
    const amountInput = row.querySelector('.amount-input');
    
    const quantity = parseFloat(quantityInput.value) || 0;
    const rate = parseFloat(rateInput.value) || 0;
    const amount = quantity * rate;
    
    amountInput.value = amount.toFixed(2);
    
    // Recalculate totals
    calculateTotals();
}

// Add new item row
function addItem() {
    const tableBody = document.getElementById('itemsTableBody');
    const newRow = document.createElement('tr');
    newRow.className = 'item-row';
    newRow.innerHTML = `
        <td>
            <select name="itemName[]" class="item-select form-control" onchange="updateHSN(this)">
                <option value="">Select Item</option>
                <option value="Fresh Ginger" data-hsn="210">Fresh Ginger</option>
                <option value="Dry Ginger" data-hsn="210">Dry Ginger</option>
                <option value="Ginger Congo" data-hsn="210">Ginger Congo</option>
            </select>
        </td>
        <td><input type="text" name="hsnCode[]" class="hsn-input form-control" readonly></td>
        <td><input type="number" name="quantity[]" class="quantity-input form-control" step="0.01" onchange="calculateAmount(this)"></td>
        <td><input type="number" name="rate[]" class="rate-input form-control" step="0.01" onchange="calculateAmount(this)"></td>
        <td><input type="number" name="amount[]" class="amount-input form-control" readonly></td>
        <td><button type="button" class="btn btn--secondary btn--sm" onclick="removeItem(this)">Remove</button></td>
    `;
    tableBody.appendChild(newRow);
}

// Remove item row
function removeItem(button) {
    const row = button.closest('tr');
    const tableBody = document.getElementById('itemsTableBody');
    
    // Don't remove if it's the only row
    if (tableBody.children.length > 1) {
        row.remove();
        calculateTotals();
    } else {
        showNotification('At least one item is required.', 'warning');
    }
}

// Calculate totals and tax
function calculateTotals() {
    const amountInputs = document.querySelectorAll('.amount-input');
    let subtotal = 0;
    
    amountInputs.forEach(input => {
        subtotal += parseFloat(input.value) || 0;
    });
    
    const subtotalInput = document.getElementById('subtotal');
    if (subtotalInput) {
        subtotalInput.value = subtotal.toFixed(2);
    }
    
    calculateTax();
}

// Calculate tax amounts
function calculateTax() {
    const subtotalInput = document.getElementById('subtotal');
    const cgstRateInput = document.getElementById('cgstRate');
    const sgstRateInput = document.getElementById('sgstRate');
    const cgstAmountInput = document.getElementById('cgstAmount');
    const sgstAmountInput = document.getElementById('sgstAmount');
    const grandTotalInput = document.getElementById('grandTotal');
    const amountInWordsInput = document.getElementById('amountInWords');
    
    if (!subtotalInput || !cgstRateInput || !sgstRateInput) return;
    
    const subtotal = parseFloat(subtotalInput.value) || 0;
    const cgstRate = parseFloat(cgstRateInput.value) || 0;
    const sgstRate = parseFloat(sgstRateInput.value) || 0;
    
    const cgstAmount = (subtotal * cgstRate) / 100;
    const sgstAmount = (subtotal * sgstRate) / 100;
    const grandTotal = subtotal + cgstAmount + sgstAmount;
    
    if (cgstAmountInput) cgstAmountInput.value = cgstAmount.toFixed(2);
    if (sgstAmountInput) sgstAmountInput.value = sgstAmount.toFixed(2);
    if (grandTotalInput) grandTotalInput.value = grandTotal.toFixed(2);
    
    // Convert amount to words
    if (amountInWordsInput) {
        amountInWordsInput.value = numberToWords(grandTotal);
    }
}

// Convert number to words (Indian format)
function numberToWords(amount) {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    
    function convertHundreds(num) {
        let result = '';
        if (num > 99) {
            result += ones[Math.floor(num / 100)] + ' Hundred ';
            num %= 100;
        }
        if (num > 19) {
            result += tens[Math.floor(num / 10)] + ' ';
            num %= 10;
        } else if (num > 9) {
            result += teens[num - 10] + ' ';
            return result;
        }
        if (num > 0) {
            result += ones[num] + ' ';
        }
        return result;
    }
    
    if (amount === 0) return 'Zero Rupees Only';
    
    let integerPart = Math.floor(amount);
    let result = '';
    
    if (integerPart >= 10000000) {
        result += convertHundreds(Math.floor(integerPart / 10000000)) + 'Crore ';
        integerPart %= 10000000;
    }
    if (integerPart >= 100000) {
        result += convertHundreds(Math.floor(integerPart / 100000)) + 'Lakh ';
        integerPart %= 100000;
    }
    if (integerPart >= 1000) {
        result += convertHundreds(Math.floor(integerPart / 1000)) + 'Thousand ';
        integerPart %= 1000;
    }
    if (integerPart > 0) {
        result += convertHundreds(integerPart);
    }
    
    return result.trim() + ' Rupees Only';
}

// Handle invoice creation form submission
function handleInvoiceCreation(formData) {
    console.log('Processing invoice creation...');
    
    // Validate form
    if (!validateInvoiceForm()) {
        return;
    }
    
    // Collect form data
    const invoiceData = {
        invoiceNumber: formData.get('invoiceNumber'),
        invoiceDate: formData.get('invoiceDate'),
        customerName: formData.get('customerName'),
        customerAddress: formData.get('customerAddress'),
        customerGSTIN: formData.get('customerGSTIN'),
        vehicleNumber: formData.get('vehicleNumber'),
        placeOfSupply: formData.get('placeOfSupply'),
        items: [],
        subtotal: document.getElementById('subtotal').value,
        cgstRate: document.getElementById('cgstRate').value,
        cgstAmount: document.getElementById('cgstAmount').value,
        sgstRate: document.getElementById('sgstRate').value,
        sgstAmount: document.getElementById('sgstAmount').value,
        grandTotal: document.getElementById('grandTotal').value,
        amountInWords: document.getElementById('amountInWords').value
    };
    
    // Collect items data
    const itemNames = formData.getAll('itemName[]');
    const hsnCodes = formData.getAll('hsnCode[]');
    const quantities = formData.getAll('quantity[]');
    const rates = formData.getAll('rate[]');
    const amounts = formData.getAll('amount[]');
    
    for (let i = 0; i < itemNames.length; i++) {
        if (itemNames[i]) {
            invoiceData.items.push({
                name: itemNames[i],
                hsn: hsnCodes[i],
                quantity: quantities[i],
                rate: rates[i],
                amount: amounts[i]
            });
        }
    }
    
    // Save invoice data
    saveInvoice(invoiceData);
    
    // Show success message
    showNotification('Invoice created successfully!', 'success');
    
    // Close modal
    hideModal(invoiceCreationModal);
    
    // Refresh invoice list
    refreshInvoiceList();
    
    // Increment invoice counter
    invoiceCounter++;
    localStorage.setItem('invoiceCounter', invoiceCounter.toString());
}

// Validate invoice form
function validateInvoiceForm() {
    const requiredFields = ['customerName', 'customerAddress', 'invoiceNumber', 'invoiceDate'];
    
    for (let fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            const label = field ? field.labels[0]?.textContent || fieldId : fieldId;
            showNotification(`Please fill in the ${label}`, 'error');
            if (field) field.focus();
            return false;
        }
    }
    
    // Check if at least one item is added with valid data
    const itemRows = document.querySelectorAll('.item-row');
    let hasValidItem = false;
    
    for (let row of itemRows) {
        const itemSelect = row.querySelector('.item-select');
        const quantityInput = row.querySelector('.quantity-input');
        const rateInput = row.querySelector('.rate-input');
        
        if (itemSelect && quantityInput && rateInput && 
            itemSelect.value && quantityInput.value && rateInput.value) {
            hasValidItem = true;
            break;
        }
    }
    
    if (!hasValidItem) {
        showNotification('Please add at least one item with valid quantity and rate.', 'error');
        return false;
    }
    
    return true;
}

// Save invoice to localStorage
function saveInvoice(invoiceData) {
    let savedInvoices = JSON.parse(localStorage.getItem('hmcInvoices')) || [];
    savedInvoices.push(invoiceData);
    localStorage.setItem('hmcInvoices', JSON.stringify(savedInvoices));
}

// Refresh invoice list display
function refreshInvoiceList() {
    loadRecentInvoices();
}

// Load and display recent invoices
function loadRecentInvoices() {
    const savedInvoices = JSON.parse(localStorage.getItem('hmcInvoices')) || [];
    const invoiceList = document.getElementById('invoiceList');
    
    if (invoiceList && savedInvoices.length > 0) {
        // Clear existing content except the first sample invoice
        const sampleInvoice = invoiceList.querySelector('.invoice-item');
        invoiceList.innerHTML = '';
        
        // Add back the sample invoice
        if (sampleInvoice) {
            invoiceList.appendChild(sampleInvoice);
        }
        
        // Show last 5 invoices
        const recentInvoices = savedInvoices.slice(-5).reverse();
        
        recentInvoices.forEach(invoice => {
            const invoiceItem = document.createElement('div');
            invoiceItem.className = 'invoice-item';
            invoiceItem.innerHTML = `
                <div class="invoice-details">
                    <div class="invoice-number">Invoice #${invoice.invoiceNumber}</div>
                    <div class="invoice-customer">${invoice.customerName}</div>
                    <div class="invoice-date">${invoice.invoiceDate}</div>
                </div>
                <div class="invoice-amount">₹${parseFloat(invoice.grandTotal).toLocaleString('en-IN')}</div>
                <div class="invoice-actions">
                    <button class="btn btn--sm btn--outline" onclick="viewCustomInvoice('${invoice.invoiceNumber}')">View</button>
                </div>
            `;
            invoiceList.appendChild(invoiceItem);
        });
    }
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

// View custom created invoice
function viewCustomInvoice(invoiceNumber) {
    const savedInvoices = JSON.parse(localStorage.getItem('hmcInvoices')) || [];
    const invoice = savedInvoices.find(inv => inv.invoiceNumber === invoiceNumber);
    
    if (invoice && invoiceModal) {
        const invoicePreview = document.getElementById('invoicePreview');
        if (invoicePreview) {
            invoicePreview.innerHTML = generateCustomInvoiceHTML(invoice);
            showModal(invoiceModal);
        }
    } else {
        showNotification('Invoice not found.', 'error');
    }
}

// Make functions globally available
window.viewInvoice = viewInvoice;
window.viewCustomInvoice = viewCustomInvoice;
window.updateHSN = updateHSN;
window.calculateAmount = calculateAmount;
window.addItem = addItem;
window.removeItem = removeItem;
window.calculateTax = calculateTax;

function generateInvoiceHTML(invoiceData) {
    return `
        <div class="invoice-header">
            <h2>H.M.C. Traders</h2>
            <p>Fresh Ginger & Dry Ginger Merchants</p>
            <p>Anavatti to Shivamogga Main Road, CHIKKAIDAGODU-577413</p>
            <p><strong>GSTIN:</strong> 29CYPPS9466P1ZS</p>
        </div>
        
        <div class="invoice-details">
            <div>
                <strong>Invoice No:</strong> ${invoiceData.invoiceNo}<br>
                <strong>Date:</strong> ${invoiceData.date}
            </div>
            <div>
                <strong>Customer:</strong> ${invoiceData.customer}<br>
                <strong>Address:</strong> ${invoiceData.address}
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
        
        <div style="margin-top: 20px; text-align: center; border-top: 1px solid #ddd; padding-top: 15px;">
            <p>Thank you for your business!</p>
            <p style="font-size: 12px;">Contact: 9740459661 / 9972200610 | Email: sadiqhmc83@gmail.com</p>
        </div>
    `;
}

function generateCustomInvoiceHTML(invoiceData) {
    return `
        <div class="invoice-header">
            <h2>H.M.C. Traders</h2>
            <p>Fresh Ginger & Dry Ginger Merchants</p>
            <p>Anavatti to Shivamogga Main Road, CHIKKAIDAGODU-577413</p>
            <p><strong>GSTIN:</strong> 29CYPPS9466P1ZS</p>
        </div>
        
        <div class="invoice-details">
            <div>
                <strong>Invoice No:</strong> ${invoiceData.invoiceNumber}<br>
                <strong>Date:</strong> ${invoiceData.invoiceDate}<br>
                ${invoiceData.vehicleNumber ? `<strong>Vehicle No:</strong> ${invoiceData.vehicleNumber}<br>` : ''}
                ${invoiceData.placeOfSupply ? `<strong>Place of Supply:</strong> ${invoiceData.placeOfSupply}<br>` : ''}
            </div>
            <div>
                <strong>Customer:</strong> ${invoiceData.customerName}<br>
                <strong>Address:</strong> ${invoiceData.customerAddress}<br>
                ${invoiceData.customerGSTIN ? `<strong>GSTIN:</strong> ${invoiceData.customerGSTIN}<br>` : ''}
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
                        <td>${item.name}</td>
                        <td>${item.hsn}</td>
                        <td>${item.quantity} kg</td>
                        <td>${parseFloat(item.rate).toFixed(2)}</td>
                        <td>${parseFloat(item.amount).toFixed(2)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        <div class="invoice-total">
            <p>Subtotal: ₹${parseFloat(invoiceData.subtotal).toFixed(2)}</p>
            <p>CGST (${invoiceData.cgstRate}%): ₹${parseFloat(invoiceData.cgstAmount).toFixed(2)}</p>
            <p>SGST (${invoiceData.sgstRate}%): ₹${parseFloat(invoiceData.sgstAmount).toFixed(2)}</p>
            <p><strong>Grand Total: ₹${parseFloat(invoiceData.grandTotal).toFixed(2)}</strong></p>
            <p><em>Amount in Words: ${invoiceData.amountInWords}</em></p>
        </div>
        
        <div style="margin-top: 20px; text-align: center; border-top: 1px solid #ddd; padding-top: 15px;">
            <p>Thank you for your business!</p>
            <p style="font-size: 12px;">Contact: 9740459661 / 9972200610 | Email: sadiqhmc83@gmail.com</p>
        </div>
    `;
}

// Download invoice functionality
function downloadInvoice() {
    showNotification('PDF download feature coming soon!', 'info');
}

// Zoho integration
function initializeZohoIntegration() {
    console.log('Initializing Zoho integration...');

    if (connectZohoBtn) {
        connectZohoBtn.addEventListener('click', function() {
            console.log('Connect Zoho button clicked');
            showNotification('Zoho Invoice integration coming soon!', 'info');
        });
    }

    console.log('Zoho integration initialized');
}

// UI initialization
function initializeUI() {
    console.log('Initializing UI...');
    // Add any additional UI initialization here
    console.log('UI initialized');
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element if it doesn't exist
    let toast = document.getElementById('notificationToast');
    
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'notificationToast';
        toast.className = 'notification-toast hidden';
        toast.innerHTML = `
            <div class="notification-content">
                <span class="notification-message"></span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        document.body.appendChild(toast);
        
        // Add close handler
        const closeBtn = toast.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            toast.classList.add('hidden');
        });
    }

    const messageElement = toast.querySelector('.notification-message');
    messageElement.textContent = message;
    
    // Remove existing type classes and add new one
    toast.classList.remove('success', 'error', 'warning', 'info');
    toast.classList.add(type);
    toast.classList.remove('hidden');

    // Auto hide after 5 seconds
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 5000);
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

console.log('H.M.C. Traders website script loaded successfully');
