class GameMechanics {

  static checkTileTriggers(row, column) {
    const tile = map.tiles[row][column];
    const spriteElement = $(tile.find('.sprite')[0]);
    const spriteInstance = map.sprites[spriteElement.attr('id')];
    const adventurer = Adventurer.getInstance();

    if (spriteElement) {
      if (spriteElement.hasClass(constants.spriteTypes.HEALTH_POTION)) {
        this.consumeItem(adventurer, spriteInstance);
      } else if (spriteElement.hasClass(constants.spriteTypes.CHEST_CLOSED)) {
        this.openChest(adventurer, spriteInstance);
      } else if (this.isAttackable(spriteElement)) {
        this.attack(adventurer, spriteInstance);
      }
    }
  }

  static consumeItem(adventurer, spriteInstance) {
    adventurer.consume(spriteInstance);
    map.removeSprite(spriteInstance);
  }

  static openChest(adventurer, spriteInstance) {
    adventurer.consume(spriteInstance);
    spriteInstance.type = 'chest-open';
    spriteInstance.element.removeClass('chest-closed').addClass('chest-open');
  }

  static isAttackable(spriteElement) {
    if (
      spriteElement.hasClass(constants.spriteTypes.BAT) ||
      spriteElement.hasClass(constants.spriteTypes.VILAIN)
    ) {
      return true;
    }

    return false;
  }

  static attack(attacker, defender) {
    let log = '';
    const attackerName = attacker.element.attr('id').toUpperCase();
    const defenderName = defender.element.attr('id').toUpperCase();

    do {
      defender.stats.healingPoints -= attacker.stats.strength;
      log += `${defenderName} took ${attacker.stats.strength} damage;`;

      if (defender.stats.healingPoints <= 0) {
        let damage = Math.floor(attacker.stats.strength / 2);
        defender.stats.healingPoints = 0;
        attacker.stats.healingPoints -= damage;
        log += `${defenderName} died; ${attackerName} took ${damage} damage;`;
        if (attacker.stats.healingPoints <= 0) {
          attacker.stats.healingPoints = 0;
          log += `${attackerName} died;`;
        }

        break;
      } else if (attacker.stats.healingPoints <= 0) {
        let damage = Math.floor(defender.stats.strength / 2);
        attacker.stats.healingPoints = 0;
        defender.stats.healingPoints -= damage;
        log += `${attackerName} died; ${defenderName} took ${damage} damage;`;
        if (defender.stats.healingPoints <= 0) {
          defender.stats.healingPoints = 0;
          log += `${defenderName} died;`;
        }
        break;
      }
      attacker.stats.healingPoints -= defender.stats.strength;
      log += `${attackerName} took ${defender.stats.strength} damage;`;

    } while (attacker.stats.healingPoints > 0 && defender.stats.healingPoints > 0);
    attacker.updateHp();
    defender.updateHp();
    writeToLog(log);

    if (attacker.isDead()) {
      alert(log);
      window.location.reload();
    }

    if (defender.isDead()) {
      map.removeSprite(defender);
    }
  }
}