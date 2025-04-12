import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import {
  FaPython,
  FaRust,
  FaReact,
  FaJs,
  FaDatabase,
  FaPhp,
  FaCode,
  FaBitcoin,
} from 'react-icons/fa';
import { SiSolana, SiMongodb, SiScratch } from 'react-icons/si';

export default function SkillGrid() {
  const { theme } = useTheme();
  const skills = [
    { name: '.NET', desc: 'Built desktop apps with C# and VB.NET', icon: <FaCode /> },
    { name: 'C#', desc: 'Core language for robust systems', icon: <FaCode /> },
    { name: 'Python', desc: 'Scripting and automation wizardry', icon: <FaPython /> },
    { name: 'Rust', desc: 'Blazing-fast, memory-safe code', icon: <FaRust /> },
    { name: 'Solana', desc: 'High-speed blockchain dev', icon: <SiSolana /> },
    { name: 'Blockchain', desc: 'Decentralized app experiments', icon: <FaBitcoin /> },
    { name: 'React', desc: 'Dynamic UIs, like this portfolio', icon: <FaReact /> },
    { name: 'Next.js', desc: 'Powering this site right now', icon: <FaJs /> },
    { name: 'MongoDB', desc: 'NoSQL data wrangling', icon: <SiMongodb /> },
    { name: 'SQL', desc: 'Structured data mastery', icon: <FaDatabase /> },
    { name: 'PHP', desc: 'Server-side throwbacks', icon: <FaPhp /> },
    { name: 'C++', desc: 'Low-level performance hacks', icon: <FaCode /> },
    { name: 'Scratch', desc: 'Where it all began', icon: <SiScratch /> },
  ];

  const [hoveredSkill, setHoveredSkill] = useState(null);
  const doubledSkills = [...skills, ...skills];

  const slideSpeed = theme === 'neon' ? '15s' : '20s';

  return (
    <div className="max-w-5xl mx-auto px-4 overflow-hidden">
      <div className="flex animate-slide-horizontal group" style={{ animationDuration: slideSpeed }}>
        {doubledSkills.map((skill, index) => (
          <div
            key={index}
            className="flex-shrink-0 mx-4 relative"
            onMouseEnter={() => setHoveredSkill(index)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            <div className="hexagon w-20 h-20 sm:w-24 sm:h-24 bg-green-500 flex flex-col items-center justify-center transform transition-transform hover:scale-110">
              {/* <div className="text-black font-bold skill-icon text-2xl mb-1">{skill.icon}</div> */}
              <span className="text-black font-bold text-sm sm:text-base text-center">
                {skill.name}
              </span>
            </div>
            {hoveredSkill === index && (
              <div className="absolute z-10 -top-16 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-90 text-white p-2 rounded-lg text-sm w-40 text-center">
                {skill.desc}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}