// app/students/[studentId].tsx
import { Student } from '../../types/Student';
import DeleteStudentButton from '@/pages/components/DeleteStudentButton';
// import { useRouter } from 'next/navigation';
// const router = useRouter(); // To navigate after deletion

export const revalidate = 10;

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3001/students', {
    headers: [["Authorization", "Bearer admin"]],
  } );
  const students: Student[] = await res.json();

  // Generate a path for each class
  const paths = students.map((c) => ({
    params: { id: c.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking', 
  };
}
export async function getStaticProps({ params }: { params: { id: string } }) {
  const studentId = params.id;
  
  const res = await fetch(`http://localhost:3001/students/${studentId}`, {
    headers: [["Authorization", "Bearer admin"]],
  });
  const student: Student = await res.json();

  return {
    props: { student },
    revalidate: 10, 
  };
}


export default function  StudentDetail({ student }: { student : Student }) {
  
  

    return (
      <>
        <h1 className="text-3xl text-center my-8">Student Detail</h1>
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Student Information</h2>
            <p className="mt-2"><strong>ID:</strong> {student.id}</p>
            <p className="mt-2"><strong>Name:</strong> {student.name}</p>
            <p className="mt-2"><strong>Class:</strong> {student.className}</p>
            <DeleteStudentButton studentId = {student.id}/>
          </div>
        </div>
      </>
    );
  };
