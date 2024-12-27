'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
interface ClassDeleteButtonProps {
    classId: string;
  }

const DeleteClassButton = ({classId} : ClassDeleteButtonProps) => {
    const router = useRouter();
    const [error, setError] = useState("");
    const handleDelete = async () => {
        const confirmed = confirm('Are you sure you want to delete this class?');
        if (confirmed) {
            try {
                const response = await fetch(`http://localhost:3001/classes/${classId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization' : 'Bearer admin',
                    },
                });

                if (response.ok) {
                    alert('Class deleted successfully');
                    router.push('/classes');
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
            Delete class
        </button> {error && <div className="bg-red-100 text-red-600 p-4 rounded">{error}</div>}
    </>

}
export default DeleteClassButton