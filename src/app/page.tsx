
import Demo from "@/components/SectionComponents/Demo";
import DemoResources from "@/components/SectionComponents/DemoResources";
import Main from "@/components/SectionComponents/Main";

export default function Home() {

  return (
    <main>
      <Main />
      <div className="">
        <Demo />
      </div>
      <div className="overflow-hidden">
        <DemoResources />
      </div>
    
    </main>
  );
}
