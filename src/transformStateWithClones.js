'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here

  const result = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      const addedSegment = {
        ...stateCopy, ...action.extraData,
      };

      result.push(addedSegment);
      stateCopy = addedSegment;
    }

    if (action.type === 'removeProperties') {
      const addedSegment = {
        ...stateCopy,
      };

      for (const keyToRemove of action.keysToRemove) {
        delete addedSegment[keyToRemove];
      }
      result.push(addedSegment);
      stateCopy = addedSegment;
    }

    if (action.type === 'clear') {
      stateCopy = {};
      result.push(stateCopy);
    }
  }

  return result;
}

module.exports = transformStateWithClones;
