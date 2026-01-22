export default function SkillsSection({ skills }) {
  const { frameworks, languages } = skills

  return (
    <section className="mb-6">
      <h3 className="text-sm font-bold text-teal-600 mb-4 tracking-wide">SKILLS</h3>
      <div className="border-b border-gray-300 mb-4"></div>
      <p className="text-gray-700 mb-2">
        <span className="font-bold">Frameworks</span>: {frameworks}
      </p>
      <p className="text-gray-700">
        <span className="font-bold">Languages</span>: {languages}
      </p>
    </section>
  )
}
