import { Class } from "@/pages/types/Class";
import DeleteClassButton from "@/pages/components/ClassDeleteButton";

// Revalidate after 10 seconds (optional)
export const revalidate = 10; 

// This function generates the static paths for your dynamic routes.
export async function getStaticPaths() {
  const res = await fetch('http://localhost:3001/classes',  {
    headers: [["Authorization", "Bearer admin"]],
  });
  const classes: Class[] = await res.json();

  // Generate a path for each class
  const paths = classes.map((c) => ({
    params: { id: c.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking', // This will serve a static page if the data is already fetched, or wait until the data is fetched if not
  };
}

// This function will run during build time and fetch the data for your class page
export async function getStaticProps({ params }: { params: { id: string } }) {
  const classId = params.id;
  
  const res = await fetch(`http://localhost:3001/classes/${classId}`,  {
    headers: [["Authorization", "Bearer admin"]],
  });
  const c: Class = await res.json();

  return {
    props: { c },
    revalidate: 10, // Regenerate the page at most every 10 seconds
  };
}

export default function ClassDetail({ c }: { c: Class }) {
  return (
    <>
      <h1 className="text-3xl text-center my-8">Class Detail</h1>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Class Information</h2>
          <p className="mt-2"><strong>ID:</strong> {c.id}</p>
          <p className="mt-2"><strong>Class name:</strong> {c.className}</p>
          <p className="mt-2"><strong>Members:</strong> {c.numStudent}</p>
          <DeleteClassButton classId={c.id} />
        </div>
      </div>
    </>
  );
}