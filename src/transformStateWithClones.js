/* eslint-disable */
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
і якщо потрапляємона дію clear,
обнуляємо об'єкт currentState до порожнього */

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

        /* якщо потрапляємона на дію addProperties
створюємо новий об'єкт currentState
на основі попереднього
і додаємо значення з властивості extraData */

      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

        /* якщо потрапляємо на на дію removeProperties,
робимо копію
щоб не міняти попередній стан у масиві history
на основі попереднього
проходимося по масиву keysToRemove об'єкта action
і в об'єкті currentState видаляємо властивості
згідно вказаних ключів в масиві keysToRemove */

      case 'removeProperties':
        currentState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;

      // обробка невідомих типів дій
      // якщо прийде невідома команда, ми нічого не робимо з currentState
      default:
        break;
    }

    /*
   додаємо в масив 'комітів' об'єкт,
   що утворився в результаті поточної дії
   */

    history.push({ ...currentState });
  }

  // віддаємо результуючий масив 'комітів'
  return history;
}

module.exports = transformStateWithClones;
