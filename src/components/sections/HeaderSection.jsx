export default function HeaderSection({ fullName, targetPosition, email, phone, linkedin }) {
  return (
    <header className="mb-6">
      <h1 className="text-5xl font-bold text-teal-700 mb-2">{fullName}</h1>
      <h2 className="text-xl text-gray-600 mb-3">{targetPosition}</h2>
      <p className="text-sm text-gray-600">
        {email} • {phone} • {linkedin}
      </p>
    </header>
  )
}
