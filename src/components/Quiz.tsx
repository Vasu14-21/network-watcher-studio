import { useState } from "react";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What does DNS convert a website name into?",
    options: ["MAC Address", "IP Address", "Port Number", "Protocol Name"],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "Which UDP port is used for DNS traffic?",
    options: ["Port 80", "Port 443", "Port 53", "Port 22"],
    correctIndex: 2,
  },
  {
    id: 3,
    question: "What filter shows all HTTP requests in Wireshark?",
    options: ["http.response", "http.request", "tcp.port == 443", "http.url"],
    correctIndex: 1,
  },
];

const Quiz = () => {
  const [answers, setAnswers] = useState<{ [key: number]: number | null }>({});
  const [submitted, setSubmitted] = useState<{ [key: number]: boolean }>({});

  const handleSelect = (questionId: number, optionIndex: number) => {
    if (submitted[questionId]) return;
    
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setSubmitted((prev) => ({ ...prev, [questionId]: true }));
  };

  const resetQuiz = () => {
    setAnswers({});
    setSubmitted({});
  };

  const getOptionClass = (
    question: Question,
    optionIndex: number
  ): string => {
    const isSelected = answers[question.id] === optionIndex;
    const isCorrect = optionIndex === question.correctIndex;
    const isSubmitted = submitted[question.id];

    if (!isSubmitted) {
      return "border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer";
    }

    if (isCorrect) {
      return "border-success bg-success/10 glow-success";
    }

    if (isSelected && !isCorrect) {
      return "border-destructive bg-destructive/10 glow-destructive";
    }

    return "border-border opacity-50";
  };

  const allAnswered = Object.keys(submitted).length === questions.length;
  const correctCount = questions.filter(
    (q) => answers[q.id] === q.correctIndex
  ).length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-foreground">
          <span className="text-primary">{">"}</span> Quick Knowledge Check
        </h3>
        {allAnswered && (
          <button
            onClick={resetQuiz}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/50 text-primary hover:bg-primary/10 transition-colors font-mono text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        )}
      </div>

      {questions.map((question, qIndex) => (
        <div
          key={question.id}
          className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur animate-fade-in-up"
          style={{ animationDelay: `${qIndex * 0.1}s` }}
        >
          <div className="flex items-start gap-3 mb-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-mono text-primary text-sm">
              {question.id}
            </span>
            <p className="text-foreground font-medium pt-1">{question.question}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-11">
            {question.options.map((option, oIndex) => (
              <button
                key={oIndex}
                onClick={() => handleSelect(question.id, oIndex)}
                disabled={submitted[question.id]}
                className={`flex items-center gap-3 p-4 rounded-lg border text-left transition-all ${getOptionClass(
                  question,
                  oIndex
                )}`}
              >
                <span className="font-mono text-muted-foreground text-sm">
                  {String.fromCharCode(65 + oIndex)}.
                </span>
                <span className="flex-1 text-foreground">{option}</span>
                {submitted[question.id] && oIndex === question.correctIndex && (
                  <CheckCircle className="w-5 h-5 text-success" />
                )}
                {submitted[question.id] &&
                  answers[question.id] === oIndex &&
                  oIndex !== question.correctIndex && (
                    <XCircle className="w-5 h-5 text-destructive" />
                  )}
              </button>
            ))}
          </div>
        </div>
      ))}

      {allAnswered && (
        <div className="p-6 rounded-xl border-glow bg-card/80 backdrop-blur text-center animate-fade-in-up">
          <p className="text-2xl font-bold text-foreground mb-2">
            Score:{" "}
            <span
              className={
                correctCount === questions.length
                  ? "text-success"
                  : correctCount >= 2
                  ? "text-primary"
                  : "text-destructive"
              }
            >
              {correctCount}/{questions.length}
            </span>
          </p>
          <p className="text-muted-foreground font-mono text-sm">
            {correctCount === questions.length
              ? "🎉 Perfect! Ready to monitor traffic!"
              : correctCount >= 2
              ? "👍 Good job! Keep learning!"
              : "📚 Review the content above and try again!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
