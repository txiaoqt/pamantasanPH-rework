import { Search, GitCompareArrows, ClipboardList, GraduationCap, SendHorizontal, Sparkles, RotateCcw, MessageSquarePlus, Clock, Bookmark } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types & Data                                                      */
/* ------------------------------------------------------------------ */

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface InquiryItem {
  title: string;
  date: string;
}

const suggestions = [
  { icon: <Search className="h-5 w-5" />, title: "Find My Match", description: "Guided search based on your interests" },
  { icon: <GitCompareArrows className="h-5 w-5" />, title: "Compare Schools", description: "Side-by-side tuition & program analysis" },
  { icon: <ClipboardList className="h-5 w-5" />, title: "Admission Requirements", description: "Criteria for university admissions" },
];

const recentInquiries: InquiryItem[] = [
  { title: "Top BSIT Schools", date: "Jan 28, 2026" },
  { title: "Scholarship Deadlines (2026)", date: "Jan 25, 2026" },
  { title: "Admission requirements for UP Diliman", date: "Jan 20, 2026" },
];

const savedComparisons: InquiryItem[] = [
  { title: "UST vs DLSU vs ADMU", date: "Jan 15, 2026" },
];

/* ------------------------------------------------------------------ */
/*  Small Sub-components                                              */
/* ------------------------------------------------------------------ */

const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-1 py-2">
    <div className="h-2 w-2 animate-bounce rounded-full bg-primary/60" style={{ animationDelay: "0ms" }} />
    <div className="h-2 w-2 animate-bounce rounded-full bg-primary/60" style={{ animationDelay: "150ms" }} />
    <div className="h-2 w-2 animate-bounce rounded-full bg-primary/60" style={{ animationDelay: "300ms" }} />
  </div>
);

const SidebarSection = ({ title, icon: Icon, items }: { title: string; icon: React.ElementType; items: InquiryItem[] }) => (
  <div className="mb-5">
    <div className="mb-2 flex items-center gap-2 px-3">
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
    </div>
    <div className="space-y-0.5">
      {items.map((item) => (
        <button key={item.title} className="block w-full rounded-lg px-3 py-2 text-left transition-colors hover:bg-secondary">
          <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
          <p className="text-[11px] text-muted-foreground">{item.date}</p>
        </button>
      ))}
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Main Page                                                         */
/* ------------------------------------------------------------------ */

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsTyping(true);
    if (inputRef.current) inputRef.current.style.height = "auto";
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: `Thanks for asking about "${userMsg}"! I'm UniBot, your university admissions assistant. I can help you explore programs, compare schools, and understand admission requirements. What specific details would you like to know?` }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSuggestionClick = (title: string) => {
    setMessages((prev) => [...prev, { role: "user", content: title }]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: `Great choice! Let me help you with **${title}**.\n\nI'll guide you through the process step by step. To get started, could you tell me:\n\n1. What program or field of study interests you?\n2. Do you have a preferred location or region?\n3. What's your budget range for tuition?` }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleNewChat = () => { setMessages([]); setInput(""); setIsTyping(false); };

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 150) + "px";
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* ---- Sidebar ---- */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card lg:flex">
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="font-display text-sm font-bold text-primary">UniBot</span>
          </div>
          <button onClick={handleNewChat} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" title="New chat">
            <MessageSquarePlus className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-2 py-4">
          <SidebarSection title="Recent" icon={Clock} items={recentInquiries} />
          <div className="mx-3 mb-4 border-t border-border" />
          <SidebarSection title="Saved" icon={Bookmark} items={savedComparisons} />
        </div>
        <div className="border-t border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">C</div>
            <p className="truncate text-sm font-medium text-foreground">Christopher</p>
          </div>
        </div>
      </aside>

      {/* ---- Chat Panel ---- */}
      <main className="flex flex-1 flex-col overflow-hidden">
        <div ref={scrollRef} className="flex flex-1 flex-col overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h1 className="mb-2 text-center font-display text-3xl font-bold text-foreground">Welcome to UniBot</h1>
              <p className="mb-10 max-w-md text-center text-sm leading-relaxed text-muted-foreground">Your AI-powered university admissions assistant. Ask me anything about schools, programs, or admissions.</p>
              <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                {suggestions.map((s) => (
                  <button key={s.title} onClick={() => handleSuggestionClick(s.title)} className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-4 text-left transition-all duration-200 hover:border-primary/40 hover:shadow-md">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">{s.icon}</div>
                    <h3 className="font-body text-sm font-semibold text-foreground">{s.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">{s.description}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto w-full max-w-3xl px-4 py-6">
              {messages.map((msg, i) => (
                <div key={i} className={cn("mb-6 flex gap-3", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
                  <Avatar className="mt-0.5 h-8 w-8 shrink-0">
                    <AvatarFallback className={cn("text-xs font-semibold", msg.role === "assistant" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground")}>{msg.role === "assistant" ? "U" : "C"}</AvatarFallback>
                  </Avatar>
                  <div className={cn("max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed", msg.role === "user" ? "rounded-tr-md bg-primary text-primary-foreground" : "rounded-tl-md bg-card text-card-foreground shadow-sm border border-border")}>
                    {msg.content.split("\n").map((line, li) => (
                      <span key={li}>
                        {line.split(/(\*\*.*?\*\*)/).map((seg, si) => seg.startsWith("**") && seg.endsWith("**") ? <strong key={si}>{seg.slice(2, -2)}</strong> : seg)}
                        {li < msg.content.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="mb-6 flex gap-3">
                  <Avatar className="mt-0.5 h-8 w-8 shrink-0"><AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">U</AvatarFallback></Avatar>
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
              <button onClick={handleNewChat} className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" title="New chat">
                <RotateCcw className="h-4 w-4" />
              </button>
            )}
            <div className="flex flex-1 items-end gap-2 rounded-xl border border-border bg-card px-4 py-2.5 shadow-sm transition-all focus-within:border-primary/50 focus-within:shadow-md">
              <Sparkles className="mb-0.5 h-4 w-4 shrink-0 text-primary/50" />
              <textarea ref={inputRef} value={input} onChange={handleTextareaInput} onKeyDown={handleKeyDown} placeholder="Ask UniBot anything about universities..." rows={1} className="max-h-[150px] flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" />
              <button onClick={handleSend} disabled={!input.trim() || isTyping} className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-40">
                <SendHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-muted-foreground/60">UniBot can make mistakes. Verify important admission details with official sources.</p>
        </div>
      </main>
    </div>
  );
};

export default Index;
