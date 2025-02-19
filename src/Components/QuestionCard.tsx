import React from "react";
import { AnswerObject } from "../App";
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";


type props = {
    question: string,
    answers: string[],
    checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void,
    userAnswer: AnswerObject | undefined,
    queNr: number,
    totalQue: number
};


const QuestionCard: React.FC<props> = ({ question, answers, checkAnswer, userAnswer, queNr, totalQue }) => {


    return (
        <Wrapper>
            <p className="number"> Question : {queNr} / {totalQue} </p>
            <p dangerouslySetInnerHTML={{ __html: question }} />
            <div>
                {answers?.map(answer => (
                    <ButtonWrapper
                        key={answer}
                        $correct={userAnswer?.correctAnswer === answer}
                        $userClicked={userAnswer?.answer === answer}
                    >

                        <button disabled={userAnswer ? true : false} value={answer} onClick={checkAnswer}>
                            <span dangerouslySetInnerHTML={{ __html: answer }} />
                        </button>
                    </ButtonWrapper>
                ))}
            </div>

        </Wrapper >
    )
}

export default QuestionCard;