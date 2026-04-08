'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  //  створюємо порожній масив для 'комітів'
  const history = [];

  // робимо копію оригінального стану (початкового об'єкту state)
  let currentState = { ...state };

  /* проходимося по масиву зі списком дій actions
   і перевіряємо чи є в цьому списку дій clear,
   як тільки він знаходиться, обнуляємо об'єкт currentState до порожнього */

  for (const action of actions) {
    if (action.type === 'clear') {
      currentState = {};
    }

    /*
   тут перевіряємо чи є в цьому списку дій addProperties,
   як тільки він знаходиться,
   створюємо новий об'єкт currentState
   на основі попереднього
   і додаємо значення з властивості extraData */

    if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    }

    /*
   тут перевіряємо чи є в цьому списку дій removeProperties,
   як тільки він знаходиться,
   Робимо копію
   щоб не міняти попередній стан у масиві history
   на основі попереднього
   проходимося по масиву keysToRemove об'єкта action
   і в об'єкті currentState видаляємо властивості
   згідно вказаних ключів в масиві keysToRemove */

    if (action.type === 'removeProperties') {
      currentState = { ...currentState };

      for (const key of action.keysToRemove) {
        delete currentState[key];
      }
    }

    /*
   додаємо в масив 'комітів' об'єкт,
   що утворився в результаті видалення властивостей
   із массива keysToRemove */

    history.push({ ...currentState });
  }

  // віддаємо результуючий масив 'комітів'
  return history;
}

module.exports = transformStateWithClones;
