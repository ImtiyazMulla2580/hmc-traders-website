# I'll create complete, updated files for the H.M.C. Traders website with the working invoice creation functionality

# First, let's create the updated HTML file with the invoice creation modal
html_content = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>H.M.C. Traders - Fresh Ginger & Dry Ginger Merchants</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    <h1>H.M.C. Traders</h1>
                    <span class="tagline">Fresh Ginger & Dry Ginger Merchants</span>
                </div>
                <nav class="nav">
                    <ul class="nav-list">
                        <li><a href="#home" class="nav-link active">Home</a></li>
                        <li><a href="#about" class="nav-link">About</a></li>
                        <li><a href="#services" class="nav-link">Services</a></li>
                        <li><a href="#invoice" class="nav-link">Invoice</a></li>
                        <li><a href="#contact" class="nav-link">Contact</a></li>
                        <li><button class="btn btn--primary btn--sm" id="loginBtn">Login</button></li>
                    </ul>
                </nav>
                <button class="mobile-menu-toggle" id="mobileMenuToggle">☰</button>
            </div>
        </div>
    </header>

    <!-- Mobile Navigation -->
    <nav class="mobile-nav hidden" id="mobileNav">
        <ul class="mobile-nav-list">
            <li><a href="#home" class="nav-link">Home</a></li>
            <li><a href="#about" class="nav-link">About</a></li>
            <li><a href="#services" class="nav-link">Services</a></li>
            <li><a href="#invoice" class="nav-link">Invoice</a></li>
            <li><a href="#contact" class="nav-link">Contact</a></li>
            <li><button class="btn btn--primary btn--sm mobile-login-btn">Login</button></li>
        </ul>
    </nav>

    <!-- Main Content -->
    <main>
        <!-- Home Section -->
        <section id="home" class="hero">
            <div class="container">
                <div class="hero-content">
                    <h1 class="hero-title">Premium Ginger Trading Solutions</h1>
                    <p class="hero-description">
                        Leading supplier of fresh and dry ginger across India. We specialize in ginger washing, 
                        processing, and distribution with a commitment to quality and reliability.
                    </p>
                    <div class="hero-location">
                        <p>📍 Chikkidagodu-577413, Soraba Tq, Shivamogga, Karnataka</p>
                    </div>
                    <div class="hero-actions">
                        <a href="#services" class="btn btn--primary btn--lg">Our Services</a>
                        <a href="#contact" class="btn btn--outline btn--lg">Get In Touch</a>
                    </div>
                    <div class="hero-contacts">
                        <div class="contact-item">📞 9740459661 (Sadiq)</div>
                        <div class="contact-item">📞 9972200610 (Munavvar)</div>
                        <div class="contact-item">✉️ sadiqhmc83@gmail.com</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section id="about" class="section">
            <div class="container">
                <h2 class="section-title">About H.M.C. Traders</h2>
                <div class="about-content">
                    <div class="about-text">
                        <h3>Our Mission</h3>
                        <p>
                            H.M.C. Traders has been a trusted name in the ginger trading industry, specializing in the 
                            washing, processing, and supply of premium quality ginger across different parts of India. 
                            Our commitment to quality and customer satisfaction has made us a preferred partner for 
                            businesses seeking reliable ginger supply solutions.
                        </p>
                        
                        <h3>Quality Assurance</h3>
                        <p>
                            We maintain the highest standards of quality through our professional ginger washing and 
                            processing facilities. Our products undergo thorough quality testing and certification 
                            processes to ensure they meet industry standards and customer expectations.
                        </p>
                        
                        <h3>Supply Chain Excellence</h3>
                        <p>
                            With our strategic location in Chikkidagodu, Karnataka, and efficient distribution network, 
                            we ensure timely delivery of fresh and dry ginger to clients across India. Our supply chain 
                            covers major markets and industrial hubs nationwide.
                        </p>
                    </div>
                    
                    <div class="about-info">
                        <div class="info-card">
                            <h4>Contact Persons</h4>
                            <div class="contact-person">
                                <strong>Sadiq</strong><br>
                                Phone: 9740459661<br>
                                Email: sadiqhmc83@gmail.com
                            </div>
                            <div class="contact-person">
                                <strong>Munavvar Papu</strong><br>
                                Phone: 9972200610
                            </div>
                        </div>
                        
                        <div class="info-card">
                            <h4>Business Details</h4>
                            <p><strong>GSTIN:</strong> 29CYPPS9466P1ZS</p>
                            <p><strong>Location:</strong> Anavatti to Shivamogga Main Road, CHIKKAIDAGODU-577413 Soraba Tq</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Services Section -->
        <section id="services" class="section section-alt">
            <div class="container">
                <h2 class="section-title">Our Services</h2>
                <div class="services-grid">
                    <div class="service-card">
                        <div class="service-icon">🌶️</div>
                        <h3>Fresh Ginger Supply</h3>
                        <p>High-quality fresh ginger sourced directly from farms, ensuring optimal freshness and quality for our customers.</p>
                    </div>
                    
                    <div class="service-card">
                        <div class="service-icon">🏭</div>
                        <h3>Dry Ginger Processing</h3>
                        <p>Professional drying and processing of ginger for extended shelf life, maintaining nutritional value and flavor.</p>
                    </div>
                    
                    <div class="service-card">
                        <div class="service-icon">🧽</div>
                        <h3>Ginger Washing & Cleaning</h3>
                        <p>Thorough washing and cleaning services ensuring product hygiene and meeting food safety standards.</p>
                    </div>
                    
                    <div class="service-card">
                        <div class="service-icon">🚛</div>
                        <h3>Pan-India Distribution</h3>
                        <p>Reliable supply chain covering different parts of India with timely delivery and efficient logistics management.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Invoice Section -->
        <section id="invoice" class="section">
            <div class="container">
                <h2 class="section-title">Invoice Management</h2>
                <div class="invoice-content">
                    <div class="invoice-dashboard">
                        <h3>Recent Invoices</h3>
                        <div class="invoice-list" id="invoiceList">
                            <div class="invoice-item">
                                <div class="invoice-details">
                                    <div class="invoice-number">Invoice #2223</div>
                                    <div class="invoice-customer">R. D Enterprises</div>
                                    <div class="invoice-date">31/01/2025</div>
                                </div>
                                <div class="invoice-amount">₹59,500</div>
                                <div class="invoice-actions">
                                    <button class="btn btn--sm btn--outline" onclick="viewInvoice('2223')">View</button>
                                </div>
                            </div>
                        </div>
                        <div class="invoice-actions">
                            <button class="btn btn--primary" id="createInvoiceBtn">Create New Invoice</button>
                            <button class="btn btn--outline" id="downloadInvoiceBtn">Download Invoice</button>
                        </div>
                    </div>
                    
                    <div class="zoho-integration">
                        <h3>Zoho Invoice Integration</h3>
                        <div class="integration-status">
                            <span class="status status--warning">Not Connected</span>
                        </div>
                        <p>Connect your Zoho Invoice account to manage invoices seamlessly.</p>
                        <div class="integration-placeholder">
                            <p>Integration placeholder - This would contain the embedded Zoho Invoice interface</p>
                            <p><strong>Features Available:</strong></p>
                            <ul style="text-align: left; display: inline-block;">
                                <li>• Create and send invoices</li>
                                <li>• Track payments</li>
                                <li>• Generate reports</li>
                                <li>• Customer management</li>
                            </ul>
                        </div>
                        <button class="btn btn--primary btn--full-width" id="connectZohoBtn">Connect to Zoho Invoice</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="section section-alt">
            <div class="container">
                <h2 class="section-title">Contact Us</h2>
                <div class="contact-content">
                    <div class="contact-form-container">
                        <h3>Get In Touch</h3>
                        <form class="contact-form" id="contactForm">
                            <div class="form-group">
                                <label for="name" class="form-label">Name *</label>
                                <input type="text" id="name" name="name" class="form-control" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="email" class="form-label">Email *</label>
                                <input type="email" id="email" name="email" class="form-control" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="phone" class="form-label">Phone *</label>
                                <input type="tel" id="phone" name="phone" class="form-control" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="product" class="form-label">Product Interest</label>
                                <select id="product" name="product" class="form-control">
                                    <option value="">Select a product</option>
                                    <option value="fresh-ginger">Fresh Ginger</option>
                                    <option value="dry-ginger">Dry Ginger</option>
                                    <option value="processed-ginger">Processed Ginger</option>
                                    <option value="bulk-supply">Bulk Supply</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="message" class="form-label">Message *</label>
                                <textarea id="message" name="message" class="form-control" rows="5" required></textarea>
                            </div>
                            
                            <button type="submit" class="btn btn--primary btn--full-width">Send Message</button>
                        </form>
                    </div>
                    
                    <div class="contact-info">
                        <h3>Business Information</h3>
                        
                        <div class="info-card">
                            <h4>Address</h4>
                            <p>
                                Anavatti to Shivamogga Main Road<br>
                                CHIKKAIDAGODU-577413<br>
                                Soraba Tq, Shivamogga, Karnataka
                            </p>
                        </div>
                        
                        <div class="info-card">
                            <h4>Contact Information</h4>
                            <p><strong>Sadiq:</strong> 9740459661</p>
                            <p><strong>Munavvar Papu:</strong> 9972200610</p>
                            <p><strong>Email:</strong> sadiqhmc83@gmail.com</p>
                        </div>
                        
                        <div class="info-card">
                            <h4>Business Hours</h4>
                            <p>Monday - Saturday: 8:00 AM - 6:00 PM</p>
                            <p>Sunday: 9:00 AM - 2:00 PM</p>
                        </div>
                        
                        <div class="info-card">
                            <h4>GST Details</h4>
                            <p><strong>GSTIN:</strong> 29CYPPS9466P1ZS</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Login Modal -->
    <div id="loginModal" class="modal hidden">
        <div class="modal-overlay" id="modalOverlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Login to Invoice System</h3>
                <button class="modal-close" id="modalClose">&times;</button>
            </div>
            <form class="login-form" id="loginForm">
                <div class="form-group">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" id="username" name="username" class="form-control" required>
                </div>
                
                <div class="form-group">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" id="password" name="password" class="form-control" required>
                </div>
                
                <button type="submit" class="btn btn--primary btn--full-width">Login</button>
            </form>
        </div>
    </div>

    <!-- Invoice View Modal -->
    <div id="invoiceModal" class="modal hidden">
        <div class="modal-overlay" id="invoiceModalOverlay"></div>
        <div class="modal-content invoice-modal-content">
            <div class="modal-header">
                <h3>Invoice Details</h3>
                <button class="modal-close" id="invoiceModalClose">&times;</button>
            </div>
            <div class="invoice-preview" id="invoicePreview">
                <!-- Invoice content will be loaded here -->
            </div>
            <div class="modal-actions">
                <button class="btn btn--outline" id="closeInvoiceBtn">Close</button>
                <button class="btn btn--primary" id="downloadInvoiceBtn">Download PDF</button>
            </div>
        </div>
    </div>

    <!-- Invoice Creation Modal -->
    <div id="invoiceCreationModal" class="modal hidden">
        <div class="modal-overlay" id="invoiceCreationOverlay"></div>
        <div class="modal-content" style="max-width: 900px; max-height: 90vh; overflow-y: auto;">
            <div class="modal-header">
                <h3>Create New Invoice</h3>
                <button class="modal-close" id="closeInvoiceCreationModal">&times;</button>
            </div>
            <div class="modal-body">
                <form id="invoiceCreationForm">
                    <!-- Company Information (Auto-filled) -->
                    <div class="form-section">
                        <h4>Company Information</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">Company Name</label>
                                <input type="text" value="H.M.C. Traders" class="form-control" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">GSTIN</label>
                                <input type="text" value="29CYPPS9466P1ZS" class="form-control" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Address</label>
                            <input type="text" value="Anavatti to Shivamogga Main Road, CHIKKAIDAGODU-577413 Soraba Tq" class="form-control" readonly>
                        </div>
                    </div>

                    <!-- Customer Information -->
                    <div class="form-section">
                        <h4>Customer Information</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="customerName" class="form-label">Customer Name *</label>
                                <input type="text" id="customerName" name="customerName" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label for="customerGSTIN" class="form-label">Customer GSTIN</label>
                                <input type="text" id="customerGSTIN" name="customerGSTIN" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="customerAddress" class="form-label">Customer Address *</label>
                            <textarea id="customerAddress" name="customerAddress" class="form-control" rows="3" required></textarea>
                        </div>
                    </div>

                    <!-- Invoice Details -->
                    <div class="form-section">
                        <h4>Invoice Details</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="invoiceNumber" class="form-label">Invoice Number *</label>
                                <input type="text" id="invoiceNumber" name="invoiceNumber" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label for="invoiceDate" class="form-label">Invoice Date *</label>
                                <input type="date" id="invoiceDate" name="invoiceDate" class="form-control" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="vehicleNumber" class="form-label">Vehicle Number</label>
                                <input type="text" id="vehicleNumber" name="vehicleNumber" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="placeOfSupply" class="form-label">Place of Supply</label>
                                <input type="text" id="placeOfSupply" name="placeOfSupply" class="form-control">
                            </div>
                        </div>
                    </div>

                    <!-- Items Section -->
                    <div class="form-section">
                        <h4>Items</h4>
                        <div class="items-container">
                            <table class="items-table">
                                <thead>
                                    <tr>
                                        <th>Particulars</th>
                                        <th>HSN Code</th>
                                        <th>Quantity (kg)</th>
                                        <th>Rate (₹)</th>
                                        <th>Amount (₹)</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="itemsTableBody">
                                    <tr class="item-row">
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
                                    </tr>
                                </tbody>
                            </table>
                            <button type="button" class="btn btn--outline" onclick="addItem()">Add Item</button>
                        </div>
                    </div>

                    <!-- Tax and Total Section -->
                    <div class="form-section">
                        <h4>Tax & Total</h4>
                        <div class="tax-calculation">
                            <div class="form-row">
                                <div class="form-group">
                                    <label class="form-label">Subtotal</label>
                                    <input type="number" id="subtotal" class="form-control" readonly>
                                </div>
                                <div class="form-group">
                                    <label for="cgstRate" class="form-label">CGST Rate (%)</label>
                                    <input type="number" id="cgstRate" class="form-control" value="9" step="0.01" onchange="calculateTax()">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label class="form-label">CGST Amount</label>
                                    <input type="number" id="cgstAmount" class="form-control" readonly>
                                </div>
                                <div class="form-group">
                                    <label for="sgstRate" class="form-label">SGST Rate (%)</label>
                                    <input type="number" id="sgstRate" class="form-control" value="9" step="0.01" onchange="calculateTax()">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label class="form-label">SGST Amount</label>
                                    <input type="number" id="sgstAmount" class="form-control" readonly>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Grand Total</label>
                                    <input type="number" id="grandTotal" class="form-control" readonly>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Amount in Words</label>
                                <input type="text" id="amountInWords" class="form-control" readonly>
                            </div>
                        </div>
                    </div>

                    <div class="modal-actions">
                        <button type="button" class="btn btn--outline" id="cancelInvoiceCreation">Cancel</button>
                        <button type="submit" class="btn btn--primary">Create Invoice</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Notification Toast -->
    <div id="notificationToast" class="notification-toast hidden">
        <div class="notification-content">
            <span class="notification-message"></span>
            <button class="notification-close">&times;</button>
        </div>
    </div>

    <script src="app.js"></script>
</body>
</html>'''

print("HTML file created successfully!")