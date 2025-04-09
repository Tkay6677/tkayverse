export default function Blog() {
    const posts = [
      {
        title: 'Why Rust is My Jam',
        snippet: 'No garbage collector, insane speed, and memory safety? Rust’s the real deal. I built a CLI tool that runs circles around C++.',
        date: 'April 2025',
      },
      {
        title: 'Solana’s Speed Changed My Life',
        snippet: 'Blockchain at 65,000 TPS? Solana’s why I’m deep in Web3 now—deployed a DApp faster than my coffee brewed.',
        date: 'March 2025',
      },
      {
        title: 'How I Accidentally Built a .NET Empire',
        snippet: 'Started with a VB.NET app for fun. Next thing I know, I’m debugging forms at 3 AM. Send help.',
        date: 'Feb 2025',
      },
    ];
  
    return (
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-purple-500 rounded-lg p-6 transform transition-transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
            >
              <h3 className="text-xl font-bold text-purple-400 mb-2 glitch hover:animate-glitch">
                {post.title}
              </h3>
              <p className="text-gray-300 mb-4">{post.snippet}</p>
              <p className="text-gray-500 text-sm mb-4">{post.date}</p>
              <button className="text-green-400 font-bold hover:text-green-300 transition-colors">
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }