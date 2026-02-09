import { useState } from "react";

function App() {
  const [showGreeting, setShowGreeting] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showReaction, setShowReaction] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);

  const questions = [
    {
      type: "multiple",
      question: "What is our best memories with us?",
      options: [
        "Candle Night Dinner",
        "Music Concept Night Bus Travel",
        "Nov 02",
        "Wayanad Travel",
      ],
      correctAnswer: "Music Concept Night Bus Travel",
      wrongReaction: "❌ Oops! Try to remember our special moment! 💭",
      reaction: "HOW YOU REMEMBER! 💕",
    },
    {
      type: "multiple",
      question: "Tell me where do you want to travel next?",
      options: ["Ooty", "Kodikanal", "Wonderla-(Kerala)", "North Side"],
      reaction: "Hamayya! Noted. 📝✈️",
    },
    {
      type: "multiple",
      question: "When did you give your first kiss?",
      options: ["Sep 12", "Nov 02", "Aug 16", "I Don't remember 😅"],
      correctAnswer: "Sep 12",
      wrongReaction: "❌ How could you forget our first kiss? 😢",
      reaction: "❤️ That moment changed everything!",
    },
    {
      type: "yesno",
      question: "Will you be my Valentine?",
      options: ["Yes ❤️", "No"],
      wrongReaction:
        "❌ Invalid choice.\nSystem has detected you are already my Valentine. 💕",
      reaction:
        "🎉 Yay! You're My Valentine! 🎊\n\nThank you for making my day special! ❤️",
    },
    {
      type: "photo",
      question: "Where did we click this photo?",
      options: ["candle light dinner", "home", "Our First Pic", "Bus Travel"],
      correctAnswer: "candle light dinner",
      wrongReaction: "❌ Look at the photo again! 💭",
      reaction: "📸 Perfect memory! 💕",
      defaultPhoto: "/Screenshot 2026-02-02 121324.png",
    },
  ];

  const handleAnswer = (answer) => {
    setSelectedOption(answer);

    const currentQ = questions[currentQuestion];

    if (currentQ.type === "yesno") {
      if (answer === "No") {
        setShowReaction(currentQ.wrongReaction);
        setTimeout(() => {
          setShowReaction(null);
          setSelectedOption(null);
        }, 2500);
        return;
      } else if (answer === "Yes ❤️") {
        setShowReaction(currentQ.reaction);
      }
    } else {
      if (currentQ.correctAnswer) {
        if (answer !== currentQ.correctAnswer) {
          setShowReaction(currentQ.wrongReaction);
          setTimeout(() => {
            setShowReaction(null);
            setSelectedOption(null);
          }, 2500);
          return;
        }
      }
      setShowReaction(currentQ.reaction);
    }

    setTimeout(() => {
      const newAnswers = [...answers, answer];
      setAnswers(newAnswers);
      setShowReaction(null);
      setSelectedOption(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setShowGreeting(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setShowReaction(null);
    setSelectedOption(null);
    setUploadedPhoto(null);
  };

  const startQuiz = () => {
    setShowGreeting(false);
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full mix-blend-screen animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              background: `radial-gradient(circle, ${
                ['rgba(255,182,193,0.3)', 'rgba(218,112,214,0.3)', 'rgba(255,105,180,0.3)'][i % 3]
              }, transparent)`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
        
        {/* Hearts */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`heart-${i}`}
            className="absolute text-pink-300 opacity-10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 40 + 30}px`,
            }}
          >
            ♥
          </div>
        ))}
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Greeting Screen */}
        {showGreeting ? (
          <div className="relative animate-fade-in-scale">
            {/* Neon glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-75 animate-pulse"></div>
            
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl p-10 border border-pink-500/30">
              <div className="text-center">
                <div className="mb-8 animate-bounce-slow">
                  <div className="inline-block relative">
                    <div className="absolute inset-0 bg-pink-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                    <div className="relative text-9xl">💝</div>
                  </div>
                </div>
                
                <h1 className="text-6xl font-black mb-4 relative">
                  <span className="absolute inset-0 blur-md text-pink-500 opacity-50">
                    Advance Happy Valentine's
                  </span>
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 animate-gradient">
                    Advance Happy Valentine's
                  </span>
                </h1>
                
                <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-pink-500 to-transparent mb-8"></div>
                
                <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl p-8 mb-8 backdrop-blur-sm border border-pink-500/20">
                  <p className="text-3xl text-pink-300 mb-6 font-bold tracking-wide">
                    My Dearest Love 💕
                  </p>
                  <p className="text-lg text-gray-300 leading-relaxed mb-4">
                    On this special day, I want to celebrate our beautiful journey together.
                    Every moment with you is a treasure, every memory a precious gem.
                  </p>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    I've prepared a special quiz just for you, filled with our memories
                    and dreams. Let's relive our beautiful moments together! ✨
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 mb-8">
                  <span className="text-3xl animate-pulse">💖</span>
                  <span className="text-xl text-pink-400 font-semibold tracking-wider">With All My Love</span>
                  <span className="text-3xl animate-pulse" style={{ animationDelay: '0.5s' }}>💖</span>
                </div>

                <button
                  onClick={startQuiz}
                  className="group relative w-full py-6 overflow-hidden rounded-2xl text-xl font-bold"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 animate-gradient"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative text-white flex items-center justify-center gap-3">
                    <span className="text-2xl">🎯</span>
                    Start Our Love Quiz
                    <span className="text-2xl">💕</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        ) : !showResult ? (
          <div className="relative animate-fade-in-scale">
            {/* Neon glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-60"></div>
            
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-pink-500/30">
              {/* Header with neon effect */}
              <div className="relative bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 p-6 border-b border-pink-500/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-pink-400 font-bold text-lg tracking-wider">
                    QUESTION {currentQuestion + 1}/{questions.length}
                  </div>
                  <div className="flex gap-2">
                    {questions.map((_, index) => (
                      <div
                        key={index}
                        className={`transition-all duration-500 ${
                          index < currentQuestion
                            ? "w-8 h-3 bg-gradient-to-r from-green-400 to-green-500 shadow-lg shadow-green-500/50"
                            : index === currentQuestion
                            ? "w-12 h-3 bg-gradient-to-r from-pink-400 to-purple-400 shadow-lg shadow-pink-500/50 animate-pulse"
                            : "w-6 h-3 bg-gray-600"
                        } rounded-full`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-700 ease-out shadow-lg shadow-pink-500/50"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question content */}
              <div className="p-8">
                {/* Question box */}
                <div className="relative mb-8">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl p-6 border border-pink-500/30 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl flex-shrink-0 animate-pulse">💭</div>
                      <h2 className="text-2xl font-bold text-white leading-tight">
                        {currentQ.question}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Photo display */}
                {currentQ.type === "photo" && (
                  <div className="mb-8">
                    <div className="flex justify-center">
                      <div className="relative group">
                        {/* Animated border */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-all duration-500 animate-gradient"></div>
                        
                        <div className="relative">
                          <div className="w-80 h-80 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border-4 border-pink-500/50 shadow-2xl transform transition-transform duration-500 group-hover:scale-105">
                            <img
                              src={currentQ.defaultPhoto}
                              alt="Our Memory"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-pink-900/40"></div>
                          </div>
                          
                          {/* Corner decorations */}
                          <div className="absolute -top-3 -right-3 text-4xl animate-bounce-slow">❤️</div>
                          <div className="absolute -bottom-3 -left-3 text-4xl animate-spin-slow">✨</div>
                          <div className="absolute -top-3 -left-3 text-3xl animate-pulse">💕</div>
                          <div className="absolute -bottom-3 -right-3 text-3xl animate-bounce">🌟</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Options */}
                <div className="space-y-4">
                  {currentQ.options.map((option, index) => {
                    const isSelected = selectedOption === option;
                    const isYesNoQuestion = currentQ.type === "yesno";
                    const isYes = option === "Yes ❤️";
                    const isNo = option === "No";

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        disabled={showReaction !== null}
                        className={`
                          group relative w-full py-5 px-6 rounded-xl font-bold text-lg
                          transition-all duration-300 transform overflow-hidden
                          ${isSelected ? "scale-95 opacity-50" : "hover:scale-105"}
                          disabled:cursor-not-allowed
                        `}
                      >
                        {/* Animated background */}
                        <div className={`
                          absolute inset-0 transition-all duration-300
                          ${isYesNoQuestion && isYes
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 group-hover:from-green-600 group-hover:to-emerald-600"
                            : isYesNoQuestion && isNo
                            ? "bg-gradient-to-r from-red-500 to-rose-500 group-hover:from-red-600 group-hover:to-rose-600"
                            : "bg-gradient-to-r from-pink-500/30 to-purple-500/30 group-hover:from-pink-500/50 group-hover:to-purple-500/50"
                          }
                        `}></div>
                        
                        {/* Border glow */}
                        <div className={`
                          absolute inset-0 rounded-xl border-2 transition-all duration-300
                          ${isYesNoQuestion && isYes
                            ? "border-green-400 group-hover:shadow-lg group-hover:shadow-green-500/50"
                            : isYesNoQuestion && isNo
                            ? "border-red-400 group-hover:shadow-lg group-hover:shadow-red-500/50"
                            : "border-pink-400 group-hover:shadow-lg group-hover:shadow-pink-500/50"
                          }
                        `}></div>
                        
                        {/* Hover shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                        
                        {/* Content */}
                        <div className="relative z-10 flex items-center justify-center gap-3 text-white">
                          {!isYesNoQuestion && (
                            <span className="text-2xl">{["💝", "🌹", "✨", "💕"][index % 4]}</span>
                          )}
                          <span>{option}</span>
                          {!isYesNoQuestion && (
                            <span className="text-2xl">{["💝", "🌹", "✨", "💕"][index % 4]}</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reaction overlay */}
              {showReaction && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 animate-fade-in">
                  <div className="relative">
                    {/* Pulsing glow */}
                    <div className="absolute -inset-8 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-60 animate-pulse"></div>
                    
                    <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-12 rounded-3xl shadow-2xl max-w-md mx-4 animate-bounce-in border-2 border-pink-500/50">
                      <div className="text-center">
                        <div className="text-8xl mb-6 animate-bounce">
                          {showReaction.includes("❌") || showReaction.includes("Invalid") ? "❌" : "🎉"}
                        </div>
                        <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 whitespace-pre-line leading-relaxed">
                          {showReaction}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="relative animate-fade-in-scale">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-75 animate-pulse"></div>
            
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl p-10 border border-pink-500/30">
              <div className="text-center mb-8">
                <div className="inline-block relative mb-6">
                  <div className="absolute inset-0 bg-pink-500 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                  <div className="relative text-9xl animate-bounce-slow">💝</div>
                </div>
                
                <h2 className="text-5xl font-black mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 animate-gradient">
                    Quiz Complete!
                  </span>
                </h2>
                
                <div className="flex items-center justify-center gap-2 text-pink-400 text-xl mb-8">
                  <span className="text-3xl">🎊</span>
                  <span>You completed all {questions.length} questions!</span>
                  <span className="text-3xl">🎊</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl p-8 mb-8 border border-pink-500/20 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-pink-300 mb-4 text-center">
                  Thank you for being my Valentine! 💕
                </h3>
                <p className="text-center text-gray-300 text-xl mb-4">
                  Every moment with you is special ❤️
                </p>
                <div className="h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-pink-500 to-transparent mb-4"></div>
                <p className="text-center text-pink-400 italic text-lg">
                  "You are my today and all of my tomorrows" 🌹
                </p>
              </div>

              <button
                onClick={resetQuiz}
                className="group relative w-full py-6 overflow-hidden rounded-2xl text-xl font-bold"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 animate-gradient"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative text-white flex items-center justify-center gap-3">
                  <span className="text-2xl">🔄</span>
                  Play Again
                  <span className="text-2xl">💕</span>
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(10deg);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(10px, -10px);
          }
          50% {
            transform: translate(-10px, -20px);
          }
          75% {
            transform: translate(-20px, -10px);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-fade-in-scale {
          animation: fade-in-scale 0.5s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

export default App;