class DialogSequence {
  constructor(dialogs) {
    this.currentDialog = null;
    this.messages = [];
    dialogs.forEach(dialog => {
      const { row, column } = dialog.trigger;
      if (!this.messages[row]) {
        this.messages[row] = [];
      }
      this.messages[row][column] = dialog.messages;
    });
  }

  exists(row, column) {
    return this.messages[row] && this.messages[row][column];
  }

  start(row, column) {
    this.currentDialog = { row, column };
    this.showNext();
  }

  showNext() {
    const { row, column } = this.currentDialog;
    const messages = this.messages[row][column];
    if (messages.length === 0) {
      this.hideBubble();
      this.currentDialog = null;
      delete this.messages[row][column];
      return false;
    }

    const currentMessage = messages[0];
    let sprite;
    if (currentMessage.speaker === constants.spriteTypes.HERO) {
      sprite = Adventurer.getInstance();
    } else {
      sprite = Vilain.getInstance();
    }
    this.showBubble(
      sprite.position.row,
      sprite.position.column + 1,
      currentMessage.message
    );
    messages.shift();
  }

  showBubble(row, column, message) {
    $(".speech-bubble")
      .css({
        left: config.leftOffset + config.tileSize * column,
        top: config.topOffset + config.tileSize * row
      })
      .html(message)
      .fadeIn();
  }

  hideBubble() {
    $(".speech-bubble").fadeOut();
  }

  isDialogInProgress() {
    return this.currentDialog !== null;
  }
}
