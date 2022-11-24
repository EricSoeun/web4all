import React, { useEffect, useState } from "react";

export default function Answers(props) {
    const { answer, radioName, onChangeAnswer, answerChosen, disableAnswerChange, validate } = props;

    const [className, setClassName] = useState("game-answer");

    useEffect(() => {
        let classNameTemp = "game-answer ";
        if(disableAnswerChange===true) {
            classNameTemp+="submit-answer ";
            if(validate===true) {
            classNameTemp+="good-answer";
            }
            else if(validate===false) {
            classNameTemp+="bad-answer";
            }
        }
        setClassName(classNameTemp);
    }, [disableAnswerChange, validate])
    
    return (
        <div className={className}>
            <input
                id={answer._id}
                type="radio"
                name={radioName}
                checked={answerChosen === answer.entitled}
                onChange={onChangeAnswer}
                data-entitled={answer.entitled}
                disabled={disableAnswerChange}
            />
            <label htmlFor={answer._id}>{answer.entitled}</label>
        </div>
    );
}
