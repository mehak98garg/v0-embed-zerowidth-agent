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
    "https://api.zerowidth.ai/v1/process/UvxlzCFXzR3aAgvsD8Nf/QDcqFRhjjrjZUTHsvxWX",
  header: {
    title: "Chat with me",
    description:
      "Mehak is a Product Designer based in San Francisco. She is currently pursuing her Master's in Interaction Design at California College of the Arts. I am an AI assistant built to help you get to know her more.",
  },
  suggestedPromptsTitle: "Here are some suggested prompts.",
  suggestedPrompts: [
    "What accomplishments from her past positions is she most proud of?",
    "Does she prefer to work within a team? Is she more of a leader or a collaborator?",
    "Where did she study, and what degree(s) does she hold?",
  ],
  chatInputPlaceholder: "Chat with this agent...",
  maxChatHeight: 200,
};

export default chatConfig;
