export default function WorkExperienceSection({ workExperience }) {
  return (
    <section className="mb-6">
      <h3 className="text-sm font-bold text-teal-600 mb-4 tracking-wide">EXPERIENCIA LABORAL</h3>
      <div className="border-b border-gray-300 mb-4"></div>

      {workExperience.map(({ position, duration, company, highlights }, index) => (
        <div key={index} className="mb-6">
          <div className="flex justify-between items-baseline mb-1">
            <h4 className="font-bold text-gray-800">{position}</h4>
            <span className="text-sm text-gray-600">{duration}</span>
          </div>
          <p className="text-gray-700 mb-2">{company}</p>
          <ul className="list-disc ml-5 space-y-2 text-gray-700">
            {highlights.map((highlight, idx) => (
              <li key={idx}>{highlight}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
