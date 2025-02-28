import JobCard from "./components/UI/JobCard";
import MainPanal from "./components/UI/MainPanal";

export default function Home() {
  return (
    <section className="p-6 flex flex-col w-full">
      <div className="w-full">
        <MainPanal />
      </div>
      <div className="flex mt-12 w-full justify-start">
        <JobCard />
      </div>
    </section>
  );
}
