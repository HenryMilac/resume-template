import { useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import resumeData from './data/resume.json'

export default function App() {
  const resumeRef = useRef(null)

  const handleDownloadPDF = async () => {
    const element = resumeRef.current
    const button = document.getElementById('download-button')

    if (!element) {
      console.error('Resume element not found')
      return
    }

    try {
      // Ocultar el botón antes de generar el PDF
      if (button) {
        button.style.visibility = 'hidden'
      }

      // Pequeño delay para asegurar que el DOM se actualice
      await new Promise(resolve => setTimeout(resolve, 100))

      // Capturar el elemento como canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      })

      // Obtener las dimensiones
      const imgWidth = 8.5 // ancho en pulgadas para carta
      const pageHeight = 11 // alto en pulgadas para carta
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // Crear el PDF
      const pdf = new jsPDF({
        unit: 'in',
        format: 'letter',
        orientation: 'portrait'
      })

      // Convertir canvas a imagen
      const imgData = canvas.toDataURL('image/jpeg', 0.98)

      // Si el contenido cabe en una página
      if (imgHeight <= pageHeight) {
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight)
      } else {
        // El contenido necesita múltiples páginas
        let heightLeft = imgHeight
        let position = 0

        // Primera página
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight

        // Páginas adicionales
        while (heightLeft > 0) {
          position = heightLeft - imgHeight
          pdf.addPage()
          pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
          heightLeft -= pageHeight
        }
      }

      // Descargar el PDF
      pdf.save('First_Last_Resume.pdf')

      console.log('PDF generado exitosamente')
    } catch (error) {
      console.error('Error al generar el PDF:', error)
      alert('Hubo un error al generar el PDF. Por favor intenta de nuevo.')
    } finally {
      // Mostrar el botón después de generar el PDF (o si hay un error)
      if (button) {
        button.style.visibility = 'visible'
      }
    }
  }

  return (
    <>
      <div ref={resumeRef} className="max-w-4xl mx-auto py-6 px-20 bg-white font-sans">
        {/* Header Section */}
        <header className="mb-6">
          <h1 className="text-5xl font-bold text-teal-700 mb-2">{resumeData.fullName}</h1>
          <h2 className="text-xl text-gray-600 mb-3">{resumeData.targetPosition}</h2>
          <p className="text-sm text-gray-600">
            {resumeData.email} • {resumeData.phone} • {resumeData.linkedin}
          </p>
        </header>

        {/* Summary Section */}
        <section className="mb-6">
          <p className="text-gray-700 leading-relaxed">
            {resumeData.summary}
          </p>
        </section>

        {/* Skills Section */}
        <section className="mb-6">
          <h3 className="text-sm font-bold text-teal-600 mb-4 tracking-wide">SKILLS</h3>
          <div className="border-b border-gray-300 mb-4"></div>
          <p className="text-gray-700 mb-2">
            <span className="font-bold">Frameworks</span>: {resumeData.skills.frameworks}
          </p>
          <p className="text-gray-700">
            <span className="font-bold">Languages</span>: {resumeData.skills.languages}
          </p>
        </section>

        {/* Relevant Work Experience Section */}
        <section className="mb-6">
          <h3 className="text-sm font-bold text-teal-600 mb-4 tracking-wide">EXPERIENCIA LABORAL</h3>
          <div className="border-b border-gray-300 mb-4"></div>

          {resumeData.workExperience.map((job, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-gray-800">{job.position}</h4>
                <span className="text-sm text-gray-600">{job.duration}</span>
              </div>
              <p className="text-gray-700 mb-2">{job.company}</p>
              <ul className="list-disc ml-5 space-y-2 text-gray-700">
                {job.highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Education Section */}
        <section className="mb-6">
          <h3 className="text-sm font-bold text-teal-600 mb-4 tracking-wide">EDUCACIÓN</h3>
          <div className="border-b border-gray-300 mb-4"></div>
          <div className="flex justify-between items-baseline mb-1">
            <h4 className="font-bold text-gray-800">{resumeData.education.institution}</h4>
          </div>
          <p className="text-gray-700">{resumeData.education.degree}</p>
        </section>

      </div>

      {/* Floating Download Button */}
      <button
        id="download-button"
        onClick={handleDownloadPDF}
        className="fixed bottom-8 right-8 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Descargar PDF
      </button>
    </>
  )
}
