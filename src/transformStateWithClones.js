'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const baseStateClone = JSON.parse(JSON.stringify(state));
  const newStates = [baseStateClone];

  for (const action of actions) {
    let currentStateClone
      = JSON.parse(JSON.stringify(newStates[newStates.length - 1]));

    switch (action.type) {
      case 'addProperties':
        Object.assign(currentStateClone, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentStateClone[key];
        }
        break;

      case 'clear':
        currentStateClone = {};
        break;

      default:
        break;
    }

    newStates.push(currentStateClone);
  }

  return newStates.slice(1);
}

module.exports = transformStateWithClones;
