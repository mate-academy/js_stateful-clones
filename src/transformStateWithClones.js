'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];

  let previousState = {};

  Object.assign(previousState, state);

  for (const anAction of actions) {
    for (const typeValue in anAction) {
      switch (anAction[typeValue]) {
        case 'addProperties':
          Object.assign(previousState, anAction.extraData);
          resultArr.push(Object.assign({}, previousState));
          break;

        case 'removeProperties':
          for (const propRemove of anAction.keysToRemove) {
            delete previousState[propRemove];
          }
          resultArr.push(Object.assign({}, previousState));
          break;

        case 'clear':
          previousState = {};
          resultArr.push(Object.assign({}, previousState));
          break;
      }
    }
  }

  return resultArr;
}

module.exports = transformStateWithClones;
