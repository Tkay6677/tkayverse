export default function About() {
    const timeline = [
      { year: '5+ Years Ago', event: 'Started coding with Scratch—built my first games.' },
      { year: '4 Years Ago', event: 'Dove into .NET and C#, cranking out desktop apps.' },
      { year: '3 Years Ago', event: 'Mastered Python and C++ for automation and performance.' },
      { year: '2 Years Ago', event: 'Discovered Rust—fell in love with its speed and safety.' },
      { year: 'Last Year', event: 'Jumped into Solana and blockchain—Web3 became my jam.' },
      { year: 'Now', event: 'Final-year Comp Sci student, building this portfolio!' },
    ];
  
    return (
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-green-400 mb-4">Tokoni Orukaria (Tkay)</h3>
          <p className="text-gray-300 text-lg mb-6">
            I’m a final-year Computer Science student who’s been coding for over 5 years. I started because I wanted to build something unstoppable—now I’m half-dev, half-mad scientist, chasing the next big idea. From Scratch to Solana, I’ve hacked my way through it all.
          </p>
          <p className="text-gray-400 italic">Fun fact: Lost all my files creating a .NET applications to hide and encrypt my files</p>
        </div>
        <div className="mt-12">
          <h4 className="text-xl font-bold text-purple-400 mb-6 text-center">My Coding Journey</h4>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-green-500 h-full"></div>
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
              >
                <div className="w-1/2 px-4">
                  <div className="bg-gray-900 p-4 rounded-lg border border-green-500 transition-transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/50">
                    <p className="text-green-400 font-bold">{item.year}</p>
                    <p className="text-gray-300">{item.event}</p>
                  </div>
                </div>
                <div className="w-1/2"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }