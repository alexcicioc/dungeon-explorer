class DialogSequence {
  constructor(dialogs) {
    this.onStart = dialogs.onStart ? dialogs.onStart : [];
    this.currentEvent = "onStart";
    this.showNext();
  }

  showNext() {
    const currentDialogs = this[this.currentEvent];
    if (currentDialogs.length === 0) {
      $(".speech-bubble").hide();
      return false;
    }
    const currentDialog = currentDialogs[0];
    let sprite;
    if (currentDialog.speaker === constants.spriteTypes.HERO) {
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
      .html(currentDialog.message)
      .show();

    currentDialogs.shift();
  }

  isDialogInProgress() {
    return $(".speech-bubble").is(":visible");
  }
}
