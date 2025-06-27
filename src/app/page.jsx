import Posts from "@/components/Posts";
export default async function Home() {
  return (
    <div className="flex flex-col items-center">
      <h1 className=" text-4xl">Home page</h1>
      <Posts />
    </div>
  );
}
