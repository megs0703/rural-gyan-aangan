// AI Services with mock implementations for demo
export class AIService {
  static async getChatResponse(message: string, language: string = 'hi'): Promise<string> {
    // Mock AI responses for demo
    const responses = {
      math: language === 'hi' ? 
        'द्विघात समीकरण ax² + bx + c = 0 को हल करने के लिए सूत्र का उपयोग करें: x = (-b ± √(b²-4ac)) / 2a\n\nFor quadratic equation ax² + bx + c = 0, use the formula: x = (-b ± √(b²-4ac)) / 2a' :
        'For quadratic equation ax² + bx + c = 0, use the formula: x = (-b ± √(b²-4ac)) / 2a',
      science: language === 'hi' ?
        'प्रकाश संश्लेषण में पौधे सूर्य की रोशनी, CO₂ और पानी से भोजन बनाते हैं।\n\nIn photosynthesis, plants make food using sunlight, CO₂ and water.' :
        'In photosynthesis, plants make food using sunlight, CO₂ and water.',
      default: language === 'hi' ?
        'यह एक बहुत अच्छा प्रश्न है! मैं आपकी मदद करने के लिए यहाँ हूँ।\n\nThat\'s a great question! I\'m here to help you.' :
        'That\'s a great question! I\'m here to help you.'
    };

    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    
    if (message.toLowerCase().includes('quadratic') || message.includes('द्विघात')) {
      return responses.math;
    } else if (message.toLowerCase().includes('photosynthesis') || message.includes('प्रकाश संश्लेषण')) {
      return responses.science;
    }
    return responses.default;
  }

  static async translateText(text: string, targetLanguage: string): Promise<string> {
    // Mock translation for demo
    const translations: {[key: string]: string} = {
      'Hello': targetLanguage === 'hi' ? 'नमस्ते' : 'Hello',
      'Thank you': targetLanguage === 'hi' ? 'धन्यवाद' : 'Thank you',
      'Good morning': targetLanguage === 'hi' ? 'सुप्रभात' : 'Good morning'
    };
    
    await new Promise(resolve => setTimeout(resolve, 500));
    return translations[text] || text;
  }

  static async generateCodeExplanation(code: string, language: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (language === 'python') {
      return 'यह Python कोड एक सरल प्रोग्राम है जो वेरिएबल्स का उपयोग करता है।\n\nThis Python code is a simple program that uses variables.';
    } else if (language === 'javascript') {
      return 'यह JavaScript कोड वेब डेवलपमेंट के लिए उपयोग किया जाता है।\n\nThis JavaScript code is used for web development.';
    }
    
    return 'कोड की व्याख्या उपलब्ध नहीं है।\n\nCode explanation not available.';
  }
}

export default AIService;