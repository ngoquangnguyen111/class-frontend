'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterStudentForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        className: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
          const res = await fetch('http://localhost:3001/students', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          if (!res.ok) {
            const errorData = await res.json();
            setError(errorData.devMessage || 'Failed to register student.');
            return;
          }

          router.push('/students');
        } catch (err) {
          setError('An unexpected error occurred.');
        }
      };

    return (<>
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-red-100 text-red-600 p-4 rounded">{error}</div>}
            <div>
                <label htmlFor="name" className="block font-medium mb-1">
                    Student Name:
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>
            <div>
                <label htmlFor="className" className="block font-medium mb-1">
                    Class Name:
                </label>
                <input
                    type="text"
                    id="className"
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Register
                </button>
            </div>
        </form>
    </>
    );
};

export default RegisterStudentForm;