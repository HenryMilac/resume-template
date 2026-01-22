import { useState } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

// Constantes
const PDF_CONFIG = {
  IMAGE_WIDTH: 8.5,  // pulgadas (carta)
  PAGE_HEIGHT: 11,    // pulgadas (carta)
  SCALE: 2,
  IMAGE_QUALITY: 0.98,
  DOM_UPDATE_DELAY: 100, // ms
}

const BUTTON_ID = 'download-button'
const SUCCESS_DISPLAY_TIME = 2000 // ms

// Estados del botón
const BUTTON_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
}

export default function ButtonDownload({ resumeRef, fileName = 'Resume' }) {
  const [buttonState, setButtonState] = useState(BUTTON_STATES.IDLE)

  const handleDownloadPDF = async () => {
    const element = resumeRef.current

    if (!element || buttonState !== BUTTON_STATES.IDLE) {
      return
    }

    try {
      setButtonState(BUTTON_STATES.LOADING)
      await waitForDOMUpdate()

      const canvas = await captureElementAsCanvas(element)
      const imgHeight = calculateImageHeight(canvas)
      const pdf = createPDF()
      const imgData = canvas.toDataURL('image/jpeg', PDF_CONFIG.IMAGE_QUALITY)

      addImageToPDF(pdf, imgData, imgHeight)

      pdf.save(`${fileName}.pdf`)
      console.log('PDF generado exitosamente')

      setButtonState(BUTTON_STATES.SUCCESS)

      // Volver al estado inicial después de mostrar el check
      setTimeout(() => {
        setButtonState(BUTTON_STATES.IDLE)
      }, SUCCESS_DISPLAY_TIME)
    } catch (error) {
      console.error('Error al generar el PDF:', error)
      alert('Hubo un error al generar el PDF. Por favor intenta de nuevo.')
      setButtonState(BUTTON_STATES.IDLE)
    }
  }

  const getButtonContent = () => {
    switch (buttonState) {
      case BUTTON_STATES.LOADING:
        return <SpinnerIcon />
      case BUTTON_STATES.SUCCESS:
        return <CheckIcon />
      default:
        return (
          <>
            <DownloadIcon />
            Descargar PDF
          </>
        )
    }
  }

  return (
    <button
      id={BUTTON_ID}
      onClick={handleDownloadPDF}
      disabled={buttonState !== BUTTON_STATES.IDLE}
      className="fixed bottom-8 right-8 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 min-w-[200px] disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
    >
      {getButtonContent()}
    </button>
  )
}

// Funciones auxiliares
const waitForDOMUpdate = () =>
  new Promise(resolve => setTimeout(resolve, PDF_CONFIG.DOM_UPDATE_DELAY))

const captureElementAsCanvas = (element) =>
  html2canvas(element, {
    scale: PDF_CONFIG.SCALE,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff'
  })

const calculateImageHeight = (canvas) =>
  (canvas.height * PDF_CONFIG.IMAGE_WIDTH) / canvas.width

const createPDF = () =>
  new jsPDF({
    unit: 'in',
    format: 'letter',
    orientation: 'portrait'
  })

const addImageToPDF = (pdf, imgData, imgHeight) => {
  const { IMAGE_WIDTH, PAGE_HEIGHT } = PDF_CONFIG

  if (imgHeight <= PAGE_HEIGHT) {
    pdf.addImage(imgData, 'JPEG', 0, 0, IMAGE_WIDTH, imgHeight)
  } else {
    addMultiplePages(pdf, imgData, imgHeight, IMAGE_WIDTH, PAGE_HEIGHT)
  }
}

const addMultiplePages = (pdf, imgData, imgHeight, imgWidth, pageHeight) => {
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

// Componentes de íconos SVG
const DownloadIcon = () => (
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
)

const SpinnerIcon = () => (
  <svg
    className="h-5 w-5 animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
)
