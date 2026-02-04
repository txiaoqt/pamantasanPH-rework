// src/services/siteRules.ts
import { knowledgeBase } from '../data/knowledgeBase';

export const handleSiteQueries = (query: string): string | null => {
  const lowerCaseQuery = query.toLowerCase();

  // FAQ
  for (const category in knowledgeBase.faq) {
    for (const faq of knowledgeBase.faq[category as keyof typeof knowledgeBase.faq]) {
      if (lowerCaseQuery.includes(faq.question.toLowerCase())) {
        return faq.answer;
      }
    }
  }

  // About Us
  if (lowerCaseQuery.includes('mission')) {
    return knowledgeBase.about.mission;
  }
  if (lowerCaseQuery.includes('vision')) {
    return "We are still working on our vision, but our goal is to be the most trusted and comprehensive resource for students in the Philippines.";
  }
  if (lowerCaseQuery.includes('values')) {
    const values = knowledgeBase.about.values.map(v => `* ${v.title}: ${v.description}`).join('\n');
    return `Our core values are:\n\n${values}`;
  }
  if (lowerCaseQuery.includes('team') || lowerCaseQuery.includes('who made this')) {
    const team = knowledgeBase.about.team.map(t => `* ${t.name} - ${t.role}`).join('\n');
    return `We are a team of passionate developers and students. Here are the members:\n\n${team}`;
  }
  if (lowerCaseQuery.includes('disclaimer')) {
    return knowledgeBase.about.disclaimer;
  }

  // Careers
  if (lowerCaseQuery.includes('careers') || lowerCaseQuery.includes('jobs') || lowerCaseQuery.includes('hiring')) {
    const openings = knowledgeBase.careers.openings.map(o => `* ${o.title} (${o.location})`).join('\n');
    return `We are always looking for talented people to join our team. Here are our current openings:\n\n${openings}`;
  }
  if (lowerCaseQuery.includes('perks') || lowerCaseQuery.includes('benefits')) {
    const perks = knowledgeBase.careers.perks.map(p => `* ${p.name}: ${p.description}`).join('\n');
    return `We offer a variety of perks and benefits to our employees:\n\n${perks}`;
  }
  
  // Privacy Policy
  if (lowerCaseQuery.includes('privacy policy')) {
      return "You can find our privacy policy here: /privacy";
  }

  // Terms of service
  if (lowerCaseQuery.includes('terms of service')) {
      return "You can find our terms of service here: /terms";
  }

  // Sitemap
  if (lowerCaseQuery.includes('sitemap') || lowerCaseQuery.includes('all pages')) {
      return "You can find our sitemap here: /sitemap";
  }


  return null;
};
