class Animal {
  static alive = [];

  constructor(name) {
    this.name = name;
    this.health = 100;
    Animal.alive.push(this);
  }

  die() {
    Animal.alive = Animal.alive.filter(
      (animalInstance) => animalInstance !== this,
    );
  }

  info() {
    return `${this.name} - Health: ${this.health}`;
  }
}

class Herbivore extends Animal {
  constructor(name) {
    super(name);
    this.hidden = false;
  }

  hide() {
    this.hidden = true;
  }
}

class Carnivore extends Animal {
  bite(victim) {
    if (!(victim instanceof Herbivore) || victim.hidden) {
      return;
    }

    victim.health = Math.max(0, victim.health - 50);

    if (victim.health <= 0) {
      victim.die();
    }
  }
}

export { Animal, Herbivore, Carnivore };
