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
  
  // KEY: Show all prompts simultaneously (NOT rotating like Lovable code)
  showAllPrompts: true,
  rotatePrompts: false,
  promptsClickable: true,
  
  // Layout matching Lovable component
  layout: {
    height: "480px",
    borderRadius: "4px",
    flexDirection: "column"
  },
  
  // Header styling (matches Lovable's header)
  headerStyle: {
    backgroundColor: "#242424", // bg-chat-header
    color: "#ffffff", // text-chat-header-foreground
    fontFamily: "'Literata', serif", // font-literata
    fontSize: "18px",
    fontWeight: "600",
    padding: "24px",
    borderRadius: "4px 4px 0 0"
  },
  
  // Welcome message styling (matches Lovable's AI bubble)
  aiMessageStyle: {
    backgroundColor: "#f1f5f9", // bg-chat-ai-bubble
    color: "#0f172a", // text-chat-ai-bubble-foreground
    borderRadius: "12px",
    padding: "16px",
    marginTop: "24px",
    marginBottom: "16px",
    maxWidth: "80%",
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)"
  },
  
  // Prompts container (shows ALL prompts, not rotating)
  promptsStyle: {
    container: {
      padding: "0 24px 16px 24px",
      marginBottom: "0"
    },
    title: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#0f172a",
      marginBottom: "12px"
    },
    // Show all prompts in a stack
    promptsList: {
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    },
    button: {
      backgroundColor: "#f8f9fa", // bg-chat-suggestion
      border: "1px solid #e2e8f0", // border-chat-suggestion-border
      borderRadius: "6px",
      padding: "12px",
      fontSize: "14px",
      textAlign: "left",
      cursor: "pointer",
      width: "100%",
      minHeight: "auto",
      transition: "all 0.2s ease",
      hover: {
        backgroundColor: "#f1f5f9", // hover:bg-chat-suggestion-hover
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)" // hover:shadow-message
      }
    }
  },
  
  // Input area styling (matches Lovable's input)
  inputStyle: {
    container: {
      borderTop: "1px solid #e2e8f0",
      padding: "24px",
      display: "flex",
      alignItems: "center",
      gap: "12px"
    },
    input: {
      flex: "1",
      border: "1px solid #e2e8f0",
      borderRadius: "6px",
      padding: "8px 12px",
      fontSize: "14px",
      backgroundColor: "#ffffff"
    },
    sendButton: {
      backgroundColor: "#242424", // bg-chat-header  
      color: "#ffffff", // text-chat-header-foreground
      borderRadius: "6px",
      padding: "8px 12px",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    sendIcon: {
      width: "16px",
      height: "16px",
      // Use ArrowUp icon (↑)
      content: "↑"
    }
  },
  
  // Chat area styling
  chatAreaStyle: {
    flex: "1",
    padding: "0 24px",
    display: "flex",
    flexDirection: "column",
    minHeight: "0",
    overflow: "hidden"
  },
  
  // Animation classes (matching Lovable)
  animations: {
    slideUp: true,
    fadeIn: true,
    bounceIn: true
  },
  
  // Responsive behavior
  responsive: {
    mobile: {
      maxWidth: "768px",
      margin: "16px",
      padding: "16px"
    },
    tablet: {
      maxWidth: "1024px",
      width: "600px"
    },
    desktop: {
      maxWidth: "1040px",
      width: "1040px"
    }
  }
};

export default chatConfig;
