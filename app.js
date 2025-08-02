// Professional Invoice Generator JavaScript
class InvoiceGenerator {
    constructor() {
        this.currentInvoiceNumber = this.getNextInvoiceNumber();
        this.itemCounter = 1;
        this.companyState = '29'; // Karnataka
        
        this.init();
    }
    
    init() {
        this.setCurrentDate();
        this.updateInvoiceNumber();
        this.attachEventListeners();
        this.loadSavedData();
    }
    
    setCurrentDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('invoiceDate').value = today;
        document.getElementById('supplyDate').value = today;
    }
    
    getNextInvoiceNumber() {
        const savedNumber = localStorage.getItem('hmcLastInvoiceNumber');
        return savedNumber ? parseInt(savedNumber) + 1 : 1001;
    }
    
    updateInvoiceNumber() {
        document.getElementById('invoiceNumber').value = `HMC-${this.currentInvoiceNumber}`;
    }
    
    attachEventListeners() {
        // Item calculation listeners - using event delegation for dynamic rows
        document.addEventListener('input', (e) => {
            if (e.target.matches('.item-quantity, .item-rate, .item-tax')) {
                this.calculateItemAmount(e.target);
                this.calculateTotals();
            }
        });
        
        // Customer state change listener
        const customerStateSelect = document.getElementById('customerState');
        if (customerStateSelect) {
            customerStateSelect.addEventListener('change', () => {
                this.calculateTotals();
            });
        }
        
        // Auto-save on input changes
        document.addEventListener('input', this.debounce(() => {
            this.autoSave();
        }, 1000));
        
        // Form validation listeners
        document.addEventListener('blur', (e) => {
            if (e.target.hasAttribute('required')) {
                this.validateField(e.target);
            }
        }, true);
    }
    
    validateField(field) {
        if (field.value.trim() === '') {
            field.style.borderColor = '#DC2626';
        } else {
            field.style.borderColor = '';
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
        
        // Update row numbers for all rows
        this.updateRowNumbers();
    }
    
    createItemRow(rowNumber) {
        const row = document.createElement('tr');
        row.className = 'item-row';
        row.setAttribute('data-row', rowNumber);
        
        row.innerHTML = `
            <td class="serial-number">${rowNumber}</td>
            <td>
                <input type="text" class="form-control item-description" placeholder="Enter item description" value="">
            </td>
            <td>
                <select class="form-control item-hsn">
                    <option value="">Select HSN</option>
                    <option value="0910.11">0910.11 - Ginger (Fresh)</option>
                    <option value="0910.12">0910.12 - Ginger (Processed)</option>
                    <option value="2008.99">2008.99 - Preserved Fruits</option>
                    <option value="0910">0910 - Spices</option>
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
                <input type="number" class="form-control item-quantity" min="0" step="0.01" placeholder="0" value="">
            </td>
            <td>
                <input type="number" class="form-control item-rate" min="0" step="0.01" placeholder="0.00" value="">
            </td>
            <td class="item-amount">₹0.00</td>
            <td>
                <button type="button" class="btn-remove" onclick="removeItem(${rowNumber})">🗑️</button>
            </td>
        `;
        
        return row;
    }
    
    updateRowNumbers() {
        const rows = document.querySelectorAll('.item-row');
        rows.forEach((row, index) => {
            const newRowNumber = index + 1;
            row.setAttribute('data-row', newRowNumber);
            row.querySelector('.serial-number').textContent = newRowNumber;
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
        
        const quantity = parseFloat(quantityInput.value) || 0;
        const rate = parseFloat(rateInput.value) || 0;
        const amount = quantity * rate;
        
        amountCell.textContent = `₹${amount.toFixed(2)}`;
        
        // Trigger total calculation
        setTimeout(() => this.calculateTotals(), 10);
    }
    
    calculateTotals() {
        const items = document.querySelectorAll('.item-row');
        let netAmount = 0;
        let totalCGST = 0;
        let totalSGST = 0;
        let totalIGST = 0;
        
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
                const taxAmount = (itemAmount * taxRate) / 100;
                
                if (isInterState) {
                    totalIGST += taxAmount;
                } else {
                    totalCGST += taxAmount / 2;
                    totalSGST += taxAmount / 2;
                }
            }
        });
        
        // Update display
        const netAmountElement = document.getElementById('netAmount');
        if (netAmountElement) {
            netAmountElement.textContent = `₹${netAmount.toFixed(2)}`;
        }
        
        // Show/hide tax rows based on transaction type
        const cgstRow = document.getElementById('cgstRow');
        const sgstRow = document.getElementById('sgstRow');
        const igstRow = document.getElementById('igstRow');
        
        if (isInterState && totalIGST > 0) {
            if (igstRow) igstRow.style.display = 'flex';
            if (cgstRow) cgstRow.style.display = 'none';
            if (sgstRow) sgstRow.style.display = 'none';
            
            const igstPercent = document.getElementById('igstPercent');
            const igstAmount = document.getElementById('igstAmount');
            if (igstPercent) igstPercent.textContent = this.getAverageTaxRate(items);
            if (igstAmount) igstAmount.textContent = `₹${totalIGST.toFixed(2)}`;
        } else if (!isInterState && (totalCGST > 0 || totalSGST > 0)) {
            if (cgstRow) cgstRow.style.display = 'flex';
            if (sgstRow) sgstRow.style.display = 'flex';
            if (igstRow) igstRow.style.display = 'none';
            
            const avgTaxRate = this.getAverageTaxRate(items) / 2;
            const cgstPercent = document.getElementById('cgstPercent');
            const sgstPercent = document.getElementById('sgstPercent');
            const cgstAmount = document.getElementById('cgstAmount');
            const sgstAmount = document.getElementById('sgstAmount');
            
            if (cgstPercent) cgstPercent.textContent = avgTaxRate.toFixed(1);
            if (sgstPercent) sgstPercent.textContent = avgTaxRate.toFixed(1);
            if (cgstAmount) cgstAmount.textContent = `₹${totalCGST.toFixed(2)}`;
            if (sgstAmount) sgstAmount.textContent = `₹${totalSGST.toFixed(2)}`;
        } else {
            if (cgstRow) cgstRow.style.display = 'none';
            if (sgstRow) sgstRow.style.display = 'none';
            if (igstRow) igstRow.style.display = 'none';
        }
        
        const grandTotal = netAmount + totalCGST + totalSGST + totalIGST;
        const grandTotalElement = document.getElementById('grandTotal');
        if (grandTotalElement) {
            grandTotalElement.textContent = `₹${grandTotal.toFixed(2)}`;
        }
        
        // Update amount in words
        const amountInWordsElement = document.getElementById('amountInWords');
        if (amountInWordsElement) {
            amountInWordsElement.textContent = this.numberToWords(grandTotal);
        }
    }
    
    getAverageTaxRate(items) {
        let totalTaxRate = 0;
        let itemsWithTax = 0;
        
        items.forEach(item => {
            const quantityInput = item.querySelector('.item-quantity');
            const rateInput = item.querySelector('.item-rate');
            const taxSelect = item.querySelector('.item-tax');
            
            const quantity = parseFloat(quantityInput?.value) || 0;
            const rate = parseFloat(rateInput?.value) || 0;
            const taxRate = parseFloat(taxSelect?.value) || 0;
            
            if (quantity > 0 && rate > 0 && taxRate > 0) {
                totalTaxRate += taxRate;
                itemsWithTax++;
            }
        });
        
        return itemsWithTax > 0 ? totalTaxRate / itemsWithTax : 0;
    }
    
    numberToWords(amount) {
        if (amount === 0) return 'Zero Rupees Only';
        
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
        
        return result + ' Only';
    }
    
    validateForm() {
        const requiredFields = [
            { id: 'customerName', name: 'Customer Name' },
            { id: 'invoiceDate', name: 'Invoice Date' }
        ];
        
        const errors = [];
        
        requiredFields.forEach(field => {
            const element = document.getElementById(field.id);
            if (!element || !element.value.trim()) {
                errors.push(field.name);
                if (element) element.style.borderColor = '#DC2626';
            } else {
                element.style.borderColor = '';
            }
        });
        
        // Check if at least one item exists with quantity and rate
        const items = document.querySelectorAll('.item-row');
        let validItems = 0;
        
        items.forEach(item => {
            const quantityInput = item.querySelector('.item-quantity');
            const rateInput = item.querySelector('.item-rate');
            const quantity = parseFloat(quantityInput?.value) || 0;
            const rate = parseFloat(rateInput?.value) || 0;
            if (quantity > 0 && rate > 0) validItems++;
        });
        
        if (validItems === 0) {
            errors.push('At least one item with quantity and rate');
        }
        
        if (errors.length > 0) {
            alert('Please fill in the following required fields:\n• ' + errors.join('\n• '));
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
            
            const description = descInput?.value || '';
            const hsn = hsnSelect?.value || '';
            const quantity = parseFloat(quantityInput?.value) || 0;
            const rate = parseFloat(rateInput?.value) || 0;
            const tax = parseFloat(taxSelect?.value) || 0;
            
            if (description || quantity > 0 || rate > 0) {
                items.push({ description, hsn, quantity, rate, tax, amount: quantity * rate });
            }
        });
        
        const getElementValue = (id) => {
            const element = document.getElementById(id);
            return element ? element.value : '';
        };
        
        const getElementText = (id) => {
            const element = document.getElementById(id);
            return element ? element.textContent : '';
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
            netAmount: getElementText('netAmount'),
            grandTotal: getElementText('grandTotal'),
            amountInWords: getElementText('amountInWords')
        };
    }
    
    saveInvoice() {
        if (!this.validateForm()) return;
        
        const invoiceData = this.collectInvoiceData();
        const invoiceKey = `invoice_${invoiceData.invoiceNumber}`;
        
        try {
            localStorage.setItem(invoiceKey, JSON.stringify(invoiceData));
            localStorage.setItem('hmcLastInvoiceNumber', this.currentInvoiceNumber.toString());
            
            this.showSuccessMessage('Invoice saved successfully!');
            
            // Increment invoice number for next invoice
            this.currentInvoiceNumber++;
            this.updateInvoiceNumber();
            
        } catch (error) {
            alert('Error saving invoice. Please try again.');
            console.error('Save error:', error);
        }
    }
    
    autoSave() {
        const customerNameInput = document.getElementById('customerName');
        if (customerNameInput && customerNameInput.value.trim()) {
            const invoiceData = this.collectInvoiceData();
            try {
                localStorage.setItem('hmcDraftInvoice', JSON.stringify(invoiceData));
            } catch (error) {
                console.error('Auto-save error:', error);
            }
        }
    }
    
    loadSavedData() {
        try {
            const draftData = localStorage.getItem('hmcDraftInvoice');
            if (draftData) {
                const data = JSON.parse(draftData);
                this.populateForm(data);
            }
        } catch (error) {
            console.error('Error loading draft:', error);
        }
    }
    
    populateForm(data) {
        const setElementValue = (id, value) => {
            const element = document.getElementById(id);
            if (element && value) element.value = value;
        };
        
        // Don't populate invoice number and dates for drafts
        setElementValue('customerName', data.customerName);
        setElementValue('customerAddress', data.customerAddress);
        setElementValue('customerGSTIN', data.customerGSTIN);
        setElementValue('customerState', data.customerState);
        setElementValue('transportMode', data.transportMode);
        setElementValue('vehicleNumber', data.vehicleNumber);
        setElementValue('placeOfSupply', data.placeOfSupply);
        setElementValue('eWayBill', data.eWayBill);
        
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
                this.calculateTotals();
            }
        }
    }
    
    resetForm() {
        if (confirm('Are you sure you want to reset the form? All data will be lost.')) {
            // Clear localStorage draft
            localStorage.removeItem('hmcDraftInvoice');
            location.reload();
        }
    }
    
    printInvoice() {
        if (!this.validateForm()) return;
        
        // Hide action buttons and remove buttons before printing
        const actionBar = document.querySelector('.action-bar');
        const removeButtons = document.querySelectorAll('.btn-remove');
        
        if (actionBar) actionBar.style.display = 'none';
        removeButtons.forEach(btn => btn.style.display = 'none');
        
        window.print();
        
        // Restore buttons after printing
        setTimeout(() => {
            if (actionBar) actionBar.style.display = 'block';
            removeButtons.forEach(btn => btn.style.display = 'block');
        }, 1000);
    }
    
    async generatePDF() {
        if (!this.validateForm()) return;
        
        if (!window.jspdf || !window.html2canvas) {
            alert('PDF generation libraries are not loaded. Please refresh the page and try again.');
            return;
        }
        
        try {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            // Hide action elements
            const actionBar = document.querySelector('.action-bar');
            const removeButtons = document.querySelectorAll('.btn-remove');
            
            if (actionBar) actionBar.style.display = 'none';
            removeButtons.forEach(btn => btn.style.display = 'none');
            
            // Generate PDF from HTML
            const invoiceElement = document.getElementById('invoiceContainer');
            
            if (!invoiceElement) {
                throw new Error('Invoice container not found');
            }
            
            const canvas = await html2canvas(invoiceElement, {
                scale: 2,
                useCORS: true,
                logging: false,
                width: invoiceElement.offsetWidth,
                height: invoiceElement.offsetHeight
            });
            
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            
            let position = 0;
            
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            
            // Save PDF
            const invoiceNumberElement = document.getElementById('invoiceNumber');
            const invoiceNumber = invoiceNumberElement ? invoiceNumberElement.value : 'Invoice';
            const fileName = `${invoiceNumber}.pdf`;
            pdf.save(fileName);
            
            // Restore elements
            if (actionBar) actionBar.style.display = 'block';
            removeButtons.forEach(btn => btn.style.display = 'block');
            
            this.showSuccessMessage('PDF generated successfully!');
            
        } catch (error) {
            alert('Error generating PDF. Please try again.');
            console.error('PDF generation error:', error);
            
            // Restore elements on error
            const actionBar = document.querySelector('.action-bar');
            const removeButtons = document.querySelectorAll('.btn-remove');
            if (actionBar) actionBar.style.display = 'block';
            removeButtons.forEach(btn => btn.style.display = 'block');
        }
    }
    
    showSuccessMessage(message) {
        const messageElement = document.getElementById('successMessage');
        if (messageElement) {
            const alertText = messageElement.querySelector('.alert-text');
            if (alertText) alertText.textContent = message;
            messageElement.classList.remove('hidden');
            
            setTimeout(() => {
                messageElement.classList.add('hidden');
            }, 3000);
        }
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
    if (row) {
        row.remove();
        
        if (window.invoiceGenerator) {
            window.invoiceGenerator.updateRowNumbers();
            window.invoiceGenerator.calculateTotals();
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

// Initialize the invoice generator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.invoiceGenerator = new InvoiceGenerator();
});