class DialogSequence {
  constructor(row, column, messages) {
    this.position = { row, column };
    this.messages = messages;
    this.showNext();
  }

  showNext() {
    if (this.messages.length === 0) {
      $(".speech-bubble").hide();
      return false;
    }
    $(".speech-bubble")
      .css({
        left: config.leftOffset + config.tileSize * (this.position.column + 1),
        top: config.topOffset + config.tileSize * this.position.row
      })
      .html(this.messages[0])
      .show();

    this.messages.shift();
  }

  isDialogInProgress() {
    return $(".speech-bubble").is(":visible");
  }
}
