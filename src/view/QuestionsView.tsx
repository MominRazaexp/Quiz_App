"use client";

import { Star } from "lucide-react";
import questions from "../app/data/questions.json";
import { useEffect, useState } from "react";
import {currentQInterface} from "../app/Interface/interface"
import { useRouter } from "next/navigation";

export default function QuestionsView() {
  const router = useRouter();
  const [isAnswerd , setIsAnswerd] = useState<boolean>(false)
  const [isShowingResult , setIsShowingResult] = useState<boolean>(false)
  const [totalQ, setTotalQ] = useState<number>(0);
  const [choices , setChoices] = useState<string[]>([])
  const [currentQCount, setCurrentQCount] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [attempted, setAttempted] = useState<number>(0);
  const [corrected, setCorrected] = useState<number>(0);
  const [maxScore, setMaxScore] = useState<number>(0);
  const [minScore, setMinScore] = useState<number>(0);
  const [selectedChoice , setSelectedChoice] = useState<string>('');
  const [answerFlag, setAnswerFlag] = useState<string>('');
  const [currentQ, setCurrentQ] = useState<currentQInterface>({
  category: "",
  type: "",
  difficulty: "",
  question: "",
  correct_answer: "",
  incorrect_answers: []
});

  const decodeText = (text: string) => {
    return decodeURIComponent(text);
  };

  const handleResult = ()=>{
    setIsShowingResult(true)
  }

   const handleStartQuiz = (): void => {
    router.push('/');
  };

  const handleReStartQuiz = ():void =>{
    setIsAnswerd(false)
    setCurrentQCount(1);
    setCurrentScore(0);
    setAttempted(0);
    setCorrected(0);
    setMinScore(0)
    setIsShowingResult(false);
    setProgress(currentQCount/formatedQuestions.length*100)
    setMaxScore(100);

  }

  const handleAnswer = (choice: string)=>{
    setSelectedChoice(choice);
    if(currentQ.correct_answer === choice)
      {
        setCorrected(corrected+1);
        setAnswerFlag("Correct!")
        setCurrentScore(Math.floor((corrected+1)/(attempted+1)*100))
        setMaxScore(Math.floor(( (corrected+1) + (totalQ - (attempted+1)) )/totalQ *100 ))
        setMinScore(Math.floor((corrected+1)/totalQ *100 ))

      }
      else{
        setAnswerFlag("Sorry!")
        setCurrentScore(Math.floor((corrected)/(attempted+1)*100))
        setMaxScore(Math.floor(( corrected + (totalQ - (attempted+1)) )/totalQ *100 ))
        setMinScore(Math.floor(corrected/totalQ *100 ))
      }

      setAttempted(attempted+1);
      setIsAnswerd(true);
             
  }

  const formatedQuestions = questions.map((q) => {
    return {
      ...q,
      category: decodeText(q.category),
      question: decodeText(q.question),
      correct_answer: decodeText(q.correct_answer),
      incorrect_answers: q.incorrect_answers.map(decodeText),
    };
  });

  const handleNextQ = ()=>{
    setProgress((currentQCount+1)/totalQ*100);
    setIsAnswerd(false);
    setAnswerFlag("");
    setCurrentQCount(currentQCount+1);
  }

  useEffect(() => {
    setTotalQ(formatedQuestions.length);
    setProgress(currentQCount/formatedQuestions.length*100)
    setMaxScore(100);
       
  }, []);

  useEffect(() => {
    setCurrentQ(formatedQuestions[currentQCount - 1]);
    const incChoices:string[] = [...formatedQuestions[currentQCount - 1].incorrect_answers]
    incChoices.push(formatedQuestions[currentQCount - 1].correct_answer)
    const choices:string[] = incChoices;
    setChoices(choices)
  }, [currentQCount]);

  
  

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      {
      isShowingResult?<div className="bg-white rounded-lg px-2 flex flex-col items-center  text-black w-[20%] py-4  shadow-2xl border-gray-200 border-2">
        <h1 className=" text-xl font-bold">Here is Your Score</h1>
        <span className="text-lg mt-10">{`You have Corrected ${corrected} out of ${totalQ}`}</span>
        <span className="text-lg mt-3">{`Percentage: ${(corrected/totalQ*100).toFixed(2)}%`}</span>
        <div className="flex justify-around w-[100%] ">
          <button onClick={handleStartQuiz}  className="mt-10  text-md bg-blue-500 text-white rounded-md px-2 py-1 ">
              Start New Quiz
            </button>
            <button onClick={handleReStartQuiz}  className="mt-10  text-md bg-blue-500 text-white rounded-md px-2 py-1 ">
              Restart Quiz
            </button>

        </div>
        
      </div>:

      <div className="bg-white rounded-lg px-2 flex flex-col  text-black w-5/12 h-5/6  shadow-2xl border-gray-200 border-2">
        <div style={{width:`${progress}%`}} className={`bg-gray-500 mt-1  h-3`}></div>

        <div className="flex flex-col px-20">
          <h1 className="text-3xl  mt-10">{`Question ${currentQCount} of ${totalQ}`}</h1>
          <span className=" text-gray-400">{currentQ.category}</span>
          <div className=" flex">
            <Star className="w-6 h-6 text-black fill-black " />
            <Star
              className={`w-6 h-6 ${
                currentQ.difficulty === "medium" ||
                currentQ.difficulty === "hard"
                  ? "text-black fill-black"
                  : "text-gray-500 fill-gray-500"
              }`}
            />
            <Star
              className={`w-6 h-6 ${
                currentQ.difficulty === "hard"
                  ? "text-black fill-black"
                  : "text-gray-500 fill-gray-500"
              }`}
            />
          </div>
          <span className="mt-10 text-lg">{currentQ.question}
          </span>

          <div className="flex flex-wrap justify-between mt-5">
            
            {choices.map((choice , index)=>{
              return <div key={index} onClick={()=>{
                if(!isAnswerd)
                {
                  handleAnswer(choice)
                }
              }} className={`${isAnswerd?"cursor-not-allowed":"cursor-pointer"} text-center w-[48%] px-5 py-2 mb-4 rounded-md 
              ${isAnswerd && selectedChoice === choice?"bg-black text-white"
              :isAnswerd && selectedChoice !== choice?"opacity-50":"bg-gray-400"}
               border-black border-2 `}>
              {choice}
            </div>

            })}
            
          </div>
          {isAnswerd && <h1 className="text-center text-2xl mt-10">{answerFlag}</h1>}
          {isAnswerd && currentQCount === totalQ? <div className="mt-7 flex justify-center ">
            <button onClick={handleResult} className="  text-xl bg-blue-500 text-white rounded-md px-3 py-2 ">
              See Result
            </button>
          </div>
          :<>
          {isAnswerd && <div className="mt-7 flex justify-center ">
            <button onClick={handleNextQ} className="  text-xl bg-blue-500 text-white rounded-md px-3 py-2 ">
              Next Question
            </button>
          </div>}
          </>
          }          

          <div className="mt-40 flex flex-col">
            <div className="flex justify-between">
              <div>Score:{currentScore}%</div>
              <div>Max Score:{maxScore}%</div>
            </div>
            <div className="relative border-black border-2 rounded-md h-10 overflow-hidden">
              <div style={{width:`${minScore}%`}} className="z-30 absolute  h-full bg-black"></div>
              <div style={{width:`${currentScore}%`}} className="z-20 absolute  h-full bg-gray-500"></div>
              <div style={{width:`${maxScore}%`}} className="absolude h-full bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>

      }
      
    </div>
  );
}
