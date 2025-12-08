export default function ImpactSection() {
  const stats = [
    { value: '92%', label: 'finish beginner modules' },
    { value: '8x', label: 'faster to first project' },
    { value: '40k+', label: 'resources curated' }
  ]

  return (
    <section id="impact" className="px-6 py-20 bg-gradient-to-br from-[hsl(38,92%,50%)] to-[hsl(195,86%,51%)] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Impact</h2>
          <p className="text-lg opacity-90">Real results from real learners</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-6xl md:text-7xl font-bold mb-4">{stat.value}</div>
              <div className="text-xl opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
