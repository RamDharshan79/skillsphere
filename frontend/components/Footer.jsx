export default function Footer() {
  return (
    <footer id="contact" className="mt-20 border-t border-[#c8a96a]/20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold">Skill<span className="text-[#c8a96a]">Sphere</span></h3>
          <p className="mt-2 text-sm text-[#7a869a]">We curate, verify, and guide learners along trusted paths.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-[#7a869a]">
            <li><a href="#courses" className="hover:text-[#c8a96a]">Tracks</a></li>
            <li><a href="#why" className="hover:text-[#c8a96a]">How It Works</a></li>
            <li><a href="#impact" className="hover:text-[#c8a96a]">Impact</a></li>
            <li><a href="#partners" className="hover:text-[#c8a96a]">Partners</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm text-[#7a869a]">
            <li><a href="#guidance" className="hover:text-[#c8a96a]">Guidance</a></li>
            <li><a href="#community" className="hover:text-[#c8a96a]">Community</a></li>
            <li><a href="#faq" className="hover:text-[#c8a96a]">FAQ</a></li>
            <li><a href="#contact" className="hover:text-[#c8a96a]">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Newsletter</h4>
          <form className="space-y-3">
            <input type="email" aria-label="Your email" placeholder="Your email" className="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#c8a96a]/30 focus:border-[#c8a96a] focus:outline-none text-current placeholder-[#7a869a]" />
            <button type="submit" className="btn-primary w-full">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pb-12 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#7a869a]">
        <div>© 2025 Skillsphere. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <a href="#privacy" className="hover:text-[#c8a96a]">Privacy</a>
          <a href="#terms" className="hover:text-[#c8a96a]">Terms</a>
        </div>
      </div>
    </footer>
  )
}
