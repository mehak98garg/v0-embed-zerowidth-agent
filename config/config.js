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
    description: "Ask me about Mehak's work, skills, or experience",
    showOnlineStatus: true,
  },
  suggestedPromptsTitle: "Here are some suggested prompts.",
  suggestedPrompts: [
    "What accomplishments are you most proud of?",
    "Are you more of a leader or a collaborator?",
    "What are your qualifications?"
  ],
  chatInputPlaceholder: "Chat with this agent...",
  maxChatHeight: 480,
  
  // New styling options to match the lovable design
  styling: {
    // Header styling
    headerBackground: "#000000",
    headerTextColor: "#FFFFFF",
    headerFont: "font-semibold",
    
    // Chat area styling
    chatBackground: "#F9F9F9",
    userBubbleBackground: "#7A7A7A",
    userBubbleTextColor: "#FFFFFF",
    aiBubbleBackground: "#FFFFFF",
    aiBubbleTextColor: "#000000",
    
    // Suggested prompts styling
    promptBackground: "#FFFFFF",
    promptBorder: "#E0E0E0",
    promptHoverBackground: "#F5F5F5",
    
    // Input styling
    inputBackground: "#FFFFFF",
    buttonBackground: "#242424",
    buttonHoverBackground: "#E5E5E5",
  },
  
  // Animation and behavior options
  behavior: {
    rotatePrompts: false,
    rotationInterval: 4500,
    showTypingIndicator: true,
    autoHidePrompts: false,
  }
};
export default chatConfig;
