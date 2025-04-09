export default function ProjectCard({ title, desc, tech, link }) {
    return (
      <div className="bg-gray-900 border border-green-500 rounded-lg p-6 transform transition-transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/50">
        <h3 className="text-2xl font-bold text-green-400 mb-2 glitch group-hover:animate-glitch">
          {title}
        </h3>
        <p className="text-gray-300 mb-4">{desc}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((item, index) => (
            <span
              key={index}
              className="bg-purple-600 text-white text-sm px-2 py-1 rounded-full"
            >
              {item}
            </span>
          ))}
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 text-black font-bold py-2 px-4 rounded hover:bg-green-400 transition-colors"
        >
          Check It Out
        </a>
      </div>
    );
  }