import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Student } from '../types/Student';
import Link from 'next/link';
import StudentViewButton from "../components/StudentViewButton";
import { useState } from 'react';

export default function StudentsPage({
    students,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [searchStudentTerm, setSearchStudentTerm] = useState("");

    const handleSearchStudentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchStudentTerm(event.target.value);
    };
    const [searchClassTerm, setSearchClassTerm] = useState("");

    const handleSearchClassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchClassTerm(event.target.value);
    };

    return (
        <>
            <h1 className="text-3xl text-center my-8">Student List</h1>


            {/* Add new student */}
            <div className="w-[65rem] place-self-center  flex justify-between mb-2">
                <form action="/students" method="get">
                    <input
                        type="text"
                        name="student name"
                        value={searchStudentTerm}
                        onChange={handleSearchStudentChange}
                        className="border p-2 rounded mr-2"
                        placeholder="Search by student name"
                    />
                    <button type="submit" className="border px-4 py-2 rounded bg-blue-500 text-white">
                        Search
                    </button>
                </form>
                <form action="/students" method="get">
                    <input
                        type="text"
                        name="class name"
                        value={searchClassTerm}
                        onChange={handleSearchClassChange}
                        className="border p-2 rounded mr-2"
                        placeholder="Search by class name"
                    />
                    <button type="submit" className="border px-4 py-2 rounded bg-blue-500 text-white">
                        Search
                    </button>
                </form>
                <Link href='/students/registerStudent' className="border px-4 py-2 rounded-lg bg-green-500 text-white focus:outline-none hover:-translate-y-0.5 shadow-lg hover:shadow-xl transition ease-in-out delay-75 " >
                    Add new student
                </Link>
            </div>

            {/* Student table */}
            <table className="w-[65rem] text-center place-self-center items-center table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-2 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Class name</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="px-4 py-2 text-center">
                                No students found
                            </td>
                        </tr>
                    ) : (
                        students.map((student) => (
                            <tr key={student.id}>
                                <td className="px-4 py-2 border">{student.name}</td>
                                <td className="px-4 py-2 border">{student.className}</td>
                                <td className="px-4 py-2 border flex justify-center ">
                                    {/* Use the Client Component for interactive button */}
                                    <StudentViewButton studentId={student.id} />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    );
}

// SSR - Fetch students based on the query parameter (student name)
export const getServerSideProps: GetServerSideProps<{ students: Student[] }> = async ({ query }) => {
    let students: Student[] = [];

    const studentName = query["student name"] as string | undefined;

    const className = query["class name"] as string | undefined;


    if (studentName) {
        const res = await fetch(`http://localhost:3001/students/search-by-name`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: studentName }),
        });
        students = res.ok ? await res.json() : [];
    }
    else if (className) {

        const res = await fetch(`http://localhost:3001/students/class`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ className: className }),
        });
        students = res.ok ? await res.json() : [];
    }

    else {
        const res = await fetch("http://localhost:3001/students/");
        students = res.ok ? await res.json() : [];
    }

    return { props: { students } };
};