import { useRef } from 'react'
import resumeData from './data/resume.json'
import ButtonDownload from './components/ButtonDownload'
import HeaderSection from './components/sections/HeaderSection'
import SummarySection from './components/sections/SummarySection'
import SkillsSection from './components/sections/SkillsSection'
import WorkExperienceSection from './components/sections/WorkExperienceSection'
import EducationSection from './components/sections/EducationSection'

export default function App() {
  const resumeRef = useRef(null)
  const { fullName, targetPosition, email, phone, linkedin, summary, skills, workExperience, education } = resumeData

  return (
    <>
      <div ref={resumeRef} className="max-w-4xl mx-auto py-6 px-20 bg-white font-sans">
        <HeaderSection
          fullName={fullName}
          targetPosition={targetPosition}
          email={email}
          phone={phone}
          linkedin={linkedin}
        />
        <SummarySection summary={summary} />
        <SkillsSection skills={skills} />
        <WorkExperienceSection workExperience={workExperience} />
        <EducationSection education={education} />
      </div>

      <ButtonDownload
        resumeRef={resumeRef}
        fileName={`${fullName.replace(/\s+/g, '_')}_Resume`}
      />
    </>
  )
}
