'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const story = [];
  let currentstate = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentstate = {};
        break;
    }

    switch (action.type) {
      case 'addProperties':
        currentstate = {
          ...currentstate,
          ...action.extraData,
        };
    }

    switch (action.type) {
      case 'removeProperties':
        const currentStateCopy = { ...currentstate };

        for (const needtodelete of action.keysToRemove) {
          delete currentStateCopy[needtodelete];
        }
        currentstate = currentStateCopy;
    }

    story.push({ ...currentstate });
  }

  return story;
}

module.exports = transformStateWithClones;
