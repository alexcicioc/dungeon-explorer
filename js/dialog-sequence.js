class DialogSequence {
  constructor(dialogs) {
    this.dialogs = dialogs;
    this.currentDialog = null;
  }

  startDialogIfAvailable(heroRow, heroColumn) {
    for (let key in this.dialogs) {
      const { row, column } = this.dialogs[key].trigger;
      if (
        row === heroRow &&
        column === heroColumn &&
        !this.dialogs[key].processed
      ) {
        this.currentDialog = this.dialogs[key];
        this.dialogs[key].processed = true;
        this.showNext();
        break;
      }
    }
  }

  showNext() {
    const messages = this.currentDialog.messages;
    if (messages.length === 0) {
      $(".speech-bubble").hide();
      return false;
    }
    const currentMessage = messages[0];
    let sprite;
    if (currentMessage.speaker === constants.spriteTypes.HERO) {
      sprite = Adventurer.getInstance();
    } else {
      sprite = Vilain.getInstance();
    }
    $(".speech-bubble")
      .css({
        left:
          config.leftOffset + config.tileSize * (sprite.position.column + 1),
        top: config.topOffset + config.tileSize * sprite.position.row
      })
      .html(currentMessage.message)
      .show();

    messages.shift();
  }

  isDialogInProgress() {
    return $(".speech-bubble").is(":visible");
  }
}
