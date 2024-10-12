'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };

  const story = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        copyState = {};
        break;

      case 'addProperties':
        copyState = { ...copyState, ...action.extraData };
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete copyState[key];
        });
        break;

      default:
        break;
    }
    story.push({ ...copyState });
  });

  return story;
}

module.exports = transformStateWithClones;
