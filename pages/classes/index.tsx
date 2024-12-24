import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Class } from '../types/Class';
import Link from 'next/link';
import ClassViewButton from '../components/ClassViewButton';
import { useState } from 'react';
// interface ClassesPageProps {
//     classes: Class[];
// }

export default function ClassesPage({
    classes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    // const [searchClassTerm, setSearchClassTerm] = useState("");

    // const handleSearchClassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchClassTerm(event.target.value);
    // };

    return (
        <>
            <h1 className="text-3xl text-center my-8">Class List</h1>
            <div className="w-[80.5rem] flex justify-end mb-2">

                <Link href='/classes/registerClass' className="border px-4 py-4 rounded-lg bg-green-500 text-white focus:outline-none hover:-translate-y-0.5 shadow-lg hover:shadow-xl transition ease-in-out delay-75 text-[17px]" >Add new class</Link>
            </div>
            <table className="w-[65rem] text-center place-self-center items-center table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-2 py-2 border">Class name</th>
                        <th className="px-2 py-2 border">Member</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="px-4 py-2 text-center">
                                No classes found
                            </td>
                        </tr>
                    ) : (
                        classes.map((c) => (
                            <tr key={c.id}>
                                <td className="px-4 py-2 border">{c.className}</td>
                                <td className="px-4 py-2 border">{c.numStudent}</td>
                                <td className="px-4 py-2 border flex justify-center gap-12">
                                    <ClassViewButton classId={c.id} />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    );
};

// SSR - Fetch students based on the query parameter (student name)
export const getServerSideProps: GetServerSideProps<{ classes: Class[] }> = async ({ }) => {
    let classes: Class[] = [];




    const res = await fetch("http://localhost:3001/classes/");
    classes = res.ok ? await res.json() : [];


    return { props: { classes } };
};
