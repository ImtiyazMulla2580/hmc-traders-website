// H.M.C. Traders Website JavaScript

class HMCTradersApp {
    constructor() {
        this.isLoggedIn = false;
        this.currentSection = 'home';
        this.invoiceCounter = 1;
        this.items = [];
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupLogin();
        this.setupContactForm();
        this.setupInvoiceBuilder();
        this.updateUI();
        this.generateInvoiceNumber();
        this.setCurrentDate();
        
        // Show home section by default
        this.showSection('home');
    }

    // Navigation System
    setupNavigation() {
        // Handle all navigation links
        document.addEventListener('click', (e) => {
            const target = e.target;
            
            // Handle nav links
            if (target.classList.contains('nav-link')) {
                e.preventDefault();
                const href = target.getAttribute('href');
                
                if (href === '#login' && this.isLoggedIn) {
                    this.logout();
                    return;
                }

                if (href && href.startsWith('#')) {
                    const sectionId = href.substring(1);
                    this.showSection(sectionId);
                }
            }
            
            // Handle CTA buttons
            if (target.textContent === 'Contact Us') {
                e.preventDefault();
                this.showSection('contact');
            }
            
            if (target.textContent === 'Learn More') {
                e.preventDefault();
                this.showSection('about');
            }
            
            // Handle login button in invoice access denied
            if (target.textContent === 'Login Now') {
                e.preventDefault();
                this.showSection('login');
            }
        });

        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger) {
            hamburger.addEventListener('click', (e) => {
                e.stopPropagation();
                navMenu.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                navMenu?.classList.remove('active');
            }
        });

        // Make showSection available globally for onclick handlers
        window.showSection = (sectionId) => this.showSection(sectionId);
    }

    showSection(sectionId) {
        console.log('Showing section:', sectionId); // Debug log
        
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
            console.log('Section activated:', sectionId); // Debug log
        } else {
            console.error('Section not found:', sectionId);
        }

        // Update nav active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });

        // Handle invoice section access control
        if (sectionId === 'invoice') {
            this.updateInvoiceAccess();
        }
        
        // Close mobile menu
        const navMenu = document.querySelector('.nav-menu');
        navMenu?.classList.remove('active');
    }

    // Login System
    setupLogin() {
        const loginForm = document.getElementById('loginForm');
        
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }
    }

    handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('loginError');

        // Check credentials (admin/hmc2025)
        if (username === 'admin' && password === 'hmc2025') {
            this.isLoggedIn = true;
            this.updateUI();
            this.showSection('invoice');
            if (errorDiv) errorDiv.style.display = 'none';
            
            // Clear form
            document.getElementById('loginForm').reset();
            
            // Show success message
            this.showNotification('Login successful! Redirecting to invoice section.', 'success');
        } else {
            if (errorDiv) {
                errorDiv.textContent = 'Invalid username or password. Use admin/hmc2025';
                errorDiv.style.display = 'block';
            }
        }
    }

    logout() {
        this.isLoggedIn = false;
        this.updateUI();
        this.showSection('home');
        this.showNotification('Logged out successfully!', 'info');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-base);
            padding: var(--space-12) var(--space-16);
            box-shadow: var(--shadow-lg);
            z-index: 1001;
            max-width: 300px;
        `;
        
        if (type === 'success') {
            notification.style.borderLeft = '4px solid var(--color-success)';
        } else if (type === 'error') {
            notification.style.borderLeft = '4px solid var(--color-error)';
        } else {
            notification.style.borderLeft = '4px solid var(--color-info)';
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    updateUI() {
        const loginLink = document.querySelector('.login-link');
        const logoutLink = document.querySelector('.logout-link');

        if (this.isLoggedIn) {
            if (loginLink) loginLink.style.display = 'none';
            if (logoutLink) {
                logoutLink.style.display = 'block';
                logoutLink.textContent = 'Logout';
            }
        } else {
            if (loginLink) loginLink.style.display = 'block';
            if (logoutLink) logoutLink.style.display = 'none';
        }
    }

    updateInvoiceAccess() {
        const accessDenied = document.getElementById('invoiceAccessDenied');
        const invoiceContent = document.getElementById('invoiceContent');

        if (this.isLoggedIn) {
            if (accessDenied) accessDenied.style.display = 'none';
            if (invoiceContent) invoiceContent.style.display = 'block';
        } else {
            if (accessDenied) accessDenied.style.display = 'block';
            if (invoiceContent) invoiceContent.style.display = 'none';
        }
    }

    // Contact Form
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.showNotification('Thank you for your message! We will get back to you soon.', 'success');
                contactForm.reset();
            });
        }
    }

    // Invoice Builder
    setupInvoiceBuilder() {
        this.setupInvoiceForm();
        this.setupItemManagement();
        this.setupInvoiceActions();
        this.updateInvoicePreview();
    }

    generateInvoiceNumber() {
        const invoiceNoField = document.getElementById('invoiceNo');
        if (invoiceNoField) {
            const currentDate = new Date();
            const year = currentDate.getFullYear().toString().substr(-2);
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const invoiceNo = `HMC/${year}${month}/${this.invoiceCounter.toString().padStart(4, '0')}`;
            invoiceNoField.value = invoiceNo;
        }
    }

    setCurrentDate() {
        const today = new Date().toISOString().split('T')[0];
        const invoiceDateField = document.getElementById('invoiceDate');
        const supplyDateField = document.getElementById('supplyDate');
        
        if (invoiceDateField) invoiceDateField.value = today;
        if (supplyDateField) supplyDateField.value = today;
    }

    setupInvoiceForm() {
        const form = document.getElementById('invoiceForm');
        if (!form) return;
        
        const inputs = form.querySelectorAll('input, select, textarea');

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.updateInvoicePreview();
            });
        });
    }

    setupItemManagement() {
        const addItemBtn = document.getElementById('addItem');
        
        if (addItemBtn) {
            addItemBtn.addEventListener('click', () => {
                this.addItem();
            });
        }

        // Setup initial item calculations
        this.setupItemCalculations();
    }

    addItem() {
        const itemsContainer = document.getElementById('itemsContainer');
        if (!itemsContainer) return;
        
        const itemCount = itemsContainer.children.length;
        
        const itemRow = document.createElement('div');
        itemRow.className = 'item-row';
        itemRow.dataset.index = itemCount;
        
        itemRow.innerHTML = `
            <div class="form-row">
                <div class="form-group small">
                    <label class="form-label">SL No</label>
                    <input type="number" class="form-control" value="${itemCount + 1}" readonly>
                </div>
                <div class="form-group large">
                    <label class="form-label">Particulars</label>
                    <input type="text" class="form-control item-description" required>
                </div>
                <div class="form-group">
                    <label class="form-label">HSN Code</label>
                    <input type="text" class="form-control item-hsn">
                </div>
                <div class="form-group">
                    <label class="form-label">Tax %</label>
                    <input type="number" class="form-control item-tax" step="0.01" value="18">
                </div>
                <div class="form-group">
                    <label class="form-label">Quantity</label>
                    <input type="number" class="form-control item-quantity" step="0.01" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Rate</label>
                    <input type="number" class="form-control item-rate" step="0.01" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Amount</label>
                    <input type="number" class="form-control item-amount" readonly>
                </div>
                <div class="form-group">
                    <button type="button" class="btn remove-item">Remove</button>
                </div>
            </div>
        `;

        itemsContainer.appendChild(itemRow);
        this.setupItemRowEvents(itemRow);
        this.updateInvoicePreview();
    }

    setupItemCalculations() {
        const itemRows = document.querySelectorAll('.item-row');
        itemRows.forEach(row => {
            this.setupItemRowEvents(row);
        });
    }

    setupItemRowEvents(row) {
        const quantityInput = row.querySelector('.item-quantity');
        const rateInput = row.querySelector('.item-rate');
        const amountInput = row.querySelector('.item-amount');
        const removeBtn = row.querySelector('.remove-item');

        const calculateAmount = () => {
            const quantity = parseFloat(quantityInput.value) || 0;
            const rate = parseFloat(rateInput.value) || 0;
            const amount = quantity * rate;
            amountInput.value = amount.toFixed(2);
            this.updateInvoicePreview();
        };

        if (quantityInput) quantityInput.addEventListener('input', calculateAmount);
        if (rateInput) rateInput.addEventListener('input', calculateAmount);

        // Add input event listeners for preview updates
        row.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                this.updateInvoicePreview();
            });
        });

        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                if (document.querySelectorAll('.item-row').length > 1) {
                    row.remove();
                    this.reindexItems();
                    this.updateInvoicePreview();
                } else {
                    this.showNotification('At least one item is required', 'error');
                }
            });
        }
    }

    reindexItems() {
        const itemRows = document.querySelectorAll('.item-row');
        itemRows.forEach((row, index) => {
            row.dataset.index = index;
            const slNoInput = row.querySelector('input[readonly]');
            if (slNoInput) slNoInput.value = index + 1;
        });
    }

    updateInvoicePreview() {
        const preview = document.getElementById('invoicePreview');
        if (!preview) return;
        
        const invoiceData = this.collectInvoiceData();
        preview.innerHTML = this.generateInvoiceHTML(invoiceData);
    }

    collectInvoiceData() {
        const data = {
            type: this.getFieldValue('invoiceType') || 'CASH',
            invoiceNo: this.getFieldValue('invoiceNo'),
            date: this.getFieldValue('invoiceDate'),
            transportMode: this.getFieldValue('transportMode'),
            vehicleNumber: this.getFieldValue('vehicleNumber'),
            supplyDate: this.getFieldValue('supplyDate'),
            placeOfSupply: this.getFieldValue('placeOfSupply'),
            eWayBill: this.getFieldValue('eWayBill'),
            customerName: this.getFieldValue('customerName'),
            customerAddress: this.getFieldValue('customerAddress'),
            customerGstin: this.getFieldValue('customerGstin'),
            customerState: this.getFieldValue('customerState'),
            items: [],
            totals: {
                netAmount: 0,
                cgst: 0,
                sgst: 0,
                igst: 0,
                grandTotal: 0
            }
        };

        // Collect items
        const itemRows = document.querySelectorAll('.item-row');
        itemRows.forEach((row, index) => {
            const item = {
                slNo: index + 1,
                description: this.getRowFieldValue(row, '.item-description'),
                hsn: this.getRowFieldValue(row, '.item-hsn'),
                tax: parseFloat(this.getRowFieldValue(row, '.item-tax')) || 0,
                quantity: parseFloat(this.getRowFieldValue(row, '.item-quantity')) || 0,
                rate: parseFloat(this.getRowFieldValue(row, '.item-rate')) || 0,
                amount: parseFloat(this.getRowFieldValue(row, '.item-amount')) || 0
            };
            
            if (item.description && item.quantity && item.rate) {
                data.items.push(item);
            }
        });

        // Calculate totals
        data.totals.netAmount = data.items.reduce((sum, item) => sum + item.amount, 0);
        
        // Calculate taxes
        if (data.items.length > 0) {
            const avgTaxRate = data.items.reduce((sum, item) => sum + item.tax, 0) / data.items.length;
            
            if (data.customerState && data.customerState.toLowerCase().includes('karnataka')) {
                // Same state - CGST + SGST
                data.totals.cgst = (data.totals.netAmount * avgTaxRate / 2) / 100;
                data.totals.sgst = (data.totals.netAmount * avgTaxRate / 2) / 100;
            } else {
                // Different state - IGST
                data.totals.igst = (data.totals.netAmount * avgTaxRate) / 100;
            }
        }
        
        data.totals.grandTotal = data.totals.netAmount + data.totals.cgst + data.totals.sgst + data.totals.igst;

        return data;
    }

    getFieldValue(fieldId) {
        const field = document.getElementById(fieldId);
        return field ? field.value : '';
    }

    getRowFieldValue(row, selector) {
        const field = row.querySelector(selector);
        return field ? field.value : '';
    }

    generateInvoiceHTML(data) {
        const formatDate = (dateStr) => {
            if (!dateStr) return '';
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-IN');
        };

        const formatCurrency = (amount) => {
            return amount.toFixed(2);
        };

        return `
            <div class="invoice-header">
                <h1>H.M.C. TRADERS</h1>
                <h2>Fresh Ginger & Dry Ginger Merchants</h2>
                <p>Annavatti to Shivamogga Main Road, CHIKKAIDAGODU-577413 Soraba Tq</p>
                <p>GSTIN: 29CYPPS9466P1ZS | Contact: 9972987867, 9740459661</p>
                <h3 style="color: var(--ginger-orange); margin-top: 16px;">${data.type} BILL</h3>
            </div>

            <div class="invoice-details">
                <div>
                    <strong>Invoice Details</strong>
                    <p>Invoice No: ${data.invoiceNo}</p>
                    <p>Date: ${formatDate(data.date)}</p>
                    <p>Transportation: ${data.transportMode}</p>
                    <p>Vehicle No: ${data.vehicleNumber}</p>
                </div>
                <div>
                    <strong>Supply Details</strong>
                    <p>Date of Supply: ${formatDate(data.supplyDate)}</p>
                    <p>State: Karnataka : 29</p>
                    <p>Place of Supply: ${data.placeOfSupply}</p>
                    <p>E-Way Bill: ${data.eWayBill}</p>
                </div>
            </div>

            <div class="invoice-details">
                <div>
                    <strong>Bill To</strong>
                    <p><strong>${data.customerName}</strong></p>
                    <p>${data.customerAddress}</p>
                    <p>GSTIN: ${data.customerGstin}</p>
                    <p>State: ${data.customerState}</p>
                </div>
                <div>
                    <strong>Bill From</strong>
                    <p><strong>H.M.C. TRADERS</strong></p>
                    <p>Annavatti to Shivamogga Main Road<br>CHIKKAIDAGODU-577413<br>Soraba Tq, Karnataka</p>
                    <p>GSTIN: 29CYPPS9466P1ZS</p>
                </div>
            </div>

            <table class="invoice-table">
                <thead>
                    <tr>
                        <th>SL NO</th>
                        <th>Particulars</th>
                        <th>HSN Code</th>
                        <th>Rate of Tax %</th>
                        <th>Quantity</th>
                        <th>Rate Rs. Ps.</th>
                        <th>Amount Rs. Ps.</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.items.map(item => `
                        <tr>
                            <td>${item.slNo}</td>
                            <td>${item.description}</td>
                            <td>${item.hsn}</td>
                            <td>${item.tax}%</td>
                            <td>${item.quantity}</td>
                            <td>${formatCurrency(item.rate)}</td>
                            <td>${formatCurrency(item.amount)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div class="invoice-totals">
                <table>
                    <tr>
                        <td>Net Amount:</td>
                        <td>₹ ${formatCurrency(data.totals.netAmount)}</td>
                    </tr>
                    ${data.totals.cgst > 0 ? `
                    <tr>
                        <td>CGST @ ${data.items.length > 0 ? (data.items[0].tax / 2) : 0}%:</td>
                        <td>₹ ${formatCurrency(data.totals.cgst)}</td>
                    </tr>
                    <tr>
                        <td>SGST @ ${data.items.length > 0 ? (data.items[0].tax / 2) : 0}%:</td>
                        <td>₹ ${formatCurrency(data.totals.sgst)}</td>
                    </tr>
                    ` : ''}
                    ${data.totals.igst > 0 ? `
                    <tr>
                        <td>IGST @ ${data.items.length > 0 ? data.items[0].tax : 0}%:</td>
                        <td>₹ ${formatCurrency(data.totals.igst)}</td>
                    </tr>
                    ` : ''}
                    <tr class="total-row">
                        <td><strong>Grand Total:</strong></td>
                        <td><strong>₹ ${formatCurrency(data.totals.grandTotal)}</strong></td>
                    </tr>
                </table>
            </div>

            <div class="invoice-footer">
                <p><strong>Rupees in Words:</strong> ${this.numberToWords(data.totals.grandTotal)} Only</p>
                
                <div class="terms">
                    <h4>Terms & Conditions</h4>
                    <p>• Good once sold cannot be taken back or exchanged</p>
                    <p>• If bill is not cleared 30 day 2% Interest will be charged</p>
                </div>

                <div class="signatures">
                    <div class="signature">
                        <strong>Party Signatory</strong>
                    </div>
                    <div class="signature">
                        <strong>Authorized Signatory</strong><br>
                        <strong>H.M.C. TRADERS</strong>
                    </div>
                </div>
            </div>
        `;
    }

    setupInvoiceActions() {
        const saveAsPdfBtn = document.getElementById('saveAsPdf');
        const printInvoiceBtn = document.getElementById('printInvoice');

        if (saveAsPdfBtn) {
            saveAsPdfBtn.addEventListener('click', () => {
                this.saveAsPDF();
            });
        }

        if (printInvoiceBtn) {
            printInvoiceBtn.addEventListener('click', () => {
                this.printInvoice();
            });
        }
    }

    saveAsPDF() {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        const invoiceData = this.collectInvoiceData();

        // PDF content
        let yPosition = 20;
        
        // Header
        pdf.setFontSize(20);
        pdf.setFont(undefined, 'bold');
        pdf.text('H.M.C. TRADERS', 105, yPosition, { align: 'center' });
        
        yPosition += 8;
        pdf.setFontSize(14);
        pdf.text('Fresh Ginger & Dry Ginger Merchants', 105, yPosition, { align: 'center' });
        
        yPosition += 6;
        pdf.setFontSize(10);
        pdf.setFont(undefined, 'normal');
        pdf.text('Annavatti to Shivamogga Main Road, CHIKKAIDAGODU-577413 Soraba Tq', 105, yPosition, { align: 'center' });
        
        yPosition += 4;
        pdf.text('GSTIN: 29CYPPS9466P1ZS | Contact: 9972987867, 9740459661', 105, yPosition, { align: 'center' });
        
        yPosition += 10;
        pdf.setFontSize(16);
        pdf.setFont(undefined, 'bold');
        pdf.text(`${invoiceData.type} BILL`, 105, yPosition, { align: 'center' });
        
        yPosition += 15;
        
        // Invoice details
        pdf.setFontSize(10);
        pdf.setFont(undefined, 'normal');
        pdf.text(`Invoice No: ${invoiceData.invoiceNo}`, 20, yPosition);
        pdf.text(`Date: ${invoiceData.date}`, 120, yPosition);
        
        yPosition += 8;
        pdf.text(`Customer: ${invoiceData.customerName}`, 20, yPosition);
        
        yPosition += 6;
        pdf.text(`Address: ${invoiceData.customerAddress}`, 20, yPosition);
        
        yPosition += 15;
        
        // Items table
        if (invoiceData.items.length > 0) {
            // Table headers
            pdf.setFont(undefined, 'bold');
            pdf.text('SL', 20, yPosition);
            pdf.text('Particulars', 35, yPosition);
            pdf.text('Qty', 120, yPosition);
            pdf.text('Rate', 140, yPosition);
            pdf.text('Amount', 170, yPosition);
            
            yPosition += 8;
            pdf.setFont(undefined, 'normal');
            
            // Items
            invoiceData.items.forEach((item, index) => {
                pdf.text((index + 1).toString(), 20, yPosition);
                pdf.text(item.description.substring(0, 30), 35, yPosition);
                pdf.text(item.quantity.toString(), 120, yPosition);
                pdf.text(item.rate.toFixed(2), 140, yPosition);
                pdf.text(item.amount.toFixed(2), 170, yPosition);
                yPosition += 6;
            });
            
            yPosition += 10;
            
            // Totals
            pdf.setFont(undefined, 'bold');
            pdf.text(`Grand Total: ₹ ${invoiceData.totals.grandTotal.toFixed(2)}`, 120, yPosition);
            
            yPosition += 10;
            pdf.setFont(undefined, 'normal');
            pdf.text(`Amount in Words: ${this.numberToWords(invoiceData.totals.grandTotal)} Only`, 20, yPosition);
        }
        
        // Save the PDF
        const filename = `Invoice_${invoiceData.invoiceNo.replace(/\//g, '_')}.pdf`;
        pdf.save(filename);
        this.showNotification(`PDF saved as ${filename}`, 'success');
    }

    printInvoice() {
        this.showNotification('Opening print dialog...', 'info');
        setTimeout(() => {
            window.print();
        }, 500);
    }

    numberToWords(num) {
        if (num === 0) return 'Zero';
        
        const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
        const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        const thousands = ['', 'Thousand', 'Lakh', 'Crore'];
        
        function convertHundreds(n) {
            let result = '';
            
            if (n >= 100) {
                result += ones[Math.floor(n / 100)] + ' Hundred ';
                n %= 100;
            }
            
            if (n >= 20) {
                result += tens[Math.floor(n / 10)] + ' ';
                n %= 10;
            } else if (n >= 10) {
                result += teens[n - 10] + ' ';
                return result;
            }
            
            if (n > 0) {
                result += ones[n] + ' ';
            }
            
            return result;
        }
        
        const integerPart = Math.floor(num);
        const decimalPart = Math.round((num - integerPart) * 100);
        
        let result = '';
        let groupIndex = 0;
        
        if (integerPart === 0) {
            result = 'Zero ';
        } else {
            while (integerPart > 0) {
                let group;
                
                if (groupIndex === 0) {
                    group = integerPart % 1000;
                    integerPart = Math.floor(integerPart / 1000);
                } else {
                    group = integerPart % 100;
                    integerPart = Math.floor(integerPart / 100);
                }
                
                if (group !== 0) {
                    result = convertHundreds(group) + thousands[groupIndex] + ' ' + result;
                }
                
                groupIndex++;
            }
        }
        
        result += 'Rupees';
        
        if (decimalPart > 0) {
            result += ' and ' + convertHundreds(decimalPart) + 'Paise';
        }
        
        return result.trim();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing H.M.C. Traders App...');
    new HMCTradersApp();
});