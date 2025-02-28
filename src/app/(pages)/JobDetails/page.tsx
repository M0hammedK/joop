import Image from "next/image";
import Link from "next/link";
import { MdKeyboardBackspace } from "react-icons/md";

export default function JobDetails() {
  return (
    <section className="contain-content mt-12 p-6 w-full flex flex-col max-w-4xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200  gap-6">
      <div>
        <Link href={"/"}>
          <MdKeyboardBackspace className="m-4 w-16 fixed top-0 start-0 text-white bg-blue-500 text-4xl rounded-xl hover:bg-blue-600 transition" />
        </Link>
      </div>
      <div className="flex-col items-center text-center row-span-1 col-span-2">
        <Image
          src="/uploads/images/defaultImage.svg"
          alt="Company Logo"
          width={100}
          height={100}
          className="image"
        />
        <h1 className="text-3xl font-bold mt-4">Job Title</h1>
        <h3 className="text-lg text-gray-600">Company Name</h3>
      </div>

      <div className="w-full justify-normal">
        <h2 className="text-xl font-semibold w-48">Job Description</h2>
        <p className="text-gray-700 mt-2">
          This is a brief job description. It outlines the key responsibilities,
          expectations, and qualifications required for the role.
        </p>
      </div>

      <div className="w-full justify-normal">
        <h2 className="text-xl font-semibold w-40">Requirements</h2>
        <ul className="list-disc ml-5 mt-2 text-gray-700">
          <li>Requirement 1</li>
          <li>Requirement 2</li>
          <li>Requirement 3</li>
          <li>Requirement 4</li>
        </ul>
      </div>

      <div className="w-full justify-normal">
        <h2 className="text-xl font-semibold w-40">Salary & Benefits</h2>
        <p className="text-gray-700 mt-2">
          Competitive salary with great benefits including health insurance,
          vacation days, and more.
        </p>
      </div>

      <div className="mt-4">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
          Apply Now!
        </button>
      </div>
    </section>
  );
}
