// #region import
import React, { useEffect, useState } from "react";

import CodeSnippet from "./CodeSnippet";
import CustomCodeSnippet from "./CustomCodeSnippet";
import Answers from "./Answers";
import GameQuestion from "./GameQuestion";
import "animate.css";
// #endregion import

export default function GameContent(props) {
  const {
    value,
    getAnswers,
    gameIndex,
    themeName,
    disableAnswerChange,
    validate,
  } = props;

  //On mélange l'ordre d'affichage des réponses
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  const [customSnippet, setCustomSnippet] = useState(false);

  //pour certains jeux, la réponse choisie par l'utilisateur apparaitra dans le bout de code affiché (code Snippet)
  const [finalSnippet, setFinalSnippet] = useState("");
  const [customFinalSnippet, setCustomFinalSnippet] = useState("");

  const [answerChosen, setAnswerChosen] = useState("");

  const [reset, setReset] = useState(false);
  const [animationPlay, setAnimationPlay] = useState(false);

  useEffect(() => {
    setReset(false);
    setAnswerChosen("");
    setCustomSnippet(false);
    setFinalSnippet("");
    setAnimationPlay(false);
  }, [value]);

  useEffect(() => {
    if (finalSnippet !== "") {
      setReset(true);
    }
  }, [finalSnippet]);

  useEffect(() => {
    if(animationPlay === false){
      setAnimationPlay(true);
    }
  }, [animationPlay])

  useEffect(() => {
    getAnswers(answerChosen, gameIndex);
  }, [answerChosen]);

  // Mélange les réponses avant de les afficher
  const shuffleArray = (array) => {
    const arrayTemp = array;
    for (let i = arrayTemp.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = arrayTemp[i];
      arrayTemp[i] = arrayTemp[j];
      arrayTemp[j] = temp;
    }
    return arrayTemp;
  };

  useEffect(() => {
    setShuffledAnswers(shuffleArray(value.answers));
  }, [value.answers]);

  const onChangeAnswer = (e) => {
    setAnswerChosen(e.target.dataset.entitled);
  };

  useEffect(() => {
    if (value.codeSnippet) {
      if (value.codeSnippet.search("CUSTOM") > -1) {
        setCustomFinalSnippet(value.codeSnippet.replaceAll("CUSTOM", ""));
        setCustomSnippet(true);
      }
    }
  }, [value.codeSnippet]);

  useEffect(() => {
    if (value.codeSnippet) {
      setFinalSnippet(value.codeSnippet.replaceAll("!_!", answerChosen || "_"));
    }
  }, [value.codeSnippet, answerChosen]);

  useEffect(() => {
    console.log(finalSnippet)
  }, [finalSnippet])

  return (
    <article className="game-wording">
{animationPlay && (
  <GameQuestion question={value.question} />
)}

      {value.codeSnippet && reset && (
        <>
          {customSnippet ? (
            <CustomCodeSnippet
              themeName={themeName}
              code={customFinalSnippet}
            />
          ) : (
            <CodeSnippet themeName={themeName} code={finalSnippet} />
          )}
        </>
      )}
      <aside className="answers-frame">
      {
        //Boucle sur les réponses possibles (mélangées) :
        shuffledAnswers.map((answer, answersIndex) => {
          return (
            <Answers
              key={answersIndex}
              answer={answer}
              radioName={value._id}
              onChangeAnswer={onChangeAnswer}
              answerChosen={answerChosen}
              disableAnswerChange={disableAnswerChange}
              validate={validate}
            />
          );
        })
      }
      </aside>
    </article>
  );
}
