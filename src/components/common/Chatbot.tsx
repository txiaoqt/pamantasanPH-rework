import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, ExternalLink } from 'lucide-react';
import { UniversityService } from '../../services/universityService';
import { AcademicProgramService } from '../../services/academicProgramService';
import { University } from '../university/UniversityCard';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface KnowledgeBase {
  [key: string]: {
    response: string;
    suggestions?: string[];
    action?: () => void;
  };
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hi! I\'m UniBot, your AI assistant for university information. How can I help you today?',
      timestamp: new Date(),
      suggestions: [
        'Find universities in Manila',
        'Compare programs',
        'Admission requirements',
        'Program categories'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Knowledge base for common queries
  const knowledgeBase: KnowledgeBase = {
    // Greetings and basic interactions
    'hi': {
      response: 'Hello! Welcome to UniCentral! I\'m UniBot, your AI assistant for university information. How can I help you find the perfect university or program today?',
      suggestions: ['Find universities', 'Browse programs', 'Admission guidance', 'Compare universities']
    },
    'hello': {
      response: 'Hi there! 👋 I\'m UniBot, ready to help you with all your university questions. What would you like to know about universities in the Philippines?',
      suggestions: ['University search', 'Program categories', 'Admission info', 'University rankings']
    },
    'hey': {
      response: 'Hey! Great to see you here! I\'m UniBot, your guide to Philippine universities. What can I help you discover today?',
      suggestions: ['Find universities', 'Program search', 'Admission help', 'University map']
    },
    'good morning': {
      response: 'Good morning! ☀️ Ready to start your university journey? I\'m here to help you find the perfect educational path.',
      suggestions: ['Morning university search', 'Program recommendations', 'Admission deadlines', 'University tours']
    },
    'good afternoon': {
      response: 'Good afternoon! Hope you\'re having a productive day. Let me help you with university information to make your search even better.',
      suggestions: ['University recommendations', 'Program details', 'Admission process', 'University locations']
    },
    'good evening': {
      response: 'Good evening! 🌙 Evenings are perfect for planning your future. What university questions can I answer for you?',
      suggestions: ['Evening program search', 'Admission planning', 'University comparisons', 'Saved universities']
    },
    'thanks': {
      response: 'You\'re welcome! Happy to help with your university search. Feel free to ask if you need anything else! 😊',
      suggestions: ['More questions', 'Save universities', 'Compare options', 'Contact support']
    },
    'thank you': {
      response: 'My pleasure! I\'m always here to help students find their perfect university match. Don\'t hesitate to ask more questions!',
      suggestions: ['Ask another question', 'Browse universities', 'Program search', 'Get recommendations']
    },

    // University queries
    'find universities': {
      response: 'I can help you find universities! We have universities across Metro Manila. What type of university are you looking for?',
      suggestions: ['Public universities', 'Private universities', 'State universities', 'Universities by location']
    },
    'public universities': {
      response: 'Public universities offer affordable education with high quality. We feature major institutions like PUP, UP, and other SUCs (State Universities and Colleges).',
      suggestions: ['PUP details', 'UP information', 'Public university list', 'Compare public universities']
    },
    'private universities': {
      response: 'Private universities offer diverse programs with modern facilities. Many have international partnerships and specialized courses.',
      suggestions: ['Ateneo University', 'De La Salle', 'UST details', 'Private university comparison']
    },
    'state universities': {
      response: 'State Universities and Colleges (SUCs) provide quality education at lower costs. PUP is the largest with over 65,000 students.',
      suggestions: ['PUP information', 'State university benefits', 'SUC programs', 'Affordable education']
    },
    'universities in manila': {
      response: 'Metro Manila has excellent universities! We cover institutions in Sta. Mesa, Diliman, Taft, and more. What area interests you?',
      suggestions: ['Sta. Mesa universities', 'Quezon City schools', 'Makati institutions', 'Manila university map']
    },

    // Specific university information
    'pup': {
      response: 'PUP (Polytechnic University of the Philippines) is the largest state university with over 65,000 students. Known for technology, business, and education programs. Located in Sta. Mesa, Manila.',
      suggestions: ['PUP programs', 'PUP admission', 'PUP facilities', 'PUP rankings']
    },
    'polytechnic university': {
      response: 'Polytechnic University of the Philippines (PUP) offers 94+ programs across multiple disciplines. They\'re known for producing industry-ready graduates at affordable rates.',
      suggestions: ['PUP technology programs', 'PUP admission process', 'PUP campus life', 'PUP achievements']
    },
    'up': {
      response: 'University of the Philippines is the national university with multiple campuses. UP Diliman is the flagship campus, offering world-class education across all disciplines.',
      suggestions: ['UP Diliman', 'UP programs', 'UP admission', 'UP rankings']
    },
    'university of the philippines': {
      response: 'UP has eight constituent universities with UP Diliman as the main campus. Known for academic excellence and research. Highly competitive admission process.',
      suggestions: ['UP admission requirements', 'UP programs', 'UP tuition fees', 'UP campus locations']
    },
    'ateneo': {
      response: 'Ateneo de Manila University offers Jesuit education with strong programs in business, humanities, and sciences. Known for leadership development and values-based education.',
      suggestions: ['Ateneo programs', 'Ateneo admission', 'Ateneo tuition', 'Ateneo campus']
    },
    'de la salle': {
      response: 'De La Salle University provides Lasallian education with excellent business, engineering, and liberal arts programs. Modern campus with state-of-the-art facilities.',
      suggestions: ['DLSU programs', 'DLSU admission', 'DLSU rankings', 'DLSU facilities']
    },
    'ust': {
      response: 'University of Santo Tomas is the oldest university in Asia, offering comprehensive programs in medicine, law, engineering, and humanities.',
      suggestions: ['UST programs', 'UST admission', 'UST history', 'UST medicine']
    },

    // Program categories and information
    'programs': {
      response: 'We have over 100 programs across categories: Technology, Business, Engineering, Healthcare, Education, Arts, Sciences, and more. What field interests you?',
      suggestions: ['Technology programs', 'Business programs', 'Engineering programs', 'Healthcare programs']
    },
    'technology programs': {
      response: 'Technology programs include Computer Science, Information Technology, Computer Engineering, Electronics Engineering, and more. PUP and UP excel in these fields.',
      suggestions: ['Computer Science', 'IT programs', 'Engineering tech', 'Programming courses']
    },
    'business programs': {
      response: 'Business programs cover Accountancy, Business Administration, Entrepreneurship, Marketing, Finance, and MBA programs. Available at most universities.',
      suggestions: ['Accountancy', 'Business Admin', 'MBA programs', 'Entrepreneurship']
    },
    'engineering programs': {
      response: 'Engineering programs include Civil, Mechanical, Electrical, Electronics, Computer, Chemical, and Industrial Engineering. Strong programs at PUP, UP, and DLSU.',
      suggestions: ['Civil Engineering', 'Computer Engineering', 'Mechanical Engineering', 'Electrical Engineering']
    },
    'healthcare programs': {
      response: 'Healthcare programs include Nursing, Pharmacy, Physical Therapy, Medical Technology, and Nutrition. UST excels in Medicine and Health Sciences.',
      suggestions: ['Nursing programs', 'Pharmacy courses', 'Medical Technology', 'Nutrition programs']
    },
    'education programs': {
      response: 'Education programs prepare future teachers. Includes Bachelor of Elementary Education, Secondary Education, and Special Education. PUP has excellent education programs.',
      suggestions: ['Elementary Education', 'Secondary Education', 'Special Education', 'Teacher training']
    },

    // Admission and application
    'admission': {
      response: 'Admission varies by university. Most require high school diploma, entrance exams, and interviews. Public universities often have lower tuition but competitive admission.',
      suggestions: ['Entrance exams', 'Application process', 'Admission requirements', 'Deadlines']
    },
    'entrance exams': {
      response: 'Common entrance exams: PUPCET (PUP), UPCAT (UP), ACET (Ateneo), DLSU CET. Each university has its own exam format and schedule.',
      suggestions: ['PUPCET details', 'UPCAT info', 'ACET exam', 'CET requirements']
    },
    'application process': {
      response: 'General process: 1) Check requirements, 2) Take entrance exam, 3) Submit documents, 4) Wait for results, 5) Enroll. Each university has specific deadlines.',
      suggestions: ['Document requirements', 'Application deadlines', 'Entrance exam schedule', 'Enrollment process']
    },
    'pupcet': {
      response: 'PUPCET is PUP\'s entrance exam. Held usually in May. Covers Math, Science, English, Abstract Reasoning. Passing score required for admission.',
      suggestions: ['PUPCET schedule', 'PUPCET review', 'PUPCET requirements', 'PUPCET results']
    },
    'upcat': {
      response: 'UPCAT is UP\'s entrance exam. Highly competitive. Tests math, science, english, reading comprehension, and language proficiency.',
      suggestions: ['UPCAT schedule', 'UPCAT review', 'UPCAT tips', 'UP admission']
    },

    // Platform features
    'compare': {
      response: 'You can compare up to 3 universities side-by-side. Check tuition, programs, location, facilities, and admission requirements.',
      suggestions: ['Compare universities', 'Compare programs', 'Compare tuition', 'Comparison features']
    },
    'save universities': {
      response: 'Save universities to your bookmarks for easy access later. Create your personalized list of favorite institutions.',
      suggestions: ['Bookmark universities', 'Saved universities', 'My favorites', 'University lists']
    },
    'university map': {
      response: 'Our interactive map shows all universities geographically. Click markers for details, zoom in/out, and explore locations.',
      suggestions: ['View university map', 'Find nearby universities', 'Campus locations', 'Map features']
    },
    'search programs': {
      response: 'Search programs by name, category, or university. Filter by level (Bachelor, Master, etc.) and browse detailed program information.',
      suggestions: ['Program search', 'Filter programs', 'Program categories', 'Advanced search']
    },

    // Rankings and quality
    'rankings': {
      response: 'University rankings: PUP ranks high among SUCs, UP is consistently top-ranked nationally and regionally. Rankings vary by source and criteria.',
      suggestions: ['PUP rankings', 'UP rankings', 'QS rankings', 'Local rankings']
    },
    'best universities': {
      response: 'Top universities depend on criteria. UP Diliman for overall excellence, PUP for technology, Ateneo for business, UST for medicine.',
      suggestions: ['Best for technology', 'Best for business', 'Best for medicine', 'Best public universities']
    },

    // Tuition and costs
    'tuition fees': {
      response: 'Public universities have lower tuition (P5,000-15,000/semester). Private universities range from P20,000-60,000/semester depending on program.',
      suggestions: ['Public university tuition', 'Private university tuition', 'Scholarships', 'Financial aid']
    },
    'scholarships': {
      response: 'Scholarships available: Academic scholarships, athletic scholarships, financial assistance, and government programs. Check each university\'s scholarship office.',
      suggestions: ['Academic scholarships', 'Government scholarships', 'University scholarships', 'Scholarship applications']
    },

    // About the platform
    'about': {
      response: 'UniCentral is your comprehensive guide to Philippine universities. We provide detailed information, comparison tools, and admission guidance to help you make informed decisions.',
      suggestions: ['Platform features', 'Our mission', 'Contact us', 'Help center']
    },
    'what is unicentral': {
      response: 'UniCentral is a university search and comparison platform for the Philippines. We help students find, compare, and apply to the best universities for their future.',
      suggestions: ['How it works', 'Platform benefits', 'University database', 'Student support']
    },

    // Contact and support
    'contact': {
      response: 'Contact us: Email info@unicentral.com, Phone +63 945 552 3661, Address: Metro Manila, Philippines. We\'re here to help!',
      suggestions: ['Email support', 'Phone support', 'Visit us', 'Support hours']
    },
    'help': {
      response: 'I can help you with:\n• Finding and comparing universities\n• Program and admission information\n• Tuition and scholarship details\n• University rankings and reviews\n• Platform navigation\n• Contact information',
      suggestions: ['Find universities', 'Compare programs', 'Admission info', 'Contact support']
    },

    // Default responses
    'default': {
      response: 'I\'m here to help with university and program information! Try asking about specific universities, programs, admission requirements, or use our comparison tools.',
      suggestions: ['Find universities', 'Browse programs', 'Admission guidance', 'Compare universities']
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);



  const processMessage = async (userMessage: string): Promise<string> => {
    const message = userMessage.toLowerCase().trim();

    // Check rule-based knowledge base first (fast, accurate, comprehensive)
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (message.includes(key)) {
        return value.response;
      }
    }

    // Handle dynamic university data queries
    if (message.includes('how many universities')) {
      try {
        const universities = await UniversityService.getAllUniversities();
        return `We currently have ${universities.length} universities in our database across Metro Manila.`;
      } catch (error) {
        return 'We have universities from major institutions across Metro Manila.';
      }
    }

    // Additional rule-based checks for common queries
    if (message.includes('compare') || message.includes('comparison')) {
      return 'You can compare up to 3 universities at once using our comparison tool. Check tuition, programs, location, facilities, and admission requirements side-by-side.';
    }

    if (message.includes('map') || message.includes('location')) {
      return 'Check out our interactive university map to see all institutions geographically. Click markers for details, zoom in/out, and explore campus locations.';
    }

    if (message.includes('save') || message.includes('bookmark')) {
      return 'Save universities to your bookmarks for easy access later. Create your personalized list of favorite institutions on individual university pages.';
    }

    if (message.includes('program') && message.includes('count')) {
      return 'We have over 100 programs across various categories. You can browse by category or search for specific programs that interest you.';
    }

    // University-specific rule-based responses
    if (message.includes('pup') || message.includes('polytechnic')) {
      return 'PUP (Polytechnic University of the Philippines) is the largest state university with over 65,000 students. Known for technology, business, and education programs. Located in Sta. Mesa, Manila.';
    }

    if (message.includes('up') || message.includes('university of the philippines')) {
      return 'UP has eight constituent universities with UP Diliman as the main campus. Known for academic excellence and research. Highly competitive admission through UPCAT.';
    }

    // Default fallback response
    return knowledgeBase.default.response;
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
      const response = await processMessage(inputMessage);

      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: response,
          timestamp: new Date(),
          suggestions: knowledgeBase.default.suggestions
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000); // Simulate typing delay
    } catch (error) {
      console.error('Error processing message:', error);
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    // Auto-send the suggestion
    setTimeout(() => handleSendMessage(), 100);
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
          className="fixed bottom-6 right-6 bg-maroon-800 hover:bg-maroon-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50 group"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
          <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            Ask me!
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl z-50 flex flex-col">
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
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  {message.suggestions && (
                    <div className="mt-3 space-y-1">
                      {message.suggestions.map((suggestion, index) => (
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
