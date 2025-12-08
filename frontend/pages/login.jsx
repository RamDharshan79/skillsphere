import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { app } from '../lib/firebaseConfig'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  async function handleSignIn(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')
    try {
      if (!app) throw new Error('Firebase is not configured')
      const auth = getAuth(app)
      await signInWithEmailAndPassword(auth, email, password)
      setMessage('Signed in')
    } catch (err) {
      setError('Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  async function handleSignUp() {
    setLoading(true)
    setError('')
    setMessage('')
    try {
      if (!app) throw new Error('Firebase is not configured')
      const auth = getAuth(app)
      await createUserWithEmailAndPassword(auth, email, password)
      setMessage('Account created')
    } catch (err) {
      setError('Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setLoading(true)
    setError('')
    setMessage('')
    try {
      if (!app) throw new Error('Firebase is not configured')
      const auth = getAuth(app)
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      setMessage('Signed in with Google')
    } catch (err) {
      setError('Google sign-in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Header onToggleTheme={() => {}} />
      <section className="px-6 py-20">
        <div className="max-w-md mx-auto">
          <div className="glass-card rounded-2xl p-8 space-y-6">
            <h2 className="text-2xl font-bold">Log in</h2>
            {error ? <div className="text-red-500 text-sm">{error}</div> : null}
            {message ? <div className="text-green-600 text-sm">{message}</div> : null}
            <form onSubmit={handleSignIn} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-[hsl(38,92%,50%)] focus:outline-none"
                required
              />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-[hsl(38,92%,50%)] focus:outline-none"
                required
              />
              <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? 'Please wait…' : 'Sign in'}</button>
            </form>
            <div className="flex gap-3">
              <button className="btn-outline flex-1" onClick={handleSignUp} disabled={loading}>Create account</button>
              <button className="btn-outline flex-1" onClick={handleGoogle} disabled={loading}>Continue with Google</button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
