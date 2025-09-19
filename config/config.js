const chatConfig = {
  flowURL: "https://api.zerowidth.ai/v1/process/jEtdtYF8iVXc3BdCVg0b/lD0dqGu2Gz2jNaGRXFVr",
  
  header: {
    title: "Chat with Mehak.ai", // Use Literata font for this
    description: "I am an AI assistant built to help you get to know Mehak",
  },

  suggestedPromptsTitle: "Here are some suggested prompts.",
  suggestedPrompts: [
    "What accomplishments from your past positions are you most proud of?",
    "Do you prefer to work within a team? Are you more of a leader or a collaborator?",
    "Where did you study, and what degree(s) do you hold?",
  ],

  chatInputPlaceholder: "Chat with this agent...",
  maxChatHeight: 480, // Fixed height

  // Custom styling overrides
  customStyles: {
    // Header title should use Literata font
    headerTitle: {
      fontFamily: "'Literata', serif",
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#ffffff"
    },
    
    // Header container
    header: {
      backgroundColor: "#242424",
      padding: "24px",
      borderRadius: "4px 4px 0 0"
    },
    
    // Send button styling
    sendButton: {
      backgroundColor: "#242424",
      borderRadius: "4px",
      padding: "8px 12px",
      border: "none",
      cursor: "pointer"
    },
    
    // Send button arrow (white)
    sendButtonIcon: {
      color: "#ffffff",
      fontSize: "16px"
    },
    
    // Overall widget
    widget: {
      borderRadius: "4px",
      height: "480px",
      maxHeight: "480px",
      overflow: "hidden"
    },
    
    // AI message bubble
    aiMessage: {
      backgroundColor: "#e9ecef",
      borderRadius: "4px",
      padding: "12px 16px",
      marginBottom: "8px"
    }
  }
};

export default chatConfig;
