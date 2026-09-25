import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getActivity
} from "../services/activityService";

import {
  saveOfflineActivityAnswer
} from "../offline/offlineDB";

import {
  submitActivityOnline
} from "../services/submissionService";

import {
  getActivityImage
} from "../services/imageService";

function ActivityAnswer() {

  const { activityId } = useParams();

  const navigate = useNavigate();

  const [activity, setActivity] =
    useState(null);

  const [answers, setAnswers] =
    useState({});

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadActivity() {

      try {

        const data =
          await getActivity(activityId);

        setActivity(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    loadActivity();

  }, [activityId]);

  function handleAnswer(
    questionId,
    answer
  ) {

    setAnswers((previous) => ({
      ...previous,
      [questionId]: answer
    }));

  }

  function calculateScore() {

    let score = 0;

    activity.questions.forEach(
      (question) => {

        if (
          answers[question.id] ===
          question.correctAnswer
        ) {

          score++;

        }

      }
    );

    return score;

  }

  async function handleSubmit() {

    const studentId =
      localStorage.getItem("studentId");

    if (!studentId) {

      setMessage(
        "Student profile not found."
      );

      return;
    }

    const score =
      calculateScore();

    const submissionData = {

      studentId,

      activityId:

        activity.id,

      answers,

      score,

      totalItems:
        activity.questions.length

    };

    if (navigator.onLine) {

      try {

        await submitActivityOnline(
          submissionData
        );

        setMessage(
          "Activity submitted successfully!"
        );

      } catch (error) {

        console.error(error);

        await saveOfflineActivityAnswer(
          submissionData
        );

        setMessage(
          "Internet connection failed. Your answers were saved and will be submitted later."
        );

      }

    } else {

      await saveOfflineActivityAnswer(
        submissionData
      );

      setMessage(
        "You are offline. Your answers were saved on this device and will be submitted when internet returns."
      );

    }

  }

  if (loading) {

    return <p>Loading activity...</p>;

  }

  if (!activity) {

    return <p>Activity not found.</p>;

  }

  return (

    <div className="activity-page">

      <h1>
        {activity.title}
      </h1>

      <p>
        {activity.description}
      </p>

      {!navigator.onLine && (

        <div className="offline-message">

          🔴 You are offline.

          <br />

          Your answers will be saved
          automatically.

        </div>

      )}

      {activity.questions.map(
        (question, index) => (

          <div
            className="question-card"
            key={question.id}
          >

            <h2>
              Question {index + 1}
            </h2>

            <p>
              {question.question}
            </p>

            {question.image && (

              <img
                src={getActivityImage(
                  question.image
                )}
                alt=""
                width="250"
              />

            )}

            <div>

              {question.choices.map(
                (choice) => (

                  <button
                    key={choice}
                    onClick={() =>
                      handleAnswer(
                        question.id,
                        choice
                      )
                    }
                    className={
                      answers[
                        question.id
                      ] === choice
                        ? "selected-choice"
                        : ""
                    }
                  >

                    {choice}

                  </button>

                )
              )}

            </div>

          </div>

        )
      )}

      <button
        onClick={handleSubmit}
      >
        Submit Activity
      </button>

      {message && (

        <p className="success-message">
          {message}
        </p>

      )}

    </div>

  );

}

export default ActivityAnswer;