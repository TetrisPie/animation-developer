
Actor.prototype.hasCorrectAnswer = function(correctAnswerActor){
  var symbol = this.scene.createActor('answer_correct.png', 0, 0);
  symbol.clonesMovement(correctAnswerActor, 0,0);
  correctAnswerActor.letsAppear(symbol);

  this.letsAppear(correctAnswerActor);

  if (typeof this.nextQuestion !== "undefined") correctAnswerActor.letsAppear(correctAnswerActor);
  if (typeof this.finalActor !== "undefined") correctAnswerActor.letsAppear(correctAnswerActor);

  this.correctAnswer = correctAnswerActor;
};

Actor.prototype.hasWrongAnswer = function(wrongAnswerActor){
  var symbol = this.scene.createActor('answer_wrong.png', 0, 0);
  symbol.clonesMovement(wrongAnswerActor, 0,0);
  wrongAnswerActor.letsAppear(symbol);

  this.letsAppear(wrongAnswerActor);
};

Actor.prototype.hasNextQuestion = function(nextQuestionActor){
  if (typeof this.correctAnswer === 'undefined') {
    console.warn("hasNextQuestion requires \"hasCorrectAnswer\" to be set.");
    this.nextQuestion = nextQuestion;
  } else {
    this.correctAnswer.letsAppear(nextQuestionActor);
  }
};

Actor.prototype.hasFinalActor = function(finalActor){
  if (typeof this.correctAnswer === 'undefined') {
    console.warn("hasfinalActor requires \"hasCorrectAnswer\" to be set.");
    this.finalActor = finalActor;
  } else {
    this.correctAnswer.letsAppear(finalActor);
  }
};