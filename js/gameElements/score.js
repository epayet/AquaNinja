function Score(gameplay) {
    this.score = 0;
    var self = this;
    gameplay.addEventListener("onNextRealStep", function (step) {
        self.score++;
    });
    gameplay.addEventListener("onDead", function () {
        self.onDead();
    });
}

Score.prototype.onDead = function() {
    var message = "You loose ! Your score is: " + (this.score - 1);
    console.log(message);
    //alert(message);
    //window.location.reload();
};

module.exports = Score;