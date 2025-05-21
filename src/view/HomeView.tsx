'use client';
import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function HomeView() {
  const router = useRouter();
  const [name, setName] = useState('');

  const handleStartQuiz = (): void => {
    if (name.trim() === '') {
      alert('Please enter your name before starting the quiz.');
      return;
    }
    router.push('/questions');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <div className='flex flex-col justify-center items-center px-4 py-4 rounded-lg drop-shadow-lg shadow-2xl border-gray-200 border-2'>
        <h1 className="m-5 text-xl font-md">Welcome to our Quiz App</h1>
      <input
        className="w-80 p-2 rounded mb-10 placeholder-gray-500 text-gray-500 border-gray-200 border-2"
        type="text"
        placeholder="Enter Your Name"
        value={name}
        onChange={handleInputChange}
      />
      <button
        onClick={handleStartQuiz}
        className="bg-blue-500 py-2 px-3 rounded text-black border-gray-200 border-2"
      >
        Start Quiz
      </button>
      </div>
      
    </div>
  );
}
