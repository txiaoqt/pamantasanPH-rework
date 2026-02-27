import { universities, academic_programs } from '@/data/universityData';
import { University } from '@/types/University';

type Rule = {
  pattern: RegExp;
  handler: (matches: RegExpMatchArray) => string | null;
};

const findUniversity = (name: string): University | undefined => {
  const normalizedName = name.toLowerCase().trim();
  return universities.find(
    (uni) =>
      uni.name.toLowerCase() === normalizedName ||
      uni.acronym?.toLowerCase() === normalizedName
  );
};

const getCoursesMessage = (uni: University): string => {
  const programs = academic_programs.filter((p) => p.university_id === uni.id);
  if (programs.length > 0) {
    const programNames = programs.map((p) => p.program_name).join('\n - ');
    return `Here are the academic programs at ${uni.name}:\n - ${programNames}`;
  } 
  return `I couldn't find any academic programs for ${uni.name}.`;
};

const rules: Rule[] = [
  {
    pattern: /^(?:what are|show me|list|tell me about) the (?:courses|programs) (?:in|at) (.+)/i,
    handler: (matches) => {
      const uni = findUniversity(matches[1]);
      return uni ? getCoursesMessage(uni) : null;
    },
  },
  {
    pattern: /^(?:where is|location of) (.+)/i,
    handler: (matches) => {
      const uni = findUniversity(matches[1]);
      return uni ? `${uni.name} is located at ${uni.address}.` : null;
    },
  },
  {
    pattern: /^(?:tell me about|what is) (.+)/i,
    handler: (matches) => {
      const uni = findUniversity(matches[1]);
      return uni ? uni.long_description : null;
    },
  },
  {
    pattern: /^(?:what is the )?admission status of (.+)/i,
    handler: (matches) => {
      const uni = findUniversity(matches[1]);
      return uni ? `The admission status for ${uni.name} is currently: ${uni.admission_status}.` : null;
    },
  },
  {
    pattern: /^(?:list all|show all|universities in) (.+)/i,
    handler: (matches) => {
      const location = matches[1].toLowerCase().trim();
      const unis = universities.filter(
        (uni) =>
          uni.location.toLowerCase() === location ||
          uni.province.toLowerCase() === location
      );
      if (unis.length > 0) {
        const uniNames = unis.map((u) => u.name).join('\n - ');
        return `Here are the universities in ${matches[1]}:\n - ${uniNames}`;
      }
      return `I couldn't find any universities in ${matches[1]}.`;
    },
  },
];

export function handleUniversityQueries(query: string): string | null {
  const normalizedQuery = query.toLowerCase().trim();

  for (const rule of rules) {
    const matches = normalizedQuery.match(rule.pattern);
    if (matches) {
      const response = rule.handler(matches);
      if (response) {
        return response;
      }
    }
  }

  return null;
}