// Reset all chat containers to initial state
function resetAllChatContainers() {
    console.log('Resetting all chat containers to initial state');
    
    // List of all chat containers with their reset elements
    const chatContainers = [
        {
            id: 'salesAssistantChat',
            thinkingId: 'aiThinking',
            responseId: 'assistantResponse',
            contentId: 'responseContent',
            feedbackId: 'feedbackButtons'
        },
        {
            id: 'messageAssistChat',
            thinkingId: 'messageAiThinking',
            responseId: 'messageAssistantResponse',
            contentId: 'messageResponseContent',
            feedbackId: 'messageFeedbackButtons'
        },
        {
            id: 'salesAssistantLeadsChat',
            thinkingId: 'salesLeadsAiThinking',
            responseId: 'salesLeadsAssistantResponse',
            contentId: 'salesLeadsResponseContent',
            feedbackId: 'salesLeadsFeedbackButtons'
        },
        {
            id: 'webinarToolsChat',
            thinkingId: 'webinarToolsAiThinking',
            responseId: 'webinarToolsAssistantResponse',
            contentId: 'webinarToolsResponseContent',
            feedbackId: 'webinarToolsFeedbackButtons'
        },
        {
            id: 'augustWebinarsChat',
            thinkingId: 'augustWebinarsAiThinking',
            responseId: 'augustWebinarsAssistantResponse',
            contentId: 'augustWebinarsResponseContent',
            feedbackId: 'augustWebinarsFeedbackButtons'
        },
        {
            id: 'accountIQChat',
            thinkingId: 'accountIQAiThinking',
            responseId: 'accountIQAssistantResponse',
            contentId: 'accountIQResponseContent',
            feedbackId: 'accountIQFeedbackButtons'
        }
    ];
    
    chatContainers.forEach(chat => {
        const thinkingElement = document.getElementById(chat.thinkingId);
        const responseElement = document.getElementById(chat.responseId);
        const contentElement = document.getElementById(chat.contentId);
        const feedbackElement = document.getElementById(chat.feedbackId);
        
        // Reset to initial state
        if (thinkingElement) {
            thinkingElement.style.display = 'none';
        }
        if (responseElement) {
            responseElement.style.display = 'none';
        }
        if (contentElement) {
            contentElement.innerHTML = '';
        }
        if (feedbackElement) {
            feedbackElement.style.display = 'none';
        }
    });
    
    // Reset icon chat containers (these use dynamic innerHTML)
    const iconChatContainers = ['salesAssistantIconChat', 'strategiesIconChat', 'innovationsIconChat'];
    iconChatContainers.forEach(chatId => {
        const chatElement = document.getElementById(chatId);
        if (chatElement) {
            chatElement.innerHTML = '';
        }
    });
    
    console.log('All chat containers reset to initial state');
}

// Helper function to hide all chat containers and show only one
function hideAllChatContainersExcept(activeContainerId) {
    console.log('Hiding all chat containers except:', activeContainerId);
    const allChatContainers = [
        'salesAssistantChat', 'messageAssistChat', 'salesAssistantLeadsChat', 
        'webinarToolsChat', 'augustWebinarsChat', 'accountIQChat', 'generalChat',
        'salesAssistantIconChat', 'strategiesIconChat', 'innovationsIconChat'
    ];
    
    allChatContainers.forEach(chatId => {
        const chatElement = document.getElementById(chatId);
        if (chatElement) {
            if (chatId === activeContainerId) {
                chatElement.style.display = 'block';
                console.log(`Showing chat container: ${chatId}`);
            } else {
                chatElement.style.display = 'none';
                console.log(`Hiding chat container: ${chatId}`);
            }
        }
    });
}

// Auto-scroll function for chat messages
function scrollChatToBottom() {
    console.log('scrollChatToBottom called');
    const scrollableContent = document.querySelector('.scrollable-content');
    console.log('scrollableContent element:', scrollableContent);
    if (scrollableContent) {
        console.log('Before scroll - scrollTop:', scrollableContent.scrollTop, 'scrollHeight:', scrollableContent.scrollHeight);
        // Force scroll to bottom immediately and with a small delay for DOM updates
        scrollableContent.scrollTop = scrollableContent.scrollHeight;
        console.log('After immediate scroll - scrollTop:', scrollableContent.scrollTop);
        setTimeout(() => {
            scrollableContent.scrollTop = scrollableContent.scrollHeight;
            console.log('After delayed scroll - scrollTop:', scrollableContent.scrollTop);
        }, 100);
    } else {
        console.log('scrollableContent not found!');
    }
}

// Configuration loading and management
let helpWidgetConfig = null;

async function loadConfiguration() {
    try {
        console.log('Loading help widget configuration...');
        const response = await fetch('./help-config.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        helpWidgetConfig = await response.json();
        console.log('Configuration loaded successfully:', helpWidgetConfig);
        console.log('Greeting from JSON:', helpWidgetConfig.greeting?.text);
        console.log('Recommendations count:', helpWidgetConfig.recommendations?.length);
        return helpWidgetConfig;
    } catch (error) {
        console.error('Failed to load configuration:', error);
        // Set fallback configuration
        helpWidgetConfig = {
            greeting: { text: "Hi Sam, you saved 15 leads last week. Here are 3 recommendations to boost productivity" },
            recommendations: [
                {
                    "id": "rec1",
                    "title": "Save time with Sales Assistant",
                    "description": "Automate lead delivery, identify best paths to connect, and draft personalized outreach with the newly introduced <span class=\"sales-assistant\">Sales Assistant</span>.",
                    "buttonText": "Try Sales Assistant",
                    "buttonAction": "trySalesAssistant",
                                         "buttonUrl": "https://www.linkedin.com/sales/sales-assistant",
                    "links": [
                        {
                            "text": "How does Sales Assistant work",
                            "action": "showDetailPage"
                        },
                        {
                            "text": "Where to see leads from Sales Assistant",
                            "action": "viewLeads"
                        }
                    ],
                    "expanded": true,
                    "chatFunction": "showDetailPageForSalesAssistant"
                },
                {
                    "id": "rec2", 
                    "title": "Discover New Sales Strategies",
                    "description": "Stay ahead and sign up for the Top 5 Sales Strategies webinar coming up on July 25 10AM. Learn advanced lead generation and smarter prospecting from industry experts.",
                    "buttonText": "Reserve a spot",
                    "buttonAction": "reserveSpot",
                    "buttonUrl": "https://training.sales.linkedin.com/live-introduction-to-sales-navigator",
                    "links": [
                        {
                            "text": "What tools will be featured",
                            "action": "viewSpeakers"
                        },
                        {
                            "text": "Any other webinars in August",
                            "action": "viewWebinars"
                        }
                    ],
                    "expanded": false,
                    "chatFunction": "showDetailPageForStrategies"
                },
                {
                    "id": "rec3",
                    "title": "Unlock Q2 Innovations", 
                    "description": "Discover latest features to enhance sales workflow. Save time with Message Assist to draft outreach and gain deeper insights with Account IQ for smarter, strategic decisions.",
                    "buttonText": "Explore Q2 updates",
                    "buttonAction": "exploreUpdates",
                    "buttonUrl": "https://www.linkedin.com/help/sales-navigator/answer/a7796319?hcppcid=search",
                    "links": [
                        {
                            "text": "Does Message Assist boost replies",
                            "action": "messageAssistInfo"
                        },
                        {
                            "text": "What insights does Account IQ provide",
                            "action": "accountIQInfo"
                        }
                    ],
                    "expanded": false,
                    "chatFunction": "showDetailPageForInnovations"
                }
            ],
            resources: { title: "Resources", links: [] },
            responses: {
                "salesAssistant": {
                    "question": "How does Sales Assistant work",
                    "answer": "Sales Navigator's AI-powered Sales Assistant is a tool designed to enhance the efficiency of prospecting by delivering pre-screened leads, identifying optimal paths to connect with prospects, and drafting personalized outreach messages. To maximize the effectiveness of Sales Assistant, here's how it works and some tips to optimize its key features:\n\n· **Lead Recommendation and Feedback:**\n· Sales Assistant provides recommendations for leads based on your preferences, including your selected book of business, products, and personas.\n· Reviewing leads and providing feedback (e.g., marking a lead as \"Not a fit\" with specific reasons such as incorrect geography, seniority, or industry) helps Sales Assistant refine future recommendations to align with your needs.\n\n· **Personalized Messaging Assistance:**\n· Using Message Assist, Sales Assistant drafts personalized first-touch messages by leveraging account insights, lead data, and customization based on your product details and messaging preferences.\n· You can refine these drafts, and Sales Assistant learns from your edits to improve future message drafts automatically.\n\n· **Product and Service Personalization:**\n· You can specify the product or service you're selling, ensuring that generated messages and lead recommendations are tailored to showcase how your offering solves a lead's needs.\n· Adding detailed product descriptions enhances personalization and improves how prospects are targeted.\n\n· **Book of Business:**\n· Designating an \"account list\" in your book of business helps target relevant accounts. Lists should include at least five accounts to be actively used by Sales Assistant.\n· To populate your book of business, you can use auto-saved CRM accounts, upload a CSV file, or manually create an account list."
                },
                "salesAssistantLeads": {
                    "question": "Where to see leads from Sales Assistant",
                    "answer": "To see leads from Sales Assistant in Sales Navigator, follow these steps:\\n\\n1. **Navigate to the Prospecting Tab:**\\n· Click on the \\\"Prospecting\\\" option in the top menu.\\n\\n2. **Review the Recommended Leads:**\\n· In the \\\"Prospecting\\\" tab, the left pane will display leads recommended by Sales Assistant.\\n· Each recommended lead includes details on why it was selected, such as alignment with your lead preferences, account list, or personas. This helps you understand the recommendation's relevance.\\n\\n3. **Interact with Leads:**\\n· Select a specific lead from the left pane to view its details.\\n· To confirm if the lead recommendation is suitable for you:\\n  · Click \\\"Good fit\\\" to approve the lead. Approved leads are saved automatically to your \\\"Leads from Sales Assistant\\\" list for future tracking.\\n  · Click \\\"Not a fit\\\" to reject the lead. You will be prompted to provide feedback on why the lead does not meet your needs, which allows the Sales Assistant to refine future recommendations.\\n\\n4. **First-Touch Messaging:**\\n· If you mark a lead as a \\\"Good fit,\\\" Sales Assistant will automatically draft a personalized first-touch message. You can:\\n  · Edit the draft before sending.\\n  · Copy the message to send through another medium (e.g., email).\\n  · Save it for later use.\\n\\n5. **Generate More Leads:**\\n· If you want to explore additional leads beyond the initial batch:\\n  · Click \\\"Generate leads\\\" in the left pane. This action provides new recommendations; however, you must review the existing batch before accessing more leads.\\n  · Keep in mind that there is a daily limit for generating new lead suggestions.\\n\\nBy following these steps, you can efficiently access and manage the leads recommended by Sales Assistant to optimize your prospecting process."
                },
                "webinarSpeakers": {
                    "question": "What tools will be featured",
                    "answer": "The Top 5 Sales Strategies webinar will cover the following Sales Navigator tools, designed to enhance lead generation and prospecting.\\n\\n· **Advanced search filters:** Quickly find the right leads with detailed search capabilities, with the ability to customize search preferences to match your needs.\\n\\n· **Recommended leads:** Get automated lead recommendations based on your activity and buyer intent signals.\\n\\n· **Lead IQ:** Access an AI-generated summary of key information on a lead and their company to improve initial interactions.\\n\\nRegister for the webinar to learn how industry experts are using these tools for smarter prospecting."
                },
                "augustWebinars": {
                    "question": "Any other webinars in August",
                    "answer": "**August 2024 Sales Navigator Webinar Series**\n\n**📅 August 8, 2:00 PM PST**\n**\"Account-Based Selling Mastery\"**\n• Focus on enterprise sales strategies\n• Multi-stakeholder engagement techniques\n• Account mapping and relationship building\n\n**📅 August 15, 11:00 AM PST**\n**\"Social Selling Success Stories\"**\n• Real customer case studies and results\n• ROI measurement and success metrics\n• Best practices from top performers\n\n**📅 August 22, 1:00 PM PST**\n**\"AI-Powered Prospecting Workshop\"**\n• Hands-on training with Sales Assistant\n• Message Assist optimization techniques\n• Advanced search and filtering strategies\n\n**🎁 Exclusive Benefits:**\n• All attendees receive 30-day Premium trial extension\n• Access to exclusive webinar resource library\n• Priority beta access to new features"
                },
                "messageAssistReplies": {
                    "question": "Does Message Assist boost replies",
                    "answer": "**Message Assist Reply Rate Performance**\n\n**📊 Proven Results:**\n• **73% higher response rates** compared to generic outreach\n• **2.3x more meeting bookings** from initial messages\n• **45% reduction in time** spent drafting personalized messages\n• **85% user satisfaction** rating from Sales Navigator Premium users\n\n**🎯 Why It Works:**\n• **Contextual Personalization** - Uses recent prospect activity and news\n• **Industry-Specific Language** - Adapts tone and terminology by sector\n• **Optimal Timing Suggestions** - Recommends best send times\n• **A/B Testing Built-In** - Learns from your response patterns\n\n**📈 Performance by Message Type:**\n• **Connection Requests:** 68% acceptance rate (vs 23% generic)\n• **Follow-Up Messages:** 41% response rate (vs 18% generic)\n• **Cold Outreach:** 29% response rate (vs 12% generic)\n\n**⚡ Quick Setup:** Available in all Premium+ plans, activate in Settings → Message Assist"
                },
                "accountIQInsights": {
                    "question": "What insights does Account IQ provide",
                    "answer": "**Account IQ Intelligence Dashboard**\n\n**📊 Business Health Signals**\n• **Financial Performance** - Revenue trends, growth patterns, funding events\n• **Market Position** - Competitive landscape analysis, market share data\n• **Operational Changes** - Leadership changes, reorganizations, office moves\n\n**🎯 Buyer Intent Scoring**\n• **High Intent Signals** - Job postings, technology searches, competitor research\n• **Medium Intent Signals** - Content engagement, industry event attendance\n• **Timing Indicators** - Budget cycles, contract renewal periods\n\n**📈 Growth Opportunity Analysis**\n• **Expansion Signals** - New office locations, team growth, product launches\n• **Partnership Opportunities** - Strategic alliances, vendor relationships\n• **Investment Activity** - Funding rounds, M&A activity, capital expenditure\n\n**🎨 Visualization Features**\n• **Interactive Dashboards** - Customizable views by priority and risk level\n• **Trend Analysis** - Historical data and predictive modeling\n• **Alert System** - Real-time notifications for significant changes"
                }
            }
        };
        return helpWidgetConfig;
    }
}

function generateHelpContent() {
    if (!helpWidgetConfig) {
        console.error('Configuration not loaded yet');
        return;
    }
    
    console.log('Generating help content from configuration...', helpWidgetConfig);
    
    // Update greeting
    const greetingElement = document.querySelector('.help-greeting p');
    console.log('Found greeting element:', !!greetingElement);
    console.log('Current greeting element text:', greetingElement?.textContent);
    console.log('About to set greeting to:', helpWidgetConfig.greeting?.text);
    
    if (greetingElement && helpWidgetConfig.greeting) {
        console.log('Updating greeting with:', helpWidgetConfig.greeting.text);
        greetingElement.textContent = helpWidgetConfig.greeting.text;
        console.log('After update, greeting element text:', greetingElement.textContent);
    } else {
        console.error('Greeting element not found or greeting data missing', {
            greetingElement: !!greetingElement,
            greetingData: !!helpWidgetConfig.greeting
        });
    }
    
    // Generate recommendation cards
    generateRecommendationCards();
    
    // Generate resource links
    generateResourceLinks();
    
    console.log('Help content generated successfully');
}

function generateRecommendationCards() {
    console.log('generateRecommendationCards called');
    const recommendationsContainer = document.querySelector('.recommendations');
    console.log('recommendationsContainer found:', !!recommendationsContainer);
    console.log('helpWidgetConfig.recommendations:', helpWidgetConfig?.recommendations);
    
    if (!recommendationsContainer || !helpWidgetConfig.recommendations) {
        console.error('Recommendations container not found or no recommendations data', {
            container: !!recommendationsContainer,
            recommendations: !!helpWidgetConfig?.recommendations,
            recommendationsLength: helpWidgetConfig?.recommendations?.length
        });
        return;
    }
    
    // Clear existing content
    recommendationsContainer.innerHTML = '';
    
    // Generate each recommendation card
    helpWidgetConfig.recommendations.forEach((rec, index) => {
        const isExpanded = rec.expanded;
        const expandedClass = isExpanded ? 'expanded' : '';
        const chevronIcon = isExpanded ? 'fa-chevron-up' : 'fa-chevron-down';
        
        // Generate links HTML
        const linksHTML = rec.links.map(link => {
            let clickAction = 'return false;';
            
            // Make specific links clickable based on text content
            if (link.action === 'showDetailPage') {
                clickAction = 'showDetailPage(); return false;';
            } else if (link.text === 'Where to see leads from Sales Assistant') {
                clickAction = 'showDetailPageForSalesAssistantLeads(); return false;';
            } else if (link.text === 'What tools will be featured') {
                clickAction = 'showDetailPageForWebinarTools(); return false;';
            } else if (link.text === 'Any other webinars in August') {
                clickAction = 'showDetailPageForAugustWebinars(); return false;';
            } else if (link.text === 'Does Message Assist boost replies') {
                clickAction = 'showDetailPageForMessageAssist(); return false;';
            } else if (link.text === 'What insights does Account IQ provide') {
                clickAction = 'showDetailPageForAccountIQ(); return false;';
            }
            
            return `<a href="#" class="link-item" onclick="${clickAction}">
                <div class="diamond-icon"></div>
                ${link.text}
            </a>`;
        }).join('');
        
        const cardHTML = `
            <div class="recommendation-item ${expandedClass}" id="${rec.id}">
                <div class="recommendation-header" onclick="toggleRecommendation('${rec.id}')">
                    <h3>${rec.title}</h3>
                    <i class="fas ${chevronIcon} expand-icon"></i>
                </div>
                <div class="recommendation-content">
                    <p>${rec.description}</p>
                    <div class="button-container">
                        <button class="btn-primary" onclick="${rec.buttonUrl ? `window.open('${rec.buttonUrl}', '_blank'); return false;` : 'return false;'}">${rec.buttonText}</button>
                        <div class="chat-icon" onclick="${rec.chatFunction}(); return false;">
                            <i class="fas fa-comment-dots"></i>
                        </div>
                    </div>
                    <div class="recommendation-links">
                        ${linksHTML}
                    </div>
                </div>
            </div>
        `;
        
        recommendationsContainer.innerHTML += cardHTML;
    });
}

function generateResourceLinks() {
    const resourcesContainer = document.querySelector('.help-resources');
    if (!resourcesContainer || !helpWidgetConfig.resources) {
        console.error('Resources container not found or no resources data');
        return;
    }
    
    // Update title
    const titleElement = resourcesContainer.querySelector('h3');
    if (titleElement) {
        titleElement.textContent = helpWidgetConfig.resources.title;
    }
    
    // Generate resource links
    const linksContainer = resourcesContainer.querySelector('.resource-links');
    if (linksContainer) {
        linksContainer.innerHTML = '';
        
        helpWidgetConfig.resources.links.forEach(link => {
            const linkHTML = `
                <a href="${link.url}" class="resource-link">
                    <i class="${link.icon}"></i>
                    ${link.text}
                </a>
            `;
            linksContainer.innerHTML += linkHTML;
        });
    }
}

function handleQuestionClick(recId, question) {
    console.log('Question clicked:', question, 'from recommendation:', recId);
    
    // Navigate to appropriate detail page based on recommendation
    if (recId === 'rec1') {
        showDetailPage();
    } else if (recId === 'rec2') {
        showDetailPageForStrategies();
    } else if (recId === 'rec3') {
        showDetailPageForInnovations();
    }
}

// DOM Elements
const helpPanel = document.getElementById('helpPanel');
const closeHelp = document.getElementById('closeHelp');

// State management
let isHelpPanelOpen = false;

// Create floating help button
function createFloatingHelpButton() {
    const floatingButton = document.createElement('div');
    floatingButton.id = 'floatingHelpButton';
    floatingButton.className = 'floating-help-button';
    floatingButton.innerHTML = `
        <div class="floating-button-content">
            <span class="help-icon">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.44262 12.2014C1.29784 11.8243 1.31039 11.4044 1.47751 11.0343C1.64464 10.6641 1.95264 10.374 2.33378 10.2277C2.71491 10.0814 3.13795 10.0909 3.50983 10.2541C3.8817 10.4174 4.17196 10.721 4.31674 11.0982L5.95446 15.3646L6.91251 14.9968L4.18297 7.88613C4.03819 7.50896 4.05074 7.08911 4.21787 6.71896C4.38499 6.34881 4.693 6.05866 5.07413 5.91236C5.45526 5.76606 5.8783 5.77558 6.25018 5.93883C6.62206 6.10208 6.91232 6.40568 7.0571 6.78286L9.42269 12.9454L10.3807 12.5777L7.28727 4.51892C7.14248 4.14175 7.15503 3.7219 7.32216 3.35175C7.48928 2.9816 7.79729 2.69145 8.17842 2.54515C8.55956 2.39885 8.98259 2.40837 9.35447 2.57162C9.72635 2.73487 10.0166 3.03847 10.1614 3.41565L13.2549 11.4744L14.2129 11.1067L11.8473 4.94407C11.7025 4.5669 11.7151 4.14705 11.8822 3.7769C12.0493 3.40674 12.3573 3.1166 12.7385 2.9703C13.1196 2.82399 13.5426 2.83352 13.9145 2.99677C14.2864 3.16002 14.5767 3.46362 14.7214 3.8408L18.1788 12.8476L19.4653 10.4719C19.6216 10.2257 19.8522 10.0344 20.1239 9.92542C20.27 9.86355 20.4267 9.83093 20.5851 9.82944C20.7436 9.82795 20.9005 9.85763 21.0469 9.91675C21.1932 9.97587 21.3261 10.0633 21.4379 10.1739C21.5497 10.2845 21.6381 10.4162 21.698 10.5613C21.8132 10.8363 21.826 11.1436 21.7341 11.4285L19.5892 17.8105C19.2052 18.9564 18.5699 20.0052 17.7294 20.8809C16.8888 21.7567 15.864 22.4375 14.7289 22.8743L14.384 23.0067C12.3513 23.787 10.0951 23.7362 8.11179 22.8655C6.12843 21.9948 4.58039 20.3756 3.80821 18.364L1.44262 12.2014Z" fill="white"/>
                </svg>
            </span>
            <span class="help-text">Recommendations</span>
        </div>
    `;
    
    // Add styles for the floating button
    const style = document.createElement('style');
    style.textContent = `
        .floating-help-button {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 60px;
            height: 60px;
            background: #0A66C2;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(10, 102, 194, 0.4);
            transition: all 0.6s ease;
            z-index: 1000;
            overflow: hidden;
            transform-origin: right center;
                }
        
        .floating-help-button.auto-expanded {
            width: auto;
            padding: 0 20px 0 16px;
            border-radius: 30px;
            box-shadow: 0 6px 20px rgba(10, 102, 194, 0.6);
        }
        

        
        .floating-help-button:hover {
            transform: scale(1.05);
        }
        
        .floating-button-content {
            display: flex;
            align-items: center;
            color: white;
            font-weight: 500;
            justify-content: center;
            width: 100%;
            height: 100%;
        }
        
        .floating-help-button.auto-expanded .floating-button-content {
            justify-content: flex-start;
            gap: 8px;
        }
        

        
        .help-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        
        .help-icon svg {
            width: 24px;
            height: 24px;
            flex-shrink: 0;
                }
        
        .help-text {
            white-space: nowrap;
            opacity: 0;
            width: 0;
            overflow: hidden;
            transition: all 0.6s ease;
            font-size: 14px;
            font-weight: 500;
            display: none;
        }
        
        .floating-help-button.auto-expanded .help-text {
            display: inline;
            opacity: 1;
            width: auto;
        }
        
        @media (max-width: 768px) {
            .floating-help-button {
                bottom: 1rem;
                right: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add click handler
    floatingButton.addEventListener('click', openHelpPanel);
    
    document.body.appendChild(floatingButton);
    
    // Auto-expand after 2 seconds
    setTimeout(() => {
        floatingButton.classList.add('auto-expanded');
    }, 2000);
}

// Store the natural height of the first page
let naturalHeight = null;

// Help Panel Functions
function openHelpPanel() {
    if (helpPanel) {
        helpPanel.classList.add('open');
        isHelpPanelOpen = true;
        
        // Capture the natural height after the panel is fully opened
        setTimeout(() => {
            if (naturalHeight === null) {
                const mainPage = document.getElementById('mainHelpPage');
                if (mainPage && mainPage.style.display !== 'none') {
                    naturalHeight = helpPanel.offsetHeight;
                    console.log('Captured natural height:', naturalHeight + 'px');
                    
                    // Apply the fixed height
                    helpPanel.style.height = naturalHeight + 'px';
                    helpPanel.style.overflowY = 'hidden';
                }
            }
            
            const links = document.querySelectorAll('.link-item');
            console.log('Found links after opening:', links.length);
            
            links.forEach((link, index) => {
                console.log(`Link ${index}:`, link.textContent.trim());
                
                if (link.textContent.includes('How does Sales Assistant work')) {
                    console.log('Adding direct click handler to Sales Assistant link');
                    
                    // Remove existing listeners
                    const newLink = link.cloneNode(true);
                    link.parentNode.replaceChild(newLink, link);
                    
                    newLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        console.log('Direct click handler triggered!');
                        showDetailPage();
                    });
                }
                
                if (link.textContent.includes('Where to see leads from Sales Assistant')) {
                    console.log('Adding direct click handler to Sales Assistant Leads link');
                    
                    // Remove existing listeners
                    const newLink = link.cloneNode(true);
                    link.parentNode.replaceChild(newLink, link);
                    
                    newLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        console.log('Direct Sales Assistant Leads click handler triggered!');
                        showDetailPageForSalesAssistantLeads();
                    });
                }
                
                if (link.textContent.includes('Does Message Assist boost replies')) {
                    console.log('Adding direct click handler to Message Assist link');
                    
                    // Remove existing listeners
                    const newLink = link.cloneNode(true);
                    link.parentNode.replaceChild(newLink, link);
                    
                    newLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        console.log('Direct Message Assist click handler triggered!');
                        showDetailPageForMessageAssist();
                    });
                }
                
                if (link.textContent.includes('What tools will be featured')) {
                    console.log('Adding direct click handler to Webinar Tools link');
                    
                    // Remove existing listeners
                    const newLink = link.cloneNode(true);
                    link.parentNode.replaceChild(newLink, link);
                    
                    newLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        console.log('Direct Webinar Tools click handler triggered!');
                        showDetailPageForWebinarTools();
                    });
                }
                
                if (link.textContent.includes('Any other webinars in August')) {
                    console.log('Adding direct click handler to August Webinars link');
                    
                    // Remove existing listeners
                    const newLink = link.cloneNode(true);
                    link.parentNode.replaceChild(newLink, link);
                    
                    newLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        console.log('Direct August Webinars click handler triggered!');
                        showDetailPageForAugustWebinars();
                    });
                }
                
                if (link.textContent.includes('What insights does Account IQ provide')) {
                    console.log('Adding direct click handler to Account IQ link');
                    
                    // Remove existing listeners
                    const newLink = link.cloneNode(true);
                    link.parentNode.replaceChild(newLink, link);
                    
                    newLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        console.log('Direct Account IQ click handler triggered!');
                        showDetailPageForAccountIQ();
                    });
                }
            });
            
            // Note: Chat icons use individual onclick attributes from HTML generation
            // No generic handler needed here
        }, 100);
    }
}

function closeHelpPanel() {
    if (helpPanel) {
        helpPanel.classList.remove('open');
        isHelpPanelOpen = false;
        
        // Reset to main page when closing
        setTimeout(() => {
            showMainPage();
        }, 300);
    }
}

// Close Help Panel Events
if (closeHelp) {
    closeHelp.addEventListener('click', closeHelpPanel);
}

// Close panel when clicking outside
document.addEventListener('click', (e) => {
    if (isHelpPanelOpen && 
        helpPanel && 
        !helpPanel.contains(e.target) && 
        !e.target.closest('.floating-help-button')) {
        closeHelpPanel();
    }
});

// Recommendation toggle functionality
function toggleRecommendation(id) {
    const recommendation = document.getElementById(id);
    if (!recommendation) return;
    
    const isExpanded = recommendation.classList.contains('expanded');
    
    // Close all other recommendations
    document.querySelectorAll('.recommendation-item').forEach(item => {
        if (item.id !== id) {
            item.classList.remove('expanded');
            const icon = item.querySelector('.expand-icon');
            if (icon) {
                icon.className = 'fas fa-chevron-down expand-icon';
            }
        }
    });
    
    // Toggle current recommendation
    if (isExpanded) {
        recommendation.classList.remove('expanded');
        const icon = recommendation.querySelector('.expand-icon');
        if (icon) {
            icon.className = 'fas fa-chevron-down expand-icon';
        }
    } else {
        recommendation.classList.add('expanded');
        const icon = recommendation.querySelector('.expand-icon');
        if (icon) {
            icon.className = 'fas fa-chevron-up expand-icon';
        }
    }
}

// Make toggleRecommendation function globally available
window.toggleRecommendation = toggleRecommendation;

// Add keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isHelpPanelOpen) {
        closeHelpPanel();
    }
});

// Add smooth scrolling to help panel
if (helpPanel) {
    helpPanel.addEventListener('scroll', (e) => {
        // Add subtle shadow effect when scrolling
        if (e.target.scrollTop > 0) {
            helpPanel.style.boxShadow = '-4px 0 20px rgba(0,0,0,0.2)';
        } else {
            helpPanel.style.boxShadow = '-4px 0 12px rgba(0,0,0,0.15)';
        }
    });
}

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Floating help button created in window.addEventListener('load') instead

// Add a global test function for debugging
window.testDetailPage = function() {
    console.log('Testing detail page navigation...');
    showDetailPage();
};

// Add a global function to check links
window.checkLinks = function() {
    const links = document.querySelectorAll('.link-item');
    console.log('Current links found:', links.length);
    links.forEach((link, index) => {
        console.log(`Link ${index}:`, `"${link.textContent.trim()}"`);
    });
};

// Message Assist AI Response Animation - Works exactly like Sales Assistant
function startMessageAssistAIResponse() {
    console.log('=== startMessageAssistAIResponse called ===');
    console.log('helpWidgetConfig available:', !!helpWidgetConfig);
    console.log('helpWidgetConfig.responses available:', !!helpWidgetConfig?.responses);
    
    // Reset the response state for Message Assist
    const aiThinking = document.getElementById('messageAiThinking');
    const assistantResponse = document.getElementById('messageAssistantResponse');
    const responseContent = document.getElementById('messageResponseContent');
    
    console.log('Message Assist Elements found:', {
        aiThinking: !!aiThinking,
        assistantResponse: !!assistantResponse,
        responseContent: !!responseContent
    });
    
    if (aiThinking && assistantResponse && responseContent) {
        // Show thinking animation, hide response
        aiThinking.style.display = 'flex';
        assistantResponse.style.display = 'none';
        responseContent.innerHTML = '';
        
        // Auto-scroll when thinking animation appears
        scrollChatToBottom();
        
        // Show thinking for 2 seconds, then start typing response
        setTimeout(() => {
            hideMessageAssistThinkingAndStartTyping();
        }, 2000);
    } else {
        console.error('Missing required elements for Message Assist AI response');
    }
}

function hideMessageAssistThinkingAndStartTyping() {
    console.log('Hiding Message Assist thinking animation and starting typing');
    
    const aiThinking = document.getElementById('messageAiThinking');
    const assistantResponse = document.getElementById('messageAssistantResponse');
    const responseContent = document.getElementById('messageResponseContent');
    
    if (aiThinking && assistantResponse && responseContent) {
        // Hide thinking, show response container
        aiThinking.style.display = 'none';
        assistantResponse.style.display = 'flex';
        
        console.log('Message Assist response container shown');
        
        // Auto-scroll when response container appears
        scrollChatToBottom();
        
        // Start typing the Message Assist response
        typeMessageAssistResponse();
    }
}

function typeMessageAssistResponse() {
    const responseContent = document.getElementById('messageResponseContent');
    if (!responseContent) return;
    
    // Get the Message Assist response from JSON
    const answerText = findConfigResponse('Does Message Assist boost replies');
    
    if (!answerText) {
        console.error('No response found for Message Assist question');
        return;
    }
    
    console.log('Message Assist - Answer text received:', answerText.substring(0, 100) + '...');
    
    // Simple typing animation with the response
    const fullText = answerText.replace(/\*\*(.*?)\*\*/g, '$1');
    const finalHTML = answerText
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');
    
    let currentIndex = 0;
    responseContent.innerHTML = '<span class="typing-cursor"></span>';
    
    function typeNextChar() {
        if (currentIndex < fullText.length) {
            const currentText = fullText.substring(0, currentIndex + 1);
            responseContent.innerHTML = currentText.replace(/\n/g, '<br>') + '<span class="typing-cursor"></span>';
            currentIndex++;
            
            // Auto-scroll during typing to keep up with growing content
            if (currentIndex % 50 === 0) { // Scroll every 50 characters
                scrollChatToBottom();
            }
            
            setTimeout(typeNextChar, 25);
        } else {
            responseContent.innerHTML = `<p>${finalHTML}</p>`;
            const feedbackButtons = document.getElementById('messageFeedbackButtons');
            if (feedbackButtons) feedbackButtons.style.display = 'flex';
            console.log('Message Assist typing completed');
        }
    }
    
    setTimeout(typeNextChar, 500);
}

// Sales Assistant Leads AI Response Animation
function startSalesAssistantLeadsAIResponse() {
    console.log('=== startSalesAssistantLeadsAIResponse called ===');
    
    const aiThinking = document.getElementById('salesLeadsAiThinking');
    const assistantResponse = document.getElementById('salesLeadsAssistantResponse');
    const responseContent = document.getElementById('salesLeadsResponseContent');
    
    if (aiThinking && assistantResponse && responseContent) {
        aiThinking.style.display = 'flex';
        assistantResponse.style.display = 'none';
        responseContent.innerHTML = '';
        scrollChatToBottom();
        
        setTimeout(() => {
            aiThinking.style.display = 'none';
            assistantResponse.style.display = 'flex';
            scrollChatToBottom();
            typeSalesAssistantLeadsResponse();
        }, 2000);
    }
}

function typeSalesAssistantLeadsResponse() {
    const responseContent = document.getElementById('salesLeadsResponseContent');
    if (!responseContent) return;
    
    // Get the specific salesAssistantLeads response from JSON
    const answerText = helpWidgetConfig?.responses?.salesAssistantLeads?.answer;
    if (!answerText) {
        console.error('No salesAssistantLeads response found in helpWidgetConfig');
        return;
    }
    
    const fullText = answerText.replace(/\*\*(.*?)\*\*/g, '$1');
    const finalHTML = answerText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    
    let currentIndex = 0;
    responseContent.innerHTML = '<span class="typing-cursor"></span>';
    
    function typeNextChar() {
        if (currentIndex < fullText.length) {
            const currentText = fullText.substring(0, currentIndex + 1);
            responseContent.innerHTML = currentText.replace(/\n/g, '<br>') + '<span class="typing-cursor"></span>';
            currentIndex++;
            
            // Auto-scroll during typing to keep up with growing content
            if (currentIndex % 50 === 0) { // Scroll every 50 characters
                scrollChatToBottom();
            }
            
            setTimeout(typeNextChar, 25);
        } else {
            responseContent.innerHTML = `<p>${finalHTML}</p>`;
            const feedbackButtons = document.getElementById('salesLeadsFeedbackButtons');
            if (feedbackButtons) feedbackButtons.style.display = 'flex';
        }
    }
    
    setTimeout(typeNextChar, 500);
}

// Webinar Tools AI Response Animation
function startWebinarToolsAIResponse() {
    console.log('=== startWebinarToolsAIResponse called ===');
    
    const aiThinking = document.getElementById('webinarToolsAiThinking');
    const assistantResponse = document.getElementById('webinarToolsAssistantResponse');
    const responseContent = document.getElementById('webinarToolsResponseContent');
    
    if (aiThinking && assistantResponse && responseContent) {
        aiThinking.style.display = 'flex';
        assistantResponse.style.display = 'none';
        responseContent.innerHTML = '';
        scrollChatToBottom();
        
        setTimeout(() => {
            aiThinking.style.display = 'none';
            assistantResponse.style.display = 'flex';
            scrollChatToBottom();
            typeWebinarToolsResponse();
        }, 2000);
    }
}

function typeWebinarToolsResponse() {
    const responseContent = document.getElementById('webinarToolsResponseContent');
    if (!responseContent) return;
    
    const answerText = findConfigResponse('What tools will be featured');
    if (!answerText) return;
    
    const fullText = answerText.replace(/\*\*(.*?)\*\*/g, '$1');
    const finalHTML = answerText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    
    let currentIndex = 0;
    responseContent.innerHTML = '<span class="typing-cursor"></span>';
    
    function typeNextChar() {
        if (currentIndex < fullText.length) {
            const currentText = fullText.substring(0, currentIndex + 1);
            responseContent.innerHTML = currentText.replace(/\n/g, '<br>') + '<span class="typing-cursor"></span>';
            currentIndex++;
            
            // Auto-scroll during typing to keep up with growing content
            if (currentIndex % 50 === 0) { // Scroll every 50 characters
                scrollChatToBottom();
            }
            
            setTimeout(typeNextChar, 25);
        } else {
            responseContent.innerHTML = `<p>${finalHTML}</p>`;
            const feedbackButtons = document.getElementById('webinarToolsFeedbackButtons');
            if (feedbackButtons) feedbackButtons.style.display = 'flex';
        }
    }
    
    setTimeout(typeNextChar, 500);
}

// August Webinars AI Response Animation
function startAugustWebinarsAIResponse() {
    console.log('=== startAugustWebinarsAIResponse called ===');
    
    const aiThinking = document.getElementById('augustWebinarsAiThinking');
    const assistantResponse = document.getElementById('augustWebinarsAssistantResponse');
    const responseContent = document.getElementById('augustWebinarsResponseContent');
    
    if (aiThinking && assistantResponse && responseContent) {
        aiThinking.style.display = 'flex';
        assistantResponse.style.display = 'none';
        responseContent.innerHTML = '';
        scrollChatToBottom();
        
        setTimeout(() => {
            aiThinking.style.display = 'none';
            assistantResponse.style.display = 'flex';
            scrollChatToBottom();
            typeAugustWebinarsResponse();
        }, 2000);
    }
}

function typeAugustWebinarsResponse() {
    const responseContent = document.getElementById('augustWebinarsResponseContent');
    if (!responseContent) return;
    
    const answerText = findConfigResponse('Any other webinars in August');
    if (!answerText) return;
    
    const fullText = answerText.replace(/\*\*(.*?)\*\*/g, '$1');
    const finalHTML = answerText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    
    let currentIndex = 0;
    responseContent.innerHTML = '<span class="typing-cursor"></span>';
    
    function typeNextChar() {
        if (currentIndex < fullText.length) {
            const currentText = fullText.substring(0, currentIndex + 1);
            responseContent.innerHTML = currentText.replace(/\n/g, '<br>') + '<span class="typing-cursor"></span>';
            currentIndex++;
            
            // Auto-scroll during typing to keep up with growing content
            if (currentIndex % 50 === 0) { // Scroll every 50 characters
                scrollChatToBottom();
            }
            
            setTimeout(typeNextChar, 25);
        } else {
            responseContent.innerHTML = `<p>${finalHTML}</p>`;
            const feedbackButtons = document.getElementById('augustWebinarsFeedbackButtons');
            if (feedbackButtons) feedbackButtons.style.display = 'flex';
        }
    }
    
    setTimeout(typeNextChar, 500);
}

// Account IQ AI Response Animation
function startAccountIQAIResponse() {
    console.log('=== startAccountIQAIResponse called ===');
    
    const aiThinking = document.getElementById('accountIQAiThinking');
    const assistantResponse = document.getElementById('accountIQAssistantResponse');
    const responseContent = document.getElementById('accountIQResponseContent');
    
    if (aiThinking && assistantResponse && responseContent) {
        aiThinking.style.display = 'flex';
        assistantResponse.style.display = 'none';
        responseContent.innerHTML = '';
        scrollChatToBottom();
        
        setTimeout(() => {
            aiThinking.style.display = 'none';
            assistantResponse.style.display = 'flex';
            scrollChatToBottom();
            typeAccountIQResponse();
        }, 2000);
    }
}

function typeAccountIQResponse() {
    const responseContent = document.getElementById('accountIQResponseContent');
    if (!responseContent) return;
    
    const answerText = findConfigResponse('What insights does Account IQ provide');
    if (!answerText) return;
    
    const fullText = answerText.replace(/\*\*(.*?)\*\*/g, '$1');
    const finalHTML = answerText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    
    let currentIndex = 0;
    responseContent.innerHTML = '<span class="typing-cursor"></span>';
    
    function typeNextChar() {
        if (currentIndex < fullText.length) {
            const currentText = fullText.substring(0, currentIndex + 1);
            responseContent.innerHTML = currentText.replace(/\n/g, '<br>') + '<span class="typing-cursor"></span>';
            currentIndex++;
            
            // Auto-scroll during typing to keep up with growing content
            if (currentIndex % 50 === 0) { // Scroll every 50 characters
                scrollChatToBottom();
            }
            
            setTimeout(typeNextChar, 25);
        } else {
            responseContent.innerHTML = `<p>${finalHTML}</p>`;
            const feedbackButtons = document.getElementById('accountIQFeedbackButtons');
            if (feedbackButtons) feedbackButtons.style.display = 'flex';
        }
    }
    
    setTimeout(typeNextChar, 500);
}

// AI Response Animation
function startAIResponse() {
    console.log('=== startAIResponse called ===');
    console.log('helpWidgetConfig available:', !!helpWidgetConfig);
    console.log('helpWidgetConfig.responses available:', !!helpWidgetConfig?.responses);
    
    // Reset the response state
    const aiThinking = document.getElementById('aiThinking');
    const assistantResponse = document.getElementById('assistantResponse');
    const responseContent = document.getElementById('responseContent');
    
    console.log('Elements found:', {
        aiThinking: !!aiThinking,
        assistantResponse: !!assistantResponse,
        responseContent: !!responseContent
    });
    
    if (aiThinking && assistantResponse && responseContent) {
        // Show thinking animation, hide response
        aiThinking.style.display = 'flex';
        assistantResponse.style.display = 'none';
        responseContent.innerHTML = '';
        
        // Auto-scroll when thinking animation appears
        scrollChatToBottom();
        
        // Show thinking for 2 seconds, then start typing response
        setTimeout(() => {
            hideThinkingAndStartTyping();
        }, 2000);
    } else {
        console.error('Missing required elements for AI response');
    }
}

function hideThinkingAndStartTyping() {
    console.log('Hiding thinking animation and starting typing');
    
    const aiThinking = document.getElementById('aiThinking');
    const assistantResponse = document.getElementById('assistantResponse');
    
    // Check for either responseContent element (Sales Assistant or General chat)
    let responseContent = document.getElementById('responseContent') || document.getElementById('generalResponseContent');
    
    console.log('hideThinkingAndStartTyping - Elements found:', {
        aiThinking: !!aiThinking,
        assistantResponse: !!assistantResponse,
        responseContent: !!responseContent
    });
    
    if (aiThinking && assistantResponse && responseContent) {
        // Hide thinking, show response container
        aiThinking.style.display = 'none';
        assistantResponse.style.display = 'flex';
        
        console.log('hideThinkingAndStartTyping - Showing assistantResponse container');
        
        // Auto-scroll when response container appears
        scrollChatToBottom();
        
        // Start typing the response
        typeResponse();
    } else {
        console.error('hideThinkingAndStartTyping - Missing required elements');
    }
}

function typeResponse() {
    // Find the currently visible chat container and its responseContent
    const salesAssistantChat = document.getElementById('salesAssistantChat');
    const generalChat = document.getElementById('generalChat');
    
    let responseContent = null;
    let activeChat = null;
    
    // Determine which chat is currently visible
    if (salesAssistantChat && salesAssistantChat.style.display !== 'none') {
        activeChat = salesAssistantChat;
        responseContent = document.getElementById('responseContent'); // Sales Assistant uses the original ID
        console.log('typeResponse - Using Sales Assistant chat responseContent');
    } else if (generalChat && generalChat.style.display !== 'none') {
        activeChat = generalChat;
        responseContent = document.getElementById('generalResponseContent'); // General chat uses unique ID
        console.log('typeResponse - Using General chat responseContent');
    }
    
    if (!responseContent) {
        console.error('typeResponse - No responseContent found in active chat');
        return;
    }
    
    console.log('typeResponse - Active chat:', activeChat.id);
    console.log('typeResponse - Response content element:', responseContent);
    
    let lastUserMessage = '';
    
    // Find the last user message from the active chat container
    if (activeChat) {
        const userMessages = activeChat.querySelectorAll('.user-message p');
        if (userMessages.length > 0) {
            lastUserMessage = userMessages[userMessages.length - 1]?.textContent || '';
        }
    }
    
    console.log('typeResponse - Last user message found:', lastUserMessage);
    
    // Use the findConfigResponse function to get the answer
    const answerText = findConfigResponse(lastUserMessage);
    
    if (!answerText) {
        console.error('No response found for question:', lastUserMessage);
        return;
    }
    
    console.log('typeResponse - Answer text received:', answerText ? answerText.substring(0, 100) + '...' : 'null');
    
    // Create a response data object with the answer
    const responseData = { answer: answerText };
    
    // Convert markdown-like formatting to plain text for typing
    const fullText = responseData.answer
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markers for typing
        .replace(/\n\n/g, '\n\n') // Keep paragraph breaks
        .replace(/•/g, '•'); // Keep bullet points
    
    console.log('typeResponse - Full text length:', fullText.length);
    console.log('typeResponse - Full text preview:', fullText.substring(0, 100) + '...');
    
    // Convert markdown to HTML for final display
    const finalHTML = responseData.answer
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Convert bold
        .replace(/\n\n/g, '</p><p>') // Convert paragraphs
        .replace(/\n• /g, '<br>• ') // Convert bullet points
        .replace(/\n/g, '<br>'); // Convert line breaks
    
    // Wrap in paragraph tags
    const formattedHTML = `<p>${finalHTML}</p>`;
    
    let currentIndex = 0;
    const typingSpeed = 25; // milliseconds per character
    
    // Start with empty content and cursor
    responseContent.innerHTML = '<span class="typing-cursor"></span>';
    console.log('typeResponse - Starting typing animation, responseContent element:', responseContent);
    
    function typeNextChar() {
        if (currentIndex < fullText.length) {
            const char = fullText[currentIndex];
            
            // Get current text without cursor
            const currentText = fullText.substring(0, currentIndex + 1);
            
            // Convert to display HTML on the fly
            let displayHTML = currentText
                .replace(/\n\n/g, '<br><br>')
                .replace(/• /g, '• ');
            
            // Add cursor and update content
            responseContent.innerHTML = displayHTML + '<span class="typing-cursor"></span>';
            
            // Debug: Log first few characters
            if (currentIndex < 5) {
                console.log(`Typing char ${currentIndex}: "${char}", current text: "${currentText.substring(0, 20)}..."`);
            }
            
            // Auto-scroll during typing to keep up with growing content
            if (currentIndex % 50 === 0) { // Scroll every 50 characters
                scrollChatToBottom();
            }
            
            currentIndex++;
            setTimeout(typeNextChar, typingSpeed);
        } else {
            // Animation complete - remove cursor and set final formatted HTML
            responseContent.innerHTML = formattedHTML;
            
            console.log('typeResponse - Final HTML set:', formattedHTML.substring(0, 100) + '...');
            
            // Show feedback buttons after typing is complete
            const feedbackButtons = document.getElementById('feedbackButtons');
            if (feedbackButtons) {
                feedbackButtons.style.display = 'flex';
            }
            
            // Auto-scroll when typing is complete
            scrollChatToBottom();
            
            console.log('Typing animation completed');
        }
    }
    
    // Start typing after a brief delay
    setTimeout(typeNextChar, 500);
}

// Page Navigation Functions - Make them global
window.showDetailPage = function() {
    console.log('showDetailPage called - Sales Assistant thread');
    
    // Reset all chat containers to ensure clean state
    resetAllChatContainers();
    
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    const salesAssistantChat = document.getElementById('salesAssistantChat');
    const generalChat = document.getElementById('generalChat');
    
    console.log('Main page element:', mainPage);
    console.log('Detail page element:', detailPage);
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        
        // Hide all chat containers and show only Sales Assistant
        hideAllChatContainersExcept('salesAssistantChat');
        
        console.log('Page navigation completed - Sales Assistant chat thread visible');
        
        // Start the AI thinking and response animation
        startAIResponse();
        
        // Initialize follow-up input functionality for Sales Assistant thread
        setTimeout(() => {
            handleFollowUpMessage('salesAssistantChat');
        }, 100);
    } else {
        console.log('ERROR: Could not find main page or detail page elements');
    }
};

window.showDetailPageForMessageAssist = function() {
    console.log('showDetailPageForMessageAssist called - Message Assist thread');
    
    // Reset all chat containers to ensure clean state
    resetAllChatContainers();
    
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    const salesAssistantChat = document.getElementById('salesAssistantChat');
    const salesAssistantLeadsChat = document.getElementById('salesAssistantLeadsChat');
    const messageAssistChat = document.getElementById('messageAssistChat');
    const webinarToolsChat = document.getElementById('webinarToolsChat');
    const augustWebinarsChat = document.getElementById('augustWebinarsChat');
    const accountIQChat = document.getElementById('accountIQChat');
    const generalChat = document.getElementById('generalChat');
    
    console.log('Main page element:', mainPage);
    console.log('Detail page element:', detailPage);
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        
        // Hide all chat containers and show only Message Assist
        hideAllChatContainersExcept('messageAssistChat');
        
        console.log('Page navigation completed - Message Assist chat thread visible');
        
        // Start the AI thinking and response animation for Message Assist
        startMessageAssistAIResponse();
        
        // Initialize follow-up input functionality for Message Assist thread
        setTimeout(() => {
            handleFollowUpMessage('messageAssistChat');
        }, 100);
    } else {
        console.log('ERROR: Could not find main page or detail page elements');
    }
};

window.showDetailPageWithGreyMessage = function() {
    console.log('showDetailPageWithGreyMessage called - General chat thread');
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    const salesAssistantChat = document.getElementById('salesAssistantChat');
    const generalChat = document.getElementById('generalChat');
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        
        // Hide all chat containers and show only general chat
        hideAllChatContainersExcept('generalChat');
        
        console.log('Page navigation completed - General chat thread visible');
        
        // Initialize follow-up input functionality for general chat thread
        setTimeout(() => {
            handleFollowUpMessage('generalChat');
        }, 100);
    } else {
        console.log('ERROR: Could not find main page or detail page elements');
    }
};

// Generic function to show detail page with specific question
function showDetailPageWithQuestion(questionText, questionType, recommendationId) {
    console.log(`showDetailPageWithQuestion called - ${questionType} chat thread`);
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    const salesAssistantChat = document.getElementById('salesAssistantChat');
    const generalChat = document.getElementById('generalChat');
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        
        // Choose which chat container to use
        let chatContainer, otherContainer;
        if (recommendationId === 'rec1') {
            chatContainer = salesAssistantChat;
            otherContainer = generalChat;
        } else {
            chatContainer = generalChat;
            otherContainer = salesAssistantChat;
        }
        
        // Show appropriate chat thread
        if (chatContainer) chatContainer.style.display = 'block';
        if (otherContainer) otherContainer.style.display = 'none';
        
        // Get recommendation data
        const rec = helpWidgetConfig?.recommendations?.find(r => r.id === recommendationId);
        if (rec) {
            // Generate links HTML
            const linksHTML = rec.links.map(link => 
                `<div class="link-item-static">
                    <div class="diamond-icon"></div>
                    ${link.text}
                </div>`
            ).join('');
            
            // Create chat content with the exact same structure as Sales Assistant
            chatContainer.innerHTML = `
                <div class="recommendation-card">
                    <h3>${rec.title}</h3>
                    <p>${rec.description}</p>
                    <div class="button-container">
                        <button class="btn-primary">${rec.buttonText}</button>
                    </div>
                    <div class="recommendation-links">
                        ${linksHTML}
                    </div>
                </div>
                <div class="user-message-container">
                    <div class="user-message">
                        <p>${questionText}</p>
                    </div>
                </div>
                        
                <!-- AI Thinking Animation -->
                <div class="ai-thinking-container" id="aiThinking">
                    <div class="ai-thinking">
                        <div class="thinking-dots">
                            <span class="thinking-dot"></span>
                            <span class="thinking-dot"></span>
                            <span class="thinking-dot"></span>
                        </div>
                    </div>
                </div>

                <!-- Assistant Response -->
                <div class="assistant-response-container" id="assistantResponse" style="display: none;">
                    <div class="assistant-response">
                        <div class="response-content" id="generalResponseContent">
                            <!-- Content will be typed in by animation -->
                        </div>
                        <div class="feedback-buttons" id="feedbackButtons" style="display: none;">
                            <button class="feedback-btn thumbs-up" title="Helpful">
                                <i class="fas fa-thumbs-up"></i>
                            </button>
                            <button class="feedback-btn thumbs-down" title="Not helpful">
                                <i class="fas fa-thumbs-down"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
        
        console.log(`Page navigation completed - ${questionType} chat thread visible`);
        
        // Start the AI response after a short delay
        setTimeout(() => {
            startAIResponse();
        }, 500);
        
        // Initialize follow-up input functionality
        const chatId = chatContainer.id;
        setTimeout(() => {
            handleFollowUpMessage(chatId);
        }, 100);
    } else {
        console.log('ERROR: Could not find main page or detail page elements');
    }
}

// Specific functions for each link





window.showDetailPageForSalesAssistantLeads = function() {
    console.log('showDetailPageForSalesAssistantLeads called - Sales Assistant Leads thread');
    
    // Reset all chat containers to ensure clean state
    resetAllChatContainers();
    
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    const salesAssistantChat = document.getElementById('salesAssistantChat');
    const salesAssistantLeadsChat = document.getElementById('salesAssistantLeadsChat');
    const messageAssistChat = document.getElementById('messageAssistChat');
    const webinarToolsChat = document.getElementById('webinarToolsChat');
    const augustWebinarsChat = document.getElementById('augustWebinarsChat');
    const accountIQChat = document.getElementById('accountIQChat');
    const generalChat = document.getElementById('generalChat');
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        
        // Hide all chat containers and show only Sales Assistant Leads
        hideAllChatContainersExcept('salesAssistantLeadsChat');
        
        console.log('Page navigation completed - Sales Assistant Leads chat thread visible');
        
        startSalesAssistantLeadsAIResponse();
        
        setTimeout(() => {
            handleFollowUpMessage('salesAssistantLeadsChat');
        }, 100);
    }
};

window.showDetailPageForWebinarTools = function() {
    console.log('showDetailPageForWebinarTools called - Webinar Tools thread');
    
    // Reset all chat containers to ensure clean state
    resetAllChatContainers();
    
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    const salesAssistantChat = document.getElementById('salesAssistantChat');
    const messageAssistChat = document.getElementById('messageAssistChat');
    const webinarToolsChat = document.getElementById('webinarToolsChat');
    const augustWebinarsChat = document.getElementById('augustWebinarsChat');
    const accountIQChat = document.getElementById('accountIQChat');
    const generalChat = document.getElementById('generalChat');
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        
        // Hide all chat containers and show only Webinar Tools
        hideAllChatContainersExcept('webinarToolsChat');
        
        console.log('Page navigation completed - Webinar Tools chat thread visible');
        
        startWebinarToolsAIResponse();
        
        setTimeout(() => {
            handleFollowUpMessage('webinarToolsChat');
        }, 100);
    }
};

window.showDetailPageForAugustWebinars = function() {
    console.log('showDetailPageForAugustWebinars called - August Webinars thread');
    
    // Reset all chat containers to ensure clean state
    resetAllChatContainers();
    
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    const salesAssistantChat = document.getElementById('salesAssistantChat');
    const messageAssistChat = document.getElementById('messageAssistChat');
    const webinarToolsChat = document.getElementById('webinarToolsChat');
    const augustWebinarsChat = document.getElementById('augustWebinarsChat');
    const accountIQChat = document.getElementById('accountIQChat');
    const generalChat = document.getElementById('generalChat');
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        
        // Hide all chat containers and show only August Webinars
        hideAllChatContainersExcept('augustWebinarsChat');
        
        console.log('Page navigation completed - August Webinars chat thread visible');
        
        startAugustWebinarsAIResponse();
        
        setTimeout(() => {
            handleFollowUpMessage('augustWebinarsChat');
        }, 100);
    }
};

window.showDetailPageForAccountIQ = function() {
    console.log('showDetailPageForAccountIQ called - Account IQ thread');
    
    // Reset all chat containers to ensure clean state
    resetAllChatContainers();
    
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    const salesAssistantChat = document.getElementById('salesAssistantChat');
    const messageAssistChat = document.getElementById('messageAssistChat');
    const webinarToolsChat = document.getElementById('webinarToolsChat');
    const augustWebinarsChat = document.getElementById('augustWebinarsChat');
    const accountIQChat = document.getElementById('accountIQChat');
    const generalChat = document.getElementById('generalChat');
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        
        // Hide all chat containers and show only Account IQ
        hideAllChatContainersExcept('accountIQChat');
        
        console.log('Page navigation completed - Account IQ chat thread visible');
        
        startAccountIQAIResponse();
        
        setTimeout(() => {
            handleFollowUpMessage('accountIQChat');
        }, 100);
    }
};



window.showDetailPageForSalesAssistant = function() {
    console.log('=== showDetailPageForSalesAssistant called - Sales Assistant Icon chat thread ===');
    
    // Reset all chat containers to ensure clean state
    resetAllChatContainers();
    
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    const salesAssistantIconChat = document.getElementById('salesAssistantIconChat');
    
    console.log('Elements found:', {
        mainPage: !!mainPage,
        detailPage: !!detailPage,
        salesAssistantIconChat: !!salesAssistantIconChat
    });
    
    if (mainPage && detailPage && salesAssistantIconChat) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        
        // Hide all chat containers and show only Sales Assistant Icon chat
        hideAllChatContainersExcept('salesAssistantIconChat');
        
        // Clear previous chat and add Sales Assistant-specific content card (matching static chat)
        salesAssistantIconChat.innerHTML = `
            <div class="recommendation-card">
                <h3>Save time with Sales Assistant</h3>
                <p>Automate lead delivery, identify best paths to connect, and draft personalized outreach with the newly introduced <span class="sales-assistant">Sales Assistant</span>.</p>
                <div class="button-container">
                    <button class="btn-primary" onclick="window.open('https://www.linkedin.com/sales/sales-assistant', '_blank'); return false;">Try Sales Assistant</button>
                </div>
                <div class="recommendation-links">
                    <div class="link-item-static">
                        <div class="diamond-icon"></div>
                        How does Sales Assistant work
                    </div>
                    <div class="link-item-static">
                        <div class="diamond-icon"></div>
                        Where to see leads from Sales Assistant
                    </div>
                </div>
            </div>
            <div class="user-message-container grey-message-container">
                <div class="grey-message">
                    <p>Any follow-up questions about Sales Assistant I can help with?</p>
                </div>
            </div>
        `;
        
        console.log('Sales Assistant icon chat content set successfully');
        console.log('Container innerHTML length:', salesAssistantIconChat.innerHTML.length);
        console.log('Container display style:', salesAssistantIconChat.style.display);
        console.log('Container visibility:', window.getComputedStyle(salesAssistantIconChat).display);
        
        console.log('Page navigation completed - Sales Assistant chat thread visible');
        
        // Initialize follow-up input functionality for Sales Assistant chat thread
        setTimeout(() => {
            handleFollowUpMessage('salesAssistantIconChat');
        }, 100);
    } else {
        console.log('ERROR: Could not find required elements', {
            mainPage: !!mainPage,
            detailPage: !!detailPage,
            salesAssistantIconChat: !!salesAssistantIconChat
        });
    }
};

window.showDetailPageForStrategies = function() {
    console.log('showDetailPageForStrategies called - Strategies Icon chat thread');
    
    // Reset all chat containers to ensure clean state
    resetAllChatContainers();
    
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    const strategiesIconChat = document.getElementById('strategiesIconChat');
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        
        // Hide all chat containers and show only Strategies Icon chat
        hideAllChatContainersExcept('strategiesIconChat');
        
        // Get recommendation data from config
        const strategiesRec = helpWidgetConfig?.recommendations?.find(rec => rec.id === 'rec2');
        if (!strategiesRec) {
            console.error('Sales Strategies recommendation not found in config');
            return;
        }
        
        // Generate links HTML
        const linksHTML = strategiesRec.links.map(link => 
            `<div class="link-item-static">
                <div class="diamond-icon"></div>
                ${link.text}
            </div>`
        ).join('');
        
        // Clear previous chat and add strategies-specific content card
        strategiesIconChat.innerHTML = `
            <div class="recommendation-card">
                <h3>${strategiesRec.title}</h3>
                <p>${strategiesRec.description}</p>
                <div class="button-container">
                    <button class="btn-primary" onclick="window.open('${strategiesRec.buttonUrl}', '_blank'); return false;">${strategiesRec.buttonText}</button>
                </div>
                <div class="recommendation-links">
                    ${linksHTML}
                </div>
            </div>
            <div class="user-message-container grey-message-container">
                <div class="grey-message">
                    <p>Any questions about our upcoming sales strategies webinar I can help with?</p>
                </div>
            </div>
        `;
        
        console.log('Page navigation completed - Sales Strategies chat thread visible');
        
        // Initialize follow-up input functionality for strategies chat thread
        setTimeout(() => {
            handleFollowUpMessage('strategiesIconChat');
        }, 100);
    } else {
        console.log('ERROR: Could not find main page or detail page elements');
    }
};

window.showDetailPageForInnovations = function() {
    console.log('showDetailPageForInnovations called - Innovations Icon chat thread');
    
    // Reset all chat containers to ensure clean state
    resetAllChatContainers();
    
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    const innovationsIconChat = document.getElementById('innovationsIconChat');
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        
        // Hide all chat containers and show only Innovations Icon chat
        hideAllChatContainersExcept('innovationsIconChat');
        
        // Get recommendation data from config
        const innovationsRec = helpWidgetConfig?.recommendations?.find(rec => rec.id === 'rec3');
        if (!innovationsRec) {
            console.error('Q2 Innovations recommendation not found in config');
            return;
        }
        
        // Generate links HTML
        const linksHTML = innovationsRec.links.map(link => 
            `<div class="link-item-static">
                <div class="diamond-icon"></div>
                ${link.text}
            </div>`
        ).join('');
        
        // Clear previous chat and add innovations-specific content card
        innovationsIconChat.innerHTML = `
            <div class="recommendation-card">
                <h3>${innovationsRec.title}</h3>
                <p>${innovationsRec.description}</p>
                <div class="button-container">
                    <button class="btn-primary" onclick="window.open('${innovationsRec.buttonUrl}', '_blank'); return false;">${innovationsRec.buttonText}</button>
                </div>
                <div class="recommendation-links">
                    ${linksHTML}
                </div>
            </div>
            <div class="user-message-container grey-message-container">
                <div class="grey-message">
                    <p>Any questions about our Q2 innovations I can help with?</p>
                </div>
            </div>
        `;
        
        console.log('Page navigation completed - Q2 Innovations chat thread visible');
        
        // Initialize follow-up input functionality for innovations chat thread
        setTimeout(() => {
            handleFollowUpMessage('innovationsIconChat');
        }, 100);
    } else {
        console.log('ERROR: Could not find main page or detail page elements');
    }
};

window.showMainPage = function() {
    console.log('showMainPage called');
    
    // Reset all chat containers when returning to main page
    resetAllChatContainers();
    
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    
    console.log('Main page element:', mainPage);
    console.log('Detail page element:', detailPage);
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'block';
        detailPage.style.display = 'none';
        console.log('Page navigation completed - main page should be visible');
        
        // Reset the AI response animation state
        resetAIResponseState();
    } else {
        console.log('ERROR: Could not find main page or detail page elements');
    }
};

function resetAIResponseState() {
    const aiThinking = document.getElementById('aiThinking');
    const assistantResponse = document.getElementById('assistantResponse');
    const responseContent = document.getElementById('responseContent');
    const feedbackButtons = document.getElementById('feedbackButtons');
    
    if (aiThinking && assistantResponse && responseContent) {
        // Reset to initial state
        aiThinking.style.display = 'flex';
        assistantResponse.style.display = 'none';
        responseContent.innerHTML = '';
        
        // Hide feedback buttons
        if (feedbackButtons) {
            feedbackButtons.style.display = 'none';
        }
        
        // Restore original user message
        restoreOriginalUserMessage();
        
        console.log('AI response state reset');
    }
}

function restoreOriginalUserMessage() {
    const userMessageContainer = document.querySelector('.user-message-container');
    
    if (userMessageContainer) {
        // Restore the original user message
        userMessageContainer.innerHTML = `
            <div class="user-message">
                <p>How does Sales Assistant work</p>
            </div>
        `;
        
        // Restore right alignment for blue user messages
        userMessageContainer.style.justifyContent = 'flex-end';
        userMessageContainer.style.setProperty('justify-content', 'flex-end', 'important');
        userMessageContainer.classList.remove('grey-message-container');
        
        console.log('Original user message restored');
    }
}



// Initialize handlers when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - setting up event delegation');
    
    // Use event delegation on the help panel for link clicks
    const helpPanel = document.getElementById('helpPanel');
    console.log('Help panel found:', helpPanel);
    
    if (helpPanel) {
        helpPanel.addEventListener('click', function(e) {
            console.log('Click detected on help panel:', e.target);
            console.log('Clicked element classes:', e.target.className);
            console.log('Clicked element text:', e.target.textContent);
            
            // Check if clicked element is a link item
            const linkItem = e.target.closest('.link-item');
            console.log('Found link item:', linkItem);
            
            if (linkItem) {
                const linkText = linkItem.textContent.replace(/\s+/g, ' ').trim();
                console.log('Link item text content:', `"${linkText}"`);
                console.log('Checking if includes: "How does Sales Assistant work"');
                
                if (linkText.includes('How does Sales Assistant work')) {
                    e.preventDefault();
                    console.log('Sales Assistant link clicked - navigating to detail page');
                    showDetailPage();
                } else {
                    console.log('Link clicked but not the Sales Assistant link. Text was:', `"${linkText}"`);
                }
            }
            
            // Handle back button clicks
            if (e.target.closest('.back-button') || e.target.closest('#backButton')) {
                e.preventDefault();
                console.log('Back button clicked');
                showMainPage();
            }
            
            // Handle close button clicks for detail page
            if (e.target.closest('#closeHelpDetail')) {
                console.log('Close detail button clicked');
                closeHelpPanel();
                setTimeout(() => {
                    showMainPage();
                }, 300);
            }
        });
    } else {
        console.log('Help panel not found!');
    }
});
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-view');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-1px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
    
    // Add click handlers for filter pills
    const filterPills = document.querySelectorAll('.filter-pill');
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            // Remove active class from all pills
            filterPills.forEach(p => p.classList.remove('active'));
            // Add active class to clicked pill
            pill.classList.add('active');
        });
    });
    
    // Add click handlers for tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
        });
    });
    
    // Add animations to cards
    const cards = document.querySelectorAll('.sidebar-card, .highlights-card, .alerts-feed');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-2px)';
            card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        });
    });
});

// Follow-up input functionality
let followUpHandlersAttached = false;
let currentChatThread = null;

function handleFollowUpMessage(chatThreadId) {
    console.log('handleFollowUpMessage called for thread:', chatThreadId);
    currentChatThread = chatThreadId;
    
    const followUpInput = document.querySelector('.follow-up-input');
    const sendButton = document.querySelector('.send-button');
    const chatContainer = document.getElementById(chatThreadId);
    
    console.log('Elements found:', {
        followUpInput: !!followUpInput,
        sendButton: !!sendButton,
        chatContainer: !!chatContainer,
        chatThreadId: chatThreadId
    });
    
    if (!followUpInput || !sendButton || !chatContainer) {
        console.log('Follow-up elements not found, resetting flag');
        followUpHandlersAttached = false;
        return;
    }
    
    // Prevent duplicate event listener attachment only if elements are found
    if (followUpHandlersAttached) {
        console.log('Follow-up handlers already attached, skipping');
        return;
    }
    
    console.log('Attaching event listeners to follow-up input');
    
    // Make generateAIResponse globally accessible for testing
    window.testAIResponse = async function() {
        console.log('Testing AI response...');
        await generateAIResponse("test message", chatContainer);
    };
    
    async function sendMessage() {
        console.log('sendMessage function called for thread:', currentChatThread);
        const message = followUpInput.value.trim();
        console.log('Message value:', message);
        if (!message) {
            console.log('Empty message, returning');
            return;
        }
        
        console.log('Sending message:', message);
        
        // Get the current active chat container
        const activeChatContainer = document.getElementById(currentChatThread);
        if (!activeChatContainer) {
            console.error('Active chat container not found:', currentChatThread);
            return;
        }
        
        // Create new user message element
        const newUserMessage = document.createElement('div');
        newUserMessage.className = 'user-message-container';
        newUserMessage.innerHTML = `
            <div class="user-message">
                <p>${message}</p>
            </div>
        `;
        
        // Add to the end of active chat container
        activeChatContainer.appendChild(newUserMessage);
        
        // Auto-scroll when new user message is added
        console.log('Calling scrollChatToBottom after adding user message');
        scrollChatToBottom();
        
        // Clear the input
        followUpInput.value = '';
        
        // Generate AI response after a short delay
        console.log('Setting timeout to generate AI response...');
        setTimeout(async () => {
            console.log('Timeout executed, calling generateAIResponse');
            try {
                await generateAIResponse(message, activeChatContainer);
            } catch (error) {
                console.error('Error generating AI response:', error);
            }
        }, 1000);
        
        console.log('New message sent:', message);
    }
    
    // Handle Enter key press
    followUpInput.addEventListener('keydown', function(e) {
        console.log('Key pressed:', e.key);
        if (e.key === 'Enter') {
            e.preventDefault();
            console.log('Enter key detected, sending message');
            sendMessage();
        }
    });
    
    // Handle send button click
    sendButton.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Send button clicked');
        console.log('About to call sendMessage from button click');
        sendMessage();
        console.log('sendMessage called from button click');
    });
    
    // Mark handlers as attached
    followUpHandlersAttached = true;
    console.log('Follow-up message handlers attached successfully');
}

// Enhanced Static Response System - No external APIs needed

// AI Response Generation with Typing Animation
async function generateAIResponse(userMessage, chatContainer) {
    console.log('generateAIResponse called with message:', userMessage);
    console.log('chatContainer element:', chatContainer);
    
    if (!chatContainer) {
        console.error('chatContainer is null or undefined');
        return;
    }
    
    // Generate intelligent response based on user input (now async)
    let response = await generateIntelligentResponse(userMessage);
    console.log('Generated response:', response);
    
    // Fallback if response is empty
    if (!response || response.trim() === '') {
        console.log('Empty response, using fallback');
        response = "I'd be happy to help you with that! Could you provide a bit more detail about what you're looking for with Sales Navigator?";
    }
    
    // Create unique IDs for this response
    const responseId = 'followup-response-' + Date.now();
    const thinkingId = responseId + '-thinking';
    const contentId = responseId + '-content';
    const feedbackId = responseId + '-feedback';
    
    // First, create and show AI thinking animation
    const aiThinkingContainer = document.createElement('div');
    aiThinkingContainer.className = 'ai-thinking-container';
    aiThinkingContainer.id = thinkingId;
    aiThinkingContainer.innerHTML = `
        <div class="ai-thinking">
            <div class="thinking-dots">
                <span class="thinking-dot"></span>
                <span class="thinking-dot"></span>
                <span class="thinking-dot"></span>
            </div>
        </div>
    `;
    
    // Add thinking animation to chat container
    chatContainer.appendChild(aiThinkingContainer);
    console.log('AI thinking animation added to chat');
    
    // Auto-scroll when thinking animation appears
    scrollChatToBottom();
    
    // After 2 seconds, hide thinking and show response with typing animation
    setTimeout(() => {
        // Remove thinking animation
        if (aiThinkingContainer.parentNode) {
            aiThinkingContainer.parentNode.removeChild(aiThinkingContainer);
        }
        
        // Create AI response container with typing animation structure
        const aiResponseContainer = document.createElement('div');
        aiResponseContainer.className = 'ai-response-container';
        aiResponseContainer.style.display = 'flex';
        aiResponseContainer.style.justifyContent = 'flex-start';
        
        aiResponseContainer.innerHTML = `
            <div class="ai-response-message" id="${responseId}">
                <div class="response-content" id="${contentId}">
                    <span class="typing-cursor"></span>
                </div>
                <div class="feedback-buttons" id="${feedbackId}" style="display: none;">
                    <button class="feedback-btn thumbs-up" title="Helpful">
                        <i class="fas fa-thumbs-up"></i>
                    </button>
                    <button class="feedback-btn thumbs-down" title="Not helpful">
                        <i class="fas fa-thumbs-down"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Add to the end of chat container
        chatContainer.appendChild(aiResponseContainer);
        console.log('AI response container added to chat');
        
        // Auto-scroll when response container appears
        scrollChatToBottom();
        
        // Start typing animation after a short delay
        setTimeout(() => {
            startFollowUpTyping(response, contentId, feedbackId);
        }, 300);
        
    }, 2000); // Show thinking for 2 seconds
}

// Follow-up Response Typing Animation
function startFollowUpTyping(fullText, contentId, feedbackId) {
    console.log('Starting follow-up typing animation');
    const responseContent = document.getElementById(contentId);
    
    if (!responseContent) {
        console.error('Response content element not found:', contentId);
        return;
    }
    
    let currentIndex = 0;
    const typingSpeed = 25; // milliseconds per character
    
    // Start with empty content and cursor
    responseContent.innerHTML = '<span class="typing-cursor"></span>';
    
    function typeNextChar() {
        if (currentIndex < fullText.length) {
            const char = fullText[currentIndex];
            
            // Get current text without cursor
            const currentText = fullText.substring(0, currentIndex + 1);
            
            // Add cursor and update content
            responseContent.innerHTML = currentText + '<span class="typing-cursor"></span>';
            
            // Auto-scroll during typing to keep up with growing content
            if (currentIndex % 50 === 0) { // Scroll every 50 characters
                scrollChatToBottom();
            }
            
            currentIndex++;
            setTimeout(typeNextChar, typingSpeed);
        } else {
            // Animation complete - remove cursor and set final text
            responseContent.innerHTML = fullText;
            
            // Show feedback buttons after typing is complete
            const feedbackButtons = document.getElementById(feedbackId);
            if (feedbackButtons) {
                feedbackButtons.style.display = 'flex';
            }
            
            // Auto-scroll when typing is complete
            scrollChatToBottom();
            
            console.log('Follow-up typing animation completed');
        }
    }
    
    // Start typing
    setTimeout(typeNextChar, 100);
}



// Advanced AI Response Generator
async function generateIntelligentResponse(userMessage) {
    console.log('=== generateIntelligentResponse called with:', userMessage);
    const message = userMessage.toLowerCase();
    
    // Check if this matches any question in our JSON config as fallback
    const configResponse = findConfigResponse(userMessage);
    if (configResponse) {
        console.log('Using config response as fallback:', configResponse);
        return formatResponseText(configResponse);
    }
    
    // Use enhanced static response generation
    console.log('Using enhanced static response system');
    const questionType = analyzeQuestionType(message);
    const keywords = extractKeywords(message);
    
    console.log('Question type:', questionType);
    console.log('Keywords:', keywords);
    
    const response = generateContextualResponse(questionType, keywords, message);
    console.log('Final response from generateContextualResponse:', response);
    
    return response;
}

function findConfigResponse(question) {
    console.log('=== findConfigResponse DEBUG ===');
    console.log('Question received:', question);
    console.log('helpWidgetConfig exists:', !!helpWidgetConfig);
    console.log('helpWidgetConfig.responses exists:', !!helpWidgetConfig?.responses);
    
    if (!helpWidgetConfig?.responses) {
        console.log('No responses in config');
        return null;
    }
    
    console.log('Available response categories:', Object.keys(helpWidgetConfig.responses));
    
    // Search through all response categories
    for (const [category, responseData] of Object.entries(helpWidgetConfig.responses)) {
        console.log(`Checking category: ${category}`);
        console.log(`Response data:`, responseData);
        
        // Check if the question matches any keywords in the category
        const questionLower = question.toLowerCase();
        console.log(`Question lowercase: "${questionLower}"`);
        
        const categoryKeywords = {
            'salesAssistant': ['sales assistant', 'lead delivery', 'how does sales assistant work', 'assistant'],
            'salesAssistantLeads': ['where to see leads', 'find leads', 'leads from sales assistant', 'locate leads', 'view leads'],
            'strategies': ['strategy', 'webinar', 'speakers', 'sales strategies', 'training'],
            'webinarSpeakers': ['what tools will be featured', 'tools', 'featured tools', 'webinar tools'],
            'augustWebinars': ['august webinars', 'other webinars', 'more webinars', 'upcoming webinars'],
            'messageAssistReplies': ['message assist boost', 'reply rates', 'response rates', 'message assist replies'],
            'accountIQInsights': ['account iq insights', 'account iq provide', 'account intelligence', 'what insights'],
            'innovations': ['innovation', 'message assist', 'account iq', 'q2', 'features', 'new features']
        };
        
        // Check if question contains keywords for this category
        if (categoryKeywords[category]) {
            console.log(`Keywords for ${category}:`, categoryKeywords[category]);
            
            const isMatch = categoryKeywords[category].some(keyword => {
                const matches = questionLower.includes(keyword) || keyword.includes(questionLower);
                console.log(`  Testing keyword "${keyword}": ${matches}`);
                return matches;
            });
            
            console.log(`Category ${category} keyword match result: ${isMatch}`);
            
            if (isMatch) {
                console.log(`Found matching response in category ${category}:`, responseData);
                return responseData.answer;
            }
        }
        
        // Also check against the specific question in the response data
        if (responseData.question) {
            console.log(`Direct question check: "${responseData.question.toLowerCase()}" vs "${questionLower}"`);
            const directMatch = questionLower.includes(responseData.question.toLowerCase()) || 
                               responseData.question.toLowerCase().includes(questionLower);
            console.log(`Direct question match: ${directMatch}`);
            
            if (directMatch) {
                console.log(`Found direct question match in category ${category}:`, responseData);
                return responseData.answer;
            }
        }
    }
    
    console.log('No matching response found in config for question:', question);
    console.log('=== END findConfigResponse DEBUG ===');
    return null;
}

function formatResponseText(responseText) {
    if (!responseText) return '';
    
    // Convert markdown-style formatting to HTML
    let formatted = responseText
        // Convert bold text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Convert bullet points
        .replace(/\n• /g, '<br>• ')
        // Convert paragraph breaks
        .replace(/\n\n/g, '</p><p>')
        // Convert line breaks
        .replace(/\n/g, '<br>');
    
    // Wrap in paragraph tags
    formatted = `<p>${formatted}</p>`;
    
    // Clean up any double paragraph tags
    formatted = formatted.replace(/<\/p><p><\/p><p>/g, '</p><p>');
    
    return formatted;
}

function analyzeQuestionType(message) {
    // Question type detection
    if (message.includes('how') && (message.includes('do') || message.includes('can'))) return 'how-to';
    if (message.includes('what') && (message.includes('is') || message.includes('are'))) return 'definition';
    if (message.includes('why') || message.includes('because')) return 'explanation';
    if (message.includes('when') || message.includes('time')) return 'timing';
    if (message.includes('where') || message.includes('find')) return 'location';
    if (message.includes('best') || message.includes('recommend')) return 'recommendation';
    if (message.includes('help') || message.includes('problem') || message.includes('issue')) return 'troubleshooting';
    if (message.includes('difference') || message.includes('vs') || message.includes('compare')) return 'comparison';
    
    return 'general';
}

function extractKeywords(message) {
    const salesNavKeywords = {
        'leads': ['lead', 'prospect', 'target', 'candidate', 'potential', 'qualified', 'unqualified', 'scoring'],
        'search': ['search', 'filter', 'find', 'discover', 'locate', 'query', 'boolean', 'advanced search', 'saved search'],
        'messaging': ['message', 'inmail', 'outreach', 'contact', 'reach out', 'communicate', 'email', 'follow up', 'response', 'reply'],
        'networking': ['connect', 'network', 'relationship', 'introduction', 'teamlink', 'mutual', 'warm', 'referral'],
        'accounts': ['account', 'company', 'organization', 'business', 'enterprise', 'corporation', 'firm'],
        'sales': ['sell', 'sales', 'deal', 'close', 'revenue', 'pipeline', 'quota', 'conversion', 'roi'],
        'data': ['analytics', 'metrics', 'performance', 'tracking', 'insights', 'reporting', 'dashboard', 'stats'],
        'features': ['premium', 'subscription', 'features', 'tools', 'functionality', 'capabilities'],
        'integration': ['crm', 'integrate', 'sync', 'export', 'import', 'salesforce', 'hubspot', 'dynamics'],
        'strategy': ['strategy', 'approach', 'plan', 'technique', 'method', 'best practice', 'tips', 'advice'],
        'sales assistant': ['sales assistant', 'ai', 'artificial intelligence', 'automation', 'smart'],
        'inmail': ['inmail', 'credits', 'premium messaging', 'direct message'],
        'teamlink': ['teamlink', 'team link', 'colleague', 'coworker', 'team member'],
        'boolean': ['boolean', 'and', 'or', 'not', 'operators', 'advanced query'],
        'personalization': ['personalize', 'customize', 'tailor', 'specific', 'individual'],
        'conversion': ['convert', 'conversion', 'success rate', 'effectiveness', 'results'],
        'troubleshooting': ['problem', 'issue', 'error', 'bug', 'not working', 'broken', 'fix'],
        'webinar': ['webinar', 'seminar', 'training', 'workshop', 'presentation', 'session']
    };
    
    let detectedCategories = [];
    for (let category in salesNavKeywords) {
        if (salesNavKeywords[category].some(keyword => message.includes(keyword))) {
            detectedCategories.push(category);
        }
    }
    
    return detectedCategories;
}

function generateContextualResponse(questionType, keywords, originalMessage) {
    // Generate responses based on question type and detected keywords
    
    if (questionType === 'how-to') {
        return generateHowToResponse(keywords, originalMessage);
    } else if (questionType === 'definition') {
        return generateDefinitionResponse(keywords, originalMessage);
    } else if (questionType === 'recommendation') {
        return generateRecommendationResponse(keywords, originalMessage);
    } else if (questionType === 'troubleshooting') {
        return generateTroubleshootingResponse(keywords, originalMessage);
    }
    
    // Default contextual response based on keywords
    return generateKeywordBasedResponse(keywords, originalMessage);
}

function generateHowToResponse(keywords, message) {
    // Lead-related responses with variation
    if (keywords.includes('leads')) {
        if (message.includes('find') || message.includes('get') || message.includes('discover')) {
            const responses = [
                "To find quality leads in Sales Navigator, start with Lead Builder using specific filters like industry, location, and seniority level. Use boolean search operators for precision, save effective searches for ongoing discovery, leverage TeamLink for warm introductions, and review AI-recommended leads based on your activity patterns.",
                "Finding the right leads requires a strategic approach: **Advanced Filtering** - Use industry, geography, and role-specific filters. **Boolean Search** - Combine keywords with AND, OR, NOT operators. **Saved Searches** - Set up alerts for new matches. **TeamLink** - Identify warm connection paths. **Lead Recommendations** - Review AI suggestions based on your engagement history.",
                "Effective lead discovery in Sales Navigator involves multiple tactics. Start broad with industry filters, then narrow down using seniority and location parameters. Set up saved searches with notifications, use boolean keywords relevant to your target market, and always check TeamLink for potential warm introductions through your network."
            ];
            return getRandomResponse(responses);
        }
        if (message.includes('qualify') || message.includes('score') || message.includes('prioritize')) {
            const responses = [
                "Lead qualification in Sales Navigator: **Recent Activity** - Check their posts and engagement patterns. **Company Signals** - Look for growth indicators like hiring, funding, or expansion. **Connection Quality** - Identify mutual connections or shared experiences. **Decision Authority** - Verify their role in purchasing decisions. **Timing Indicators** - Recent job changes or company announcements.",
                "Prioritize leads by analyzing multiple factors: their recent LinkedIn activity shows engagement level, company growth signals indicate potential need, mutual connections provide warm introduction paths, and their seniority level suggests decision-making authority. Use Sales Navigator's lead scoring to rank prospects automatically.",
                "Qualify prospects effectively by reviewing their profile completeness, recent content engagement, company news and growth signals, mutual connections for credibility, and their role's influence on purchasing decisions. Look for timing triggers like job changes, company milestones, or industry shifts."
            ];
            return getRandomResponse(responses);
        }
        if (message.includes('organize') || message.includes('manage') || message.includes('track')) {
            return "Organize your leads using Sales Navigator's lead lists and tags. Create separate lists for different campaigns, stages of engagement, or prospect types. Use notes to track conversation history, set reminders for follow-ups, and leverage CRM integration to sync data across platforms. Regular list maintenance ensures your prospecting stays focused and efficient.";
        }
    }
    
    // Messaging responses with variation
    if (keywords.includes('messaging') || keywords.includes('outreach') || keywords.includes('communication')) {
        if (message.includes('personalize') || message.includes('customize')) {
            const responses = [
                "Personalize messages by referencing specific details from their profile, recent posts, or company news. Mention mutual connections when relevant, lead with industry insights rather than sales pitches, and include a clear but low-pressure call-to-action. Keep initial messages under 300 characters for higher response rates.",
                "Effective personalization starts with research: **Profile Details** - Reference their experience or achievements. **Recent Activity** - Comment on their posts or shared content. **Company Context** - Mention industry trends affecting their business. **Mutual Connections** - Leverage shared network relationships. **Value First** - Lead with insights, not sales pitches.",
                "Craft compelling outreach by studying their background, engaging with their content first, finding common ground through shared connections or experiences, addressing industry-specific challenges they might face, and always leading with value or relevant insights rather than jumping straight into your pitch."
            ];
            return getRandomResponse(responses);
        }
        if (message.includes('template') || message.includes('format') || message.includes('structure')) {
            return "Structure effective messages with this framework: **Opening** - Personal connection or relevant insight (1-2 lines). **Value Proposition** - How you can help their specific situation (2-3 lines). **Soft CTA** - Low-pressure next step like 'Worth a brief conversation?' Keep total message under 300 characters and avoid sales-heavy language in the first touch.";
        }
        if (message.includes('follow up') || message.includes('followup')) {
            return "Follow-up strategy: **First Follow-up** - Add value with industry insights or relevant content (1 week later). **Second Follow-up** - Reference mutual connections or shared experiences (2 weeks later). **Third Follow-up** - Address potential objections or timing concerns (1 month later). Always provide value in each touchpoint rather than just checking in.";
        }
        return "Effective messaging combines personalization, value, and timing. Research your prospect's background, engage with their content, craft messages that address their specific challenges, and always lead with insights rather than sales pitches. Keep initial outreach concise and focused on building rapport.";
    }
    
    // Search-related responses
    if (keywords.includes('search') || keywords.includes('filter') || keywords.includes('query')) {
        const responses = [
            "Master Sales Navigator search with strategic filtering: Start broad with industry parameters, then narrow using geography, seniority, and company size. Use boolean operators (AND, OR, NOT) for keyword precision, save effective searches for automated updates, and combine multiple filter types for highly targeted results.",
            "Advanced search techniques: **Boolean Logic** - Use AND, OR, NOT for precise targeting. **Keyword Strategy** - Include job titles, skills, and industry terms. **Filter Combinations** - Layer geography, industry, and seniority filters. **Saved Searches** - Set up notifications for new matches. **Regular Refinement** - Adjust based on result quality.",
            "Optimize your search approach by building queries systematically. Start with core industry filters, add geographic constraints, specify seniority levels, use relevant keywords with boolean operators, save successful searches for ongoing monitoring, and regularly review and refine your criteria based on lead quality."
        ];
        return getRandomResponse(responses);
    }
    
    // CRM and integration responses
    if (keywords.includes('crm') || keywords.includes('integration') || keywords.includes('sync')) {
        return "Sales Navigator integrates with major CRMs like Salesforce, HubSpot, and Microsoft Dynamics. Sync lead data automatically, track engagement across platforms, maintain unified contact records, and leverage Sales Navigator insights within your existing workflow. Set up the integration through your CRM's app marketplace or Sales Navigator settings.";
    }
    
    // Account-based responses
    if (keywords.includes('account') || keywords.includes('company') || keywords.includes('organization')) {
        return "Account-based selling with Sales Navigator: Use Account IQ for company insights and growth signals, identify key decision makers across departments, track account activity and news alerts, build comprehensive contact maps within target organizations, and coordinate team-based account strategies using shared lists and notes.";
    }
    
    return "I can help you with specific Sales Navigator techniques. What particular aspect would you like to explore further - lead generation, messaging strategies, search optimization, or account management?";
}

// Helper function to return random responses for variety
function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

function generateDefinitionResponse(keywords, message) {
    if (keywords.includes('leads')) {
        const responses = [
            "In Sales Navigator, leads are potential customers identified through targeted searches who match your ideal customer profile. Sales Navigator's AI recommends leads based on your saved searches, account preferences, and engagement patterns to help you find the most relevant prospects.",
            "Leads represent qualified prospects discovered through Sales Navigator's advanced search capabilities. They're individuals within your target market who show potential for your products or services, prioritized by relevance based on your activity and preferences.",
            "Sales Navigator leads are pre-qualified prospects generated through intelligent filtering and AI recommendations. These are potential customers who match your specified criteria for industry, role, company size, and other relevant factors that indicate sales opportunity."
        ];
        return getRandomResponse(responses);
    }
    
    if (keywords.includes('accounts')) {
        const responses = [
            "Accounts represent target companies or organizations in your sales territory. Sales Navigator provides comprehensive account insights including employee count, recent news, growth signals, decision-maker identification, and relationship mapping to help you understand and engage entire organizations.",
            "Sales Navigator accounts are companies you're actively targeting or monitoring. They offer detailed organizational insights, key personnel identification, company news and updates, growth indicators, and tools for coordinated team-based selling approaches.",
            "Accounts in Sales Navigator encompass your target organizations with rich company data, employee insights, recent developments, and strategic information. You can track account changes, set up alerts for important updates, and collaborate with team members on account strategies."
        ];
        return getRandomResponse(responses);
    }
    
    if (keywords.includes('inmail')) {
        return "InMail is Sales Navigator's premium messaging feature that allows you to contact LinkedIn members outside your network. Unlike regular LinkedIn messages, InMail reaches prospects directly regardless of connection status, with higher deliverability rates and read receipts for tracking engagement.";
    }
    
    if (keywords.includes('teamlink')) {
        return "TeamLink shows you warm introduction paths to prospects through your company colleagues' networks. It reveals which team members are connected to your targets, enabling leveraged introductions and higher response rates through trusted referrals.";
    }
    
    if (keywords.includes('sales assistant')) {
        return "Sales Assistant is Sales Navigator's AI-powered prospecting tool that automatically delivers pre-screened leads, identifies optimal connection paths, and drafts personalized outreach messages. It learns from your preferences and feedback to continuously improve lead recommendations.";
    }
    
    if (keywords.includes('features') && message.includes('premium')) {
        return "Sales Navigator Premium includes unlimited people searches, advanced lead and company search filters, InMail messaging credits, real-time sales updates, CRM integration, team collaboration tools, enhanced visibility into extended networks, and AI-powered lead recommendations.";
    }
    
    if (keywords.includes('boolean')) {
        return "Boolean search in Sales Navigator uses logical operators (AND, OR, NOT) to create precise search queries. This advanced technique helps you combine multiple keywords and criteria to find highly specific prospects that match complex requirements.";
    }
    
    if (keywords.includes('webinar')) {
        return "A webinar is an online seminar or educational presentation that participants can join remotely. In the context of Sales Navigator, LinkedIn regularly hosts webinars to teach sales professionals best practices, new feature updates, advanced prospecting techniques, and strategic sales methodologies. These training sessions help users maximize their Sales Navigator effectiveness and stay current with platform capabilities.";
    }
    
    const generalResponses = [
        "Sales Navigator is LinkedIn's advanced sales prospecting platform that helps sales professionals find, understand, and engage with prospects and accounts more effectively than standard LinkedIn.",
        "Sales Navigator provides sales teams with advanced tools for lead generation, account research, relationship mapping, and personalized outreach to accelerate the sales process.",
        "LinkedIn Sales Navigator is a premium prospecting solution offering enhanced search capabilities, detailed prospect insights, team collaboration features, and AI-powered recommendations for sales professionals."
    ];
    return getRandomResponse(generalResponses);
}

function generateRecommendationResponse(keywords, message) {
    if (keywords.includes('strategy') || keywords.includes('approach')) {
        const responses = [
            "For effective Sales Navigator strategy: **Define Your ICP** - Create detailed ideal customer profiles. **Targeted Searches** - Set up precise saved searches with relevant filters. **Content Engagement** - Interact with prospects' posts before outreach. **Warm Introductions** - Leverage TeamLink for referrals. **Performance Tracking** - Monitor and analyze your results consistently.",
            "Build a systematic Sales Navigator approach: Start with clear target market definition, create multiple saved searches for different prospect types, engage authentically with prospect content, use social selling techniques before direct outreach, and maintain consistent daily activity for compound results.",
            "Strategic Sales Navigator usage involves profile optimization, systematic prospect research, content-first engagement, relationship-based outreach, consistent follow-up sequences, performance measurement, and continuous refinement based on response rates and conversion metrics."
        ];
        return getRandomResponse(responses);
    }
    
    if (keywords.includes('messaging') || keywords.includes('outreach')) {
        const responses = [
            "Top messaging best practices: **Research First** - Study their profile and recent activity thoroughly. **Personalize Everything** - Reference specific details from their background or company. **Value-Led Opening** - Share industry insights or valuable resources. **Concise Format** - Keep initial messages under 300 characters. **Strategic Follow-up** - Continue providing value in subsequent touches.",
            "Effective outreach recommendations: Research each prospect individually, engage with their content before messaging, craft personalized messages with specific value propositions, use soft call-to-actions, leverage mutual connections when possible, and maintain consistent but valuable follow-up sequences.",
            "Optimize your messaging approach: Lead with relevant insights rather than sales pitches, reference mutual connections or shared experiences, address industry-specific challenges they might face, keep initial outreach conversational and brief, and always provide clear next steps or value in follow-ups."
        ];
        return getRandomResponse(responses);
    }
    
    if (keywords.includes('best practices') || keywords.includes('tips')) {
        return "Sales Navigator best practices: **Profile Optimization** - Professional, complete LinkedIn profile. **Systematic Prospecting** - Daily search and engagement routines. **Content Engagement** - Meaningful interactions before outreach. **Personalized Messaging** - Customized approaches for each prospect. **Performance Tracking** - Monitor metrics and refine strategies based on results.";
    }
    
    if (keywords.includes('results') || keywords.includes('performance')) {
        return "Improve your Sales Navigator results: Set clear daily activity goals, track response rates and conversion metrics, A/B test different message approaches, engage with prospect content before outreach, use TeamLink for warm introductions, maintain consistent follow-up schedules, and regularly review and refine your ideal customer profile.";
    }
    
    const generalRecommendations = [
        "For best results with Sales Navigator, focus on building genuine relationships, providing value in every interaction, and maintaining consistent prospecting activities. What specific area would you like recommendations for?",
        "Success with Sales Navigator requires a strategic approach: clear target definition, systematic prospecting, authentic engagement, personalized outreach, and consistent performance measurement. Which aspect interests you most?",
        "My recommendations center on relationship-first selling: thorough research, value-driven engagement, personalized communication, and long-term relationship development. What particular challenge can I help you address?"
    ];
    return getRandomResponse(generalRecommendations);
}

function generateTroubleshootingResponse(keywords, message) {
    if (message.includes('not working') || message.includes('error') || message.includes('broken')) {
        const responses = [
            "Common Sales Navigator issues and solutions: **Browser Issues** - Clear cache and cookies, try incognito mode. **Subscription** - Verify your account status and permissions. **Compatibility** - Use supported browsers (Chrome, Firefox, Safari). **Network** - Check internet connection stability. If problems persist, contact LinkedIn support with specific error details.",
            "Troubleshooting Sales Navigator problems: First, try refreshing the page and clearing your browser cache. Check if you're logged into the correct LinkedIn account with Sales Navigator access. Try using a different browser or incognito mode. For persistent issues, note the specific error message and contact LinkedIn support.",
            "Sales Navigator troubleshooting steps: **Quick Fixes** - Refresh page, clear cache, try incognito mode. **Account Check** - Verify subscription status and permissions. **Browser Test** - Try different browsers or disable extensions. **Network Test** - Check internet connection. **Support** - Contact LinkedIn with specific error details if issues continue."
        ];
        return getRandomResponse(responses);
    }
    
    if (message.includes('slow') || message.includes('loading') || message.includes('performance')) {
        const responses = [
            "To improve Sales Navigator performance: **Browser Optimization** - Close unnecessary tabs and disable unused extensions. **Clear Data** - Remove cache and browsing data. **Network Check** - Verify internet connection speed. **Search Scope** - Large searches with many filters can take longer to process.",
            "Speed up Sales Navigator: Close other browser tabs consuming memory, clear your cache and cookies, disable browser extensions temporarily, check your internet connection speed, and consider breaking large searches into smaller, more focused queries for faster results.",
            "Performance optimization tips: **Memory Management** - Close unused tabs and applications. **Browser Maintenance** - Clear cache regularly and update to latest version. **Search Strategy** - Use more specific filters to reduce result processing time. **Connection** - Ensure stable, high-speed internet access."
        ];
        return getRandomResponse(responses);
    }
    
    if (message.includes('search') && (message.includes('results') || message.includes('finding'))) {
        return "If you're not finding the right search results: **Broaden Filters** - Remove some restrictive criteria initially. **Keyword Strategy** - Try different job titles, skills, or industry terms. **Boolean Logic** - Use OR to expand, AND to narrow searches. **Geographic Settings** - Check location filters aren't too restrictive. **Save & Refine** - Save searches and adjust based on result quality.";
    }
    
    if (message.includes('message') && (message.includes('send') || message.includes('delivery'))) {
        return "Message delivery issues: **Connection Status** - Verify if you're connected to the recipient. **InMail Credits** - Check if you have available InMail credits for non-connections. **Message Limits** - Ensure you haven't exceeded daily messaging limits. **Account Status** - Confirm your Sales Navigator subscription is active. **Content Guidelines** - Review LinkedIn's messaging policies.";
    }
    
    if (message.includes('login') || message.includes('access') || message.includes('permission')) {
        return "Access issues troubleshooting: **Account Verification** - Ensure you're using the correct LinkedIn credentials. **Subscription Status** - Verify your Sales Navigator subscription is active and current. **Admin Permissions** - Check with your team admin if using a company account. **Browser Settings** - Clear cookies and try logging in with incognito mode.";
    }
    
    const generalTroubleshooting = [
        "I'm here to help troubleshoot your Sales Navigator challenges. Could you describe the specific issue you're encountering in more detail?",
        "For effective troubleshooting, please share more specifics about the problem: What were you trying to do? What happened instead? Any error messages? This helps me provide more targeted solutions.",
        "Let me help resolve your Sales Navigator issue. What specific feature or function isn't working as expected? The more details you provide, the better I can assist with a solution."
    ];
    return getRandomResponse(generalTroubleshooting);
}

function generateKeywordBasedResponse(keywords, message) {
    // Multi-keyword sophisticated responses
    if (keywords.includes('leads') && keywords.includes('search')) {
        return "Effective lead searching combines precise filtering with strategic keyword usage. Start with broad criteria, then layer specific filters like industry, location, and seniority. Use boolean search with relevant job titles and skills. Save successful searches to receive ongoing lead updates automatically.";
    }
    
    if (keywords.includes('messaging') && keywords.includes('networking')) {
        return "Combine messaging with networking by: 1) Connecting first when possible, 2) Engaging with their content before reaching out, 3) Leveraging mutual connections for warm introductions, 4) Sharing relevant industry insights, and 5) Building relationships gradually rather than rushing to sales conversations.";
    }
    
    if (keywords.includes('data') && keywords.includes('sales')) {
        return "Leverage Sales Navigator analytics by tracking: message response rates, connection acceptance rates, search result quality, lead conversion metrics, and account engagement levels. Use this data to refine your targeting, messaging, and overall sales approach for better results.";
    }
    
    // Single keyword responses with more context
    if (keywords.includes('leads')) {
        return "Lead generation in Sales Navigator works best with a systematic approach: define your ideal customer profile, use precise search filters, engage with prospects' content before outreach, and maintain consistent follow-up sequences. Quality over quantity always wins.";
    }
    
    if (keywords.includes('accounts')) {
        return "Account-based selling through Sales Navigator: research target companies thoroughly, identify multiple stakeholders, track company news and updates, coordinate team efforts, and build relationships across the organization rather than focusing on single contacts.";
    }
    
    // Default intelligent response
    return "I understand you're asking about " + (keywords.length > 0 ? keywords.join(' and ') : "Sales Navigator") + ". Could you provide more specific details about your situation or what you're trying to achieve? This will help me give you more targeted advice.";
}

// Add entrance animations
window.addEventListener('load', async () => {
    try {
        // Load configuration first
        await loadConfiguration();
        
        // Wait a bit for DOM to be ready
        setTimeout(() => {
            // Generate help content from config
            generateHelpContent();
        }, 100);
        
    } catch (error) {
        console.error('Error during page initialization:', error);
        // Fallback: set greeting manually if config fails
        const greetingElement = document.querySelector('.help-greeting p');
        if (greetingElement) {
            greetingElement.textContent = "HELLO!! Sam, you saved 15 leads last week. Here are 3 recommendations to boost productivity";
        }
    }
    
    // Create floating help button
    createFloatingHelpButton();
    
    // Initialize follow-up input functionality
    handleFollowUpMessage();
    
    // Add styles for follow-up AI response (grey style)
    if (!document.querySelector('style[data-ai-response]')) {
        const style = document.createElement('style');
        style.setAttribute('data-ai-response', 'true');
        style.textContent = `
                         .ai-response-message {
                 background: #F5F5F5;
                 border-radius: 16px;
                 padding: 18px 16px;
                 width: fit-content;
                 max-width: calc(100% - 16px);
                 word-wrap: break-word;
                 overflow-wrap: break-word;
                 font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
                 font-size: 14px;
                 font-weight: 400;
                 line-height: 1.25;
                 color: rgba(0, 0, 0, 0.9);
                 margin: 0 16px 0 0;
             }
            
            .ai-response-message .response-content {
                margin: 0;
                font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
                font-size: 14px;
                font-weight: 400;
                line-height: 1.25;
                color: rgba(0, 0, 0, 0.9);
            }
            
            .ai-response-message .feedback-buttons {
                display: flex;
                gap: 8px;
                margin-top: 12px;
                justify-content: flex-end;
            }
            
            .ai-response-message .feedback-btn {
                background: none;
                border: 1px solid rgba(0, 0, 0, 0.15);
                border-radius: 20px;
                padding: 6px 12px;
                cursor: pointer;
                transition: all 0.2s ease;
                color: rgba(0, 0, 0, 0.6);
                font-size: 14px;
            }
            
                         .ai-response-message .feedback-btn:hover {
                 background: rgba(0, 0, 0, 0.05);
                 border-color: rgba(0, 0, 0, 0.25);
             }
             
             .grey-message {
                 background: #F5F5F5;
                 border-radius: 16px;
                 padding: 18px 16px;
                 width: fit-content;
                 max-width: calc(100% - 16px);
                 margin: 0 16px 0 0;
                 word-wrap: break-word;
                 overflow-wrap: break-word;
                 font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
                 font-size: 14px;
                 font-weight: 400;
                 line-height: 1.25;
                 color: rgba(0, 0, 0, 0.9);
             }
             
             .grey-message p {
                 margin: 0;
                 font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
                 font-size: 14px;
                 font-weight: 400;
                 line-height: 1.25;
                 color: rgba(0, 0, 0, 0.9);
             }
             
             .grey-message-container {
                 display: flex !important;
                 justify-content: flex-start !important;
             }
             
             .user-message-container {
                 margin-top: 16px;
             }
             
             .user-message-container:first-child {
                 margin-top: 0;
             }
             

         `;
         document.head.appendChild(style);
    }
    

}); 