// config.js
// =============================================================================
// Chat Application Configuration (Lovable-aligned)
// =============================================================================

const chatConfig = {
  // ---------------------------------------------------------------------------
  // Backend Flow URL (Zerowidth, v1)
  // ---------------------------------------------------------------------------
  flowURL: "https://api.zerowidth.ai/v1/process/jEtdtYF8iVXc3BdCVg0b/lD0dqGu2Gz2jNaGRXFVr",

  // ---------------------------------------------------------------------------
  // Copy: mirrors the Lovable TSX defaults
  // ---------------------------------------------------------------------------
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

  // Matches h-[480px] used in the TSX component
  maxChatHeight: 480,

  // ---------------------------------------------------------------------------
  // Theme Tokens: colors, fonts, radii, shadows — tuned to the Lovable look
  // ---------------------------------------------------------------------------
  theme: {
    fonts: {
      heading: '"Literata", serif',
      body:
        'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    },
    colors: {
      background: "#ffffff",
      border: "#E5E7EB",
      foreground: "#111827",
      mutedForeground: "#6B7280",

      chatHeaderBg: "#0F1115",
      chatHeaderFg: "#F9FAFB",

      online: "#34D399",

      aiBubbleBg: "#F3F4F6",
      aiBubbleFg: "#111827",
      userBubbleBg: "#111827",
      userBubbleFg: "#F9FAFB",

      suggestionBg: "#FAFAFB",
      suggestionHoverBg: "#F3F4F6",
      suggestionBorder: "#E5E7EB",

      primaryHover: "#1F2937",
      primary: "#3B82F6",
    },
    radii: {
      widget: "4px",
      bubble: "12px",
    },
    shadows: {
      widget:
        "0 12px 24px rgba(0,0,0,0.10), 0 4px 10px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
      message: "0 1px 2px rgba(0,0,0,0.06)",
    },
  },
};

// -----------------------------------------------------------------------------
// Auto-injected CSS mapping the tokens to the utility class names used by TSX
// -----------------------------------------------------------------------------
function buildThemeCSS(cfg) {
  const { colors, fonts, radii, shadows } = cfg.theme;

  return `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Literata:opsz,wght@7..72,600&display=swap');

:root{
  --font-heading: ${fonts.heading};
  --font-body: ${fonts.body};
  --color-background: ${colors.background};
  --color-border: ${colors.border};
  --color-foreground: ${colors.foreground};
  --color-muted-foreground: ${colors.mutedForeground};
  --color-chat-header-bg: ${colors.chatHeaderBg};
  --color-chat-header-fg: ${colors.chatHeaderFg};
  --color-online: ${colors.online};
  --color-ai-bubble-bg: ${colors.aiBubbleBg};
  --color-ai-bubble-fg: ${colors.aiBubbleFg};
  --color-user-bubble-bg: ${colors.userBubbleBg};
  --color-user-bubble-fg: ${colors.userBubbleFg};
  --color-suggestion-bg: ${colors.suggestionBg};
  --color-suggestion-hover: ${colors.suggestionHoverBg};
  --color-suggestion-border: ${colors.suggestionBorder};
  --color-primary: ${colors.primary};
  --color-primary-hover: ${colors.primaryHover};
  --radius-widget: ${radii.widget};
  --radius-bubble: ${radii.bubble};
  --shadow-widget: ${shadows.widget};
  --shadow-message: ${shadows.message};
}

body { font-family: var(--font-body); }
.font-literata { font-family: var(--font-heading); }

.bg-background { background-color: var(--color-background); }
.text-foreground { color: var(--color-foreground); }
.text-muted-foreground { color: var(--color-muted-foreground); }
.border-border { border-color: var(--color-border) !important; }

.bg-chat-header { background-color: var(--color-chat-header-bg); }
.text-chat-header-foreground { color: var(--color-chat-header-fg); }

.bg-chat-ai-bubble { background-color: var(--color-ai-bubble-bg); }
.text-chat-ai-bubble-foreground { color: var(--color-ai-bubble-fg); }

.bg-chat-user-bubble { background-color: var(--color-user-bubble-bg); }
.text-chat-user-bubble-foreground { color: var(--color-user-bubble-fg); }

.bg-chat-suggestion { background-color: var(--color-suggestion-bg); }
.border-chat-suggestion-border { border-color: var(--color-suggestion-border) !important; }
.hover\\:bg-chat-suggestion-hover:hover { background-color: var(--color-suggestion-hover); }

.hover\\:bg-primary-hover:hover { background-color: var(--color-primary-hover); }
.bg-green-400 { background-color: var(--color-online) !important; }

.shadow-widget { box-shadow: var(--shadow-widget); }
.shadow-message { box-shadow: var(--shadow-message); }
.rounded-\\[4px\\] { border-radius: var(--radius-widget); }
.rounded-xl { border-radius: var(--radius-bubble); }

@keyframes slideUp { from { opacity:0; transform: translateY(8px) } to { opacity:1; transform: translateY(0) } }
@keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
@keyframes bounceIn { 0%{opacity:.6; transform:scale(.96)} 60%{opacity:1; transform:scale(1.02)} 100%{transform:scale(1)} }
@keyframes bounce { 0%, 100% { transform: translateY(-15%); } 50% { transform: translateY(15%);} }

.animate-slide-up { animation: slideUp 320ms ease-out both; }
.animate-fade-in { animation: fadeIn 280ms ease-out both; }
.animate-bounce-in { animation: bounceIn 360ms cubic-bezier(.17,.67,.19,1.34) both; }
.animate-bounce { animation: bounce 1s infinite; }

input:focus, textarea:focus {
  outline: none;
  border-color: var(--color-primary) !important;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.25);
}

.max-w-\\[1040px\\] { max-width: 1040px; }
.h-\\[480px\\] { height: 480px; }
`;
}

function injectThemeCSS(cssText) {
  if (typeof document === "undefined") return;
  const STYLE_ID = "chat-widget-theme";
  let tag = document.getElementById(STYLE_ID);
  if (!tag) {
    tag = document.createElement("style");
    tag.id = STYLE_ID;
    document.head.appendChild(tag);
  }
  tag.textContent = cssText;
}

chatConfig.__applyTheme = function () {
  try {
    injectThemeCSS(buildThemeCSS(chatConfig));
  } catch (err) {
    console.warn("[chat-config] theme injection skipped:", err);
  }
};

if (typeof window !== "undefined") {
  chatConfig.__applyTheme();
}

export default chatConfig;
