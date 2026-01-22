export default function EducationSection({ education }) {
  const { institution, degree } = education

  return (
    <section className="mb-6">
      <h3 className="text-sm font-bold text-teal-600 mb-4 tracking-wide">EDUCACIÓN</h3>
      <div className="border-b border-gray-300 mb-4"></div>
      <div className="flex justify-between items-baseline mb-1">
        <h4 className="font-bold text-gray-800">{institution}</h4>
      </div>
      <p className="text-gray-700">{degree}</p>
    </section>
  )
}
