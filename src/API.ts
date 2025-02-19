import { toast } from "react-toastify";
import { shuffleArray } from "./Utils";

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string
}

export type QuestionState = Question & { answers: string[] };

export enum difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export const fetchQuiz = async (amount: number, difficulty: difficulty) => {
    const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`

    try {
        const response = await fetch(endPoint);
        const data = await response.json();
        console.log('data : ', data.results);
        toast.success('Your Quiz is Ready!');

        return data.results?.map((question: Question) => ({
            ...question, answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
        }))
    }
    catch (error) {
        console.log('Fetch Error is =', error);
        toast.error('Questions could not be fetched');

    }
}

