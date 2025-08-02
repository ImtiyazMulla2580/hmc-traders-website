// H.M.C. Traders AI Business Management Dashboard - Fixed Version
class HMCDashboard {
    constructor() {
        this.currentTab = 'dashboard';
        this.charts = {};
        this.businessData = {
            company_info: {
                name: "H.M.C. TRADERS",
                tagline: "Fresh Ginger & Dry Ginger Merchants",
                contacts: {
                    sadiq: "+9740459661",
                    munavar: "+9912200610"
                },
                email: "sadiqhmc83@gmail.com",
                address: "Annavatti to Shivamogga Main Road, CHIKKAIDAGODU-577413 Soraba Tq",
                established: "2018",
                specialization: "Ginger Processing and Trading"
            },
            business_metrics: {
                daily_processing_capacity: "5000 kg",
                monthly_revenue: "₹8,50,000",
                active_customers: 45,
                supplier_network: 12,
                processing_efficiency: "92%",
                quality_rating: "4.8/5.0"
            },
            inventory_data: {
                fresh_ginger_stock: "15,000 kg",
                dry_ginger_stock: "3,500 kg",
                ginger_powder_stock: "850 kg",
                pending_orders: 23,
                low_stock_alerts: 2
            },
            processing_data: {
                current_batch: "GNG-2025-0142",
                processing_stage: "Drying - 78% complete",
                equipment_status: {
                    washing_line: "Operational",
                    drying_chambers: "Running",
                    grinding_units: "Maintenance",
                    packaging_line: "Operational"
                },
                quality_metrics: {
                    moisture_content: "8.2%",
                    oil_content: "2.4%",
                    grade_a_percentage: "89%"
                }
            },
            market_data: {
                fresh_ginger_price: "₹85/kg",
                dry_ginger_price: "₹420/kg",
                price_trend: "Increasing (+12% this month)",
                demand_forecast: "High demand expected",
                export_opportunities: 3
            },
            ai_insights: [
                "Processing efficiency increased by 8% compared to last month",
                "Recommend increasing dry ginger production by 15% based on market demand",
                "Optimal harvesting time for supplier contracts: Next 10-15 days",
                "Quality control showing consistent improvement in Grade A products",
                "Export opportunity to UAE markets showing 23% profit margin potential"
            ],
            recent_activities: [
                {
                    time: "2 hours ago",
                    activity: "Completed batch GNG-2025-0141 - 2,200kg processed",
                    status: "success"
                },
                {
                    time: "5 hours ago", 
                    activity: "New order received from Chennai - 500kg dry ginger",
                    status: "pending"
                },
                {
                    time: "1 day ago",
                    activity: "Equipment maintenance completed on grinding unit #2",
                    status: "completed"
                }
            ],
            customers: [
                {name: "Spice World Ltd", location: "Chennai", orders: 12, value: "₹2,40,000"},
                {name: "Organic Foods Co", location: "Bangalore", orders: 8, value: "₹1,85,000"},
                {name: "Export House India", location: "Mumbai", orders: 15, value: "₹3,20,000"}
            ],
            suppliers: [
                {name: "Karnataka Ginger Farmers", location: "Sirsi", quality: "Premium", reliability: "95%"},
                {name: "Western Ghats Produce", location: "Shimoga", quality: "Standard", reliability: "88%"},
                {name: "Organic Ginger Coop", location: "Kodagu", quality: "Organic", reliability: "92%"}
            ]
        };
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupApplication();
            });
        } else {
            this.setupApplication();
        }
    }
    
    setupApplication() {
        this.setupEventListeners();
        this.initializeCharts();
        this.populateData();
        this.startRealTimeUpdates();
        this.initAIChat();
        
        console.log('H.M.C. Traders Dashboard initialized successfully');
    }
    
    setupEventListeners() {
        // Tab navigation with error handling
        const navTabs = document.querySelectorAll('.nav-tab');
        console.log('Found nav tabs:', navTabs.length);
        
        navTabs.forEach((tab, index) => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const tabId = e.currentTarget.dataset.tab;
                console.log('Clicked tab:', tabId);
                
                if (tabId) {
                    this.switchTab(tabId);
                } else {
                    console.error('Tab ID not found for tab:', index);
                }
            });
            
            // Add hover effects
            tab.addEventListener('mouseenter', () => {
                if (!tab.classList.contains('active')) {
                    tab.style.backgroundColor = 'var(--color-bg-2)';
                }
            });
            
            tab.addEventListener('mouseleave', () => {
                if (!tab.classList.contains('active')) {
                    tab.style.backgroundColor = '';
                }
            });
        });
        
        // AI Chat with detailed error handling
        this.setupChatListeners();
        
        // Button interactions
        this.setupButtonListeners();
    }
    
    setupChatListeners() {
        const chatToggle = document.getElementById('chatToggle');
        const chatClose = document.getElementById('chatClose');
        const chatSend = document.getElementById('chatSend');
        const chatInput = document.getElementById('chatInput');
        
        console.log('Chat elements:', { chatToggle: !!chatToggle, chatClose: !!chatClose, chatSend: !!chatSend, chatInput: !!chatInput });
        
        if (chatToggle) {
            chatToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Chat toggle clicked');
                this.toggleChat();
            });
        }
        
        if (chatClose) {
            chatClose.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Chat close clicked');
                this.closeChat();
            });
        }
        
        if (chatSend) {
            chatSend.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Chat send clicked');
                this.sendChatMessage();
            });
        }
        
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    console.log('Enter pressed in chat');
                    this.sendChatMessage();
                }
            });
        }
    }
    
    setupButtonListeners() {
        // Add click handlers for all buttons
        document.querySelectorAll('.btn').forEach(button => {
            if (!button.hasAttribute('data-listener-added')) {
                button.addEventListener('click', (e) => {
                    const buttonText = button.textContent.trim();
                    console.log('Button clicked:', buttonText);
                    
                    // Provide visual feedback
                    button.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        button.style.transform = '';
                    }, 150);
                    
                    // Handle specific buttons
                    if (buttonText.includes('View All Orders')) {
                        this.showNotification('Orders panel would open here', 'info');
                    } else if (buttonText.includes('Explore')) {
                        this.showNotification('Export opportunity details would open here', 'info');
                    } else if (buttonText.includes('Download')) {
                        this.showNotification('Report download started', 'success');
                    }
                });
                
                button.setAttribute('data-listener-added', 'true');
            }
        });
    }
    
    switchTab(tabId) {
        console.log('Switching to tab:', tabId);
        
        try {
            // Update active tab with error checking
            const navTabs = document.querySelectorAll('.nav-tab');
            navTabs.forEach(tab => {
                tab.classList.remove('active');
                tab.style.backgroundColor = '';
            });
            
            const activeTab = document.querySelector(`[data-tab="${tabId}"]`);
            if (activeTab) {
                activeTab.classList.add('active');
                console.log('Activated tab:', tabId);
            } else {
                console.error('Tab not found:', tabId);
                return;
            }
            
            // Update content with error checking
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });
            
            const activeContent = document.getElementById(tabId);
            if (activeContent) {
                activeContent.classList.add('active');
                activeContent.style.display = 'block';
                console.log('Activated content for:', tabId);
            } else {
                console.error('Tab content not found:', tabId);
                return;
            }
            
            this.currentTab = tabId;
            
            // Refresh charts after tab switch
            setTimeout(() => {
                this.refreshChartsForTab(tabId);
            }, 100);
            
            // Show notification
            this.showNotification(`Switched to ${tabId.charAt(0).toUpperCase() + tabId.slice(1)} tab`, 'success');
            
        } catch (error) {
            console.error('Error switching tabs:', error);
            this.showNotification('Error switching tabs', 'error');
        }
    }
    
    refreshChartsForTab(tabId) {
        try {
            Object.values(this.charts).forEach(chart => {
                if (chart && typeof chart.resize === 'function') {
                    chart.resize();
                }
            });
            
            // Initialize tab-specific charts if needed
            if (tabId === 'processing' && !this.charts.quality) {
                this.createQualityChart();
            } else if (tabId === 'inventory' && !this.charts.inventory) {
                this.createInventoryChart();
            } else if (tabId === 'insights' && !this.charts.prediction) {
                this.createPredictionChart();
            }
        } catch (error) {
            console.error('Error refreshing charts:', error);
        }
    }
    
    initializeCharts() {
        try {
            // Revenue Chart
            this.createRevenueChart();
            
            // Processing Chart  
            this.createProcessingChart();
            
            console.log('Initial charts created successfully');
        } catch (error) {
            console.error('Error initializing charts:', error);
        }
    }
    
    createRevenueChart() {
        const ctx = document.getElementById('revenueChart');
        if (!ctx) {
            console.warn('Revenue chart canvas not found');
            return;
        }
        
        try {
            const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'];
            
            this.charts.revenue = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Revenue (₹)',
                        data: [650000, 720000, 680000, 780000, 820000, 850000],
                        borderColor: chartColors[0],
                        backgroundColor: chartColors[0] + '20',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            ticks: {
                                callback: function(value) {
                                    return '₹' + (value / 100000).toFixed(1) + 'L';
                                }
                            }
                        }
                    }
                }
            });
            
            console.log('Revenue chart created successfully');
        } catch (error) {
            console.error('Error creating revenue chart:', error);
        }
    }
    
    createProcessingChart() {
        const ctx = document.getElementById('processingChart');
        if (!ctx) {
            console.warn('Processing chart canvas not found');
            return;
        }
        
        try {
            const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'];
            
            this.charts.processing = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Fresh Ginger', 'Dry Ginger', 'Ginger Powder', 'Processing'],
                    datasets: [{
                        data: [45, 30, 15, 10],
                        backgroundColor: chartColors,
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
            
            console.log('Processing chart created successfully');
        } catch (error) {
            console.error('Error creating processing chart:', error);
        }
    }
    
    createQualityChart() {
        const ctx = document.getElementById('qualityChart');
        if (!ctx) {
            console.warn('Quality chart canvas not found');
            return;
        }
        
        try {
            const chartColors = ['#1FB8CD', '#FFC185', '#B4413C'];
            
            this.charts.quality = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Grade A', 'Grade B', 'Grade C'],
                    datasets: [{
                        label: 'Quality Distribution (%)',
                        data: [89, 8, 3],
                        backgroundColor: chartColors,
                        borderRadius: 8,
                        borderSkipped: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });
            
            console.log('Quality chart created successfully');
        } catch (error) {
            console.error('Error creating quality chart:', error);
        }
    }
    
    createInventoryChart() {
        const ctx = document.getElementById('inventoryChart');
        if (!ctx) {
            console.warn('Inventory chart canvas not found');
            return;
        }
        
        try {
            const chartColors = ['#1FB8CD', '#FFC185', '#B4413C'];
            
            this.charts.inventory = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Fresh Ginger', 'Dry Ginger', 'Ginger Powder'],
                    datasets: [{
                        data: [15000, 3500, 850],
                        backgroundColor: chartColors,
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.parsed + ' kg';
                                }
                            }
                        }
                    }
                }
            });
            
            console.log('Inventory chart created successfully');
        } catch (error) {
            console.error('Error creating inventory chart:', error);
        }
    }
    
    createPredictionChart() {
        const ctx = document.getElementById('predictionChart');
        if (!ctx) {
            console.warn('Prediction chart canvas not found');
            return;
        }
        
        try {
            const chartColors = ['#1FB8CD', '#FFC185'];
            
            this.charts.prediction = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Current', 'Month 1', 'Month 2', 'Month 3'],
                    datasets: [
                        {
                            label: 'Fresh Ginger Price',
                            data: [85, 88, 92, 95],
                            borderColor: chartColors[0],
                            backgroundColor: chartColors[0] + '20',
                            fill: false,
                            tension: 0.4
                        },
                        {
                            label: 'Dry Ginger Price',
                            data: [420, 435, 450, 465],
                            borderColor: chartColors[1],
                            backgroundColor: chartColors[1] + '20',
                            fill: false,
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            ticks: {
                                callback: function(value) {
                                    return '₹' + value;
                                }
                            }
                        }
                    }
                }
            });
            
            console.log('Prediction chart created successfully');
        } catch (error) {
            console.error('Error creating prediction chart:', error);
        }
    }
    
    populateData() {
        try {
            this.populateActivities();
            this.populateRecommendations();
            this.populateCustomers();
            this.populateSuppliers();
            this.populateInsights();
            console.log('Data populated successfully');
        } catch (error) {
            console.error('Error populating data:', error);
        }
    }
    
    populateActivities() {
        const activityList = document.getElementById('activityList');
        if (!activityList) return;
        
        activityList.innerHTML = '';
        
        this.businessData.recent_activities.forEach(activity => {
            const activityElement = document.createElement('div');
            activityElement.className = 'activity-item';
            
            activityElement.innerHTML = `
                <div class="activity-status ${activity.status}"></div>
                <div class="activity-content">
                    <h4 class="activity-title">${activity.activity}</h4>
                    <span class="activity-time">${activity.time}</span>
                </div>
            `;
            
            activityList.appendChild(activityElement);
        });
    }
    
    populateRecommendations() {
        const recommendationList = document.getElementById('recommendationList');
        if (!recommendationList) return;
        
        recommendationList.innerHTML = '';
        
        this.businessData.ai_insights.slice(0, 3).forEach(insight => {
            const recommendationElement = document.createElement('div');
            recommendationElement.className = 'recommendation-item';
            
            recommendationElement.innerHTML = `<p>${insight}</p>`;
            
            recommendationList.appendChild(recommendationElement);
        });
    }
    
    populateCustomers() {
        const customerList = document.getElementById('customerList');
        if (!customerList) return;
        
        customerList.innerHTML = '';
        
        this.businessData.customers.forEach(customer => {
            const customerElement = document.createElement('div');
            customerElement.className = 'customer-item';
            
            customerElement.innerHTML = `
                <div class="customer-info">
                    <h4 class="customer-name">${customer.name}</h4>
                    <p class="customer-location">${customer.location}</p>
                </div>
                <div class="customer-value">${customer.value}</div>
            `;
            
            customerList.appendChild(customerElement);
        });
    }
    
    populateSuppliers() {
        const supplierList = document.getElementById('supplierList');
        if (!supplierList) return;
        
        supplierList.innerHTML = '';
        
        this.businessData.suppliers.forEach(supplier => {
            const supplierElement = document.createElement('div');
            supplierElement.className = 'supplier-item';
            
            supplierElement.innerHTML = `
                <div class="supplier-info">
                    <h4 class="supplier-name">${supplier.name}</h4>
                    <p class="supplier-location">${supplier.location} - ${supplier.quality}</p>
                </div>
                <div class="supplier-reliability">${supplier.reliability}</div>
            `;
            
            supplierList.appendChild(supplierElement);
        });
    }
    
    populateInsights() {
        const insightsList = document.getElementById('insightsList');
        if (!insightsList) return;
        
        insightsList.innerHTML = '';
        
        this.businessData.ai_insights.forEach(insight => {
            const insightElement = document.createElement('div');
            insightElement.className = 'insight-item';
            
            insightElement.innerHTML = `<p>${insight}</p>`;
            
            insightsList.appendChild(insightElement);
        });
    }
    
    startRealTimeUpdates() {
        // Simulate real-time updates every 30 seconds
        setInterval(() => {
            this.updateRandomMetrics();
        }, 30000);
        
        // Animate progress bars and counters on load
        setTimeout(() => {
            this.animateProgressBars();
            this.animateCounters();
        }, 1000);
    }
    
    updateRandomMetrics() {
        try {
            // Simulate small changes in metrics for real-time feel
            const batch78 = document.querySelector('.progress-fill');
            if (batch78) {
                const currentWidth = parseInt(batch78.style.width) || 78;
                const newWidth = Math.min(100, currentWidth + Math.random() * 2);
                batch78.style.width = newWidth + '%';
                
                const progressText = batch78.parentNode.nextElementSibling;
                if (progressText) {
                    progressText.textContent = `Drying - ${Math.round(newWidth)}% Complete`;
                }
            }
            
            // Update AI indicator pulse
            this.pulseAIIndicator();
        } catch (error) {
            console.error('Error updating metrics:', error);
        }
    }
    
    animateProgressBars() {
        document.querySelectorAll('.progress-fill, .benchmark-fill').forEach(bar => {
            const targetWidth = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.transition = 'width 2s ease-out';
                bar.style.width = targetWidth;
            }, 500);
        });
    }
    
    animateCounters() {
        document.querySelectorAll('.kpi-value').forEach(counter => {
            const target = counter.textContent;
            const numericValue = parseInt(target.replace(/[^\d]/g, ''));
            
            if (numericValue) {
                let current = 0;
                const increment = numericValue / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = target.replace(numericValue.toString(), Math.round(current).toString());
                    }
                }, 50);
            }
        });
    }
    
    pulseAIIndicator() {
        const aiPulse = document.querySelector('.ai-pulse');
        if (aiPulse) {
            aiPulse.style.animation = 'none';
            setTimeout(() => {
                aiPulse.style.animation = 'pulse 2s infinite';
            }, 10);
        }
    }
    
    initAIChat() {
        this.chatMessages = [
            {
                type: 'ai',
                message: "Hello! I'm your AI assistant. I can help you with business insights, processing optimization, and market analysis. How can I assist you today?"
            }
        ];
        
        this.aiResponses = [
            "Based on current market trends, I recommend increasing dry ginger production by 15%.",
            "Your processing efficiency has improved by 8% this month. Great job!",
            "The UAE export opportunity shows excellent potential with 23% profit margins.",
            "Quality metrics are consistently improving. Grade A production is at 89%.",
            "Current inventory levels suggest restocking fresh ginger within 2 weeks.",
            "Weather patterns indicate optimal harvesting conditions in the next 10-15 days.",
            "Customer satisfaction is at 4.8/5.0 - excellent performance!",
            "Equipment maintenance schedule suggests checking grinding unit #3 soon.",
            "Market prices are trending upward - good time for sales!",
            "Your supplier network reliability average is 91.6% - very stable."
        ];
    }
    
    toggleChat() {
        const chatPanel = document.getElementById('chatPanel');
        if (chatPanel) {
            const isHidden = chatPanel.classList.contains('hidden');
            if (isHidden) {
                chatPanel.classList.remove('hidden');
                this.showNotification('AI Assistant activated', 'info');
            } else {
                chatPanel.classList.add('hidden');
            }
            console.log('Chat toggled, hidden:', !isHidden);
        }
    }
    
    closeChat() {
        const chatPanel = document.getElementById('chatPanel');
        if (chatPanel) {
            chatPanel.classList.add('hidden');
            console.log('Chat closed');
        }
    }
    
    sendChatMessage() {
        const chatInput = document.getElementById('chatInput');
        const chatMessages = document.getElementById('chatMessages');
        
        if (!chatInput || !chatMessages) return;
        
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        this.addChatMessage('user', message);
        chatInput.value = '';
        
        // Simulate AI thinking
        setTimeout(() => {
            const aiResponse = this.generateAIResponse(message);
            this.addChatMessage('ai', aiResponse);
        }, 1000);
    }
    
    addChatMessage(type, message) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${type}`;
        
        messageElement.innerHTML = `
            <div class="message-content">${message}</div>
        `;
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    generateAIResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Simple keyword-based responses
        if (message.includes('revenue') || message.includes('sales')) {
            return "Current monthly revenue is ₹8,50,000, up 12% from last month. The ginger market is showing strong growth trends.";
        } else if (message.includes('inventory') || message.includes('stock')) {
            return "Current inventory: Fresh Ginger - 15,000kg, Dry Ginger - 3,500kg, Ginger Powder - 850kg. Recommendation: Restock fresh ginger soon.";
        } else if (message.includes('quality') || message.includes('grade')) {
            return "Quality metrics are excellent! Grade A production at 89%, moisture content at 8.2%, oil content at 2.4%. Quality rating: 4.8/5.0.";
        } else if (message.includes('processing') || message.includes('production')) {
            return "Current processing efficiency: 92%. Batch GNG-2025-0142 is 78% complete in drying stage. All equipment operational except grinding unit in maintenance.";
        } else if (message.includes('export') || message.includes('international')) {
            return "Great export opportunity to UAE markets with 23% profit margin potential. High demand for organic ginger products globally.";
        } else if (message.includes('price') || message.includes('market')) {
            return "Current prices: Fresh Ginger ₹85/kg (+8.5%), Dry Ginger ₹420/kg (+12.3%). Market trend: Increasing demand expected.";
        } else {
            // Random AI response
            return this.aiResponses[Math.floor(Math.random() * this.aiResponses.length)];
        }
    }
    
    // Add notification system
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✅' : type === 'warning' ? '⚠️' : type === 'error' ? '❌' : 'ℹ️'}</span>
                <span class="notification-message">${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.opacity = '0';
                setTimeout(() => {
                    if (notification.parentNode) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing dashboard...');
    
    window.hmcDashboard = new HMCDashboard();
    
    // Add some welcome notifications
    setTimeout(() => {
        if (window.hmcDashboard) {
            window.hmcDashboard.showNotification('Welcome to H.M.C. Traders AI Dashboard!', 'success');
            
            setTimeout(() => {
                window.hmcDashboard.showNotification('AI systems are online and monitoring your business metrics.', 'info');
            }, 2000);
            
            setTimeout(() => {
                window.hmcDashboard.showNotification('New export opportunity detected in UAE markets!', 'warning');
            }, 4000);
        }
    }, 1000);
});

// Add notification styles dynamically
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-surface);
        border-radius: var(--radius-lg);
        padding: var(--space-16);
        box-shadow: var(--shadow-lg);
        border-left: 4px solid var(--color-primary);
        z-index: 1001;
        min-width: 300px;
        transform: translateX(100%);
        opacity: 0;
        animation: slideInNotification 0.3s ease-out forwards;
    }
    
    .notification.success {
        border-left-color: var(--color-success);
    }
    
    .notification.warning {
        border-left-color: var(--color-warning);
    }
    
    .notification.error {
        border-left-color: var(--color-error);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: var(--space-12);
    }
    
    .notification-icon {
        font-size: var(--font-size-lg);
    }
    
    .notification-message {
        flex: 1;
        font-size: var(--font-size-sm);
        color: var(--color-text);
        line-height: 1.4;
    }
    
    @keyframes slideInNotification {
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

document.head.appendChild(notificationStyles);