import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';

export default function Playground() {
  const { theme } = useTheme();
  const examples = {
    'Add Numbers': `def add(a, b):\n    return a + b\n\nprint(add(5, 3))`,
    'Factorial': `def factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))`,
    'Reverse String': `def reverse(s):\n    return s[::-1]\n\nprint(reverse("Tkay"))`,
  };

  const [code, setCode] = useState(examples['Add Numbers']);
  const [output, setOutput] = useState('');
  const [selectedExample, setSelectedExample] = useState('Add Numbers');
  const outputRef = useRef(null);
  const brythonInitialized = useRef(false);

  // Load Brython and set up output capture
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Load Brython script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/brython@3.12.0/brython.min.js';
    script.async = true;
    script.onload = () => {
      if (!brythonInitialized.current && typeof window.brython === 'function') {
        window.brython({ debug: 0 }); // Initialize once
        brythonInitialized.current = true;
      }
    };
    script.onerror = () => {
      console.error('Failed to load Brython');
      setOutput('Error: Could not load Brython');
    };
    document.body.appendChild(script);

    // Override console.log to capture output
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      setOutput((prev) => prev + args.join(' ') + '\n');
      originalConsoleLog(...args);
    };

    // Cleanup
    return () => {
      console.log = originalConsoleLog;
      if (script.parentNode) {
        document.body.removeChild(script);
      }
      brythonInitialized.current = false;
    };
  }, []);

  const runCode = () => {
    if (!brythonInitialized.current || typeof window.__BRYTHON__ !== 'object') {
      setOutput('Brython is still loading...');
      return;
    }

    setOutput(''); // Clear previous output
    try {
      // Redirect print to output
      window.__BRYTHON__.builtins.print = (...args) => {
        setOutput((prev) => prev + args.join(' ') + '\n');
      };

      // Create a unique script element for Python code
      const scriptId = `brython-script-${Date.now()}`;
      const pythonScript = document.createElement('script');
      pythonScript.id = scriptId;
      pythonScript.type = 'text/python';
      pythonScript.text = code;
      document.body.appendChild(pythonScript);

      // Run the script
      window.__BRYTHON__.run(scriptId, '__main__', true);

      // Clean up
      setTimeout(() => {
        if (pythonScript.parentNode) {
          document.body.removeChild(pythonScript);
        }
      }, 0);
    } catch (err) {
      setOutput(`Error: ${err.message}`);
    }
  };

  const loadExample = (example) => {
    setCode(examples[example]);
    setSelectedExample(example);
    setOutput('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div
        className={`rounded-lg p-6 ${
          theme === 'neon'
            ? 'bg-black bg-opacity-90 border border-pink-500'
            : theme === 'light'
            ? 'bg-gray-100 border border-blue-500'
            : 'bg-gray-800 border border-green-500'
        }`}
      >
        <h3
          className={`text-2xl font-bold mb-4 ${
            theme === 'neon'
              ? 'text-pink-500 glitch animate-glitch'
              : theme === 'light'
              ? 'text-blue-600'
              : 'text-green-400'
          }`}
        >
          Python Sandbox
        </h3>
        <p
          className={`mb-4 ${
            theme === 'neon' ? 'text-pink-300' : theme === 'light' ? 'text-blue-800' : 'text-gray-300'
          }`}
        >
          Edit the code or pick an example and hit Run!
        </p>
        <select
          value={selectedExample}
          onChange={(e) => loadExample(e.target.value)}
          className={`mb-4 p-2 rounded ${
            theme === 'neon'
              ? 'bg-gray-900 text-pink-300 border-pink-500'
              : theme === 'light'
              ? 'bg-white text-blue-600 border-blue-500'
              : 'bg-gray-700 text-white border-green-500'
          }`}
        >
          {Object.keys(examples).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        <AceEditor
          mode="python"
          theme="monokai"
          value={code}
          onChange={(newCode) => setCode(newCode)}
          name="python-editor"
          editorProps={{ $blockScrolling: true }}
          width="100%"
          height="200px"
          setOptions={{
            showLineNumbers: true,
            tabSize: 4,
          }}
          className="rounded-md"
        />
        <button
          onClick={runCode}
          className={`mt-4 font-bold py-2 px-4 rounded transition-colors ${
            theme === 'neon'
              ? 'bg-pink-500 text-black hover:bg-cyan-400'
              : theme === 'light'
              ? 'bg-blue-500 text-white hover:bg-blue-400'
              : 'bg-green-500 text-black hover:bg-green-400'
          }`}
        >
          Run Code
        </button>
        <div
          ref={outputRef}
          className={`mt-4 p-4 rounded-md font-mono whitespace-pre-wrap ${
            theme === 'neon'
              ? 'bg-gray-900 text-pink-300'
              : theme === 'light'
              ? 'bg-gray-200 text-blue-600'
              : 'bg-black bg-opacity-80 text-green-400'
          }`}
        >
          {output || 'Output will appear here...'}
        </div>
      </div>
      <div
        className={`mt-8 text-center ${
          theme === 'neon' ? 'text-pink-300' : theme === 'light' ? 'text-blue-600' : 'text-gray-400'
        }`}
      >
        <p>More demos coming soon... Solana checker, Rust WASM, and beyond!</p>
      </div>
    </div>
  );
}