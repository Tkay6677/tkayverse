import { useState, useEffect, useRef } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';

export default function Playground() {
  const examples = {
    'Add Numbers': `def add(a, b):\n    return a + b\n\nprint(add(5, 3))`,
    'Factorial': `def factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))`,
    'Reverse String': `def reverse(s):\n    return s[::-1]\n\nprint(reverse("Tkay"))`,
  };

  const [code, setCode] = useState(examples['Add Numbers']);
  const [output, setOutput] = useState('');
  const [selectedExample, setSelectedExample] = useState('Add Numbers');
  const outputRef = useRef(null);

  // Load Brython and set up output capture
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load Brython script
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/brython@3.12.0/brython.min.js';
      script.onload = () => {
        // Initialize Brython when script loads
        window.brython();
      };
      document.body.appendChild(script);

      // Override console.log to capture output
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        setOutput((prev) => prev + args.join(' ') + '\n');
        originalConsoleLog(...args);
      };

      return () => {
        console.log = originalConsoleLog; // Cleanup
        document.body.removeChild(script);
      };
    }
  }, []);

  const runCode = () => {
    if (typeof window.brython !== 'function') {
      setOutput('Brython is still loading...');
      return;
    }

    setOutput(''); // Clear previous output
    try {
      // Redirect print to console.log
      window.__BRYTHON__.builtins.print = (...args) => {
        setOutput((prev) => prev + args.join(' ') + '\n');
      };
      // Run the Python code
      window.brython({ debug: 0 });
      window.__BRYTHON__.run_script(code, '__main__', true);
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
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-2xl font-bold text-green-400 mb-4">Python Sandbox</h3>
        <p className="text-gray-300 mb-4">Edit the code or pick an example and hit Run!</p>
        <select
          value={selectedExample}
          onChange={(e) => loadExample(e.target.value)}
          className="mb-4 bg-gray-700 text-white p-2 rounded"
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
          className="mt-4 bg-green-500 text-black font-bold py-2 px-4 rounded hover:bg-green-400 transition-colors"
        >
          Run Code
        </button>
        <div
          ref={outputRef}
          className="mt-4 bg-black bg-opacity-80 p-4 rounded-md text-green-400 font-mono whitespace-pre-wrap"
        >
          {output || 'Output will appear here...'}
        </div>
      </div>
      <div className="mt-8 text-center text-gray-400">
        <p>More demos coming soon... Solana checker, Rust WASM, and beyond!</p>
      </div>
    </div>
  );
}