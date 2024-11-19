'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        copyState = {};
        break;

      case 'addProperties':
        copyState = { ...copyState, ...action.extraData };
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete copyState[keyToRemove];
        }
        break;
    }
    states.push({ ...copyState }); // Копируем объект, чтобы избежать мутаций.
  }

  return states;
}

module.exports = transformStateWithClones;
