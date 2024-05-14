import InterviewIcon from "../assets/interview-icon.png";

export default function Card() {
  return (
    <div className="max-w-xs bg-white hover:bg-light-blue cursor-pointer rounded">
      <a href="#">
        <img className="rounded saturate-50" src="https://verpex.com/assets/uploads/images/blog/Python-good-for-machine-learning.webp?v=1681274267" alt="" />
      </a>
      <div className="py-5 px-2">
        <a href="#">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">TCS Python Developers Recruitment 2024</h5>
        </a>
        <p className="mb-3 font-normal text-sm text-gray-700">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        <a href="#" className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-center text-white bg-primary-blue rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          Interview
          <img src={InterviewIcon} className="ml-2 h-6" alt="Interview Icon" />
        </a>
      </div>
    </div>

  )
}