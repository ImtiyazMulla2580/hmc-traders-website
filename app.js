// Professional Invoice Generator - Enhanced JavaScript
class InvoiceGenerator {
    constructor() {
        this.currentInvoiceNumber = this.getNextInvoiceNumber();
        this.itemCounter = 1;
        this.companyState = '29'; // Karnataka
        this.autoSaveTimeout = null;
        this.stateMapping = {
            '29': 'Karnataka',
            '27': 'Maharashtra', 
            '33': 'Tamil Nadu',
            '32': 'Kerala',
            '36': 'Telangana',
            '37': 'Andhra Pradesh',
            '24': 'Gujarat',
            '08': 'Rajasthan',
            '09': 'Uttar Pradesh',
            '19': 'West Bengal',
            '06': 'Haryana',
            '03': 'Punjab',
            '07': 'Delhi'
        };
        
        this.init();
    }
    
    init() {
        this.setCurrentDate();
        this.updateInvoiceNumber();
        this.attachEventListeners(); 
        this.loadSavedData();
        this.setupFormValidation();
    }
    
    setCurrentDate() {
        const today = new Date().toISOString().split('T')[0];
        const invoiceDateEl = document.getElementById('invoiceDate');
        const supplyDateEl = document.getElementById('supplyDate');
        
        if (invoiceDateEl) invoiceDateEl.value = today;
        if (supplyDateEl) supplyDateEl.value = today;
    }
    
    getNextInvoiceNumber() {
        const savedNumber = localStorage.getItem('hmcLastInvoiceNumber');
        return savedNumber ? parseInt(savedNumber) + 1 : 1001;
    }
    
    updateInvoiceNumber() {
        const invoiceNumberEl = document.getElementById('invoiceNumber');
        if (invoiceNumberEl) {
            invoiceNumberEl.value = `HMC-${this.currentInvoiceNumber}`;
        }
    }
    
    attachEventListeners() {
        // Real-time calculation listeners
        document.addEventListener('input', this.debounce((e) => {
            if (e.target.matches('.item-quantity, .item-rate, .item-tax')) {
                this.calculateItemAmount(e.target);
                this.calculateTotals();
                this.scheduleAutoSave();
            }
            
            // Auto-save on any input change
            if (e.target.matches('input, select, textarea')) {
                this.scheduleAutoSave();
            }
        }, 100));
        
        // Customer state change listener
        const customerStateSelect = document.getElementById('customerState');
        if (customerStateSelect) {
            customerStateSelect.addEventListener('change', () => {
                this.updateCustomerStateCode();
                this.calculateTotals();
                this.scheduleAutoSave();
            });
        }
        
        // Invoice type change listener
        const invoiceTypeSelect = document.getElementById('invoiceType');
        if (invoiceTypeSelect) {
            invoiceTypeSelect.addEventListener('change', () => {
                this.updateInvoiceTypeDisplay();
            });
        }
        
        // Form validation on blur
        document.addEventListener('blur', (e) => {
            if (e.target.hasAttribute('required')) {
                this.validateField(e.target);
            }
        }, true);
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey) {
                switch(e.key) {
                    case 's':
                        e.preventDefault();
                        this.saveInvoice();
                        break;
                    case 'p':
                        e.preventDefault();
                        this.printInvoice();
                        break;
                }
            }
        });
    }
    
    setupFormValidation() {
        const requiredFields = document.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('invalid', (e) => {
                e.preventDefault();
                this.showValidationError(field);
            });
        });
    }
    
    showValidationError(field) {
        field.style.borderColor = '#DC2626';
        field.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
        
        setTimeout(() => {
            field.style.borderColor = '';
            field.style.boxShadow = '';
        }, 3000);
    }
    
    validateField(field) {
        const isValid = field.checkValidity();
        if (!isValid) {
            this.showValidationError(field);
        } else {
            field.style.borderColor = '#10B981';
            field.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
            
            setTimeout(() => {
                field.style.borderColor = '';
                field.style.boxShadow = '';
            }, 1000);
        }
        return isValid;
    }
    
    updateInvoiceTypeDisplay() {
        const invoiceTypeSelect = document.getElementById('invoiceType');
        const invoiceTypeDisplay = document.getElementById('invoiceTypeDisplay');
        
        if (invoiceTypeSelect && invoiceTypeDisplay) {
            const selectedOption = invoiceTypeSelect.options[invoiceTypeSelect.selectedIndex];
            invoiceTypeDisplay.textContent = selectedOption.text;
        }
    }
    
    updateCustomerStateCode() {
        const customerStateSelect = document.getElementById('customerState');
        const customerStateCodeInput = document.getElementById('customerStateCode');
        
        if (customerStateSelect && customerStateCodeInput) {
            const stateCode = customerStateSelect.value;
            const stateName = this.stateMapping[stateCode];
            customerStateCodeInput.value = stateCode ? `${stateName} : ${stateCode}` : '';
        }
    }
    
    addNewItem() {
        this.itemCounter++;
        const tbody = document.getElementById('itemsTableBody');
        const newRow = this.createItemRow(this.itemCounter);
        tbody.appendChild(newRow);
        
        // Focus on the new item description
        const newDescInput = newRow.querySelector('.item-description');
        if (newDescInput) {
            newDescInput.focus();
        }
        
        this.updateRowNumbers();
        this.showToast('success', 'Item Added', 'New item row added successfully');
    }
    
    createItemRow(rowNumber) {
        const row = document.createElement('tr');
        row.className = 'item-row';
        row.setAttribute('data-row', rowNumber);
        
        row.innerHTML = `
            <td class="serial-number">${rowNumber}</td>
            <td>
                <input type="text" class="form-control item-description" placeholder="Enter item description" list="productsList">
            </td>
            <td>
                <select class="form-control item-hsn">
                    <option value="">Select HSN</option>
                    <option value="0910.11">0910.11 - Ginger (Fresh)</option>
                    <option value="0910.12">0910.12 - Ginger (Processed)</option>
                    <option value="2008.99">2008.99 - Preserved Fruits</option>
                </select>
            </td>
            <td>
                <select class="form-control item-tax">
                    <option value="0">0%</option>
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18">18%</option>
                    <option value="28">28%</option>
                </select>
            </td>
            <td>
                <input type="number" class="form-control item-quantity" min="0" step="0.01" placeholder="0">
            </td>
            <td>
                <input type="number" class="form-control item-rate" min="0" step="0.01" placeholder="0.00">
            </td>
            <td class="item-amount">₹0.00</td>
            <td class="no-print">
                <button type="button" class="btn-remove" onclick="removeItem(${rowNumber})" title="Remove Item">
                    <span>🗑️</span>
                </button>
            </td>
        `;
        
        return row;
    }
    
    updateRowNumbers() {
        const rows = document.querySelectorAll('.item-row');
        rows.forEach((row, index) => {
            const newRowNumber = index + 1;
            row.setAttribute('data-row', newRowNumber);
            const serialCell = row.querySelector('.serial-number');
            if (serialCell) serialCell.textContent = newRowNumber;
            
            const removeBtn = row.querySelector('.btn-remove');
            if (removeBtn) {
                removeBtn.setAttribute('onclick', `removeItem(${newRowNumber})`);
            }
        });
        this.itemCounter = rows.length;
    }
    
    calculateItemAmount(changedElement) {
        const row = changedElement.closest('.item-row');
        if (!row) return;
        
        const quantityInput = row.querySelector('.item-quantity');
        const rateInput = row.querySelector('.item-rate');
        const amountCell = row.querySelector('.item-amount');
        
        if (!quantityInput || !rateInput || !amountCell) return;
        
        const quantity = parseFloat(quantityInput.value) || 0;
        const rate = parseFloat(rateInput.value) || 0;
        const amount = quantity * rate;
        
        amountCell.textContent = `₹${amount.toFixed(2)}`;
        
        // Add visual feedback for calculated amount
        if (amount > 0) {
            amountCell.style.color = '#10B981';
            amountCell.style.fontWeight = '600';
        } else {
            amountCell.style.color = '';
            amountCell.style.fontWeight = '';
        }
    }
    
    calculateTotals() {
        const items = document.querySelectorAll('.item-row');
        let netAmount = 0;
        let totalCGST = 0;
        let totalSGST = 0;
        let totalIGST = 0;
        let totalTaxableValue = 0;
        
        const customerStateSelect = document.getElementById('customerState');
        const customerState = customerStateSelect ? customerStateSelect.value : '';
        const isInterState = customerState && customerState !== this.companyState;
        
        // Calculate amounts for each item
        items.forEach(item => {
            const quantityInput = item.querySelector('.item-quantity');
            const rateInput = item.querySelector('.item-rate');
            const taxSelect = item.querySelector('.item-tax');
            
            const quantity = parseFloat(quantityInput?.value) || 0;
            const rate = parseFloat(rateInput?.value) || 0;
            const taxRate = parseFloat(taxSelect?.value) || 0;
            const itemAmount = quantity * rate;
            
            netAmount += itemAmount;
            
            if (itemAmount > 0 && taxRate > 0) {
                totalTaxableValue += itemAmount;
                const taxAmount = (itemAmount * taxRate) / 100;
                
                if (isInterState) {
                    totalIGST += taxAmount;
                } else {
                    totalCGST += taxAmount / 2;
                    totalSGST += taxAmount / 2;
                }
            }
        });
        
        // Update display elements
        this.updateAmountDisplay('netAmount', netAmount);
        
        // Show/hide tax rows based on transaction type
        const cgstRow = document.getElementById('cgstRow');
        const sgstRow = document.getElementById('sgstRow');
        const igstRow = document.getElementById('igstRow');
        
        if (isInterState && totalIGST > 0) {
            this.showTaxRow(igstRow, 'igstPercent', 'igstAmount', totalIGST, totalTaxableValue);
            this.hideTaxRow(cgstRow);
            this.hideTaxRow(sgstRow);
        } else if (!isInterState && (totalCGST > 0 || totalSGST > 0)) {
            this.showTaxRow(cgstRow, 'cgstPercent', 'cgstAmount', totalCGST, totalTaxableValue / 2);
            this.showTaxRow(sgstRow, 'sgstPercent', 'sgstAmount', totalSGST, totalTaxableValue / 2);
            this.hideTaxRow(igstRow);
        } else {
            this.hideTaxRow(cgstRow);
            this.hideTaxRow(sgstRow);
            this.hideTaxRow(igstRow);
        }
        
        const grandTotal = netAmount + totalCGST + totalSGST + totalIGST;
        this.updateAmountDisplay('grandTotal', grandTotal);
        
        // Update amount in words
        const amountInWordsElement = document.getElementById('amountInWords');
        if (amountInWordsElement) {
            amountInWordsElement.textContent = this.numberToWords(grandTotal);
        }
    }
    
    updateAmountDisplay(elementId, amount) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = `₹${amount.toFixed(2)}`;
        }
    }
    
    showTaxRow(row, percentId, amountId, taxAmount, taxableAmount) {
        if (!row) return;
        
        row.style.display = 'flex';
        
        const percentElement = document.getElementById(percentId);
        const amountElement = document.getElementById(amountId);
        
        if (percentElement && taxableAmount > 0) {
            const percentage = (taxAmount / taxableAmount) * 100;
            percentElement.textContent = percentage.toFixed(1);
        }
        
        if (amountElement) {
            amountElement.textContent = `₹${taxAmount.toFixed(2)}`;
        }
    }
    
    hideTaxRow(row) {
        if (row) {
            row.style.display = 'none';
        }
    }
    
    numberToWords(amount) {
        if (amount === 0) return 'Zero Rupees Only';
        if (amount < 0) return 'Invalid Amount';
        
        const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
        const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        
        function convertBelowThousand(num) {
            let result = '';
            
            if (num >= 100) {
                result += ones[Math.floor(num / 100)] + ' Hundred ';
                num %= 100;
            }
            
            if (num >= 20) {
                result += tens[Math.floor(num / 10)] + ' ';
                num %= 10;
            } else if (num >= 10) {
                result += teens[num - 10] + ' ';
                return result;
            }
            
            if (num > 0) {
                result += ones[num] + ' ';
            }
            
            return result;
        }
        
        let rupees = Math.floor(amount);
        let paise = Math.round((amount - rupees) * 100);
        
        let result = '';
        
        if (rupees >= 10000000) {
            result += convertBelowThousand(Math.floor(rupees / 10000000)) + 'Crore ';
            rupees %= 10000000;
        }
        
        if (rupees >= 100000) {
            result += convertBelowThousand(Math.floor(rupees / 100000)) + 'Lakh ';
            rupees %= 100000;
        }
        
        if (rupees >= 1000) {
            result += convertBelowThousand(Math.floor(rupees / 1000)) + 'Thousand ';
            rupees %= 1000;
        }
        
        if (rupees > 0) {
            result += convertBelowThousand(rupees);
        }
        
        result += 'Rupees';
        
        if (paise > 0) {
            result += ' and ' + convertBelowThousand(paise) + 'Paise';
        }
        
        return result.trim() + ' Only';
    }
    
    validateForm() {
        const errors = [];
        
        // Required field validation
        const customerName = document.getElementById('customerName');
        if (!customerName || !customerName.value.trim()) {
            errors.push('Customer Name is required');
            if (customerName) this.showValidationError(customerName);
        }
        
        const invoiceDate = document.getElementById('invoiceDate');
        if (!invoiceDate || !invoiceDate.value) {
            errors.push('Invoice Date is required');
            if (invoiceDate) this.showValidationError(invoiceDate);
        }
        
        // Validate at least one valid item
        const items = document.querySelectorAll('.item-row');
        let validItems = 0;
        
        items.forEach(item => {
            const quantityInput = item.querySelector('.item-quantity');
            const rateInput = item.querySelector('.item-rate');
            const descInput = item.querySelector('.item-description');
            
            const quantity = parseFloat(quantityInput?.value) || 0;
            const rate = parseFloat(rateInput?.value) || 0;
            const description = descInput?.value?.trim() || '';
            
            if (quantity > 0 && rate > 0 && description) {
                validItems++;
            }
        });
        
        if (validItems === 0) {
            errors.push('At least one item with description, quantity, and rate is required');
        }
        
        if (errors.length > 0) {
            this.showToast('error', 'Validation Error', errors.join(', '));
            return false;
        }
        
        return true;
    }
    
    collectInvoiceData() {
        const items = [];
        const itemRows = document.querySelectorAll('.item-row');
        
        itemRows.forEach(row => {
            const descInput = row.querySelector('.item-description');
            const hsnSelect = row.querySelector('.item-hsn');
            const quantityInput = row.querySelector('.item-quantity');
            const rateInput = row.querySelector('.item-rate');
            const taxSelect = row.querySelector('.item-tax');
            
            const description = descInput?.value?.trim() || '';
            const hsn = hsnSelect?.value || '';
            const quantity = parseFloat(quantityInput?.value) || 0;
            const rate = parseFloat(rateInput?.value) || 0;
            const tax = parseFloat(taxSelect?.value) || 0;
            const amount = quantity * rate;
            
            if (description || quantity > 0 || rate > 0) {
                items.push({ description, hsn, quantity, rate, tax, amount });
            }
        });
        
        const getElementValue = (id) => {
            const element = document.getElementById(id);
            return element ? element.value : '';
        };
        
        const getElementText = (id) => {
            const element = document.getElementById(id);
            return element ? element.textContent.replace('₹', '') : '';
        };
        
        return {
            invoiceNumber: getElementValue('invoiceNumber'),
            invoiceType: getElementValue('invoiceType'),
            invoiceDate: getElementValue('invoiceDate'),
            supplyDate: getElementValue('supplyDate'),
            transportMode: getElementValue('transportMode'),
            vehicleNumber: getElementValue('vehicleNumber'),
            placeOfSupply: getElementValue('placeOfSupply'),
            eWayBill: getElementValue('eWayBill'),
            customerName: getElementValue('customerName'),
            customerAddress: getElementValue('customerAddress'),
            customerGSTIN: getElementValue('customerGSTIN'),
            customerState: getElementValue('customerState'),
            items: items,
            calculations: {
                netAmount: getElementText('netAmount'),
                cgstAmount: getElementText('cgstAmount'),
                sgstAmount: getElementText('sgstAmount'),
                igstAmount: getElementText('igstAmount'),
                grandTotal: getElementText('grandTotal'),
                amountInWords: document.getElementById('amountInWords')?.textContent || ''
            },
            timestamp: new Date().toISOString()
        };
    }
    
    saveInvoice() {
        if (!this.validateForm()) return;
        
        const invoiceData = this.collectInvoiceData();
        const invoiceKey = `invoice_${invoiceData.invoiceNumber}`;
        
        try {
            // Save individual invoice
            localStorage.setItem(invoiceKey, JSON.stringify(invoiceData));
            
            // Update invoice counter
            localStorage.setItem('hmcLastInvoiceNumber', this.currentInvoiceNumber.toString());
            
            // Clear draft
            localStorage.removeItem('hmcDraftInvoice');
            
            this.showToast('success', 'Invoice Saved', `Invoice ${invoiceData.invoiceNumber} saved successfully!`);
            
            // Increment invoice number for next invoice
            this.currentInvoiceNumber++;
            this.updateInvoiceNumber();
            
        } catch (error) {
            this.showToast('error', 'Save Error', 'Failed to save invoice. Please try again.');
            console.error('Save error:', error);
        }
    }
    
    scheduleAutoSave() {
        // Clear existing timeout
        if (this.autoSaveTimeout) {
            clearTimeout(this.autoSaveTimeout);
        }
        
        // Schedule new auto-save
        this.autoSaveTimeout = setTimeout(() => {
            this.autoSave();
        }, 2000);
    }
    
    autoSave() {
        const customerName = document.getElementById('customerName');
        if (!customerName || !customerName.value.trim()) return;
        
        const invoiceData = this.collectInvoiceData();
        
        try {
            localStorage.setItem('hmcDraftInvoice', JSON.stringify(invoiceData));
            this.showAutoSaveIndicator();
        } catch (error) {
            console.error('Auto-save error:', error);
        }
    }
    
    showAutoSaveIndicator() {
        const indicator = document.getElementById('autoSaveIndicator');
        if (indicator) {
            indicator.classList.add('show');
            setTimeout(() => {
                indicator.classList.remove('show');
            }, 2000);
        }
    }
    
    loadSavedData() {
        try {
            const draftData = localStorage.getItem('hmcDraftInvoice');
            if (draftData) {
                const data = JSON.parse(draftData);
                this.populateForm(data);
                this.showToast('success', 'Draft Loaded', 'Previous draft has been restored');
            }
        } catch (error) {
            console.error('Error loading draft:', error);
        }
    }
    
    populateForm(data) {
        const setElementValue = (id, value) => {
            const element = document.getElementById(id);
            if (element && value !== undefined && value !== null) {
                element.value = value;
            }
        };
        
        // Populate form fields (excluding auto-generated fields)
        setElementValue('customerName', data.customerName);
        setElementValue('customerAddress', data.customerAddress);
        setElementValue('customerGSTIN', data.customerGSTIN);
        setElementValue('customerState', data.customerState);
        setElementValue('transportMode', data.transportMode);
        setElementValue('vehicleNumber', data.vehicleNumber);
        setElementValue('placeOfSupply', data.placeOfSupply);
        setElementValue('eWayBill', data.eWayBill);
        
        // Update customer state code
        this.updateCustomerStateCode();
        
        // Populate items
        if (data.items && data.items.length > 0) {
            const tbody = document.getElementById('itemsTableBody');
            if (tbody) {
                tbody.innerHTML = ''; // Clear existing items
                
                data.items.forEach((item, index) => {
                    const row = this.createItemRow(index + 1);
                    
                    const descInput = row.querySelector('.item-description');
                    const hsnSelect = row.querySelector('.item-hsn');
                    const quantityInput = row.querySelector('.item-quantity');
                    const rateInput = row.querySelector('.item-rate');
                    const taxSelect = row.querySelector('.item-tax');
                    
                    if (descInput) descInput.value = item.description || '';
                    if (hsnSelect) hsnSelect.value = item.hsn || '';
                    if (quantityInput) quantityInput.value = item.quantity || '';
                    if (rateInput) rateInput.value = item.rate || '';
                    if (taxSelect) taxSelect.value = item.tax || '';
                    
                    tbody.appendChild(row);
                });
                
                this.itemCounter = data.items.length;
                
                // Recalculate amounts
                setTimeout(() => {
                    document.querySelectorAll('.item-row').forEach(row => {
                        const quantityInput = row.querySelector('.item-quantity');
                        if (quantityInput) {
                            this.calculateItemAmount(quantityInput);
                        }
                    });
                    this.calculateTotals();
                }, 100);
            }
        }
    }
    
    resetForm() {
        if (!confirm('Are you sure you want to reset the form? All unsaved data will be lost.')) {
            return;
        }
        
        try {
            // Clear localStorage
            localStorage.removeItem('hmcDraftInvoice');
            
            // Reset form
            const form = document.querySelector('.invoice-container');
            const inputs = form.querySelectorAll('input:not([readonly]), select, textarea');
            inputs.forEach(input => {
                if (input.type === 'date') {
                    input.value = new Date().toISOString().split('T')[0];
                } else if (input.tagName === 'SELECT') {
                    input.selectedIndex = 0;
                } else {
                    input.value = '';
                }
            });
            
            // Reset items table to single row
            const tbody = document.getElementById('itemsTableBody');
            if (tbody) {
                tbody.innerHTML = '';
                const newRow = this.createItemRow(1);
                tbody.appendChild(newRow);
                this.itemCounter = 1;
            }
            
            // Reset calculations
            this.calculateTotals();
            
            // Reset invoice number
            this.currentInvoiceNumber = this.getNextInvoiceNumber();
            this.updateInvoiceNumber();
            
            this.showToast('success', 'Form Reset', 'Form has been reset successfully');
            
        } catch (error) {
            this.showToast('error', 'Reset Error', 'Failed to reset form');
            console.error('Reset error:', error);
        }
    }
    
    async printInvoice() {
        if (!this.validateForm()) return;
        
        try {
            this.showLoadingOverlay('Preparing for print...');
            
            // Hide non-printable elements
            const nonPrintElements = document.querySelectorAll('.no-print, .action-bar');
            nonPrintElements.forEach(el => el.style.display = 'none');
            
            // Trigger print
            setTimeout(() => {
                window.print();
                
                // Restore elements after print dialog
                setTimeout(() => {
                    nonPrintElements.forEach(el => el.style.display = '');
                    this.hideLoadingOverlay();
                    this.showToast('success', 'Print Ready', 'Print dialog opened successfully');
                }, 1000);
            }, 500);
            
        } catch (error) {
            this.hideLoadingOverlay();
            this.showToast('error', 'Print Error', 'Failed to open print dialog');
            console.error('Print error:', error);
        }
    }
    
    async generatePDF() {
        if (!this.validateForm()) return;
        
        if (!window.jspdf || !window.html2canvas) {
            this.showToast('error', 'Library Error', 'PDF generation libraries not loaded');
            return;
        }
        
        try {
            this.showLoadingOverlay('Generating PDF...');
            
            const { jsPDF } = window.jspdf;
            
            // Hide non-printable elements
            const nonPrintElements = document.querySelectorAll('.no-print, .action-bar');
            nonPrintElements.forEach(el => el.style.display = 'none');
            
            // Get invoice element
            const invoiceElement = document.getElementById('invoiceContainer');
            if (!invoiceElement) {
                throw new Error('Invoice container not found');
            }
            
            // Generate canvas from HTML
            const canvas = await html2canvas(invoiceElement, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                width: invoiceElement.offsetWidth,
                height: invoiceElement.offsetHeight,
                onclone: (clonedDoc) => {
                    // Ensure colors are preserved in clone
                    const clonedElement = clonedDoc.getElementById('invoiceContainer');
                    if (clonedElement) {
                        clonedElement.style.backgroundColor = '#ffffff';
                    }
                }
            });
            
            // Create PDF
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgData = canvas.toDataURL('image/png', 1.0);
            
            // Calculate dimensions
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;
            
            // Add first page
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
            heightLeft -= pageHeight;
            
            // Add additional pages if needed
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
                heightLeft -= pageHeight;
            }
            
            // Save PDF
            const invoiceNumber = document.getElementById('invoiceNumber')?.value || 'Invoice';
            const fileName = `${invoiceNumber}_${new Date().toISOString().split('T')[0]}.pdf`;
            pdf.save(fileName);
            
            // Restore elements
            nonPrintElements.forEach(el => el.style.display = '');
            
            this.hideLoadingOverlay();
            this.showToast('success', 'PDF Generated', `PDF saved as ${fileName}`);
            
        } catch (error) {
            // Restore elements on error
            const nonPrintElements = document.querySelectorAll('.no-print, .action-bar');
            nonPrintElements.forEach(el => el.style.display = '');
            
            this.hideLoadingOverlay();
            this.showToast('error', 'PDF Error', 'Failed to generate PDF. Please try again.');
            console.error('PDF generation error:', error);
        }
    }
    
    showLoadingOverlay(message = 'Loading...') {
        const overlay = document.getElementById('loadingOverlay');
        const loadingText = overlay?.querySelector('.loading-text');
        
        if (overlay) {
            if (loadingText) loadingText.textContent = message;
            overlay.classList.remove('hidden');
        }
    }
    
    hideLoadingOverlay() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.add('hidden');
        }
    }
    
    showToast(type, title, message) {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
        
        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <p class="toast-message">${message}</p>
            </div>
        `;
        
        container.appendChild(toast);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.transform = 'translateX(100%)';
                toast.style.opacity = '0';
                setTimeout(() => {
                    if (toast.parentNode) {
                        container.removeChild(toast);
                    }
                }, 300);
            }
        }, 5000);
    }
    
    debounce(func, wait) {
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
}

// Global functions for HTML onclick handlers
function addNewItem() {
    if (window.invoiceGenerator) {
        window.invoiceGenerator.addNewItem();
    }
}

function removeItem(rowNumber) {
    const row = document.querySelector(`[data-row="${rowNumber}"]`);
    if (row && confirm('Are you sure you want to remove this item?')) {
        row.remove();
        
        if (window.invoiceGenerator) {
            window.invoiceGenerator.updateRowNumbers();
            window.invoiceGenerator.calculateTotals();
            window.invoiceGenerator.scheduleAutoSave();
            window.invoiceGenerator.showToast('success', 'Item Removed', 'Item removed successfully');
        }
    }
}

function saveInvoice() {
    if (window.invoiceGenerator) {
        window.invoiceGenerator.saveInvoice();
    }
}

function printInvoice() {
    if (window.invoiceGenerator) {
        window.invoiceGenerator.printInvoice();
    }
}

function generatePDF() {
    if (window.invoiceGenerator) {
        window.invoiceGenerator.generatePDF();
    }
}

function resetForm() {
    if (window.invoiceGenerator) {
        window.invoiceGenerator.resetForm();
    }
}

function updateInvoiceTypeDisplay() {
    if (window.invoiceGenerator) {
        window.invoiceGenerator.updateInvoiceTypeDisplay();
    }
}

// Initialize the invoice generator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.invoiceGenerator = new InvoiceGenerator();
    
    // Add any additional initialization here
    console.log('Invoice Generator initialized successfully');
});