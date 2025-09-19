const chatConfig = {
  flowURL: "https://api.zerowidth.ai/v1/process/jEtdtYF8iVXc3BdCVg0b/lD0dqGu2Gz2jNaGRXFVr",
  
  header: {
    title: "Chat with Mehak.ai",
    description: "I am an AI assistant built to help you get to know Mehak",
  },

  suggestedPromptsTitle: "Here are some suggested prompts.",
  suggestedPrompts: [
    "What accomplishments from your past positions are you most proud of?",
    "Do you prefer to work within a team? Are you more of a leader or a collaborator?",
    "Where did you study, and what degree(s) do you hold?",
  ],

  chatInputPlaceholder: "Chat with this agent...",
  maxChatHeight: 400, // Reduced from 480px

  // Show all prompts at once (no rotation)
  showAllPrompts: true,
  promptsClickable: true,
  rotatePrompts: false,

  // Layout settings to prevent empty space
  compactLayout: true,
  removeEmptySpace: true,

  // Styling configuration
  styling: {
    height: 400, // Reduced height
    minHeight: 400,
    borderRadius: 4,
    primaryColor: "#242424",
    fontFamily: "Poppins",
    titleFontFamily: "Literata",
    padding: 16, // Reduced padding
    promptsInputGap: 12, // Smaller gap
  },

  // Send button configuration
  sendButton: {
    backgroundColor: "#242424",
    iconColor: "#ffffff",
    iconType: "arrow-up",
    borderRadius: 4
  },

  // Custom CSS styles
  customStyles: {
    headerTitle: {
      fontFamily: "'Literata', serif",
      fontSize: "1.25rem", // Slightly smaller
      fontWeight: "600",
      color: "#ffffff"
    },
    
    header: {
      backgroundColor: "#242424",
      padding: "16px", // Reduced padding
      borderRadius: "4px 4px 0 0"
    },
    
    widget: {
      borderRadius: "4px",
      height: "400px", // Fixed smaller height
      maxHeight: "400px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column"
    },
    
    chatArea: {
      flex: "1", // Take available space
      padding: "16px",
      backgroundColor: "#ffffff",
      overflow: "hidden"
    },
    
    aiMessage: {
      backgroundColor: "#e9ecef",
      borderRadius: "4px",
      padding: "12px 16px",
      marginBottom: "16px"
    },

    promptsContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      marginTop: "auto", // Push to bottom
      marginBottom: "12px"
    },

    promptButton: {
      padding: "10px 12px",
      backgroundColor: "#f8f9fa",
      border: "1px solid #e9ecef",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      textAlign: "left"
    }
  }
};

export default chatConfig;
