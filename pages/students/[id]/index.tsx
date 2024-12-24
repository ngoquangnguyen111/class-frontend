// app/students/[studentId].tsx
import { Student } from '../../types/Student';
import DeleteStudentButton from '@/pages/components/DeleteStudentButton';
// import { useRouter } from 'next/navigation';
// const router = useRouter(); // To navigate after deletion

export const revalidate = 10;

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3001/students');
  const students: Student[] = await res.json();

  // Generate a path for each class
  const paths = students.map((c) => ({
    params: { id: c.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking', // This will serve a static page if the data is already fetched, or wait until the data is fetched if not
  };
}
export async function getStaticProps({ params }: { params: { id: string } }) {
  const studentId = params.id;
  
  const res = await fetch(`http://localhost:3001/students/${studentId}`);
  const student: Student = await res.json();

  return {
    props: { student },
    revalidate: 10, // Regenerate the page at most every 10 seconds
  };
}


export default function  StudentDetail({ student }: { student : Student }) {
  
  // const student = {
  //     id: "1", name: "Huy", className: "6A"
  // }
  // const handleDelete = async () => {
  //   const confirmed = confirm('Are you sure you want to delete this student?');
  //   if (confirmed) {
  //     try {
  //       const response = await fetch(`http://localhost:3001/students/${studentId}`, {
  //         method: 'DELETE',
  //       });

  //       if (response.ok) {
  //         alert('Student deleted successfully');
  //         return {
  //           redirect: {
  //             destination: '/students', // Redirect to the list of students after successful deletion
  //             permanent: false, // Not a permanent redirect
  //           },
  //       }}
  //       else {
  //         return {
  //           props: {
  //             error: 'Failed to delete student',
  //           },
  //         };
  //         }

  //       } catch (err: any) {
  //         alert('Error: ' + err.devMessage);
  //       }
  //     }
  // };

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
