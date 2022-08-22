'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = {};
  const result = [];

  Object.assign(stateClone, state);

  for (let i = 0; i < actions.length; i++) {
    const operation = actions[i];
    const operationType = operation.type;

    switch (operationType) {
      case 'addProperties':
        Object.assign(stateClone, operation.extraData);
        result.push(Object.assign({}, stateClone, operation.extraData));
        break;
      case 'removeProperties':
        for (let x = 0; x <= operation.keysToRemove.length; x++) {
          delete stateClone[operation.keysToRemove[x]];
        }
        result.push(Object.assign({}, stateClone));
        break;
      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        result.push(Object.assign({}, stateClone));
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
