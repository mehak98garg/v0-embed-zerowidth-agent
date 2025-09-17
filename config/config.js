const chatConfig = {
  // API Configuration
  flowURL: "https://api.zerowidth.ai/v1/process/jEtdtYF8iVXc3BdCVg0b/lD0dqGu2Gz2jNaGRXFVr",
  
  // Header Configuration
  header: {
    title: "Chat with Mehak.ai",
    titleFont: "Literata", // Custom font for title
    description: "I am an AI assistant built to help you get to know Mehak",
    showOnlineStatus: true,
    onlineText: "Online"
  },

  // Styling Configuration
  styling: {
    // Overall widget dimensions
    width: 1040, // Desktop width in px
    height: 480, // Fixed height in px
    borderRadius: 4, // All corners 4px
    
    // Color scheme
    primaryColor: "#242424", // Header background and send button
    backgroundColor: "#ffffff",
    textColor: "#000000",
    
    // Typography
    fontFamily: "Poppins", // Body text font
    titleFontFamily: "Literata", // Header title font
    
    // Spacing
    padding: 24, // General padding
    promptsInputGap: 16, // Reduced gap between prompts and input
    
    // Message bubbles
    messageBorderRadius: 4, // AI assistant message corners
    userMessageColor: "#007bff",
    aiMessageBackground: "#e9ecef"
  },

  // Suggested Prompts Configuration
  suggestedPromptsTitle: "Here are some suggested prompts.",
  suggestedPrompts: [
    "What accomplishments from your past positions are you most proud of?",
    "Do you prefer to work within a team? Are you more of a leader or a collaborator?",
    "Where did you study, and what degree(s) do you hold?"
  ],
  
  // Prompts behavior
  promptsConfig: {
    rotatePrompts: true, // Enable rotation
    rotationInterval: 4500, // 4.5 seconds between rotations
    showOneAtATime: true, // Show one prompt at a time
    clickable: true, // Make prompts clickable
    fadeTransition: true // Smooth fade between prompts
  },

  // Input Configuration
  chatInputPlaceholder: "Chat with this agent...",
  
  // Send Button Configuration
  sendButton: {
    backgroundColor: "#242424",
    iconColor: "#ffffff",
    iconType: "arrow-up", // Upward facing arrow
    borderRadius: 4
  },

  // Layout Configuration
  layout: {
    headerHeight: "auto",
    promptsPosition: "above-input", // Position prompts right above input
    chatAreaFlex: true, // Use flexbox for middle spacing
    inputPosition: "bottom"
  },

  // Responsive Breakpoints
  responsive: {
    mobile: {
      maxWidth: 768,
      margin: 16,
      height: 480
    },
    tablet: {
      maxWidth: 1024,
      width: 600,
      height: 480
    },
    desktop: {
      minWidth: 1024,
      width: 1040,
      height: 480
    }
  },

  // Animation Configuration
  animations: {
    messageAppear: true,
    promptFade: true,
    hoverEffects: true,
    loadingStates: true
  }
};

export default chatConfig;
