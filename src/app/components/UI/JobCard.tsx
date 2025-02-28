import Image from "next/image";
import Link from "next/link";
import ApplyButton from "./ApplyButton";

export default function JobCard() {
  return (
    <div className="flex flex-col card shadow-lg hover:shadow-xl p-2 bg-blue-50 rounded-md">
      <div className="grid grid-cols-[30%_70%]">
        <div className="justify-normal flex flex-col">
          <Image
            src={"/uploads/images/defaultImage.svg"}
            alt="company"
            width={200}
            height={200}
            className="image"
          />
          <h3>Company Name</h3>
        </div>
        <div className="flex-col">
          <h1>Job Name</h1>
          <ol className="list-disc">
            <li>requrment 1</li>
            <li>requrment 2</li>
            <li>requrment 3</li>
            <li>requrment 4</li>
          </ol>
        </div>
      </div>
      <div className="w-full flex justify-between gap-1 mt-2 p-2 text-center">
        <Link
          href={"/JobDetails"}
          className="w-full bg-blue-600 text-slate-100 hover:text-blue-600 hover:bg-slate-100"
        >
          Read More...
        </Link>
        <ApplyButton />
      </div>
    </div>
  );
}
