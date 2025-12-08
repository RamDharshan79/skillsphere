// BEGIN CUSTOMIZABLE SECTION (styles)
export default function Header({ onToggleTheme }) {
  return (
    <header className="px-6 py-8 border-b">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Skillsphere</h1>
          <p className="text-sm text-gray-500">A single home for every free learning resource.</p>
        </div>
        <button onClick={onToggleTheme} className="px-3 py-2 border rounded">
          Toggle Theme
        </button>
      </div>
    </header>
  )
}
// TODO: customize styles here
// END CUSTOMIZABLE SECTION
