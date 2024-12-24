'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface ClassViewButtonProps {
  classId: string;
}

const ClassViewButton = ({ classId }: ClassViewButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/classes/${classId}`);
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

export default ClassViewButton;