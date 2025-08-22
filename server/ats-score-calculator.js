import natural from 'natural';

const tokenizer = new natural.WordTokenizer();

const calculateAtsScore = (jobDescription, resumeText) => {
 const jobTokens = tokenizer.tokenize(jobDescription);
 const keywords = jobTokens.filter(token => token.match(/^[a-zA-Z]+$/));
 const resumeTokens = tokenizer.tokenize(resumeText);
 const matches = resumeTokens.filter(token => keywords.includes(token));
 return (matches.length / keywords.length) *100;
};

export { calculateAtsScore };