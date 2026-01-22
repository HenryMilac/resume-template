import { useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

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
          <h1 className="text-5xl font-bold text-teal-700 mb-2">First Last</h1>
          <h2 className="text-xl text-gray-600 mb-3">React Front End Developer</h2>
          <p className="text-sm text-gray-600">
            Augusta, Maine • +1-234-456-789 • professionalemail@resumeworded.com • linkedin.com/in/username
          </p>
        </header>

        {/* Summary Section */}
        <section className="mb-6">
          <p className="text-gray-700 leading-relaxed">
            React front end developer with 10 years of experience building websites and web applications using ReactJS and
            modern JavaScript tools/frameworks. Key achievement: collaborated with 350+ product teams and backend
            developers to execute new features and create API endpoint's request/response payloads.
          </p>
        </section>

        {/* Relevant Work Experience Section */}
        <section className="mb-6">
          <h3 className="text-sm font-bold text-teal-600 mb-4 tracking-wide">RELEVANT WORK EXPERIENCE</h3>
          <div className="border-b border-gray-300 mb-4"></div>

          {/* Job 1 */}
          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-1">
              <h4 className="font-bold text-gray-800">Resume Worded, New York, NY</h4>
              <span className="text-sm text-gray-600">2015 – Present</span>
            </div>
            <p className="text-gray-700 mb-2">React Front End Developer</p>
            <ul className="list-disc ml-5 space-y-2 text-gray-700">
              <li>Built responsive websites for 40+ customers using semantic HTML5, JavaScript, ReactJS, and CSS compiled using maven and webpack build tools.</li>
              <li>Created Java OSGi bundles for cache invalidation, REST APIs, and web form response handling in the first 30 days of employment.</li>
              <li>Managed CI/CD solution for a 7-man development team using the CircleCI tool and AWS Lambda functions.</li>
              <li>Developed code that deals with large data sets by rendering components on UI and optimizing calls to minimize HTTP requests by 80%.</li>
            </ul>
          </div>

          {/* Job 2 */}
          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-1">
              <h4 className="font-bold text-gray-800">Growthsi, San Francisco, CA</h4>
              <span className="text-sm text-gray-600">2013 – 2015</span>
            </div>
            <p className="text-gray-700 mb-2">React.js Developer</p>
            <ul className="list-disc ml-5 space-y-2 text-gray-700">
              <li>Promoted better component lifecycle practices, which increased turnaround speed by 74%, an improvement from previous years.</li>
              <li>Collaborated with 10+ senior team members to upgrade the websites of 150+ customers to catch up with changing industry standards.</li>
              <li>Pioneered using isomorphic React and Node.js for 40+ web applications, which decreased load times by 69%.</li>
              <li>Conducted testing, installation, configuration, and troubleshooting of 30+ software programs within one week of joining the team.</li>
            </ul>
          </div>

          {/* Job 3 */}
          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-1">
              <h4 className="font-bold text-gray-800">Resume Worded Exciting Company, San Francisco, CA</h4>
              <span className="text-sm text-gray-600">2011 – 2013</span>
            </div>
            <p className="text-gray-700 mb-2">Web Developer</p>
            <ul className="list-disc ml-5 space-y-2 text-gray-700">
              <li>Utilized Java/JSP to update backend templates and display dynamic content to 1100+ users across 30+ remote geographies.</li>
              <li>Performed backend development supporting 4350+ active users by brainstorming with customers to understand their business needs.</li>
              <li>Created Java OSGi bundles to execute custom workflows, create Sling Servlets, and perform data migration tasks in the first 24 hours of employment.</li>
            </ul>
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-6">
          <h3 className="text-sm font-bold text-teal-600 mb-4 tracking-wide">EDUCATION</h3>
          <div className="border-b border-gray-300 mb-4"></div>
          <div className="flex justify-between items-baseline mb-1">
            <h4 className="font-bold text-gray-800">Resume Worded University, New York, NY</h4>
            <span className="text-sm text-gray-600">2011</span>
          </div>
          <p className="text-gray-700">Associate of Applied Science — Information Technology</p>
        </section>

        {/* Skills Section */}
        <section className="mb-6">
          <h3 className="text-sm font-bold text-teal-600 mb-4 tracking-wide">SKILLS</h3>
          <div className="border-b border-gray-300 mb-4"></div>
          <p className="text-gray-700 mb-2">
            <span className="font-bold">Frameworks</span>: AngularJS (Advanced), ReactJS (Experienced), BackboneJS, MVC Architecture, NodeJS
          </p>
          <p className="text-gray-700">
            <span className="font-bold">Languages</span>: English (Native), German (Fluent), French (Conversational)
          </p>
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
