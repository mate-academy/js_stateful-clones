'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  // создаем новый пустой обьект, в который будем добавлять новые состояния
  let currentState = structuredClone(state);
  // создаем копию обьекта, чтобы не изменять его напрямую

  for (const action of actions) {
    // перебираем все действия, которые нужно выполнить над состоянием
    if (action.type === 'clear') {
      // если действие - очистка состояния
      currentState = {};
      // создаем новый пустой объект
    } else if (action.type === 'addProperties') {
      // если действие - добавление свойств
      currentState = { ...currentState, ...action.extraData };
      // создаем новый объект, объединяя текущие свойства
    } else if (action.type === 'removeProperties') {
      // если действие - удаление свойств
      currentState = { ...currentState };
      // создаем новый объект, копируя текущие свойства, и..

      for (const key of action.keysToRemove) {
        // перебираем все ключи, которые нужно удалить
        delete currentState[key];
        // удаляем ключ из текущего состояния
      }
    }
    result.push(currentState);
    // добавляем текущие правки в пустой обьект
  }

  return result;
  // возвращаем обьект всех состояний после применения действий
}

module.exports = transformStateWithClones;
