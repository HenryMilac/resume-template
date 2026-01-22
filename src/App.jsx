export default function App() {

  return (
    <>
      <div className="max-w-4xl mx-auto py-6 px-20 bg-white font-sans">
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
    </>
  )
}
