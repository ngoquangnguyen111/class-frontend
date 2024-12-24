'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface StudentViewButtonProps {
  studentId: string;
}

const StudentViewButton = ({ studentId }: StudentViewButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/students/${studentId}`);
  };

  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={handleClick}
    >
      View Details
    </button>
  );
};

export default StudentViewButton;