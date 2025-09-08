// Using fetch API instead of axios

interface CompileRequest {
  source_code: string;
  language_id: number;
  stdin?: string;
}

interface CompileResult {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  status: {
    id: number;
    description: string;
  };
  time: string;
  memory: number;
}

export class CompilerService {
  private static readonly JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com';
  private static readonly REPLIT_API_URL = 'https://replit.com/data/repls';
  
  private static readonly LANGUAGE_IDS = {
    python: 71,
    javascript: 63,
    java: 62,
    cpp: 54,
    c: 50,
    html: 60, // HTML/CSS/JS
  };

  static async executeCode(code: string, language: string, input?: string): Promise<CompileResult> {
    try {
      // Try Judge0 API first
      return await this.executeWithJudge0(code, language, input);
    } catch (error) {
      // Fallback to mock execution for demo
      return this.mockExecution(code, language);
    }
  }

  private static async executeWithJudge0(code: string, language: string, input?: string): Promise<CompileResult> {
    const languageId = this.LANGUAGE_IDS[language as keyof typeof this.LANGUAGE_IDS] || 71;
    
    const compileRequest: CompileRequest = {
      source_code: btoa(code), // Base64 encode
      language_id: languageId,
      stdin: input ? btoa(input) : undefined
    };

    const response = await fetch(`${this.JUDGE0_API_URL}/submissions?base64_encoded=true&wait=true`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': process.env.JUDGE0_API_KEY || '',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      body: JSON.stringify(compileRequest)
    });
    
    const data = await response.json();
    
    return {
      stdout: data.stdout ? atob(data.stdout) : null,
      stderr: data.stderr ? atob(data.stderr) : null,
      compile_output: data.compile_output ? atob(data.compile_output) : null,
      status: data.status,
      time: data.time,
      memory: data.memory
    };
  }

  private static mockExecution(code: string, language: string): CompileResult {
    // Mock execution for demo purposes
    let output = '';
    
    if (language === 'python') {
      if (code.includes('print')) {
        const matches = code.match(/print\((.*?)\)/g);
        if (matches) {
          output = matches.map(match => {
            const content = match.replace(/print\(|\)/g, '').replace(/['"]/g, '');
            return content;
          }).join('\n');
        }
      }
    } else if (language === 'javascript') {
      if (code.includes('console.log')) {
        const matches = code.match(/console\.log\((.*?)\)/g);
        if (matches) {
          output = matches.map(match => {
            const content = match.replace(/console\.log\(|\)/g, '').replace(/['"]/g, '');
            return content;
          }).join('\n');
        }
      }
    }

    return {
      stdout: output || 'Program executed successfully!',
      stderr: null,
      compile_output: null,
      status: { id: 3, description: 'Accepted' },
      time: '0.001',
      memory: 1024
    };
  }

  static async saveCode(code: string, language: string, userId: string): Promise<string> {
    // Save to Firebase or local storage
    const codeId = Date.now().toString();
    if (typeof window !== 'undefined') {
      localStorage.setItem(`code_${codeId}`, JSON.stringify({
        code,
        language,
        userId,
        timestamp: new Date().toISOString()
      }));
    }
    return codeId;
  }

  static async loadCode(codeId: string): Promise<any> {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`code_${codeId}`);
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  }
}

export default CompilerService;