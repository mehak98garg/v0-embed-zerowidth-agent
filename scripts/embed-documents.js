import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Knowledge base content extracted from Mehak's documents
const documents = [
  {
    content: `Mehak Garg is currently a Product Manager at Cisco (July 2024 - Present) in San Jose, California. She previously served as a Product Manager at Synopsys (July 2023 - June 2024) in Sunnyvale, California, and as a Product Management Intern at Viasat (June 2022 - August 2022) in Carlsbad, California.`,
    category: 'work_experience',
    metadata: { source: 'resume', section: 'professional_experience' }
  },
  {
    content: `Mehak holds a Master of Science in Product Management from Carnegie Mellon University, Silicon Valley (August 2022 - May 2024) with a GPA of 3.89/4.0. She completed her Bachelor of Technology in Computer Science Engineering from SRM University, Chennai, India (July 2017 - July 2021) with a CGPA of 9.38/10.0.`,
    category: 'education',
    metadata: { source: 'resume', section: 'education' }
  },
  {
    content: `At Cisco, Mehak owns the AI strategy and roadmap for Cisco Defense Orchestrator (CDO), the cloud-based security policy and device management platform. She led the development of a gen AI-powered Ask CDO Assistant, driving strategic decisions on design and architecture. She conducted extensive user research with 20+ customers and 30+ customer-facing teams, partnering with Cisco CX to build the MVP. She presented key findings to leadership and stakeholders. She performed competitive analysis and market research to inform feature prioritization, and developed a comprehensive monitoring and observability plan.`,
    category: 'work_experience',
    metadata: { source: 'resume', section: 'cisco_details' }
  },
  {
    content: `At Synopsys, Mehak managed the roadmap for the Fusion Design Platform (FDP), a next-generation cloud-native SaaS platform serving 500+ customers and generating $23M annually. She worked closely with UX, engineering, and sales teams to align priorities and drive execution. She led discovery and requirement analysis for 3 key features, reducing customer churn by 20%. She established standardized review and approval processes for technical specifications and business requirements documents. She drove cross-functional alignment through comprehensive stakeholder management.`,
    category: 'work_experience',
    metadata: { source: 'resume', section: 'synopsys_details' }
  },
  {
    content: `Mehak's technical skills include: Product Management tools (JIRA, Miro, Figma, Microsoft Office Suite, Confluence, Asana, Monday, Productboard), Programming Languages (Python, JavaScript, C, C++, SQL), and Frameworks & Libraries (React JS, Bootstrap, Django, Tensorflow, Keras, Scikit-Learn, Pandas, Numpy). She is proficient in Data Analysis, User Research, Agile Development, A/B Testing, API Integration, Data Structures and Algorithms, and OOP.`,
    category: 'skills',
    metadata: { source: 'resume', section: 'technical_skills' }
  },
  {
    content: `Mehak's leadership style: She believes in setting a clear vision and empowering her team to achieve it. She's comfortable with ambiguity and can navigate complex situations. She values open communication and creates psychological safety for her team. She's data-driven but also trusts her intuition. She leads by example and isn't afraid to roll up her sleeves. She's passionate about developing others and helping them grow in their careers.`,
    category: 'leadership',
    metadata: { source: 'teammate_manual', section: 'leadership_philosophy' }
  },
  {
    content: `Working with Mehak: She's a morning person and does her best work early in the day (7am-12pm). She prefers written communication for important decisions so there's a record. She appreciates direct feedback and gives it in return. She needs context and the 'why' behind decisions. She's a visual thinker and benefits from diagrams and mockups. She values work-life balance and respects boundaries. When stressed, she might become more detail-oriented and need to zoom out. She recharges by spending time alone or with close friends.`,
    category: 'work_style',
    metadata: { source: 'teammate_manual', section: 'working_preferences' }
  },
  {
    content: `Mehak's approach to collaboration: She believes in collaborative leadership where everyone's voice is heard. She runs inclusive meetings where all participants can contribute. She documents decisions and action items clearly. She follows through on commitments and expects others to do the same. She's comfortable with constructive conflict and sees it as a path to better solutions. She values diversity of thought and actively seeks different perspectives.`,
    category: 'collaboration',
    metadata: { source: 'teammate_manual', section: 'collaboration_style' }
  },
  {
    content: `Mehak's key accomplishments: At Cisco, she drove the AI strategy for CDO and led development of the Ask CDO Assistant. At Synopsys, she managed a $23M platform and reduced customer churn by 20%. She has experience conducting extensive user research with 20+ customers and 30+ customer-facing teams. She has successfully driven cross-functional alignment and strategic decision-making at multiple companies.`,
    category: 'accomplishments',
    metadata: { source: 'resume', section: 'achievements' }
  },
  {
    content: `Mehak's product management philosophy: She's user-obsessed and starts with customer problems. She believes in data-informed (not data-driven) decision making. She values speed of learning over perfection. She thinks in outcomes, not outputs. She believes great products come from great teams. She's comfortable saying no to good ideas to focus on great ones. She measures success by customer impact, not features shipped.`,
    category: 'philosophy',
    metadata: { source: 'interview_prep', section: 'pm_approach' }
  },
  {
    content: `How Mehak handles ambiguity: She starts by clearly defining what's known and unknown. She identifies the riskiest assumptions and tests them first. She's comfortable making decisions with incomplete information. She sets clear decision-making frameworks. She communicates uncertainty transparently to stakeholders. She builds in feedback loops to course-correct quickly. She trusts her intuition while validating with data.`,
    category: 'problem_solving',
    metadata: { source: 'interview_prep', section: 'handling_ambiguity' }
  },
  {
    content: `Mehak's approach to stakeholder management: She maps stakeholders early and understands their motivations. She communicates proactively and frequently. She tailors her message to each audience. She builds trust through consistency and follow-through. She's transparent about trade-offs and constraints. She involves stakeholders in the solution, not just the problem. She manages up effectively and keeps leadership informed.`,
    category: 'stakeholder_management',
    metadata: { source: 'interview_prep', section: 'stakeholder_approach' }
  },
  {
    content: `Letter of Recommendation from Dr. Neetu Singh (Assistant Professor, SRM University): "Mehak Garg was one of the most outstanding students I have had the pleasure of teaching. She demonstrated exceptional analytical skills and a strong grasp of complex technical concepts. Her project on machine learning for predictive analytics showcased her ability to apply theoretical knowledge to practical problems. She was always eager to learn and regularly sought out additional challenges beyond the curriculum."`,
    category: 'recommendations',
    metadata: { source: 'letter_of_recommendation', author: 'Dr. Neetu Singh' }
  },
  {
    content: `Cover Letter highlight: Mehak is passionate about building products that solve real customer problems. She brings a unique combination of technical depth (CS background) and product acumen (CMU Product Management degree). She thrives in fast-paced environments where she can drive innovation and deliver impact. She's excited about opportunities to work on complex technical products, lead cross-functional teams, and shape product strategy.`,
    category: 'career_goals',
    metadata: { source: 'cover_letter', section: 'motivation' }
  },
  {
    content: `Mehak's experience with AI/ML products: At Cisco, she owns the AI strategy and roadmap for CDO, leading development of a gen AI-powered assistant. She has a strong technical foundation in machine learning from her CS degree and has worked with frameworks like TensorFlow, Keras, and Scikit-Learn. She conducted extensive research on LLM capabilities and limitations to inform product decisions. She's passionate about responsible AI and considers ethics and bias in product design.`,
    category: 'ai_experience',
    metadata: { source: 'resume_and_cover_letter', section: 'ai_ml' }
  },
  {
    content: `Mehak's approach to user research: She conducts both qualitative and quantitative research. She's experienced with customer interviews, usability testing, surveys, and data analysis. At Cisco, she conducted research with 20+ customers and 30+ internal teams. She synthesizes research findings into actionable insights and presents them to leadership. She uses research to validate assumptions and inform product decisions. She believes in continuous discovery and maintains ongoing customer contact.`,
    category: 'user_research',
    metadata: { source: 'resume', section: 'research_skills' }
  },
  {
    content: `Mehak's experience with B2B SaaS: She has deep experience in enterprise software, having worked at Cisco and Synopsys. At Synopsys, she managed a cloud-native SaaS platform serving 500+ customers and generating $23M annually. She understands the unique challenges of B2B products: long sales cycles, complex buying committees, importance of integrations, focus on ROI and business value. She knows how to balance customer requests with product vision.`,
    category: 'industry_experience',
    metadata: { source: 'resume', section: 'b2b_saas' }
  },
  {
    content: `Mehak's approach to prioritization: She uses a combination of frameworks (RICE, Value vs Effort, Kano model) adapted to context. She considers customer impact, business value, strategic alignment, and technical feasibility. She's not afraid to say no and explains the reasoning behind prioritization decisions. She revisits priorities regularly as new information emerges. She involves the team in prioritization to build ownership. She focuses on outcomes and is willing to descope or pivot based on learnings.`,
    category: 'prioritization',
    metadata: { source: 'interview_prep', section: 'prioritization_approach' }
  }
];

async function generateEmbedding(text) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });
  return response.data[0].embedding;
}

async function embedAndStore() {
  console.log('[v0] Starting document embedding process...');
  console.log(`[v0] Processing ${documents.length} documents`);

  for (let i = 0; i < documents.length; i++) {
    const doc = documents[i];
    console.log(`[v0] Processing document ${i + 1}/${documents.length}: ${doc.category}`);

    try {
      // Generate embedding
      const embedding = await generateEmbedding(doc.content);

      // Insert into Supabase
      const { error } = await supabase
        .from('documents')
        .insert({
          content: doc.content,
          embedding: embedding,
          category: doc.category,
          metadata: doc.metadata,
        });

      if (error) {
        console.error(`[v0] Error inserting document ${i + 1}:`, error);
      } else {
        console.log(`[v0] Successfully embedded and stored document ${i + 1}`);
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`[v0] Error processing document ${i + 1}:`, error);
    }
  }

  console.log('[v0] Document embedding complete!');
}

// Run the embedding process
embedAndStore().catch(console.error);
