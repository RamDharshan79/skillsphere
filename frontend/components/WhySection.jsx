export default function WhySection() {
  const features = [
    {
      icon: '✓',
      title: 'Curated & Verified',
      description: 'Every course is hand-picked and verified by experts to ensure quality and relevance.'
    },
    {
      icon: '🌍',
      title: 'Accessible to All',
      description: 'Free resources designed to bridge the gap for learners from all backgrounds.'
    },
    {
      icon: '🤝',
      title: 'Mentor-Backed',
      description: 'Get personalized guidance from experienced mentors to accelerate your learning journey.'
    }
  ]

  return (
    <section id="why" className="px-6 py-20 bg-gradient-to-b from-transparent to-[hsl(38,92%,98%)] dark:to-[hsl(38,92%,5%)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why <span className="text-[hsl(38,92%,50%)]">SkillSphere</span>?
          </h2>
          <p className="text-lg opacity-80">Three pillars that make us different</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="card-premium p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[hsl(38,92%,50%)] to-[hsl(195,86%,51%)] flex items-center justify-center text-3xl">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="opacity-80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
