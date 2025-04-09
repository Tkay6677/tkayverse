import { useState } from 'react';

export default function SkillGrid() {
  const skills = [
    { name: '.NET', desc: 'Built desktop apps with C# and VB.NET' },
    { name: 'C#', desc: 'Core language for robust systems' },
    { name: 'Python', desc: 'Scripting and automation wizardry' },
    { name: 'Rust', desc: 'Blazing-fast, memory-safe code' },
    { name: 'Solana', desc: 'High-speed blockchain dev' },
    { name: 'Blockchain', desc: 'Decentralized app experiments' },
    { name: 'React', desc: 'Dynamic UIs, like this portfolio' },
    { name: 'Next.js', desc: 'Powering this site right now' },
    { name: 'MongoDB', desc: 'NoSQL data wrangling' },
    { name: 'SQL', desc: 'Structured data mastery' },
    { name: 'PHP', desc: 'Server-side throwbacks' },
    { name: 'C++', desc: 'Low-level performance hacks' },
    { name: 'Scratch', desc: 'Where it all began' },
  ];

  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Duplicate skills for seamless looping
  const doubledSkills = [...skills, ...skills];

  return (
    <div className="max-w-5xl mx-auto px-4 overflow-hidden">
      <div className="flex animate-slide-horizontal group">
        {doubledSkills.map((skill, index) => (
          <div
            key={index}
            className="flex-shrink-0 mx-4 relative"
            onMouseEnter={() => setHoveredSkill(index)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            <div className="hexagon w-20 h-20 sm:w-24 sm:h-24 bg-green-500 flex items-center justify-center transform transition-transform hover:scale-110">
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