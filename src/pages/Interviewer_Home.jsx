import Card from "../components/card";



export default function Interviewer_Home() {
  return (
    <>
      

      <div className="flex justify-center my-12">
        <div className="sm:hidden max-w-sm">
          <label htmlFor="tabs" className="sr-only">Select your country</label>
          <select id="tabs" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option>Profile</option>
            <option>Dashboard</option>
          </select>
        </div>
        <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-xl overflow-hidden sm:flex sm:w-[40rem]">
          <li className="w-full focus-within:z-10">
            <a href="#" className="inline-block w-full p-4 text-gray-900 bg-light-blue border-r border-white rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none" aria-current="page">New Interviews</a>
          </li>
          <li className="w-full focus-within:z-10">
            <a href="#" className="inline-block w-full p-4 bg-gray-100 border-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none">Scheduled Interviews</a>
          </li>
        </ul>
      </div>


      <section className="grid grid-cols-2 md:grid-cols-4 gap-12 px-48 pb-32">
        <Card />
        <Card />
      </section>

      
    </>
  )
}


