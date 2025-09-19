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
  maxChatHeight: 480,

  // Show all prompts at once (no rotation)
  showAllPrompts: true,
  promptsClickable: true,
  rotatePrompts: false,

  // Styling configuration
  styling: {
    height: 480,
    borderRadius: 4,
    primaryColor: "#242424",
    fontFamily: "Poppins",
    titleFontFamily: "Literata",
    padding: 24,
    promptsInputGap: 16,
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
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#ffffff"
    },
    
    header: {
      backgroundColor: "#242424",
      padding: "24px",
      borderRadius: "4px 4px 0 0"
    },
    
    widget: {
      borderRadius: "4px",
      height: "480px",
      maxHeight: "480px",
      overflow: "hidden"
    },
    
    aiMessage: {
      backgroundColor: "#e9ecef",
      borderRadius: "4px",
      padding: "12px 16px",
      marginBottom: "8px"
    },

    promptsContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      marginBottom: "16px"
    },

    promptButton: {
      padding: "12px 16px",
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
