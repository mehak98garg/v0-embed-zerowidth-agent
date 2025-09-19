// Modern Chat Widget Demo Interface

const Index = () => {
  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <header className="text-center py-8 mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Modern Chat Widget
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A responsive, accessible chat interface built with React and Tailwind CSS. 
            Perfect for customer support, AI assistants, and interactive conversations.
          </p>
        </header>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
            <h3 className="font-semibold text-lg mb-2 text-card-foreground">Fully Responsive</h3>
            <p className="text-muted-foreground text-sm">
              Adapts perfectly to mobile, tablet, and desktop screens with optimized layouts.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
            <h3 className="font-semibold text-lg mb-2 text-card-foreground">Accessible</h3>
            <p className="text-muted-foreground text-sm">
              Built with ARIA labels, keyboard navigation, and proper focus management.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
            <h3 className="font-semibold text-lg mb-2 text-card-foreground">Smooth Animations</h3>
            <p className="text-muted-foreground text-sm">
              Delightful micro-interactions and smooth transitions enhance the user experience.
            </p>
          </div>
        </div>

        {/* Demo Section */}
        <div className="bg-card p-8 rounded-lg border border-border shadow-sm">
          <h2 className="text-2xl font-semibold text-center mb-6 text-card-foreground">
            Interactive Demo
          </h2>
          
          {/* Chat Widget Container */}
          <div className="w-full mx-auto" style={{ maxWidth: "1040px" }}>
            <div className="bg-background border-2 border-dashed border-border/40 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Chat Widget Container (Responsive: 320px - 1040px)
              </p>
              
              {/* Professional Chat Interface Demo */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="font-medium text-gray-900">AI Assistant</h3>
                  <p className="text-sm text-gray-600">Online</p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="bg-blue-100 text-blue-800 p-3 rounded-lg max-w-xs">
                    Hello! I'm your AI assistant. How can I help you today?
                  </div>
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-xs ml-auto">
                    This is a demo of the chat interface design
                  </div>
                </div>
                <div className="border-t border-gray-200 p-4">
                  <div className="flex space-x-2">
                    <input 
                      type="text" 
                      placeholder="Type your message..." 
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      disabled
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="font-semibold text-lg mb-4 text-card-foreground">Responsive Breakpoints</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><strong>Mobile:</strong> &lt; 768px - Full width with 16px margins</li>
              <li><strong>Tablet:</strong> 768px - 1024px - Max width 600px, centered</li>
              <li><strong>Desktop:</strong> &gt; 1024px - Max width 1040px, centered</li>
              <li><strong>Height:</strong> Flexible, max-height 80vh with scroll</li>
            </ul>
          </div>
          
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="font-semibold text-lg mb-4 text-card-foreground">Key Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Customizable header with title and status</li>
              <li>• Suggested prompts with responsive grid</li>
              <li>• Real-time message bubbles with timestamps</li>
              <li>• Auto-scroll to latest messages</li>
              <li>• Loading states and typing indicators</li>
              <li>• Professional design system</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
