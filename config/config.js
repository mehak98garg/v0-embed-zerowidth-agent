// config.js
// =============================================================================
// Chat Application Configuration
// =============================================================================

const chatConfig = {
  // Zerowidth Flow URL (v1)
  flowURL:
    "https://api.zerowidth.ai/v1/process/jEtdtYF8iVXc3BdCVg0b/lD0dqGu2Gz2jNaGRXFVr",

  // Header text (used by your repo’s component)
  header: {
    title: "Chat with Mehak.ai",
    description:
      "I am an AI assistant built to help you get to know Mehak",
  },

  // Suggested prompts
  suggestedPromptsTitle: "Here are some suggested prompts.",
  suggestedPrompts: [
    "What accomplishments from your past positions are you most proud of?",
    "Do you prefer to work within a team? Are you more of a leader or a collaborator?",
    "Where did you study, and what degree(s) do you hold?",
  ],

  // Input placeholder
  chatInputPlaceholder: "Chat with this agent...",

  // Lovable uses 480px height for the widget
  maxChatHeight: 480,
};

export default chatConfig;
