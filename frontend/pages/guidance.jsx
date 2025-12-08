import Header from '../components/Header'
import Footer from '../components/Footer'
import LogoSphere from '../components/LogoSphere'
import { useState } from 'react'

export default function GuidancePage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [domain, setDomain] = useState('')
  const [level, setLevel] = useState('Beginner')
  const [goal, setGoal] = useState('')
  const [timeline, setTimeline] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const domains = [
    'Technology & Computer Science',
    'Commerce & Business',
    'Arts & Humanities',
    'Design & Creative Fields',
    'Science',
    'Skill-Based & Vocational'
  ]

  function submit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen">
      <Header onToggleTheme={() => {}} />
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <LogoSphere size={32} />
              <span className="text-xl font-bold">Guidance</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">Get Guidance</h1>
            <p className="opacity-70">Share your goals and we’ll recommend a clear path.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="glass-card rounded-2xl p-8">
                {submitted ? (
                  <div className="text-center space-y-3">
                    <h2 className="text-2xl font-semibold">Thanks</h2>
                    <p className="opacity-70">We’ll reach out at {email} with next steps.</p>
                    <a href="#courses" className="btn-outline inline-block">Browse tracks</a>
                  </div>
                ) : (
                  <form onSubmit={submit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-[hsl(38,92%,50%)] focus:outline-none" required />
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-[hsl(38,92%,50%)] focus:outline-none" required />
                    </div>
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        {domains.map(d => (
                          <button type="button" key={d} className={`chip ${domain === d ? 'chip-active' : ''}`} onClick={() => setDomain(domain === d ? '' : d)} aria-pressed={domain === d}>{d}</button>
                        ))}
                      </div>
                      <select value={level} onChange={e => setLevel(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-[hsl(38,92%,50%)] focus:outline-none" required>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                    <textarea value={goal} onChange={e => setGoal(e.target.value)} placeholder="Describe your goal" rows={4} className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-[hsl(38,92%,50%)] focus:outline-none" required />
                    <input type="text" value={timeline} onChange={e => setTimeline(e.target.value)} placeholder="Timeline (e.g., 3 months)" className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-[hsl(38,92%,50%)] focus:outline-none" />
                    <button type="submit" className="btn-primary w-full">Request Guidance</button>
                  </form>
                )}
              </div>
            </div>
            <div>
              <div className="card-premium p-6 space-y-3">
                <div className="text-sm opacity-70">Preview</div>
                <div className="text-lg font-semibold">{name || 'Your name'}</div>
                <div className="opacity-70">{email || 'your@email.com'}</div>
                <div className="mt-2">{domain ? domain : 'Select a domain'}</div>
                <div className="opacity-70">{level} track</div>
                <div className="text-sm opacity-70">{goal ? goal : 'Describe your goal'}</div>
                {timeline ? <div className="text-sm opacity-70">Timeline: {timeline}</div> : null}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
