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
        this.attachEventListeners();
        this.loadSavedData();
        this.updateInvoiceNumber();
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
        // Item calculation listeners
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('item-quantity') || 
                e.target.classList.contains('item-rate') ||
                e.target.classList.contains('item-tax')) {
                this.calculateItemAmount(e.target);
                this.calculateTotals();
            }
        });
        
        // Customer state change listener
        document.getElementById('customerState').addEventListener('change', () => {
            this.calculateTotals();
        });
        
        // Auto-save on input changes
        document.addEventListener('input', this.debounce(() => {
            this.autoSave();
        }, 1000));
    }
    
    addNewItem() {
        this.itemCounter++;
        const tbody = document.getElementById('itemsTableBody');
        const newRow = this.createItemRow(this.itemCounter);
        tbody.appendChild(newRow);
        
        // Focus on the new item description
        const newDescInput = newRow.querySelector('.item-description');
        newDescInput.focus();
    }
    
    createItemRow(rowNumber) {
        const row = document.createElement('tr');
        row.className = 'item-row';
        row.setAttribute('data-row', rowNumber);
        
        row.innerHTML = `
            <td class="serial-number">${rowNumber}</td>
            <td>
                <input type="text" class="form-control item-description" placeholder="Enter item description">
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
                <input type="number" class="form-control item-quantity" min="0" step="0.01" placeholder="0">
            </td>
            <td>
                <input type="number" class="form-control item-rate" min="0" step="0.01" placeholder="0.00">
            </td>
            <td class="item-amount">₹0.00</td>
            <td>
                <button class="btn-remove" onclick="removeItem(${rowNumber})">🗑️</button>
            </td>
        `;
        
        return row;
    }
    
    calculateItemAmount(changedElement) {
        const row = changedElement.closest('.item-row');
        const quantity = parseFloat(row.querySelector('.item-quantity').value) || 0;
        const rate = parseFloat(row.querySelector('.item-rate').value) || 0;
        const amount = quantity * rate;
        
        row.querySelector('.item-amount').textContent = `₹${amount.toFixed(2)}`;
    }
    
    calculateTotals() {
        const items = document.querySelectorAll('.item-row');
        let netAmount = 0;
        let totalCGST = 0;
        let totalSGST = 0;
        let totalIGST = 0;
        
        const customerState = document.getElementById('customerState').value;
        const isInterState = customerState && customerState !== this.companyState;
        
        items.forEach(item => {
            const quantity = parseFloat(item.querySelector('.item-quantity').value) || 0;
            const rate = parseFloat(item.querySelector('.item-rate').value) || 0;
            const taxRate = parseFloat(item.querySelector('.item-tax').value) || 0;
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
        document.getElementById('netAmount').textContent = `₹${netAmount.toFixed(2)}`;
        
        // Show/hide tax rows based on transaction type
        const cgstRow = document.getElementById('cgstRow');
        const sgstRow = document.getElementById('sgstRow');
        const igstRow = document.getElementById('igstRow');
        
        if (isInterState && totalIGST > 0) {
            igstRow.style.display = 'flex';
            cgstRow.style.display = 'none';
            sgstRow.style.display = 'none';
            
            document.getElementById('igstPercent').textContent = this.getAverageTaxRate(items);
            document.getElementById('igstAmount').textContent = `₹${totalIGST.toFixed(2)}`;
        } else if (!isInterState && (totalCGST > 0 || totalSGST > 0)) {
            cgstRow.style.display = 'flex';
            sgstRow.style.display = 'flex';
            igstRow.style.display = 'none';
            
            const avgTaxRate = this.getAverageTaxRate(items) / 2;
            document.getElementById('cgstPercent').textContent = avgTaxRate.toFixed(1);
            document.getElementById('sgstPercent').textContent = avgTaxRate.toFixed(1);
            document.getElementById('cgstAmount').textContent = `₹${totalCGST.toFixed(2)}`;
            document.getElementById('sgstAmount').textContent = `₹${totalSGST.toFixed(2)}`;
        } else {
            cgstRow.style.display = 'none';
            sgstRow.style.display = 'none';
            igstRow.style.display = 'none';
        }
        
        const grandTotal = netAmount + totalCGST + totalSGST + totalIGST;
        document.getElementById('grandTotal').textContent = `₹${grandTotal.toFixed(2)}`;
        
        // Update amount in words
        document.getElementById('amountInWords').textContent = this.numberToWords(grandTotal);
    }
    
    getAverageTaxRate(items) {
        let totalTaxRate = 0;
        let itemsWithTax = 0;
        
        items.forEach(item => {
            const quantity = parseFloat(item.querySelector('.item-quantity').value) || 0;
            const rate = parseFloat(item.querySelector('.item-rate').value) || 0;
            const taxRate = parseFloat(item.querySelector('.item-tax').value) || 0;
            
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
            if (!element.value.trim()) {
                errors.push(field.name);
                element.style.borderColor = '#DC2626';
            } else {
                element.style.borderColor = '';
            }
        });
        
        // Check if at least one item exists with quantity and rate
        const items = document.querySelectorAll('.item-row');
        let validItems = 0;
        
        items.forEach(item => {
            const quantity = parseFloat(item.querySelector('.item-quantity').value) || 0;
            const rate = parseFloat(item.querySelector('.item-rate').value) || 0;
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
        document.querySelectorAll('.item-row').forEach(row => {
            const description = row.querySelector('.item-description').value;
            const hsn = row.querySelector('.item-hsn').value;
            const quantity = parseFloat(row.querySelector('.item-quantity').value) || 0;
            const rate = parseFloat(row.querySelector('.item-rate').value) || 0;
            const tax = parseFloat(row.querySelector('.item-tax').value) || 0;
            
            if (description || quantity > 0 || rate > 0) {
                items.push({ description, hsn, quantity, rate, tax, amount: quantity * rate });
            }
        });
        
        return {
            invoiceNumber: document.getElementById('invoiceNumber').value,
            invoiceType: document.getElementById('invoiceType').value,
            invoiceDate: document.getElementById('invoiceDate').value,
            supplyDate: document.getElementById('supplyDate').value,
            transportMode: document.getElementById('transportMode').value,
            vehicleNumber: document.getElementById('vehicleNumber').value,
            placeOfSupply: document.getElementById('placeOfSupply').value,
            eWayBill: document.getElementById('eWayBill').value,
            customerName: document.getElementById('customerName').value,
            customerAddress: document.getElementById('customerAddress').value,
            customerGSTIN: document.getElementById('customerGSTIN').value,
            customerState: document.getElementById('customerState').value,
            items: items,
            netAmount: document.getElementById('netAmount').textContent,
            grandTotal: document.getElementById('grandTotal').textContent,
            amountInWords: document.getElementById('amountInWords').textContent
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
        if (document.getElementById('customerName').value.trim()) {
            const invoiceData = this.collectInvoiceData();
            localStorage.setItem('hmcDraftInvoice', JSON.stringify(invoiceData));
        }
    }
    
    loadSavedData() {
        const draftData = localStorage.getItem('hmcDraftInvoice');
        if (draftData) {
            try {
                const data = JSON.parse(draftData);
                this.populateForm(data);
            } catch (error) {
                console.error('Error loading draft:', error);
            }
        }
    }
    
    populateForm(data) {
        // Don't populate invoice number and dates for drafts
        if (data.customerName) document.getElementById('customerName').value = data.customerName;
        if (data.customerAddress) document.getElementById('customerAddress').value = data.customerAddress;
        if (data.customerGSTIN) document.getElementById('customerGSTIN').value = data.customerGSTIN;
        if (data.customerState) document.getElementById('customerState').value = data.customerState;
        if (data.transportMode) document.getElementById('transportMode').value = data.transportMode;
        if (data.vehicleNumber) document.getElementById('vehicleNumber').value = data.vehicleNumber;
        if (data.placeOfSupply) document.getElementById('placeOfSupply').value = data.placeOfSupply;
        if (data.eWayBill) document.getElementById('eWayBill').value = data.eWayBill;
        
        // Populate items
        if (data.items && data.items.length > 0) {
            const tbody = document.getElementById('itemsTableBody');
            tbody.innerHTML = ''; // Clear existing items
            
            data.items.forEach((item, index) => {
                const row = this.createItemRow(index + 1);
                row.querySelector('.item-description').value = item.description || '';
                row.querySelector('.item-hsn').value = item.hsn || '';
                row.querySelector('.item-quantity').value = item.quantity || '';
                row.querySelector('.item-rate').value = item.rate || '';
                row.querySelector('.item-tax').value = item.tax || '';
                tbody.appendChild(row);
            });
            
            this.itemCounter = data.items.length;
            this.calculateTotals();
        }
    }
    
    resetForm() {
        if (confirm('Are you sure you want to reset the form? All data will be lost.')) {
            location.reload();
        }
    }
    
    printInvoice() {
        if (!this.validateForm()) return;
        
        // Hide action buttons and remove buttons before printing
        const actionBar = document.querySelector('.action-bar');
        const removeButtons = document.querySelectorAll('.btn-remove');
        
        actionBar.style.display = 'none';
        removeButtons.forEach(btn => btn.style.display = 'none');
        
        window.print();
        
        // Restore buttons after printing
        setTimeout(() => {
            actionBar.style.display = 'block';
            removeButtons.forEach(btn => btn.style.display = 'block');
        }, 1000);
    }
    
    async generatePDF() {
        if (!this.validateForm()) return;
        
        try {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            // Hide action elements
            const actionBar = document.querySelector('.action-bar');
            const removeButtons = document.querySelectorAll('.btn-remove');
            
            actionBar.style.display = 'none';
            removeButtons.forEach(btn => btn.style.display = 'none');
            
            // Generate PDF from HTML
            const invoiceElement = document.getElementById('invoiceContainer');
            
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
            const fileName = `Invoice_${document.getElementById('invoiceNumber').value}.pdf`;
            pdf.save(fileName);
            
            // Restore elements
            actionBar.style.display = 'block';
            removeButtons.forEach(btn => btn.style.display = 'block');
            
            this.showSuccessMessage('PDF generated successfully!');
            
        } catch (error) {
            alert('Error generating PDF. Please try again.');
            console.error('PDF generation error:', error);
            
            // Restore elements on error
            document.querySelector('.action-bar').style.display = 'block';
            document.querySelectorAll('.btn-remove').forEach(btn => btn.style.display = 'block');
        }
    }
    
    showSuccessMessage(message) {
        const messageElement = document.getElementById('successMessage');
        messageElement.querySelector('.alert-text').textContent = message;
        messageElement.classList.remove('hidden');
        
        setTimeout(() => {
            messageElement.classList.add('hidden');
        }, 3000);
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
    invoiceGenerator.addNewItem();
}

function removeItem(rowNumber) {
    const row = document.querySelector(`[data-row="${rowNumber}"]`);
    if (row) {
        row.remove();
        invoiceGenerator.calculateTotals();
        
        // Update serial numbers
        const remainingRows = document.querySelectorAll('.item-row');
        remainingRows.forEach((row, index) => {
            row.querySelector('.serial-number').textContent = index + 1;
            row.setAttribute('data-row', index + 1);
            
            // Update remove button onclick
            const removeBtn = row.querySelector('.btn-remove');
            removeBtn.setAttribute('onclick', `removeItem(${index + 1})`);
        });
        
        invoiceGenerator.itemCounter = remainingRows.length;
    }
}

function saveInvoice() {
    invoiceGenerator.saveInvoice();
}

function printInvoice() {
    invoiceGenerator.printInvoice();
}

function generatePDF() {
    invoiceGenerator.generatePDF();
}

function resetForm() {
    invoiceGenerator.resetForm();
}

// Initialize the invoice generator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.invoiceGenerator = new InvoiceGenerator();
});
