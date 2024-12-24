'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
interface StudentDeleteButtonProps {
    studentId: string;
  }
const DeleteStudentButton = ({studentId} : StudentDeleteButtonProps) => {
    const [error, setError] = useState("");
    const router = useRouter();
    const handleDelete = async () => {
        const confirmed = confirm('Are you sure you want to delete this student?');
        if (confirmed) {
            try {
                const response = await fetch(`http://localhost:3001/students/${studentId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert('Student deleted successfully');
                    router.push('/students');
                }
                else {
                    const errorData = await response.json();
                    if(errorData)
                        setError(errorData.devMessage);
                    else 
                        setError("Fail to delete this class")
                    };
                }

             catch (err: any) {
                alert('Error: ' + err.devMessage);
            }
        }
    };

    return <>
        <button
            onClick={handleDelete}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
        >
            Delete Student
        </button> {error && <div className="bg-red-100 text-red-600 p-4 rounded">{error}</div>}
    </> 

}
export default DeleteStudentButton