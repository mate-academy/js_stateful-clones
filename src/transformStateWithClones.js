'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = [];
  let currentState = structuredClone(state);

  for (const action of actions) {
    let temporari = structuredClone(currentState);

    switch (action.type) {
      case 'removeProperties':
        for (const value of action.keysToRemove) {
          delete temporari[value];
        }
        stateClone.push(temporari);
        break;

      case 'addProperties':
        Object.assign(temporari, action.extraData);
        stateClone.push(temporari);
        break;

      case 'clear':
        temporari = {};
        stateClone.push(temporari);
        break;
    }

    currentState = temporari;
  }

  return stateClone;
}

module.exports = transformStateWithClones;
