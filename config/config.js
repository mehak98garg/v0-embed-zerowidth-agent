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
  
  // Match Lovable's responsive design
  maxChatHeight: "auto", // Let it size naturally
  
  // Display all prompts at once
  showAllPrompts: true,
  promptsClickable: true,
  rotatePrompts: false,
  
  // Remove empty space issues
  compactMode: true,
  autoHeight: true,
  // Responsive breakpoints matching Lovable specs
  responsive: {
    mobile: {
      maxWidth: 768,
      margin: "16px",
      fullWidth: true
    },
    tablet: {
      minWidth: 768,
      maxWidth: 1024,
      width: "600px",
      centered: true
    },
    desktop: {
      minWidth: 1024,
      width: "1040px",
      maxWidth: "1040px",
      centered: true
    }
  },
  // Clean styling to match Lovable design
  theme: {
    borderRadius: "4px",
    fontFamily: "system-ui, -apple-system, sans-serif",
    
    colors: {
      primary: "#242424",
      background: "#ffffff",
      card: "#f8f9fa",
      border: "#e2e8f0",
      text: "#1a1a1a",
      muted: "#6b7280"
    },
    
    spacing: {
      padding: "1rem",
      gap: "0.5rem",
      headerPadding: "1.5rem"
    }
  },
  // Header styling with Literata font
  headerStyle: {
    backgroundColor: "#242424",
    color: "#ffffff",
    fontFamily: "'Literata', serif",
    fontSize: "1.25rem",
    fontWeight: "600",
    padding: "1.5rem",
    borderRadius: "4px 4px 0 0"
  },
  // Message styling
  messageStyle: {
    ai: {
      backgroundColor: "#f1f5f9",
      borderRadius: "4px",
      padding: "0.75rem 1rem",
      marginBottom: "0.5rem",
      maxWidth: "100%"
    }
  },
  // Prompts styling
  promptsStyle: {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      padding: "1rem",
      marginBottom: "0.5rem"
    },
    button: {
      backgroundColor: "#f8f9fa",
      border: "1px solid #e2e8f0",
      borderRadius: "4px",
      padding: "0.75rem 1rem",
      fontSize: "0.875rem",
      textAlign: "left",
      cursor: "pointer",
      transition: "all 0.2s",
      hover: {
        backgroundColor: "#f1f5f9",
        borderColor: "#cbd5e1"
      }
    }
  },
  // Input area styling
  inputStyle: {
    container: {
      padding: "1rem",
      borderTop: "1px solid #e2e8f0"
    },
    input: {
      borderRadius: "4px",
      border: "1px solid #e2e8f0",
      padding: "0.75rem 1rem",
      fontSize: "0.875rem"
    },
    sendButton: {
      backgroundColor: "#242424",
      color: "#ffffff",
      borderRadius: "4px",
      padding: "0.75rem 1rem",
      border: "none",
      cursor: "pointer"
    }
  },
  // Layout configuration
  layout: {
    flexDirection: "column",
    height: "auto",
    minHeight: "400px",
    maxHeight: "80vh",
    overflow: "hidden"
  }
};

export default chatConfig;
