import Demo from "@/components/Demo";
import Main from "@/components/Main";

export default function Home() {

  return (
    <main>
      <Main />
      <div className="overflow-hidden">
        <Demo />
      </div>
    </main>
  );
}
