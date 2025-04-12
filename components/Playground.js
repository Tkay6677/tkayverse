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
  const [pyodideReady, setPyodideReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const pyodideRef = useRef(null);
  const outputRef = useRef(null);
  const containerRef = useRef(null);
  const hasLoadedScript = useRef(false);

  // Load Pyodide when in view
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let isMounted = true;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasLoadedScript.current) {
          hasLoadedScript.current = true;
          setIsLoading(true);

          const loadPyodide = async () => {
            try {
              const script = document.createElement('script');
              script.src = '/pyodide/pyodide.js';
              script.async = true;

              const scriptPromise = new Promise((resolve, reject) => {
                script.onload = resolve;
                script.onerror = () => reject(new Error('Failed to load Pyodide'));
                document.body.appendChild(script);
              });

              // Fake progress simulation (since WASM fetch is opaque)
              const progressInterval = setInterval(() => {
                setLoadProgress((prev) => Math.min(prev + 10, 90));
              }, 500);

              await scriptPromise;

              if (!isMounted) {
                clearInterval(progressInterval);
                return;
              }

              const pyodide = await window.loadPyodide({
                indexURL: '/pyodide/',
                stdout: (text) => {
                  if (text !== '' && isMounted) {
                    setOutput((prev) => prev + text + '\n');
                  }
                },
                stderr: (text) => {
                  if (text !== '' && isMounted) {
                    setOutput((prev) => prev + `Error: ${text}\n`);
                  }
                },
              });

              if (isMounted) {
                pyodideRef.current = pyodide;
                setPyodideReady(true);
                setLoadProgress(100);
                setIsLoading(false);
                clearInterval(progressInterval);
              }
            } catch (err) {
              if (isMounted) {
                setOutput(`Error: Failed to load Python - ${err.message}`);
                setIsLoading(false);
                setLoadProgress(0);
              }
            }
          };

          loadPyodide();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Cleanup
    return () => {
      isMounted = false;
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      pyodideRef.current = null;
      setPyodideReady(false);
      setIsLoading(false);
      setLoadProgress(0);
      if (hasLoadedScript.current) {
        const script = document.querySelector('script[src*="/pyodide/pyodide.js"]');
        if (script?.parentNode) {
          script.parentNode.removeChild(script);
        }
      }
    };
  }, []);

  const runCode = async () => {
    if (!pyodideReady || !pyodideRef.current) {
      setOutput('Python is still loading...');
      return;
    }

    setOutput(''); // Clear previous output
    try {
      await pyodideRef.current.runPythonAsync(code);
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
    <div className="max-w-5xl mx-auto px-4" ref={containerRef}>
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
          Edit the code or pick an example and hit Run!{' '}
          {isLoading && (
            <span
              className={`inline-block ${
                theme === 'neon' ? 'text-pink-500 glitch animate-glitch-slow' : 'animate-pulse'
              }`}
            >
              (Loading Python...)
            </span>
          )}
        </p>
        {isLoading && (
          <div className="mb-4">
            <div
              className={`h-2 rounded-full ${
                theme === 'neon'
                  ? 'bg-pink-500'
                  : theme === 'light'
                  ? 'bg-blue-500'
                  : 'bg-green-500'
              }`}
              style={{ width: `${loadProgress}%`, transition: 'width 0.3s ease-in-out' }}
            />
          </div>
        )}
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
          disabled={isLoading}
          className={`mt-4 font-bold py-2 px-4 rounded transition-colors ${
            !isLoading
              ? theme === 'neon'
                ? 'bg-pink-500 text-black hover:bg-cyan-400'
                : theme === 'light'
                ? 'bg-blue-500 text-white hover:bg-blue-400'
                : 'bg-green-500 text-black hover:bg-green-400'
              : 'bg-gray-500 text-gray-300 cursor-not-allowed'
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