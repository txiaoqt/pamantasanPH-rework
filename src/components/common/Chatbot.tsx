import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, X, Send, Bot, User, ExternalLink } from 'lucide-react';
import { UniversityService } from '../../services/universityService';
import { AcademicProgramService } from '../../services/academicProgramService';
import { University } from '../university/UniversityCard';
import OpenAI from 'openai';

interface ChatbotProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}


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
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1", // OpenRouter base URL
  dangerouslyAllowBrowser: true // Required for client-side usage
});

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface ConversationFlow {
  [key: string]: {
    pattern: RegExp;
    responses: string[];
    suggestions?: string[];
    nextFlow?: string;
    action?: () => void;
  };
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

interface ConversationContext {
  exploredUniversities: string[];
  currentUniversity: string | null;
  lastTopic: string | null;
  explorationLevel: 'overview' | 'detailed' | 'deep';
  userPreferences: string[];
}

export default function Chatbot({ isOpen, setIsOpen }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hi! I\'m UniBot, your friendly university guide! 🌟 What are you curious about today—finding the perfect university, exploring programs, or learning about admissions?',
      timestamp: new Date(),
      suggestions: [
        'Explore state universities',
        'Find programs for me',
        'Tell me about admissions',
        'Compare universities'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Context tracking for conversational flow
  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    exploredUniversities: [],
    currentUniversity: null,
    lastTopic: null,
    explorationLevel: 'overview',
    userPreferences: []
  });

  // Dynamic rule-based knowledge base that only uses real universities from database
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
        'Love that you\'re looking at state universities! 💡 They offer amazing value. In Metro Manila, we have PUP (massive with everything), TUP (engineering heaven), and PLM (medicine and law focused). Which one calls to you, or want me to tell you more about all three?',
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
        'Oh, you\'re asking about my creator! 😄 That\'s Toff (Tadz)! He\'s all about making new friends and having great conversations. Super friendly guy!',
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);



  const processMessage = async (userMessage: string): Promise<{response: string, suggestions?: string[]}> => {
    const message = userMessage.toLowerCase().trim();

    // Handle thank you and goodbye messages
    const thankYouMatch = message.match(/^(thanks?|thank you|thx|ty|appreciate it|thanks a lot|thank you so much|thanks for the help)$/i);
    if (thankYouMatch) {
      return handleThankYou();
    }

    const goodbyeMatch = message.match(/^(bye|goodbye|see you|see ya|later|farewell|cya|take care)$/i);
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
      response: thankResponses[Math.floor(Math.random() * thankResponses.length)]
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
      response: goodbyeResponses[Math.floor(Math.random() * goodbyeResponses.length)]
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
          suggestions: ['What can I help you more with today?']
        };
      }
    }

    if (message.includes('go to compare page') || message.includes('compare page') || message.includes('go to compare')) {
      return {
        response: `Perfect! 🎯 Let's head to our comparison tool where you can compare up to 3 universities side-by-side. Click the link below to get started:\n\n🔗 **[Go to Compare Page](/compare)**\n\nYou'll be able to select universities and see tuition, programs, location, facilities, and admission requirements all in one view! 📊`,
        suggestions: ['What can I help you more with today?']
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
        suggestions: [`Want to learn more about ${university.toUpperCase()}?`]
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
      suggestions: ['List undergraduate programs', 'Show graduate programs', 'What can I help you more with today?']
    };
  };

  const getAdmissionDetails = (uniData: University) => {
    if (uniData.admissionRequirements && uniData.admissionRequirements.length > 0) {
      const requirements = uniData.admissionRequirements.join('\n• ');
      return {
        response: `🎓 Ready to join ${uniData.name}? Here's what you need to know about admission! \n\n📋 Admission Requirements:\n• ${requirements}\n\nVisit the university's official website for the detailed application process. Good luck! 🌟`,
        suggestions: ['What can I help you more with today?']
      };
    }
    return null;
  };

  const getFacilitiesDetails = (uniData: University) => {
    if (uniData.facilities && uniData.facilities.length > 0) {
      const facilities = uniData.facilities.slice(0, 8).join('\n• ');
      return {
        response: `🏛️ ${uniData.name} has an amazing campus! Here's what you'll find:\n\n🏢 Facilities:\n• ${facilities}\n\nThey also have modern classrooms, libraries, and sports facilities.`,
        suggestions: ['What can I help you more with today?']
      };
    }
    return null;
  };

  const getRankingDetails = (uniData: University) => {
    if (uniData.rankings?.details) {
      return {
        response: `🏆 ${uniData.name} Rankings - They're doing AMAZING! 📈\n\n${uniData.rankings.details}\n\n${uniData.name} is renowned for its outstanding performance in licensure examinations.`,
        suggestions: ['What can I help you more with today?']
      };
    }
    return null;
  };
  
  const handleRuleBasedQuery = (userMessage: string) => {
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (value.pattern.test(userMessage)) {
        const randomResponse = value.responses[Math.floor(Math.random() * value.responses.length)];
        return {
          response: randomResponse,
          suggestions: value.suggestions
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
          suggestions: ['Find universities', 'Browse programs', 'Admission guidance', 'Compare universities']
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

      const SYSTEM_PROMPT = `You are UniBot, a friendly and helpful AI assistant specializing in Philippine state universities (PUP, TUP, and PLM) in Metro Manila. Your personality is kind, fun, and engaging with emojis. Use casual, friendly language. Keep responses under 300 words. You can help with university information, programs, admission requirements, campus facilities, rankings, tuition information, program recommendations, and university comparisons. Only discuss PUP, TUP, and PLM universities. For off-topic questions, answer briefly and always bring conversation back to universities. Use plain text only - NO markdown formatting. End with 2-4 relevant suggestion buttons when helpful.

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

      const cleanAiResponse = aiResponse.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').replace(/^\d+\.\s*/gm, '').replace(/^-\s*/gm, '').replace(/^###\s*/gm, '').replace(/^##\s*/gm, '').replace(/^#\s*/gm, '').replace(/^\s*[-*+]\s+/gm, '').trim();

      let suggestions: string[] = [];
      if (aiResponse.toLowerCase().includes('program')) {
        suggestions.push('Explore programs');
      }
      if (aiResponse.toLowerCase().includes('admission')) {
        suggestions.push('Admission info');
      }
      if (aiResponse.toLowerCase().includes('compare')) {
        suggestions.push('Compare universities');
      }
      if (suggestions.length < 2) {
        suggestions.push('Explore state universities', 'Find programs for me', 'Tell me about admissions', 'Compare universities');
      }

      return {
        response: cleanAiResponse,
        suggestions: suggestions.slice(0, 4)
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
        suggestions: ['Find universities', 'Browse programs', 'Admission guidance', 'Compare universities']
      };
    }
  };


  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const result = await processMessage(inputMessage);

      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: result.response,
          timestamp: new Date(),
          suggestions: result.suggestions
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000); // Simulate typing delay
    } catch (error) {
      console.error('Error processing message:', error);
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = async (suggestion: string) => {
    // Update context tracking
    if (suggestion.includes('PUP')) {
      setConversationContext(prev => ({
        ...prev,
        currentUniversity: 'PUP',
        exploredUniversities: prev.exploredUniversities.includes('PUP')
          ? prev.exploredUniversities
          : [...prev.exploredUniversities, 'PUP']
      }));
    } else if (suggestion.includes('TUP')) {
      setConversationContext(prev => ({
        ...prev,
        currentUniversity: 'TUP',
        exploredUniversities: prev.exploredUniversities.includes('TUP')
          ? prev.exploredUniversities
          : [...prev.exploredUniversities, 'TUP']
      }));
    } else if (suggestion.includes('PLM')) {
      setConversationContext(prev => ({
        ...prev,
        currentUniversity: 'PLM',
        exploredUniversities: prev.exploredUniversities.includes('PLM')
          ? prev.exploredUniversities
          : [...prev.exploredUniversities, 'PLM']
      }));
    }

    // Add the user's "clicked" message to the chat (but show it as a suggestion click)
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: `💡 ${suggestion}`, // Show as suggestion click
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      let response: string;
      let suggestions: string[] = [];

      // Use RULE-BASED responses for all suggestion clicks (no AI)
      if (suggestion === 'Explore state universities') {
        response = 'Awesome! 🌟 State universities are such smart choices for quality education at affordable prices. In Metro Manila, we have three amazing ones: PUP (the largest!), TUP (engineering powerhouse), and PLM (medicine and law excellence). Which one catches your eye first? 🤔';
        suggestions = ['PUP details', 'TUP information', 'PLM programs', 'Compare all three'];
      } else if (suggestion === 'Find programs for me') {
        response = 'Perfect! 🎓 What field excites you most? We have amazing programs in technology, business, healthcare, engineering, arts, and sciences. Tell me what you\'re passionate about, and I\'ll guide you to the right programs! 🌟';
        suggestions = ['Technology & IT', 'Business & Finance', 'Engineering fields', 'Healthcare programs'];
      } else if (suggestion === 'Technology & IT') {
        // Get technology programs from all universities
        try {
          const universities = await UniversityService.getAllUniversities();
          const pup = universities.find(u => u.name.toLowerCase().includes('polytechnic') || u.name.toLowerCase().includes('pup'));
          const tup = universities.find(u => u.name.toLowerCase().includes('technological') || u.name.toLowerCase().includes('tup'));
          const plm = universities.find(u => u.name.toLowerCase().includes('lungsod') || u.name.toLowerCase().includes('maynila') || u.name.toLowerCase().includes('plm'));

          let techPrograms = [];

          if (pup) {
            const pupPrograms = await AcademicProgramService.getProgramsByUniversityId(pup.id);
            const pupTech = pupPrograms.filter(p => 
              p.programName.toLowerCase().includes('computer') || 
              p.programName.toLowerCase().includes('information technology') ||
              p.programName.toLowerCase().includes('information systems') ||
              p.programName.toLowerCase().includes('computer engineering')
            ).slice(0, 3).map(p => `${p.programName} (PUP)`);
            techPrograms.push(...pupTech);
          }

          if (tup) {
            const tupPrograms = await AcademicProgramService.getProgramsByUniversityId(tup.id);
            const tupTech = tupPrograms.filter(p => 
              p.programName.toLowerCase().includes('computer') || 
              p.programName.toLowerCase().includes('information technology') ||
              p.programName.toLowerCase().includes('information system') ||
              p.programName.toLowerCase().includes('electronics') ||
              p.programName.toLowerCase().includes('engineering technology')
            ).slice(0, 4).map(p => `${p.programName} (TUP)`);
            techPrograms.push(...tupTech);
          }

          if (plm) {
            const plmPrograms = await AcademicProgramService.getProgramsByUniversityId(plm.id);
            const plmTech = plmPrograms.filter(p => 
              p.programName.toLowerCase().includes('computer') || 
              p.programName.toLowerCase().includes('information technology')
            ).slice(0, 2).map(p => `${p.programName} (PLM)`);
            techPrograms.push(...plmTech);
          }

          response = `🤖💻 You're interested in Technology and IT programs! 📚\n\nHere are some top programs offered by our universities:\n\n${techPrograms.slice(0, 8).map(name => `• ${name}`).join('\n')}${techPrograms.length > 8 ? `\n...and ${techPrograms.length - 8} more programs` : ''}\n\nTUP specializes in engineering and technology programs, PUP offers comprehensive IT education, and PLM provides strong computer science programs. These programs prepare you for exciting careers in software development, data analysis, cybersecurity, and more!\n\nWhich of these programs resonates with you? 🤔`;
          suggestions = ['Suggest a course', 'Get admission requirements', 'Compare with other universities'];
        } catch (error) {
          response = '🤖💻 You\'re interested in Technology and IT programs! 📚\n\nAll our universities offer excellent technology programs:\n\n• Computer Science (PUP, TUP, PLM)\n• Information Technology (PUP, TUP, PLM)\n• Computer Engineering (PUP, TUP, PLM)\n• Information Systems (PUP, TUP)\n• Electronics Engineering (TUP, PLM)\n\nTUP is particularly strong in engineering technology, PUP offers comprehensive IT education, and PLM provides excellent computer science programs.\n\nWhat specific technology area interests you most? 🤔';
          suggestions = ['Computer Science', 'IT programs', 'Engineering tech', 'Programming courses'];
        }
      } else if (suggestion === 'Business & Finance') {
        // Get business programs from all universities
        try {
          const universities = await UniversityService.getAllUniversities();
          const pup = universities.find(u => u.name.toLowerCase().includes('polytechnic') || u.name.toLowerCase().includes('pup'));
          const tup = universities.find(u => u.name.toLowerCase().includes('technological') || u.name.toLowerCase().includes('tup'));
          const plm = universities.find(u => u.name.toLowerCase().includes('lungsod') || u.name.toLowerCase().includes('maynila') || u.name.toLowerCase().includes('plm'));

          let businessPrograms = [];

          if (pup) {
            const pupPrograms = await AcademicProgramService.getProgramsByUniversityId(pup.id);
            const pupBiz = pupPrograms.filter(p => 
              p.programName.toLowerCase().includes('business administration') || 
              p.programName.toLowerCase().includes('accountancy') ||
              p.programName.toLowerCase().includes('management accounting') ||
              p.programName.toLowerCase().includes('finance') ||
              p.programName.toLowerCase().includes('entrepreneurship') ||
              p.programName.toLowerCase().includes('office administration')
            ).slice(0, 4).map(p => `${p.programName} (PUP)`);
            businessPrograms.push(...pupBiz);
          }

          if (tup) {
            const tupPrograms = await AcademicProgramService.getProgramsByUniversityId(tup.id);
            const tupBiz = tupPrograms.filter(p => 
              p.programName.toLowerCase().includes('business') || 
              p.programName.toLowerCase().includes('management') ||
              p.programName.toLowerCase().includes('entrepreneurship') ||
              p.programName.toLowerCase().includes('hospitality')
            ).slice(0, 3).map(p => `${p.programName} (TUP)`);
            businessPrograms.push(...tupBiz);
          }

          if (plm) {
            const plmPrograms = await AcademicProgramService.getProgramsByUniversityId(plm.id);
            const plmBiz = plmPrograms.filter(p => 
              p.programName.toLowerCase().includes('business') || 
              p.programName.toLowerCase().includes('accountancy') ||
              p.programName.toLowerCase().includes('economics') ||
              p.programName.toLowerCase().includes('entrepreneurship') ||
              p.programName.toLowerCase().includes('hospitality') ||
              p.programName.toLowerCase().includes('tourism') ||
              p.programName.toLowerCase().includes('real estate')
            ).slice(0, 6).map(p => `${p.programName} (PLM)`);
            businessPrograms.push(...plmBiz);
          }

          response = `💼📊 You're interested in Business & Finance programs! 📈\n\nHere are some top programs offered by our universities:\n\n${businessPrograms.slice(0, 10).map(name => `• ${name}`).join('\n')}${businessPrograms.length > 10 ? `\n...and ${businessPrograms.length - 10} more programs` : ''}\n\nPLM excels in business and finance programs, PUP offers comprehensive business administration, and TUP provides strong management and entrepreneurship programs. These programs prepare you for careers in accounting, finance, management, entrepreneurship, and business leadership!\n\nWhich business path interests you most? 🤔`;
          suggestions = ['Suggest a course', 'Get admission requirements', 'Compare with other universities'];
        } catch (error) {
          response = '💼📊 You\'re interested in Business & Finance programs! 📈\n\nAll our universities offer excellent business programs:\n\n• Business Administration (PUP, PLM)\n• Accountancy (PUP, PLM)\n• Entrepreneurship (PUP, TUP, PLM)\n• Financial Management (PUP, PLM)\n• Hospitality Management (TUP, PLM)\n• Tourism Management (PLM)\n\nPLM is particularly strong in business and finance, PUP offers comprehensive business education, and TUP provides excellent management programs.\n\nWhat business area excites you most? 🤔';
          suggestions = ['Accountancy', 'Business Admin', 'Entrepreneurship', 'Tourism Management'];
        }
      } else if (suggestion === 'Engineering fields') {
        // Get engineering programs from all universities
        try {
          const universities = await UniversityService.getAllUniversities();
          const pup = universities.find(u => u.name.toLowerCase().includes('polytechnic') || u.name.toLowerCase().includes('pup'));
          const tup = universities.find(u => u.name.toLowerCase().includes('technological') || u.name.toLowerCase().includes('tup'));
          const plm = universities.find(u => u.name.toLowerCase().includes('lungsod') || u.name.toLowerCase().includes('maynila') || u.name.toLowerCase().includes('plm'));

          let engineeringPrograms = [];

          if (pup) {
            const pupPrograms = await AcademicProgramService.getProgramsByUniversityId(pup.id);
            const pupEng = pupPrograms.filter(p => 
              p.programName.toLowerCase().includes('engineering') ||
              p.programName.toLowerCase().includes('railway')
            ).slice(0, 4).map(p => `${p.programName} (PUP)`);
            engineeringPrograms.push(...pupEng);
          }

          if (tup) {
            const tupPrograms = await AcademicProgramService.getProgramsByUniversityId(tup.id);
            const tupEng = tupPrograms.filter(p => 
              p.programName.toLowerCase().includes('engineering') ||
              p.programName.toLowerCase().includes('technology') ||
              p.programName.toLowerCase().includes('mechanical') ||
              p.programName.toLowerCase().includes('electrical') ||
              p.programName.toLowerCase().includes('civil') ||
              p.programName.toLowerCase().includes('electronics') ||
              p.programName.toLowerCase().includes('computer engineering') ||
              p.programName.toLowerCase().includes('industrial') ||
              p.programName.toLowerCase().includes('railway') ||
              p.programName.toLowerCase().includes('mechatronics')
            ).slice(0, 8).map(p => `${p.programName} (TUP)`);
            engineeringPrograms.push(...tupEng);
          }

          if (plm) {
            const plmPrograms = await AcademicProgramService.getProgramsByUniversityId(plm.id);
            const plmEng = plmPrograms.filter(p => 
              p.programName.toLowerCase().includes('engineering') ||
              p.programName.toLowerCase().includes('chemical') ||
              p.programName.toLowerCase().includes('civil') ||
              p.programName.toLowerCase().includes('computer engineering') ||
              p.programName.toLowerCase().includes('electrical') ||
              p.programName.toLowerCase().includes('electronics') ||
              p.programName.toLowerCase().includes('mechanical') ||
              p.programName.toLowerCase().includes('manufacturing')
            ).slice(0, 5).map(p => `${p.programName} (PLM)`);
            engineeringPrograms.push(...plmEng);
          }

          response = `🔧⚙️ You're interested in Engineering fields! 🏗️\n\nHere are some top programs offered by our universities:\n\n${engineeringPrograms.slice(0, 12).map(name => `• ${name}`).join('\n')}${engineeringPrograms.length > 12 ? `\n...and ${engineeringPrograms.length - 12} more programs` : ''}\n\nTUP is the engineering powerhouse with extensive technology programs, PUP offers solid engineering education, and PLM provides excellent engineering programs. These programs prepare you for careers in construction, manufacturing, technology, infrastructure, and innovation!\n\nWhich engineering discipline interests you most? 🤔`;
          suggestions = ['Suggest a course', 'Get admission requirements', 'Compare with other universities'];
        } catch (error) {
          response = '🔧⚙️ You\'re interested in Engineering fields! 🏗️\n\nAll our universities offer excellent engineering programs:\n\n• Civil Engineering (PUP, TUP, PLM)\n• Mechanical Engineering (PUP, TUP, PLM)\n• Electrical Engineering (PUP, TUP, PLM)\n• Electronics Engineering (PUP, TUP, PLM)\n• Computer Engineering (PUP, TUP, PLM)\n• Chemical Engineering (PLM)\n• Industrial Engineering (PUP)\n• Railway Engineering (PUP, TUP)\n\nTUP specializes in engineering and technology, PUP offers comprehensive engineering education, and PLM provides excellent professional engineering programs.\n\nWhat engineering field excites you most? 🤔';
          suggestions = ['Civil Engineering', 'Computer Engineering', 'Mechanical Engineering', 'Electrical Engineering'];
        }
      } else if (suggestion === 'Healthcare programs') {
        // Get healthcare programs from all universities
        try {
          const universities = await UniversityService.getAllUniversities();
          const pup = universities.find(u => u.name.toLowerCase().includes('polytechnic') || u.name.toLowerCase().includes('pup'));
          const tup = universities.find(u => u.name.toLowerCase().includes('technological') || u.name.toLowerCase().includes('tup'));
          const plm = universities.find(u => u.name.toLowerCase().includes('lungsod') || u.name.toLowerCase().includes('maynila') || u.name.toLowerCase().includes('plm'));

          let healthcarePrograms = [];

          if (pup) {
            const pupPrograms = await AcademicProgramService.getProgramsByUniversityId(pup.id);
            const pupHealth = pupPrograms.filter(p =>
              p.programName.toLowerCase().includes('nutrition') ||
              p.programName.toLowerCase().includes('dietetics')
            ).slice(0, 1).map(p => `${p.programName} (PUP)`);
            healthcarePrograms.push(...pupHealth);
          }

          if (plm) {
            const plmPrograms = await AcademicProgramService.getProgramsByUniversityId(plm.id);
            const plmHealth = plmPrograms.filter(p =>
              p.programName.toLowerCase().includes('medicine') ||
              p.programName.toLowerCase().includes('nursing') ||
              p.programName.toLowerCase().includes('physical therapy') ||
              p.programName.toLowerCase().includes('doctor')
            ).slice(0, 4).map(p => `${p.programName} (PLM)`);
            healthcarePrograms.push(...plmHealth);
          }

          response = `🏥⚕️ You're interested in Healthcare programs! 👩‍⚕️\n\nHere are some top programs offered by our universities:\n\n${healthcarePrograms.slice(0, 6).map(name => `• ${name}`).join('\n')}${healthcarePrograms.length > 6 ? `\n...and ${healthcarePrograms.length - 6} more programs` : ''}\n\nPLM is the leader in healthcare education with their renowned Doctor of Medicine program and excellent nursing courses! 🩺 PUP also offers strong nutrition and dietetics programs. These programs prepare you for rewarding careers in medicine, nursing, therapy, and healthcare!\n\nWhich healthcare path interests you most? 🤔`;
          suggestions = ['Suggest a course', 'Get admission requirements', 'Compare with other universities'];
        } catch (error) {
          response = '🏥⚕️ You\'re interested in Healthcare programs! 👩‍⚕️\n\nPLM leads in healthcare education with their renowned Doctor of Medicine program and excellent nursing courses! 🩺 PUP also offers strong nutrition and dietetics programs.\n\n• Doctor of Medicine (PLM)\n• Bachelor of Science in Nursing (PLM)\n• Bachelor of Science in Physical Therapy (PLM)\n• Bachelor of Science in Nutrition and Dietetics (PUP)\n\nThese programs prepare you for rewarding careers in medicine, nursing, therapy, and healthcare!\n\nWhich healthcare path interests you most? 🤔';
          suggestions = ['PLM programs', 'PUP programs', 'Admission requirements', 'Nursing programs'];
        }
      } else if (suggestion === 'Education programs') {
        // Get education programs from all universities
        try {
          const universities = await UniversityService.getAllUniversities();
          const pup = universities.find(u => u.name.toLowerCase().includes('polytechnic') || u.name.toLowerCase().includes('pup'));
          const plm = universities.find(u => u.name.toLowerCase().includes('lungsod') || u.name.toLowerCase().includes('maynila') || u.name.toLowerCase().includes('plm'));

          let educationPrograms = [];

          if (pup) {
            const pupPrograms = await AcademicProgramService.getProgramsByUniversityId(pup.id);
            const pupEdu = pupPrograms.filter(p => 
              p.programName.toLowerCase().includes('education') ||
              p.programName.toLowerCase().includes('elementary') ||
              p.programName.toLowerCase().includes('secondary') ||
              p.programName.toLowerCase().includes('library') ||
              p.programName.toLowerCase().includes('teacher')
            ).slice(0, 8).map(p => `${p.programName} (PUP)`);
            educationPrograms.push(...pupEdu);
          }

          if (plm) {
            const plmPrograms = await AcademicProgramService.getProgramsByUniversityId(plm.id);
            const plmEdu = plmPrograms.filter(p => 
              p.programName.toLowerCase().includes('education') ||
              p.programName.toLowerCase().includes('elementary') ||
              p.programName.toLowerCase().includes('secondary') ||
              p.programName.toLowerCase().includes('physical education') ||
              p.programName.toLowerCase().includes('early childhood')
            ).slice(0, 6).map(p => `${p.programName} (PLM)`);
            educationPrograms.push(...plmEdu);
          }

          response = `📚🎓 You're interested in Education programs! 👨‍🏫\n\nHere are some top programs offered by our universities:\n\n${educationPrograms.slice(0, 12).map(name => `• ${name}`).join('\n')}${educationPrograms.length > 12 ? `\n...and ${educationPrograms.length - 12} more programs` : ''}\n\nPUP offers the most comprehensive education programs, while PLM provides excellent teacher education and specialized education courses. These programs prepare you for rewarding careers in teaching, educational administration, and educational technology!\n\nWhich education specialization interests you most? 🤔`;
          suggestions = ['Suggest a course', 'Get admission requirements', 'Compare with other universities'];
        } catch (error) {
          response = '📚🎓 You\'re interested in Education programs! 👨‍🏫\n\nBoth PUP and PLM offer excellent education programs:\n\n• Bachelor of Elementary Education (PUP, PLM)\n• Bachelor of Secondary Education (PUP, PLM)\n• Bachelor of Technology and Livelihood Education (PUP)\n• Bachelor of Library and Information Science (PUP)\n• Bachelor of Physical Education (PUP, PLM)\n• Bachelor of Early Childhood Education (PLM)\n\nPUP has extensive education offerings, while PLM specializes in professional teacher education. These programs prepare you for fulfilling careers in education!\n\nWhat type of education interests you most? 🤔';
          suggestions = ['PUP programs', 'PLM programs', 'Admission requirements', 'Teacher education'];
        }
      } else if (suggestion === 'Arts & Sciences') {
        // Get arts and sciences programs from all universities
        try {
          const universities = await UniversityService.getAllUniversities();
          const pup = universities.find(u => u.name.toLowerCase().includes('polytechnic') || u.name.toLowerCase().includes('pup'));
          const tup = universities.find(u => u.name.toLowerCase().includes('technological') || u.name.toLowerCase().includes('tup'));
          const plm = universities.find(u => u.name.toLowerCase().includes('lungsod') || u.name.toLowerCase().includes('maynila') || u.name.toLowerCase().includes('plm'));

          let artsSciencesPrograms = [];

          if (pup) {
            const pupPrograms = await AcademicProgramService.getProgramsByUniversityId(pup.id);
            const pupArts = pupPrograms.filter(p =>
              p.programName.toLowerCase().includes('psychology') ||
              p.programName.toLowerCase().includes('sociology') ||
              p.programName.toLowerCase().includes('history') ||
              p.programName.toLowerCase().includes('economics') ||
              p.programName.toLowerCase().includes('biology') ||
              p.programName.toLowerCase().includes('chemistry') ||
              p.programName.toLowerCase().includes('physics') ||
              p.programName.toLowerCase().includes('mathematics') ||
              p.programName.toLowerCase().includes('literary') ||
              p.programName.toLowerCase().includes('communication') ||
              p.programName.toLowerCase().includes('english') ||
              p.programName.toLowerCase().includes('filipino') ||
              p.programName.toLowerCase().includes('philosophy')
            ).slice(0, 10).map(p => `${p.programName} (PUP)`);
            artsSciencesPrograms.push(...pupArts);
          }

          if (tup) {
            const tupPrograms = await AcademicProgramService.getProgramsByUniversityId(tup.id);
            const tupArts = tupPrograms.filter(p =>
              p.programName.toLowerCase().includes('applied science') ||
              p.programName.toLowerCase().includes('environmental science') ||
              p.programName.toLowerCase().includes('laboratory technology')
            ).slice(0, 3).map(p => `${p.programName} (TUP)`);
            artsSciencesPrograms.push(...tupArts);
          }

          if (plm) {
            const plmPrograms = await AcademicProgramService.getProgramsByUniversityId(plm.id);
            const plmArts = plmPrograms.filter(p =>
              p.programName.toLowerCase().includes('biology') ||
              p.programName.toLowerCase().includes('chemistry') ||
              p.programName.toLowerCase().includes('mathematics') ||
              p.programName.toLowerCase().includes('psychology') ||
              p.programName.toLowerCase().includes('communication') ||
              p.programName.toLowerCase().includes('social work') ||
              p.programName.toLowerCase().includes('arts')
            ).slice(0, 7).map(p => `${p.programName} (PLM)`);
            artsSciencesPrograms.push(...plmArts);
          }

          response = `🎨🔬 You're interested in Arts & Sciences programs! 📖\n\nHere are some top programs offered by our universities:\n\n${artsSciencesPrograms.slice(0, 15).map(name => `• ${name}`).join('\n')}${artsSciencesPrograms.length > 15 ? `\n...and ${artsSciencesPrograms.length - 15} more programs` : ''}\n\nPUP offers the broadest range of arts and sciences programs, from humanities and social sciences to natural sciences. PLM provides excellent science programs and liberal arts education. TUP focuses on applied sciences and technology-related fields. These programs prepare you for diverse careers in research, education, communication, and scientific fields!\n\nWhich area of arts or sciences interests you most? 🤔`;
          suggestions = ['Suggest a course', 'Get admission requirements', 'Compare with other universities'];
        } catch (error) {
          response = '🎨🔬 You\'re interested in Arts & Sciences programs! 📖\n\nOur universities offer excellent programs in arts and sciences:\n\n• Psychology (PUP, PLM)\n• Biology (PUP, PLM)\n• Chemistry (PUP, PLM)\n• Mathematics (PUP, PLM)\n• Communication (PUP, PLM)\n• Sociology (PUP)\n• History (PUP)\n• Economics (PUP, PLM)\n• English Language Studies (PUP)\n• Filipino Language Studies (PUP)\n\nPUP has the most comprehensive offerings, while PLM excels in sciences and professional programs. These programs prepare you for careers in research, education, media, and various scientific fields!\n\nWhat specific field interests you most? 🤔';
          suggestions = ['Psychology', 'Biology programs', 'Communication programs', 'PUP programs'];
        }
      } else if (suggestion === 'Tell me about admissions') {
        response = 'Great question! 🎓 Admission processes vary by university, but generally involve entrance exams, academic requirements, and interviews. State universities offer affordable education with competitive admissions. Which university are you interested in applying to?';
        suggestions = ['PUP admission', 'TUP admission', 'PLM admission', 'Entrance exams'];
      } else if (suggestion === 'Compare universities') {
        response = 'Excellent choice! 🔍 Comparing universities helps you make the best decision. You can compare up to 3 universities side-by-side to see tuition, programs, location, facilities, and admission requirements. Ready to get started?';
        suggestions = ['Go to Compare Page', 'PUP vs TUP', 'PUP vs PLM', 'TUP vs PLM'];
      } else if (suggestion === 'PUP vs TUP') {
        // Get comparison data for PUP and TUP
        try {
          const universities = await UniversityService.getAllUniversities();
          const pup = universities.find(u => u.name.toLowerCase().includes('polytechnic') || u.name.toLowerCase().includes('pup'));
          const tup = universities.find(u => u.name.toLowerCase().includes('technological') || u.name.toLowerCase().includes('tup'));

          if (pup && tup) {
            response = `🔍 PUP vs TUP Comparison Overview:

📊 Size & Scale:
• PUP: ${pup.students}+ students (largest state university)
• TUP: ${tup.students}+ students (focused engineering institution)

🎓 Program Focus:
• PUP: Comprehensive programs across technology, business, education, engineering, sciences (${pup.programs}+ total programs)
• TUP: Specialized in engineering, technology, and industrial programs (${tup.programs}+ programs)

💼 Key Strengths:
• PUP: Broad education options, largest alumni network, diverse campus life
• TUP: Engineering excellence, industry partnerships, technical innovation

📍 Location:
• PUP: Sta. Mesa, Manila
• TUP: Ermita, Manila

💰 Both offer affordable state university tuition

🏆 Best For:
• Choose PUP if you want maximum program variety and a large, diverse campus experience
• Choose TUP if you're focused on engineering, technology, or industrial careers

Want me to dive deeper into programs, admission, or facilities for either university?`;
            suggestions = ['PUP programs', 'TUP programs', 'PUP admission', 'TUP admission', 'Go to Compare Page'];
          }
        } catch (error) {
          response = 'I\'d love to compare PUP and TUP for you! Both are excellent state universities. PUP offers broader program variety while TUP specializes in engineering excellence. Would you like me to show you their comparison tool or specific details about either university?';
          suggestions = ['Go to Compare Page', 'PUP details', 'TUP information'];
        }
      } else if (suggestion === 'PUP vs PLM') {
        // Get comparison data for PUP and PLM
        try {
          const universities = await UniversityService.getAllUniversities();
          const pup = universities.find(u => u.name.toLowerCase().includes('polytechnic') || u.name.toLowerCase().includes('pup'));
          const plm = universities.find(u => u.name.toLowerCase().includes('lungsod') || u.name.toLowerCase().includes('maynila') || u.name.toLowerCase().includes('plm'));

          if (pup && plm) {
            response = `🔍 PUP vs PLM Comparison Overview:

📊 Size & Scale:
• PUP: ${pup.students}+ students (largest state university)
• PLM: ${plm.students}+ students (historic institution)

🎓 Program Focus:
• PUP: Technology, business, education, engineering, sciences (${pup.programs}+ programs)
• PLM: Medicine, law, professional programs, business, education (${plm.programs}+ programs)

💼 Key Strengths:
• PUP: Broad education options, largest alumni network, diverse campus life
• PLM: Professional program excellence, medicine & law focus, historic campus

📍 Location:
• PUP: Sta. Mesa, Manila
• PLM: Intramuros, Manila (historic walled city)

💰 Tuition Range: Both offer affordable state university tuition (P5,000-15,000/semester)

🏆 Best For:
• Choose PUP if you want maximum program variety and a large, diverse campus experience
• Choose PLM if you're interested in medicine, law, or other professional careers

Want me to explore programs, admission requirements, or campus life for either university?`;
            suggestions = ['PUP programs', 'PLM programs', 'PUP admission', 'PLM admission', 'Go to Compare Page'];
          }
        } catch (error) {
          response = 'Both PUP and PLM are outstanding choices! PUP offers broader program variety while PLM specializes in professional programs like medicine and law. Would you like me to show their detailed comparison or specific information about either university?';
          suggestions = ['Go to Compare Page', 'PUP details', 'PLM programs'];
        }
      } else if (suggestion === 'TUP vs PLM') {
        // Get comparison data for TUP and PLM
        try {
          const universities = await UniversityService.getAllUniversities();
          const tup = universities.find(u => u.name.toLowerCase().includes('technological') || u.name.toLowerCase().includes('tup'));
          const plm = universities.find(u => u.name.toLowerCase().includes('lungsod') || u.name.toLowerCase().includes('maynila') || u.name.toLowerCase().includes('plm'));

          if (tup && plm) {
            response = `🔍 TUP vs PLM Comparison Overview:

📊 Size & Scale:
• TUP: ${tup.students}+ students (engineering-focused)
• PLM: ${plm.students}+ students (professional programs)

🎓 Program Focus:
• TUP: Engineering, technology, industrial programs (${tup.programs}+ programs)
• PLM: Medicine, law, professional programs, business (${plm.programs}+ programs)

💼 Key Strengths:
• TUP: Engineering excellence, industry partnerships, technical innovation
• PLM: Professional program excellence, medicine & law focus, historic campus

📍 Location:
• TUP: Ermita, Manila
• PLM: Intramuros, Manila (historic walled city)

💰 Tuition Range: Both offer affordable state university tuition (P5,000-15,000/semester)

🏆 Best For:
• Choose TUP if you're focused on engineering, technology, or industrial careers
• Choose PLM if you're interested in medicine, law, or other professional fields

Want me to dive deeper into their programs, admission processes, or campus facilities?`;
            suggestions = ['TUP programs', 'PLM programs', 'TUP admission', 'PLM admission', 'Go to Compare Page'];
          }
        } catch (error) {
          response = 'TUP and PLM both offer excellent specialized education! TUP focuses on engineering excellence while PLM specializes in professional programs. Would you like me to show their comparison tool or detailed information about either university?';
          suggestions = ['Go to Compare Page', 'TUP information', 'PLM programs'];
        }
      } else if (suggestion === 'PUP details') {
        response = 'PUP is absolutely incredible! 🎓 With over 65,000 students, it\'s the largest state university in the Philippines. They excel in technology, business, and education programs. Wow, that\'s impressive! 😮 Want me to show you their programs, admission info, or campus facilities first?';
        suggestions = ['PUP programs', 'PUP admission', 'PUP facilities', 'PUP rankings'];
      } else if (suggestion === 'TUP information') {
        response = 'TUP is fantastic! 🔧 They\'re all about engineering and technology excellence. With around 12,000 students, they have amazing programs in engineering, IT, and industrial technology. Perfect for tech enthusiasts! 💻 What would you like to explore about TUP?';
        suggestions = ['TUP programs', 'TUP admission', 'TUP facilities', 'TUP rankings'];
      } else if (suggestion === 'PLM programs') {
        response = 'PLM is outstanding! 🏥 Located in historic Intramuros, they specialize in medicine, law, and professional programs. They have around 8,000 students and are known for their Doctor of Medicine and Law programs. Amazing! 🤩 Curious about their programs or admission?';
        suggestions = ['PLM programs', 'PLM admission', 'PLM facilities', 'PLM rankings'];
      } else if (suggestion === 'PUP programs') {
        response = 'PUP has an incredible variety! 🎓 They offer 125+ programs across technology, business, engineering, education, and sciences. Popular ones include Computer Science, Business Administration, Civil Engineering, and Education. Want me to show you specific programs or admission requirements?';
        suggestions = ['List undergraduate programs', 'Show graduate programs', 'PUP admission', 'PUP rankings'];
      } else if (suggestion === 'TUP programs') {
        response = 'TUP is engineering heaven! 🔧 They focus on technology and industrial programs with around 40+ specialized courses. Civil Engineering, Electrical Engineering, Computer Science, and Food Technology are their stars. Exciting technical programs! ⚡ Want to see their admission details?';
        suggestions = ['List undergraduate programs', 'Show graduate programs', 'TUP admission', 'TUP facilities'];
      } else if (suggestion === 'PLM programs') {
        response = 'PLM offers exceptional professional programs! 🏥 Their Doctor of Medicine, Juris Doctor (Law), Nursing, and various business programs are top-notch. Located in beautiful Intramuros, they combine history with modern education. Impressive! 📚 What interests you most?';
        suggestions = ['List undergraduate programs', 'Show graduate programs', 'PLM admission', 'PLM facilities'];
      } else if (suggestion === 'Go to Compare Page') {
        response = `Perfect! 🎯 Let's head to our comparison tool where you can compare up to 3 universities side-by-side. Click the link below to get started:\n\n🔗 **[Go to Compare Page](/compare)**\n\nYou'll be able to select universities and see tuition, programs, location, facilities, and admission requirements all in one view! 📊`;
        suggestions = ['What can I help you more with today?'];
      } else if (suggestion === 'Connect with Toff') {
        response = `Awesome! 😄 Here's how to connect with Toff: \n\n🌟 Social Media Links:\n\n🔗 **[Facebook](https://www.facebook.com/pogikotalaga.hahaangalpatay)**\n\n🔗 **[GitHub](https://github.com/txiaoqt)**\n\n🔗 **[Instagram](https://www.instagram.com/ctadzz/)**\n\nHe would love to make new friends and connect! Don't forget to say hi to him when you connect! 👋`;
        suggestions = ['What can I help you more with today?'];
      } else if (suggestion === 'View social media') {
        response = `Sure thing! 🎉 Check out Toff's social media:\n\n📘 **[Facebook](https://www.facebook.com/pogikotalaga.hahaangalpatay)**\n\n💻 **[GitHub](https://github.com/txiaoqt)**\n\n📷 **[Instagram](https://www.instagram.com/ctadzz/)**\n\nHe loves making new friends—connect with him! 🌟`;
        suggestions = ['What can I help you more with today?'];
      } else if (suggestion === 'GitHub profile') {
        response = `Tech enthusiasts unite! 💻 Check out Toff's GitHub profile:\n\n🔗 **[GitHub](https://github.com/txiaoqt)**\n\nHe would love to make new friends and connect! Don't forget to say hi! 👋`;
        suggestions = ['What can I help you more with today?'];
      } else if (suggestion === 'Follow on Instagram') {
        response = `Follow Toff on Instagram:\n\n🔗 **[Instagram](https://www.instagram.com/ctadzz/)**\n\nHe would love to make new friends—DM him to say hello! 👋`;
        suggestions = ['What can I help you more with today?'];
      } else if (suggestion.startsWith('Want to learn more about')) {
        const universityName = suggestion.match(/Want to learn more about (\w+)\?/);
        if (universityName) {
          const uni = universityName[1].toUpperCase();
          let universityId = 1;
          if (uni === 'TUP') universityId = 2;
          else if (uni === 'PLM') universityId = 3;

          response = `Perfect! 📖 Let's explore ${uni} in detail. Click the link below to view their complete profile, programs, admission requirements, facilities, and more:\n\n🔗 **[View ${uni} Details](/universities/${universityId})**\n\nYou'll find everything you need to know about ${uni}! 🏛️`;
          suggestions = ['What can I help you more with today?'];
        } else {
          response = 'Sure! I\'d love to show you more details. Which university are you most interested in?';
          suggestions = ['PUP details', 'TUP information', 'PLM programs'];
        }
      } else {
        // For any other suggestions not covered above, use AI to handle
        const result = await processMessage(suggestion.toLowerCase());
        response = result.response;
        suggestions = result.suggestions || [];
      }

      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: response,
          timestamp: new Date(),
          suggestions: suggestions
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 500); // Shorter delay for suggestion clicks
    } catch (error) {
      console.error('Error processing suggestion:', error);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-maroon-800 hover:bg-maroon-700 text-white p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 z-50 group"
          aria-label="Open chat"
        >
          <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
          <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            Ask me!
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 md:left-auto md:right-6 md:bottom-6 md:translate-x-0 w-[calc(100vw-2rem)] max-w-sm md:w-96 h-[500px] bg-white rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-maroon-800 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span className="font-semibold">UniBot</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-maroon-700 p-1 rounded transition-colors"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-maroon-800 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    {message.type === 'bot' ? (
                      <Bot className="h-4 w-4 text-maroon-600" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                    <span className="text-xs opacity-70">
                      {message.type === 'bot' ? 'UniBot' : 'You'}
                    </span>
                  </div>
                  <div className="text-sm whitespace-pre-line">
                    {message.content.split(/(\*\*\[.*?\]\([^)]+\)\*\*)/).map((part, index) => {
                      // Handle markdown links with bold **[text](url)**
                      const boldLinkMatch = part.match(/^\*\*\[([^\]]+)\]\(([^)]+)\)\*\*$/);
                      if (boldLinkMatch) {
                        return (
                          <Link
                            key={index}
                            to={boldLinkMatch[2]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-maroon-600 hover:text-maroon-800 underline font-medium cursor-pointer"
                          >
                            {boldLinkMatch[1]}
                          </Link>
                        );
                      }
                      // Handle bold text **text**
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={index}>{part.slice(2, -2)}</strong>;
                      }
                      return <span key={index}>{part}</span>;
                    })}
                  </div>
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {message.suggestions
                        .filter(suggestion => suggestion !== 'What can I help you more with today?')
                        .map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block w-full text-left text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-maroon-600" />
                    <span className="text-xs text-gray-600">UniBot is typing...</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about universities..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent text-sm"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-maroon-800 hover:bg-maroon-700 disabled:bg-gray-400 text-white p-2 rounded-lg transition-colors"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Smart Assistant • Ask about universities, programs, or admissions
            </p>
          </div>
        </div>
      )}
    </>
  );
}
