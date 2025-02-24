import Image from "next/image";
import Link from "next/link";
import { BiMenu } from "react-icons/bi";

export default function Navbar() {
  return (
    <section className="fixed start-0 top-0 w-[10%] md:w-[30%] lg:w-[20%] h-full justify-items-end bg-blue-700">
      <BiMenu className="sm:hidden block self-start pt-3 text-5xl text-white" />
      <nav className="hidden sm:flex flex-col w-full h-full text-center pt-2 pb-2 text-white justify-between">
        <div className="flex flex-col mt-12">
          <Image
            src={"file.svg"}
            alt="Profile Picture"
            width={100}
            height={100}
            className="image"
          />
          <h3>Company Name</h3>
        </div>
        <div>
          <ul className="w-full">
            <Link href={"/Login"}>
              <li className="p-2 hover:shadow-xl bg-transparent hover:bg-selected">
                <h3>Sign In</h3>
              </li>
            </Link>
            <Link href={"/Register"}>
              <li className="p-2 hover:shadow-xl bg-transparent hover:bg-selected">
                <h3>Sign Up</h3>
              </li>
            </Link>
            <Link href={"/"}>
              <li className="p-2 hover:shadow-xl bg-transparent hover:bg-selected">
                <h3>Home</h3>
              </li>
            </Link>
            <Link href={"/"}>
              <li className="p-2 hover:shadow-xl bg-transparent hover:bg-selected">
                <h3>item 2</h3>
              </li>
            </Link>
            <Link href={"/"}>
              <li className="p-2 hover:shadow-xl bg-transparent hover:bg-selected">
                <h3>item 3</h3>
              </li>
            </Link>
          </ul>
        </div>
        <div>
          <ul className="w-full justify-center">
            <Link href={"/Profile"}>
              <li className="p-2 hover:shadow-xl bg-transparent hover:bg-selected">
                <h3>Profile</h3>
              </li>
            </Link>
            <Link href={"#"}>
              <li className="p-2 hover:shadow-xl bg-transparent hover:bg-selected">
                <h3>Sign Out</h3>
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    </section>
  );
}
