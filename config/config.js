// config.js
// =============================================================================
// Chat Application Configuration
// =============================================================================
// This configuration file stores metadata and descriptions related to the Chat Agent component.
// The goal is to keep the main component clean and maintainable.
//
// Key Features:
// - Stores the descriptive header for the chat component.
// - Provides metadata such as the author and version.
// - Can be extended for additional configuration settings in the future.
// =============================================================================

const chatConfig = {
  flowURL:
    "https://api.zerowidth.ai/v1/process/jEtdtYF8iVXc3BdCVg0b/lD0dqGu2Gz2jNaGRXFVr",
  header: {
    title: "Chat with Mehak.ai",
    description:
      "I am an AI assistant built to help you get to know Mehak",
  },
  suggestedPromptsTitle: "Here are some suggested prompts.",
  suggestedPrompts: [
    "What accomplishments from yout past positions are you most proud of?",
    "Do you prefer to work within a team? Are you more of a leader or a collaborator?",
    "Where did you study, and what degree(s) do you hold?",
  ],
  chatInputPlaceholder: "Chat with this agent...",
  maxChatHeight: 400,
};

export default chatConfig;
