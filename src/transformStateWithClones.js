'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const listOfStates = [];
  const copyState = { ...state };

  actions.forEach((elem) => {
    if (elem.type === 'addProperties') {
      Object.assign(copyState, elem.extraData);
      listOfStates.push({ ...copyState });
    }

    if (elem.type === 'removeProperties') {
      for (const key of elem.keysToRemove) {
        delete copyState[key];
      }
      listOfStates.push({ ...copyState });
    }

    if (elem.type === 'clear') {
      for (const key in copyState) {
        delete copyState[key];
      }
      listOfStates.push({ ...copyState });
    }
  });

  return listOfStates;
}

module.exports = transformStateWithClones;
