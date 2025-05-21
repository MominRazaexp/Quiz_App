import React from 'react'
import Button from './Button'
import {ResultInterface} from "../Interface/interface"

export default function ResultCard({ totalQ , corrected ,handleReStartQuiz ,handleStartQuiz }: ResultInterface) {
  return (
    <div className="bg-white rounded-lg px-2 flex flex-col items-center  text-black w-[20%] py-4  shadow-2xl border-gray-200 border-2">
          <h1 className=" text-xl font-bold">Here is Your Score</h1>
          <span className="text-lg mt-10">{`You have Corrected ${corrected} out of ${totalQ}`}</span>
          <span className="text-lg mt-3">{`Percentage: ${(
            (corrected / totalQ) *
            100
          ).toFixed(0)}%`}</span>
          <div className="flex justify-around w-[100%] mt-5 ">
            <Button btnAction={handleStartQuiz} btnName='Start New Quiz'/>
            <Button btnAction={handleReStartQuiz} btnName='Restart Quiz'/>
            
          </div>
        </div>
  )
}
