'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here

  let copy = { ...state };
  const story = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        copy = {};
        break;

      case 'addProperties':
        copy = { ...copy, ...action.extraData };
        break;
      case 'removeProperties':
        actions.keysToRemove.forEach((key) => {
          delete copy[key];
        });
        break;

      default:
        break;
    }
    story.push({ ...copy });
  });

  return story;
}

module.exports = transformStateWithClones;
