import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, GitCompareArrows, ClipboardList, GraduationCap, SendHorizontal, Sparkles, RotateCcw, MessageSquarePlus, Clock, Menu, X
} from 'lucide-react';
import { UniversityService } from '../../services/universityService';
import { AcademicProgramService } from '../../services/academicProgramService';
import { University } from '../university/UniversityCard';
import OpenAI from 'openai';
// Removed: import { cn } from '../../lib/utils';

// --- Basic cn utility function (since external one is not available without installing new packages) ---
function cn(...args: (string | undefined)[]) {
  return args.filter(Boolean).join(' ');
}

// --- Avatar Components (Simplified for direct integration) ---
type AvatarProps = React.ComponentPropsWithoutRef<'div'>;

const Avatar: React.FC<AvatarProps> = ({ className, ...props }) => (
  <div
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
);

type AvatarFallbackProps = React.ComponentPropsWithoutRef<'span'>;

const AvatarFallback: React.FC<AvatarFallbackProps> = ({ className, ...props }) => (
  <span
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
);
// --- End Avatar Components ---

// --- Small Sub-components from ChatbotDesign.tsx ---
const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-1 py-2">
    <div className="h-2 w-2 animate-bounce rounded-full bg-primary/60" style={{ animationDelay: "0ms" }} />
    <div className="h-2 w-2 animate-bounce rounded-full bg-primary/60" style={{ animationDelay: "150ms" }} />
    <div className="h-2 w-2 animate-bounce rounded-full bg-primary/60" style={{ animationDelay: "300ms" }} />
  </div>
);

interface InquiryItem {
  id: string; // Unique ID for the conversation
  title: string;
  date: string; // Or timestamp (formatted string)
  messages: ChatbotMessage[]; // Full conversation messages
  link?: string;
  isSaved?: boolean; // New property to indicate if explicitly saved
}

const SidebarSection = ({ title, icon: Icon, items, onInquiryClick, onDeleteInquiry }: { title: string; icon: React.ElementType; items: InquiryItem[]; onInquiryClick: (item: InquiryItem) => void; onDeleteInquiry?: (id: string) => void }) => (
  <div className="mb-5">
    <div className="mb-2 flex items-center gap-2 px-3">
      <Icon className="h-3.5 w-3.5 text-maroon-800" />
      <h3 className="text-xs font-semibold uppercase tracking-wider text-maroon-800">{title}</h3>
    </div>
    <div className="space-y-0.5">
      {items.map((item) => (
        <div key={item.id} className="group flex items-center justify-between w-full rounded-lg px-3 py-2 text-left transition-colors hover:bg-maroon-100 dark:hover:bg-maroon-900">
          <button onClick={() => onInquiryClick(item)} className="flex-1 text-left">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{item.title}</p>
            <p className="text-[11px] text-gray-700 dark:text-gray-300">{item.date}</p>
          </button>
          {onDeleteInquiry && (
            <button
              onClick={(e) => { e.stopPropagation(); onDeleteInquiry(item.id); }}
              className="ml-2 p-1 rounded-md text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete inquiry"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
);
// --- End Small Sub-components ---

// --- Data for ChatbotDesign.tsx Empty State and Sidebar ---
const emptyStateSuggestions = [
  { icon: <Search className="h-5 w-5" />, title: "Find My Match", description: "Guided search based on your interests" },
  { icon: <GitCompareArrows className="h-5 w-5" />, title: "Compare Schools", description: "Side-by-side tuition & program analysis" },
  { icon: <ClipboardList className="h-5 w-5" />, title: "Check Admission Requirements", description: "Criteria for university admissions" },
];

// --- SECURITY WARNING ---
// The following code initializes the OpenAI API client on the client-side.
// This is NOT a secure practice for production environments as it exposes
// the API key to anyone inspecting the browser's network traffic.
//
// RECOMMENDATION:
// Move this AI logic to a secure backend server or a serverless function.
// The frontend should make a request to your backend, which then securely
// calls the OpenAI API. This protects your API key and allows for better
// control over your API usage.
//
// For development purposes, you can set the API key in a .env file:
// VITE_OPENAI_API_KEY=your-openrouter-api-key

interface ChatbotMessage { // Updated Message interface
  id: string;
  role: 'user' | 'assistant'; // Changed from 'type'
  content: string;
  timestamp: Date;
  suggestions?: string[]; // Retained for internal logic, but will not be rendered visually as separate buttons
}

interface KnowledgeBase {
  [key: string]: {
    pattern: RegExp;
    responses: string[];
    suggestions?: string[];
    nextFlow?: string;
    action?: () => void;
  };
}

// --- Local Storage Helper Functions ---
const LOCAL_STORAGE_KEY = "unibot_conversations";

function saveConversationsToLocalStorage(conversations: InquiryItem[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(conversations));
}

function loadConversationsFromLocalStorage(): InquiryItem[] {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (data) {
    try {
      const parsed = JSON.parse(data) as InquiryItem[];
      return parsed.map(conv => ({
        ...conv,
        messages: conv.messages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })),
        date: conv.date // date is already a formatted string when saved
      }));
    } catch (e) {
      console.error("Failed to parse conversations from local storage", e);
      return [];
    }
  }
  return [];
}

export default function Chatbot() {

  const [messages, setMessages] = useState<ChatbotMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);
  const [savedConversations, setSavedConversations] = useState<InquiryItem[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Original knowledgeBase (retained)
  const knowledgeBase: KnowledgeBase = {
    // Greetings and basic interactions - More human-like and varied
    greetings: {
      pattern: /^(hi+|hello+|hey+|good\s+(morning|afternoon|evening)|howdy|sup|yo|heyy|hellooo)$/i,
      responses: [
        'Hey there! 😄 I\'m UniBot, your friendly university guide! What are you curious about today—programs, admission rules, or just browsing options?',
        'Hi! 👋 Great to see you! I\'m UniBot, here to help you navigate university choices. What would you like to explore?',
        'Hello! 🎓 I\'m UniBot, your go-to buddy for all things university. Ready to dive into some school info?',
        'Hey! 🌟 UniBot here, your university information sidekick! What are we looking at today?',
        'Good morning! ☀️ Hope you\'re having an awesome day! I\'m UniBot, ready to help you find the perfect university fit.',
        'Good afternoon! 😊 UniBot checking in! Let\'s talk universities—what interests you most?',
        'Good evening! 🌙 Perfect timing for some university planning! I\'m UniBot, your evening study buddy. What can I help with?',
        'Hey! 🤗 Love that you\'re exploring universities! I\'m UniBot, and I\'m excited to guide you through your options.'
      ],
      suggestions: ['Tell me about state universities', 'What programs are available?', 'How do I apply?', 'Compare universities for me']
    },

    // Small talk and status checks
    smallTalk: {
      pattern: /^(how\s+are\s+you|how's\s+it\s+going|what's\s+up|are\s+you\s+there|can\s+you\s+help\s+me|are\s+you\s+online|you\s+there)$/i,
      responses: [
        'I\'m doing great, thanks for asking! 😊 Always ready to help with university information. What can I assist you with today?',
        'Doing fantastic! 🌟 I\'m here and ready to help you explore universities, programs, and admissions. What\'s on your mind?',
        'I\'m excellent! 💪 Always online and eager to help. Whether you need university info, program details, or admission guidance, I\'ve got you covered!',
        'I\'m awesome, thank you! 🎉 Super excited to help you with all things university-related. What would you like to know?'
      ],
      suggestions: ['State universities', 'Program information', 'Admission help', 'Compare universities']
    },

    // Best/top universities queries
    bestUniversities: {
      pattern: /\b(best|top|highest|highly).*(universities?|schools?|rated)\b/i,
      responses: [
        'Our top state universities in Metro Manila are consistently ranked highly! 🏆 PUP leads as the largest with excellent programs, TUP excels in engineering and technology, and PLM shines in medicine and law. Rankings vary by source, but all three perform exceptionally well.',
        'When it comes to the best state universities, all three of ours are outstanding! 🌟 PUP is the largest with comprehensive programs, TUP specializes in engineering excellence, and PLM leads in professional fields like medicine and law. Each has its own strengths!',
        'Our universities consistently rank among the Philippines\' best state institutions! 📈 PUP is renowned for its size and program variety, TUP for engineering prowess, and PLM for professional program excellence. Which aspect interests you most?'
      ],
      suggestions: ['PUP rankings', 'TUP rankings', 'PLM rankings', 'Compare universities']
    },

    // Universities with specific programs
    universitiesWithPrograms: {
      pattern: /(universities?|schools?).*(engineering|technology|business|medicine|law|education|arts|sciences)/i,
      responses: [
        'All our universities offer excellent programs in various fields! 🎓 PUP has the most comprehensive selection, TUP specializes in engineering and technology, and PLM excels in medicine, law, and professional programs. What specific field interests you?',
        'Great question! Each university has strong programs: PUP offers everything from technology to education, TUP rocks engineering and industrial programs, PLM specializes in medicine, law, and professional courses. Which area are you passionate about?',
        'Our universities cover all major fields! 📚 Technology and business are strong everywhere, engineering is TUP\'s specialty, while PLM leads in medicine and law. Education and sciences are well-represented across all three. What field calls to you?'
      ],
      suggestions: ['Technology programs', 'Engineering programs', 'Business programs', 'Healthcare programs']
    },

    // Healthcare and medical programs
    healthcarePrograms: {
      pattern: /(healthcare|medical|medicine|nursing|public\s+health|pharmacy).*(programs?|courses?)/i,
      responses: [
        'Healthcare programs are excellent at PLM! 🏥 They offer Doctor of Medicine, Bachelor of Science in Nursing, and various allied health programs. PUP also has strong nursing and health sciences programs. Interested in medical careers?',
        'PLM leads in healthcare education with their renowned Doctor of Medicine program and excellent nursing courses! 🩺 PUP also offers strong nursing and health sciences programs. These programs prepare students for rewarding careers in healthcare.',
        'For healthcare careers, PLM is outstanding with their Doctor of Medicine and nursing programs! 👩‍⚕️ PUP provides excellent nursing education too. These programs combine theory with practical training for real-world healthcare success.'
      ],
      suggestions: ['PLM programs', 'PUP programs', 'Admission requirements', 'Nursing programs']
    },

    // Arts and sciences programs
    artsSciencesPrograms: {
      pattern: /(arts|sciences|education|humanities|social\s+sciences|liberal\s+arts).*(programs?|courses?)/i,
      responses: [
        'Arts, sciences, and education programs are well-represented across our universities! 📖 PUP offers the most comprehensive selection including education, psychology, communication, and various sciences. PLM also has strong education and social science programs.',
        'Our universities excel in arts and sciences! 🎨 PUP has extensive programs in education, psychology, communication, and natural sciences. Education programs are particularly strong at both PUP and PLM, preparing future teachers and professionals.',
        'For arts, sciences, and education, PUP offers the broadest range! 📚 From psychology and communication to natural sciences and education programs. PLM also provides excellent education and social science courses. What specific area interests you?'
      ],
      suggestions: ['Education programs', 'Psychology programs', 'Communication programs', 'PUP programs']
    },

    // Campus life and facilities queries
    campusLife: {
      pattern: /\b(dorms?|housing|accommodations|cafeteria|food|clubs?|organizations|sports|transportation|commute|parking|campus\s+life)\b/i,
      responses: [
        'Campus life varies by university! 🏫 PUP offers extensive facilities including multiple cafeterias, sports complexes, dormitories, and student organizations. TUP has modern engineering labs and sports facilities. PLM provides historic Intramuros campus with modern amenities.',
        'Our universities offer vibrant campus life! 🏟️ Each has dormitories, cafeterias, sports facilities, and student clubs. PUP has the most comprehensive amenities, TUP focuses on tech-enabled spaces, and PLM combines historic charm with modern facilities.',
        'Student life is great at all our universities! 🎓 You\'ll find dormitories, cafeterias, sports facilities, and active student organizations. Transportation options include public transport, and each campus has its unique vibe and amenities.'
      ],
      suggestions: ['PUP facilities', 'TUP facilities', 'PLM facilities', 'University map']
    },

    // Decision support and comparison queries
    decisionSupport: {
      pattern: /(which.*better|pros.*cons|should.*choose|recommend|decide.*between|confused|help.*choose)/i,
      responses: [
        'Choosing the right university depends on your goals! 🎯 If you want the most program options, go with PUP. For engineering excellence, TUP is outstanding. If you\'re interested in medicine or law, PLM is exceptional. What\'s your main interest?',
        'Let me help you decide! 🤔 PUP offers the most variety with 125+ programs, TUP specializes in engineering and technology, PLM excels in medicine, law, and professional courses. Consider your career goals, location preferences, and program strengths.',
        'Great question! Each university has unique strengths: PUP for comprehensive education, TUP for engineering innovation, PLM for professional programs. Think about what matters most to you—program variety, specialization, or location?'
      ],
      suggestions: ['Compare universities', 'PUP vs TUP', 'PUP vs PLM', 'TUP vs PLM']
    },

    // Informal and casual queries
    informalQueries: {
      pattern: /\b(lol|hehe|thanks|ty|thx|idk|i\s+don't\s+know|can't\s+decide|what\s+should\s+i\s+study|suggest.*university|recommend.*course)\b/i,
      responses: [
        'No worries at all! 😄 I\'m here to help you figure things out. What subjects or careers interest you? I can suggest programs that match your passions.',
        'Haha, totally get it! 🎓 Choosing what to study can be overwhelming. Tell me what you enjoy or what career you\'re thinking about, and I\'ll help you find the perfect university program.',
        'Hey, that\'s completely normal! 🤷‍♀️ Many students feel that way. Let\'s explore together—what subjects excite you? Technology? Business? Healthcare? I can recommend programs based on your interests.',
        'I hear you! 📚 Deciding on a course is a big step. What are you naturally good at or passionate about? Whether it\'s tech, business, healthcare, or something else, I can guide you to great programs.'
      ],
      suggestions: ['Take a quiz', 'Explore programs', 'Talk to counselor', 'Compare options']
    },

    // Specific university details queries
    universityDetails: {
      pattern: /(student.*population|faculty|class.*sizes|location|map|address|nearby|landmarks)/i,
      responses: [
        'Let me give you the details you need! 📊 PUP serves over 65,000 students with modern facilities. TUP has around 12,000 students in a tech-focused campus. PLM serves about 8,000 students in historic Intramuros. Which university interests you?',
        'Great question! Here are the key stats: PUP is the largest with 65,000+ students across multiple campuses. TUP focuses on engineering with about 12,000 students. PLM serves around 8,000 students in the heart of Manila. Each offers excellent facilities and faculty support.',
        'Our universities have vibrant communities! 👥 PUP\'s large student population creates diverse opportunities. TUP offers focused engineering education. PLM provides intimate professional program learning. All have excellent faculty-to-student ratios and modern facilities.'
      ],
      suggestions: ['PUP details', 'TUP information', 'PLM programs', 'Campus map']
    },

    thanks: {
      pattern: /^(thanks?|thank\s+you|thx|ty|appreciate\s+it|thanks\s+a\s+lot|thank\s+you\s+so\s+much)$/i,
      responses: [
        'You\'re so welcome! 😊 I\'m thrilled I could help with your university search. Don\'t hesitate to ask if you need anything else!',
        'My absolute pleasure! 🎉 I love helping students like you find their perfect university match. What else can I assist with?',
        'Glad I could help! 🤗 Is there anything else about universities or programs you\'d like to know? I\'m all ears!',
        'No problem at all! 🌟 I\'m here whenever you need university guidance. Feel free to ask away!',
        'You\'re welcome! 💫 I\'m so happy to be your university companion. What else would you like to explore?'
      ],
      suggestions: ['Ask another question', 'Explore more universities', 'Get admission tips', 'Save some favorites']
    },

    // University queries - dynamic based on actual database - More conversational and human-like
    findUniversities: {
      pattern: /(find|search|look\s+for|discover).*(universities?|schools?|colleges?)/i,
      responses: [
        'Awesome! I\'d love to help you find the perfect university! 🌟 We have amazing state universities across Metro Manila. What type of programs or location are you interested in?',
        'Let\'s find your ideal university! 🎓 We cover top state institutions throughout Metro Manila. Are you looking for technology programs, business degrees, or something specific?',
        'Great question! I can guide you to excellent universities in Metro Manila. We have PUP, TUP, and PLM—all fantastic options! Which direction interests you most?',
        'Perfect! 🎯 I\'m excited to help you explore universities. What are you passionate about—tech, business, engineering, or something else? Let me find the right fit for you!'
      ],
      suggestions: ['Tell me about state universities', 'Technology programs', 'Business degrees', 'Engineering schools']
    },

    stateUniversities: {
      pattern: /(state|suc|public).*(universities?|schools?|colleges?)/i,
      responses: [
        'Absolutely! State universities are fantastic choices for quality education at affordable prices! 💰 We feature three amazing ones in Metro Manila: PUP (the largest!), TUP (engineering powerhouse), and PLM (medicine and law excellence). Which one sparks your interest? 🤔',
        'State Universities and Colleges (SUCs) are such great options! 🎓 We have PUP, TUP, and PLM in Metro Manila—each with their own strengths. PUP is huge with tons of programs, TUP rocks at engineering, and PLM specializes in professional courses. Want details on any?',
        'Love that you\'re looking at state universities!💡 They offer amazing value. In Metro Manila, we have PUP (massive with everything), TUP (engineering heaven), and PLM (medicine and law focused). Which one calls to you, or want me to tell you more about all three?',
        'State unis are such smart choices! 🎓 Affordable, quality education. We cover PUP, TUP, and PLM in Metro Manila. PUP has the most programs, TUP is engineering-focused, PLM specializes in professional courses. Curious about any specific one?'
      ],
      suggestions: ['PUP details', 'TUP information', 'PLM programs']
    },

    manilaUniversities: {
      pattern: /(universities?|schools?|colleges?).*(manila|metro|city)/i,
      responses: [
        'Metro Manila has some seriously impressive universities! 🏙️ We cover amazing institutions in Sta. Mesa (PUP), Ermita (TUP), and Intramuros (PLM). Each location has its own vibe—historic Intramuros, bustling Ermita, or vibrant Sta. Mesa. Which area calls to you?',
        'Manila is home to incredible state universities! 🌆 PUP anchors Sta. Mesa, TUP thrives in Ermita, and PLM brings excellence to historic Intramuros. These schools serve thousands of students and offer everything from engineering to medicine. Which neighborhood interests you?'
      ],
      suggestions: ['PUP in Sta. Mesa', 'TUP in Ermita', 'PLM in Intramuros', 'Show me the map']
    },

    // Program categories and information - More engaging
    programs: {
      pattern: /\b(programs?|courses?|degrees?|majors?)\b/i,
      responses: [
        'We have over 200 amazing programs across ALL these categories: Technology 💻, Business 💼, Engineering 🔧, Healthcare ⚕️, Education 📚, Arts 🎨, Sciences 🔬, and more! What field gets you excited? Tell me what you love and I\'ll guide you! 🌟',
        'Our universities offer incredible variety! 🎓 Technology, business, engineering, healthcare, education, arts, sciences—you name it, we probably have it! What subjects or careers interest you most? I\'m here to help you find your perfect match! 💫'
      ],
      suggestions: ['Technology & IT', 'Business & Finance', 'Engineering fields', 'Healthcare programs', 'Education programs', 'Arts & Sciences']
    },

    techPrograms: {
      pattern: /(technology|computer|it|programming|software).*(programs?|courses?)/i,
      responses: [
        'Technology programs include Computer Science, Information Technology, Computer Engineering, Electronics Engineering, and more. All our universities (PUP, TUP, PLM) offer excellent technology programs.',
        'We have excellent technology programs! Computer Science, IT, and Engineering programs are available at PUP, TUP, and PLM.'
      ],
      suggestions: ['Computer Science', 'IT programs', 'Engineering tech', 'Programming courses']
    },

    businessPrograms: {
      pattern: /(business|commerce|management|finance|accounting).*(programs?|courses?)/i,
      responses: [
        'Business programs cover Accountancy, Business Administration, Entrepreneurship, Marketing, Finance, and more. Available at all our universities.',
        'Business education is strong across our universities! From accountancy to entrepreneurship, there are programs for every business interest at PUP, TUP, and PLM.'
      ],
      suggestions: ['Accountancy', 'Business Admin', 'Entrepreneurship', 'Tourism Management']
    },

    engineeringPrograms: {
      pattern: /(engineering|engineer).*(programs?|courses?)/i,
      responses: [
        'Engineering programs include Civil, Mechanical, Electrical, Electronics, Computer, Chemical, and Industrial Engineering. Strong programs at PUP, TUP, and PLM.',
        'Engineering is a popular field! We have comprehensive engineering programs at all our universities: PUP, TUP, and PLM.'
      ],
      suggestions: ['Civil Engineering', 'Computer Engineering', 'Mechanical Engineering', 'Electrical Engineering']
    },

    artsPrograms: {
      pattern: /(arts|humanities|social\s+sciences|liberal\s+arts).*(programs?|courses?)/i,
      responses: [
          'Arts and humanities programs are well-represented! 🎨 PUP offers a comprehensive selection including communication, psychology, and social sciences. PLM also has strong programs in communication and social work.',
          'Our universities have excellent programs in the arts and social sciences! 🎭 PUP has a wide range of programs in communication, sociology, and history. PLM offers great programs in communication and social work.'
      ],
      suggestions: ['Communication programs', 'Psychology programs', 'Social Work programs']
    },

    sciencePrograms: {
        pattern: /(sciences|natural\s+sciences).*(programs?|courses?)/i,
        responses: [
            'Science programs are strong in our universities! 🔬 PUP and PLM offer excellent programs in Biology, Chemistry, and Mathematics. TUP also has strong programs in applied sciences.',
            'For science enthusiasts, our universities have great options! 🧪 PUP and PLM have strong programs in Biology, Chemistry, and Mathematics. TUP offers great programs in applied sciences.'
        ],
        suggestions: ['Biology programs', 'Chemistry programs', 'Mathematics programs']
    },

    educationPrograms: {
        pattern: /(education).*(programs?|courses?)/i,
        responses: [
            'Education programs are excellent in our universities! 📚 PUP and PLM offer a wide range of programs for aspiring teachers, including elementary education, secondary education, and library science.',
            'If you want to become a teacher, our universities have great programs for you! 🧑‍🏫 PUP and PLM have excellent programs in elementary education, secondary education, and library and information science.'
        ],
        suggestions: ['Elementary Education', 'Secondary Education', 'Library Science']
    },

    // Admission and application
    admission: {
      pattern: /\b(admission|admit|apply|application)\b/i,
      responses: [
        'Admission varies by university. Most require high school diploma, entrance exams, and interviews. State universities often have lower tuition but competitive admission.',
        'University admission typically involves entrance exams, academic requirements, and sometimes interviews. Each of our universities has its own process.'
      ],
      suggestions: ['Entrance exams', 'Application process', 'Admission requirements', 'Deadlines']
    },

    entranceExams: {
      pattern: /(entrance|entry|admission).*(exam|test|assessment)/i,
      responses: [
        'Common entrance exams: PUPCET (PUP), TUP Scholastic Aptitude Test (TUP), and PLM admission requirements. Each university has its own exam format and schedule.',
        'Our universities require entrance exams. PUP uses PUPCET, TUP has its own entrance test, and PLM has specific admission criteria.'
      ],
      suggestions: ['PUPCET details', 'TUP admission', 'PLM requirements', 'Application process']
    },

    // Platform features - Direct navigation to compare page
    compare: {
      pattern: /\b(compare|comparison|versus|vs\.?)\b/i,
      responses: [
        'Perfect! 🎯 Let\'s head to our comparison tool where you can compare up to 3 universities side-by-side. Click the link below to get started:\n\n🔗 **[Go to Compare Page](/compare)**\n\nYou\'ll be able to select universities and see tuition, programs, location, facilities, and admission requirements all in one view! 📊'
      ],
      suggestions: ['What can I help you more with today?']
    },

    saveBookmark: {
      pattern: /\b(save|bookmark|favorite|star|wish.?list)\b/i,
      responses: [
        'Save universities to your bookmarks for easy access later. Create your personalized list of favorite institutions.',
        'Bookmarking helps you keep track of universities you\'re interested in. You can compare saved universities and get reminders.'
      ],
      suggestions: ['Bookmark universities', 'Saved universities', 'My favorites', 'University lists']
    },

    map: {
      pattern: /\b(map|location|where|address|campus)\b/i,
      responses: [
        'Our interactive map shows all universities geographically. Click markers for details, zoom in/out, and explore locations.',
        'Check out our university map to see PUP (Sta. Mesa), TUP (Ermita), and PLM (Intramuros) geographically. It\'s great for finding universities near you!'
      ],
      suggestions: ['View university map', 'Find nearby universities', 'Campus locations', 'Map features']
    },

    // Rankings and quality
    rankings: {
      pattern: /\b(rankings?|ranked|top|best)\b/i,
      responses: [
        'Our universities are well-ranked: PUP ranks high among SUCs, TUP excels in engineering and technology, and PLM is known for medicine and law. Rankings vary by source and criteria.',
        'All our universities perform well in rankings. PUP leads among state universities, TUP is strong in engineering, and PLM excels in professional programs.'
      ],
      suggestions: ['PUP rankings', 'TUP rankings', 'PLM rankings', 'Local rankings']
    },

    // Tuition and costs
    tuition: {
      pattern: /\b(tuition|fees?|cost|price|expensive|cheap|afford)\b/i,
      responses: [
        'State universities offer affordable education with tuition ranging from P5,000-15,000 per semester depending on the program and university.',
        'Tuition at our state universities is very affordable, typically ranging from P5,000 to P15,000 per semester. Many scholarships are also available!'
      ],
      suggestions: ['State university tuition', 'Scholarships', 'Financial aid', 'Affordable education']
    },

    scholarships: {
      pattern: /\b(scholarships?|financial\s+aid|grants?|funding)\b/i,
      responses: [
        'Scholarships available: Academic scholarships, athletic scholarships, financial assistance, and government programs. Check each university\'s scholarship office.',
        'Many scholarships are available! Academic excellence, financial need, athletic ability, and special programs all offer funding opportunities at our universities.'
      ],
      suggestions: ['Academic scholarships', 'Government scholarships', 'University scholarships', 'Scholarship applications']
    },

    // About the platform
    about: {
      pattern: /\b(about|what\s+is|unicentral|platform)\b/i,
      responses: [
        'UniCentral is your comprehensive guide to Philippine state universities. We provide detailed information about PUP, TUP, and PLM, with comparison tools and admission guidance.',
        'UniCentral helps students discover, compare, and apply to Philippine state universities. We feature PUP, TUP, and PLM with complete program information and guidance.'
      ],
      suggestions: ['Platform features', 'Our mission', 'Contact us', 'Help center']
    },

    // Creator/Developer information
    creator: {
      pattern: /\b(who\s+(created|made|owns?|is\s+behind|developed|coded)|creator|owner|developer|who'?s?\s+(toff|tadz|tadzpuge|genius))\b/i,
      responses: [
        'Hey! 👋 I was created by Toff (also known as Tadz)! 😊 He loves making friends and connecting with awesome people. Want to connect with him?',
        'Oh, you\'re asking about my creator! 😄 That\'s Toff (Tadz)! He\'s all about making new friends and great conversations. Super friendly guy!',
        'The person behind UniCentral is Toff! 🌟 (You might know him as Tadz) He built this platform and loves connecting with students like you!',
        'Curious about who made this? It\'s Toff! 💫 (AKA Tadz) He\'s passionate about meeting new people and making friends. Want to say hi to him?'
      ],
      suggestions: ['Connect with Toff', 'View social media', 'GitHub profile', 'Follow on Instagram']
    },

    // Contact and support
    contact: {
      pattern: /\b(contact|support|help|phone|email|reach)\b/i,
      responses: [
        'Contact us: Email info@unicentral.com, Phone +63 945 552 3661, Address: Metro Manila, Philippines. We\'re here to help!',
        'Need help? Reach us at info@unicentral.com or call +63 945 552 3661. We\'re in Metro Manila and happy to assist!'
      ],
      suggestions: ['Email support', 'Phone support', 'Visit us', 'Support hours']
    },

    // Note: Removed fallback pattern - now using AI for unmatched queries
  };

  // useEffect for initializing conversations (runs once on mount)
  useEffect(() => {
    const loadedConversations = loadConversationsFromLocalStorage();
    setSavedConversations(loadedConversations);

    // Always start with a new conversation ID when the component mounts
    setCurrentConversationId(Date.now().toString());
  }, []); // Empty dependency array means this runs once on mount


  // useEffect for scrolling (runs when messages or typing state changes)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);


  const processMessage = async (userMessage: string): Promise<{response: string, suggestions?: string[]}> => {
    const message = userMessage.toLowerCase().trim();

    // Handle thank you and goodbye messages
    const thankYouMatch = message.match(/^(thanks?|thank\s+you|thx|ty|appreciate\s+it|thanks\s+a\s+lot|thank\s+you\s+so\s+much|thanks\s+for\s+the\s+help)$/i);
    if (thankYouMatch) {
      return handleThankYou();
    }

    const goodbyeMatch = message.match(/^(bye|goodbye|see\s+you|see\s+ya|later|farewell|cya|take\s+care)$/i);
    if (goodbyeMatch) {
      return handleGoodbye();
    }

    // Handle navigation
    const navigationResponse = handleNavigation(message);
    if (navigationResponse) {
      return navigationResponse;
    }

    // Handle university-specific queries
    const universityResponse = await handleUniversityQuery(message);
    if (universityResponse) {
      return universityResponse;
    }

    // Check rule-based knowledge base
    const ruleBasedResponse = handleRuleBasedQuery(message);
    if (ruleBasedResponse) {
      return ruleBasedResponse;
    }

    // Fallback to AI
    return await handleAiQuery(userMessage);
  };

  const handleThankYou = () => {
    const thankResponses = [
      "You're so welcome! 😊 I'm thrilled I could help with your university search. Don't hesitate to ask if you need anything else!",
      "My absolute pleasure! 🎉 I love helping students like you find their perfect university match. What else can I assist with?",
      "Glad I could help! 🤗 Is there anything else about universities or programs you'd like to know? I'm all ears!",
      "No problem at all! 🌟 I'm here whenever you need university guidance. Feel free to ask away!",
      "You're welcome! 💫 I hope you find the perfect university for your journey. Come back anytime!",
      "Happy to help! 😄 Remember, I'm always here for all your university questions and guidance.",
      "My pleasure helping you! 🎓 I hope this information helps you make the right choice for your future."
    ];
    return {
      response: thankResponses[Math.floor(Math.random() * thankResponses.length)],
      suggestions: [] // No suggestions returned directly
    };
  };

  const handleGoodbye = () => {
    const goodbyeResponses = [
      "Goodbye! 👋 Thanks for chatting about universities. I hope you find the perfect school for your journey!",
      "See you later! 🌟 Don't hesitate to come back if you need more university information or guidance.",
      "Take care! 😊 I'm always here when you need help with university choices. Happy exploring!",
      "Farewell! 🎓 Remember, I'm just a click away whenever you need university assistance.",
      "Until next time! 💫 Thanks for letting me help with your university search. Good luck!",
      "Bye for now! 👋 I hope our conversation helped you discover great university options.",
      "See you soon! 🌈 Keep me in mind for all your future university questions and decisions."
    ];
    return {
      response: goodbyeResponses[Math.floor(Math.random() * goodbyeResponses.length)],
      suggestions: [] // No suggestions returned directly
    };
  };

  const handleNavigation = (message: string) => {
    if (message.includes('learn more about')) {
      const universityMatch = message.match(/learn more about (pup|tup|plm)/i);
      if (universityMatch) {
        const uni = universityMatch[1].toUpperCase();
        let universityId = 1; // Default PUP

        if (uni === 'TUP') universityId = 2;
        else if (uni === 'PLM') universityId = 3;

        return {
          response: `Perfect! 📖 Let's explore ${uni} in detail. Click the link below to view their complete profile, programs, admission requirements, facilities, and more:\n\n🔗 **[View ${uni} Details](/universities/${universityId})**\n\nYou'll find everything you need to know about ${uni}! 🏛️`,
          suggestions: [] // No suggestions returned directly
        };
      }
    }

    if (message.includes('go to compare page') || message.includes('compare page') || message.includes('go to compare')) {
      return {
        response: `Perfect! 🎯 Let's head to our comparison tool where you can compare up to 3 universities side-by-side. Click the link below to get started:\n\n🔗 **[Go to Compare Page](/compare)**\n\nYou'll be able to select universities and see tuition, programs, location, facilities, and admission requirements all in one view! 📊`,
        suggestions: [] // No suggestions returned directly
      };
    }

    return null;
  };

  const handleUniversityQuery = async (message: string) => {
    const uniKeywords: {[key: string]: string[]} = {
      'pup': ['pup', 'polytechnic'],
      'tup': ['tup', 'technological'],
      'plm': ['plm', 'lungsod', 'maynila']
    };

    for (const uni in uniKeywords) {
      if (uniKeywords[uni].some(keyword => message.includes(keyword))) {
        return await getUniversityDetails(uni, message);
      }
    }
    return null;
  };

  const getUniversityDetails = async (university: string, message: string) => {
    try {
      const universities = await UniversityService.getAllUniversities();
      const uniData = universities.find(u => u.name.toLowerCase().includes(university));
      
      if (!uniData) return null;

      if (message.includes('programs')) {
        return await getProgramDetails(uniData, message);
      }
      if (message.includes('admission') || message.includes('requirements') || message.includes('apply')) {
        return getAdmissionDetails(uniData);
      }
      if (message.includes('facilities') || message.includes('campus')) {
        return getFacilitiesDetails(uniData);
      }
      if (message.includes('rankings') || message.includes('ranking')) {
        return getRankingDetails(uniData);
      }

      const programCount = uniData.programs || 0;
      return {
        response: `${uniData.name} is a renowned university with over ${uniData.students} students. ${uniData.description} They offer ${programCount} programs.`,
        suggestions: [] // No suggestions returned directly
      };

    } catch (error) {
      console.error(`Error fetching ${university} data:`, error);
      return null;
    }
  };

  const getProgramDetails = async (uniData: University, message: string) => {
    const programs = await AcademicProgramService.getProgramsByUniversityId(uniData.id);
    const undergraduate = programs.filter(p => p.programType === 'undergraduate').length;
    const graduate = programs.filter(p => p.programType === 'graduate').length;
    const diploma = programs.filter(p => p.programType === 'diploma').length;
    
    let response = `${uniData.name} offers ${uniData.programs} programs total:\n• ${undergraduate} undergraduate programs\n• ${graduate} graduate programs\n• ${diploma} diploma programs\n\n`;

    if (message.includes('list') || message.includes('what are') || message.includes('show me')) {
      let programList = programs;
      if (message.includes('undergraduate')) {
        programList = programs.filter(p => p.programType === 'undergraduate');
        response = `${uniData.name} Undergraduate Programs:\n`;
      } else if (message.includes('graduate')) {
        programList = programs.filter(p => p.programType === 'graduate');
        response = `${uniData.name} Graduate Programs:\n`;
      } else if (message.includes('diploma')) {
        programList = programs.filter(p => p.programType === 'diploma');
        response = `${uniData.name} Diploma Programs:\n`;
      }
      const programNames = programList.slice(0, 20).map(p => p.programName);
      const remaining = programList.length - 20;
      response += `${programNames.map(name => `• ${name}`).join('\n')}${remaining > 0 ? `\n...and ${remaining} more programs` : ''}`;
    } else {
      response += 'Popular programs include Computer Science, Information Technology, Business Administration, Civil Engineering, and Education programs.';
    }

    return {
      response,
      suggestions: [] // No suggestions returned directly
    };
  };

  const getAdmissionDetails = (uniData: University) => {
    if (uniData.admissionRequirements && uniData.admissionRequirements.length > 0) {
      const requirements = uniData.admissionRequirements.join('\n• ');
      return {
        response: `🎓 Ready to join ${uniData.name}? Here's what you need to know about admission! \n\n📋 Admission Requirements:\n• ${requirements}\n\nVisit the university's official website for the detailed application process. Good luck! 🌟`,
        suggestions: [] // No suggestions returned directly
      };
    }
    return null;
  };

  const getFacilitiesDetails = (uniData: University) => {
    if (uniData.facilities && uniData.facilities.length > 0) {
      const facilities = uniData.facilities.slice(0, 8).join('\n• ');
      return {
        response: `🏛️ ${uniData.name} has an amazing campus! Here's what you'll find:\n\n🏢 Facilities:\n• ${facilities}\n\nThey also have modern classrooms, libraries, and sports facilities.`,
        suggestions: [] // No suggestions returned directly
      };
    }
    return null;
  };

  const getRankingDetails = (uniData: University) => {
    if (uniData.rankings?.details) {
      return {
        response: `🏆 ${uniData.name} Rankings - They're doing AMAZING! 📈\n\n${uniData.rankings.details}\n\n${uniData.name} is renowned for its outstanding performance in licensure examinations.`,
        suggestions: [] // No suggestions returned directly
      };
    }
    return null;
  };
  
  const handleRuleBasedQuery = (userMessage: string) => {
    for (const [, value] of Object.entries(knowledgeBase)) {
      if (value.pattern.test(userMessage)) {
        const randomResponse = value.responses[Math.floor(Math.random() * value.responses.length)];
        return {
          response: randomResponse,
          suggestions: [] // No suggestions returned directly
        };
      }
    }
    return null;
  };

  const handleAiQuery = async (userMessage: string) => {
    try {
      if (!import.meta.env.VITE_OPENAI_API_KEY) {
        return {
          response: 'The AI assistant is not configured. Please provide an OpenRouter API key. Check your .env file.',
          suggestions: [] // No suggestions returned directly
        };
      }
      
      const universities = await UniversityService.getAllUniversities();
      const universityData = universities.map(u => ({
        name: u.name,
        location: u.location,
        students: u.students,
        programs: u.programs,
        description: u.description,
        facilities: u.facilities?.slice(0, 5) || [],
        admissionRequirements: u.admissionRequirements?.slice(0, 3) || [],
        rankings: u.rankings?.details || 'Consistently ranked among top state universities'
      }));

      const SYSTEM_PROMPT = `You are UniBot, a friendly and helpful AI assistant specializing in Philippine state universities in Metro Manila. Your personality is kind, fun, and engaging with emojis. Use casual, friendly language. Keep responses under 300 words. You can help with university information, programs, admission requirements, campus facilities, rankings, tuition information, program recommendations, and university comparisons. Only discuss the universities provided in the "UNIVERSITIES YOU KNOW" section. For off-topic questions, answer briefly and always bring conversation back to universities. Use plain text only - NO markdown formatting.

UNIVERSITIES YOU KNOW (use this data):
${universityData.map(u => `
${u.name}:
- Location: ${u.location}
- Students: ${u.students}+
- Programs: ${u.programs}+
- Description: ${u.description}
- Key Facilities: ${u.facilities.join(', ')}
- Admission Requirements: ${u.admissionRequirements.join(', ')}
- Rankings: ${u.rankings}
`).join('\n')}`;

      // Initialize OpenAI client
      const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        baseURL: "https://openrouter.ai/api/v1",
        dangerouslyAllowBrowser: true
      });

      const completion = await openai.chat.completions.create({
        model: "meta-llama/llama-3.2-3b-instruct:free",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userMessage },
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      const aiResponse = completion.choices[0]?.message?.content || "Sorry, I couldn't process that request. Could you try asking again?";

      // Clean AI response - retain only markdown bold and links, remove other markdown
      const cleanAiResponse = aiResponse
      .replace(/^\d+\.\s*/gm, '') // Remove numbered lists
      .replace(/^-\s*/gm, '')     // Remove bullet points
      .replace(/^###\s*/gm, '')   // Remove H3
      .replace(/^##\s*/gm, '')    // Remove H2
      .replace(/^#\s*/gm, '')     // Remove H1
      .trim();

      return {
        response: cleanAiResponse,
        suggestions: [] // No suggestions returned directly
      };

    } catch (error) {
      console.error('AI Error:', error);
      let errorMessage = 'Hmm, I\'m having trouble connecting right now 🤔.';
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          errorMessage = 'It seems there is an issue with the AI configuration (Authentication Error).';
        } else if (error.message.includes('429')) {
          errorMessage = 'I\'m currently receiving a lot of requests. Please try again in a moment.';
        }
      }
      const fallbackResponses = [
        `${errorMessage} But hey, I can totally help you with info about PUP, TUP, or PLM. What are you curious about?`,
        `Oops, technical glitch! 😅 ${errorMessage} No worries though—I'm all about helping with Philippine state universities! What would you like to explore?`,
      ];
      return {
        response: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
        suggestions: [] // No suggestions returned directly
      };
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatbotMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const result = await processMessage(inputValue);

      setTimeout(() => {
        const botMessage: ChatbotMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: result.response,
          timestamp: new Date(),
          suggestions: [] // Ensure suggestions are not set for rendering
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        // Update saved conversations after both user and bot messages are added
        if (currentConversationId) {
          updateCurrentConversationInSavedList(currentConversationId, [...messages, userMessage, botMessage]);
        }
      }, 1200);
    } catch (error) {
      console.error('Error processing message:', error);
      setIsTyping(false);
    }
  };

  const handleEmptyStateSuggestionClick = async (actionTitle: string) => {
    const userMessage: ChatbotMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: actionTitle,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const result = await processMessage(actionTitle);

      setTimeout(() => {
        const botMessage: ChatbotMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: result.response,
          timestamp: new Date(),
          suggestions: [] // Ensure suggestions are not set for rendering
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        // Update saved conversations after both user and bot messages are added
        if (currentConversationId) {
          updateCurrentConversationInSavedList(currentConversationId, [...messages, userMessage, botMessage]);
        }
      }, 1200);
    } catch (error) {
      console.error('Error processing feature card action:', error);
      setIsTyping(false);
    }
  };

  const handleSidebarInquiryClick = (item: InquiryItem) => {
    setIsSidebarOpenMobile(false); // Close sidebar on mobile after clicking an inquiry
    if (item.link) {
      // Implement navigation (e.g., using react-router-dom's navigate function)
      console.log(`Navigating to: ${item.link}`);
      // Example: navigate(item.link);
    } else {
      // Load the clicked conversation
      setMessages(item.messages);
      setCurrentConversationId(item.id);
      setInputValue("");
      setIsTyping(false);
    }
  };

  const handleDeleteConversation = (idToDelete: string) => {
    setSavedConversations(prevConversations => {
      const updatedConversations = prevConversations.filter(conv => conv.id !== idToDelete);
      saveConversationsToLocalStorage(updatedConversations);
      return updatedConversations;
    });
    // If the deleted conversation was the current one, clear the chat
    if (currentConversationId === idToDelete) {
      setMessages([]);
      setCurrentConversationId(Date.now().toString()); // Start a new empty chat
    }
  };


  const handleNewChat = () => {
    if (messages.length > 0 && currentConversationId) {
      const firstUserMessage = messages.find(msg => msg.role === 'user')?.content || 'New Chat';
      const newSavedConversation: InquiryItem = {
        id: currentConversationId,
        title: firstUserMessage.length > 50 ? firstUserMessage.substring(0, 47) + '...' : firstUserMessage,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        messages: messages,
        isSaved: false, // Mark as unsaved by default
      };

      setSavedConversations(prev => {
        // Add new conversation only if it doesn't exist by id, or update it
        const existingIndex = prev.findIndex(conv => conv.id === newSavedConversation.id);
        let updated: InquiryItem[];
        if (existingIndex > -1) {
          updated = prev.map((conv, index) => index === existingIndex ? newSavedConversation : conv);
        } else {
          updated = [newSavedConversation, ...prev];
        }
        saveConversationsToLocalStorage(updated);
        return updated;
      });
    }

    setMessages([]);
    setInputValue("");
    setIsTyping(false);
    setIsSidebarOpenMobile(false); // Close sidebar when starting new chat
    setCurrentConversationId(Date.now().toString()); // Generate a new ID for the new chat
    if (inputRef.current) inputRef.current.style.height = "auto";
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 150) + "px";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Helper function to update the current conversation in the saved list
  const updateCurrentConversationInSavedList = (
    conversationId: string,
    updatedMessages: ChatbotMessage[]
  ) => {
    setSavedConversations(prevConversations => {
      const existingIndex = prevConversations.findIndex(conv => conv.id === conversationId);
      const firstUserMessage = updatedMessages.find(msg => msg.role === 'user')?.content || 'New Chat';
      
      const conversationToSave: InquiryItem = {
        id: conversationId,
        title: firstUserMessage.length > 50 ? firstUserMessage.substring(0, 47) + '...' : firstUserMessage,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        messages: updatedMessages,
        isSaved: false, // Assume unsaved unless explicitly marked
      };

      let newSavedConversations: InquiryItem[];
      if (existingIndex > -1) {
        // Preserve isSaved status if already exists
        const oldConversation = prevConversations[existingIndex];
        conversationToSave.isSaved = oldConversation.isSaved || false;

        newSavedConversations = [
          conversationToSave, // Add the updated conversation to the top
          ...prevConversations.filter(conv => conv.id !== conversationId) // Filter out the old version
        ];
      } else {
        newSavedConversations = [conversationToSave, ...prevConversations];
      }
      saveConversationsToLocalStorage(newSavedConversations);
      return newSavedConversations;
    });
  };


  return (
    <div className="flex flex-1 overflow-hidden bg-background">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpenMobile && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpenMobile(false)}
        ></div>
      )}

      {/* ---- Sidebar ---- */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex-col w-64 shrink-0 border-r border-border bg-gray-100 dark:bg-gray-800 transition-transform duration-300 ease-in-out",
          isSidebarOpenMobile ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:flex lg:static" // Ensure it becomes static on large screens
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-maroon-800" />
            <span className="font-display text-sm font-bold text-maroon-800">UniBot</span>
          </div>
          <button onClick={handleNewChat} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-maroon-100 hover:text-maroon-800" title="New chat">
            <MessageSquarePlus className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-2 py-4">
          <SidebarSection
            title="Recent"
            icon={Clock}
            items={savedConversations.filter(conv => !conv.isSaved)}
            onInquiryClick={handleSidebarInquiryClick}
            onDeleteInquiry={handleDeleteConversation} // Pass delete handler
          />
        </div>
        <div className="border-t border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-blue-500 text-xs font-semibold text-white">C</AvatarFallback>
            </Avatar>
            <p className="truncate text-sm font-medium text-foreground">Christopher</p>
          </div>
        </div>
      </aside>

      {/* ---- Chat Panel ---- */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header for Chat Panel (visible on small screens, hidden on large) */}
        <div className="flex lg:hidden items-center justify-between border-b border-border bg-card px-4 py-3">
          <button onClick={() => setIsSidebarOpenMobile(true)} className="p-2 rounded-lg text-maroon-800 hover:bg-secondary">
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-bold text-maroon-800">UniBot</span>
        </div>
        <div ref={scrollRef} className="flex flex-1 flex-col overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-maroon-100">
                <GraduationCap className="h-8 w-8 text-maroon-800" />
              </div>
              <h1 className="mb-2 text-center font-display text-2xl md:text-3xl font-bold text-foreground">Welcome to UniBot</h1>
              <p className="mb-10 max-w-md text-center text-sm leading-relaxed text-muted-foreground">Your AI-powered university admissions assistant. Ask me anything about schools, programs, or admissions.</p>
              <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                {emptyStateSuggestions.map((s) => (
                  <button key={s.title} onClick={() => handleEmptyStateSuggestionClick(s.title)} className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-4 text-left transition-all duration-200 hover:border-maroon-400 hover:shadow-md">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-maroon-100 text-maroon-800 transition-colors group-hover:bg-maroon-600 group-hover:text-white">{s.icon}</div>
                    <h3 className="font-body text-sm font-semibold text-foreground">{s.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">{s.description}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto w-full max-w-3xl px-4 py-6">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("mb-6 flex gap-3", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
                  <Avatar className="mt-0.5 h-8 w-8 shrink-0">
                    <AvatarFallback className={cn("text-xs font-semibold", msg.role === "assistant" ? "bg-maroon-600 text-white" : "bg-blue-500 text-white")}>
                      {msg.role === "assistant" ? "U" : "C"}
                    </AvatarFallback>
                  </Avatar>
                  <div className={cn("max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed", msg.role === "user" ? "rounded-tr-md bg-maroon-600 text-white" : "rounded-tl-md bg-card text-gray-900 dark:text-gray-100 shadow-sm border border-border")}>
                    <div className="whitespace-pre-line">
                      {msg.content.split(/(\*\*\[.*?\]\([^)]+\)\*\*|\*\*[^*]+\*\*)/g).map((part, partIndex) => {
                        const boldLinkMatch = part.match(/^\*\*\[([^\]]+)\]\(([^)]+)\)\*\*$/);
                        if (boldLinkMatch) {
                          return (
                            <Link
                              key={partIndex}
                              to={boldLinkMatch[2]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline font-medium cursor-pointer"
                            >
                              {boldLinkMatch[1]}
                            </Link>
                          );
                        } else if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
                        }
                        return part;
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="mb-6 flex gap-3">
                  <Avatar className="mt-0.5 h-8 w-8 shrink-0"><AvatarFallback className="bg-maroon-600 text-xs font-semibold text-white">U</AvatarFallback></Avatar>
                  <div className="rounded-2xl rounded-tl-md border border-border bg-card px-4 py-3 shadow-sm"><TypingIndicator /></div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-border bg-background px-4 py-4">
          <div className="mx-auto flex w-full max-w-3xl items-end gap-2">
            {messages.length > 0 && (
              <button onClick={handleNewChat} className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-maroon-100 hover:text-maroon-800" title="New chat">
                <RotateCcw className="h-4 w-4" />
              </button>
            )}
            <div className="flex flex-1 items-end gap-2 rounded-xl border border-border bg-card px-4 py-2.5 shadow-sm transition-all focus-within:border-maroon-500/50 focus-within:shadow-md">
              <Sparkles className="mb-0.5 h-4 w-4 shrink-0 text-maroon-500" />
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={handleTextareaInput}
                onKeyDown={handleKeyDown}
                placeholder="Ask UniBot anything about universities..."
                rows={1}
                className="max-h-[150px] flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-maroon-600 text-white transition-all hover:bg-maroon-700 disabled:opacity-40"
              >
                <SendHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-muted-foreground/60">UniBot can make mistakes. Verify important admission details with official sources.</p>
        </div>
      </main>
    </div>
  );
}
