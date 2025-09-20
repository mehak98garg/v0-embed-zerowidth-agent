// config.js
// =============================================================================
// Chat Application Configuration
// =============================================================================
// This configuration file stores metadata and descriptions related to the Chat Agent component.
// Updated to match the Mehak.ai portfolio chatbot design
// =============================================================================

const chatConfig = {
  flowURL:
    "https://api.zerowidth.ai/v1/process/jEtdtYF8iVXc3BdCVg0b/lD0dqGu2Gz2jNaGRXFVr",
  header: {
    title: "Chat with Mehak.ai",
    description: "I am an AI assistant built to help you get to know Mehak",
    showOnlineStatus: true, // New option to show online indicator
  },
  suggestedPromptsTitle: "Here are some suggested prompts.",
  suggestedPrompts: [
    "What accomplishments from your past positions are you most proud of?",
    "Do you prefer to work within a team? Are you more of a leader or a collaborator?",
    "Where did you study, and what degree(s) do you hold?"
  ],
  chatInputPlaceholder: "Chat with this agent...",
  maxChatHeight: 480, // Increased height to match the design
  
  // New styling options to match the lovable design
  styling: {
    // Header styling
    headerBackground: "#2D2D2D", // Dark header background
    headerTextColor: "#FFFFFF", // White text
    headerFont: "font-semibold", // Semibold font weight
    
    // Chat area styling
    chatBackground: "#F9F9F9", // Light gray background for chat area
    userBubbleBackground: "#F4FFD0", // Light green background for user messages
    userBubbleTextColor: "#000000", // Black text for user messages
    aiBubbleBackground: "#E5E5E5", // Light gray for AI messages
    aiBubbleTextColor: "#000000", // Black text for AI messages
    
    // Suggested prompts styling
    promptBackground: "#FFFFFF", // White background for prompts
    promptBorder: "#E0E0E0", // Light border
    promptHoverBackground: "#F5F5F5", // Hover effect
    
    // Input styling
    inputBackground: "#FFFFFF", // White input background
    buttonBackground: "#242424", // Dark button - Updated to #242424
    buttonHoverBackground: "#F4FFD0", // Light green on hover
  },
  
  // Animation and behavior options
  behavior: {
    rotatePrompts: true, // Enable prompt rotation like in lovable
    rotationInterval: 4500, // 4.5 seconds between rotations
    showTypingIndicator: true, // Show typing indicator
    autoHidePrompts: true, // Hide prompts after first message
  }
};

export default chatConfig;
