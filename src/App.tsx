import React, { useEffect, useState } from 'react';
// import './App.css';
import QuestionCard from './Components/QuestionCard';
import { difficulty, fetchQuiz, QuestionState } from './API';
import { ToastContainer } from 'react-toastify';
import Spinner from './Components/Spinner';
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string,
  answer: string,
  correctAnswer: string,
  correct: boolean
}

function App() {

  const [isLoading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);    //An array of type QuestionState
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const Total_Questions = 10;

  // useEffect( ()=> {fetchQuiz(Total_Questions, difficulty.MEDIUM);} ,[] )
  // console.log('App.ts Fetch response is = ', fetchQuiz(Total_Questions, difficulty.MEDIUM));



  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuiz(Total_Questions, difficulty.EASY);

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }
  console.log('Questions are :', questions);




  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {

      const answer = e.currentTarget.value;   // User Answer    
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore(prev => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer: answer,
        correctAnswer: questions[number].correct_answer,
        correct,
      }
      setUserAnswers(prev => [...prev, answerObject]);
    }
  }




  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === Total_Questions) {
      setGameOver(true)
    } else setNumber(nextQuestion);

  }



  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <div>
          <h1> Quiz </h1>
          {gameOver || userAnswers.length === Total_Questions ? (
            <button className='start' onClick={startTrivia}> Start </button>) : null}
          {!gameOver && <h3 className='score'> Score : {score} </h3>}
          {isLoading && <div> <Spinner /> </div>}

          {!isLoading && !gameOver &&
            <QuestionCard
              queNr={number + 1}
              totalQue={Total_Questions}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              checkAnswer={checkAnswer}
            />}
          {!isLoading && !gameOver && userAnswers.length === number + 1 && number !== Total_Questions - 1 &&
            <button className='next' onClick={nextQuestion}> Next Question</button>
          }

          
          <ToastContainer />
        </div>
      </Wrapper>
    </>
  );
}

export default App;
