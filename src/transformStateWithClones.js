'use strict';

// const { act } = require('react');

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let prevState = { ...state };
  let next = {};

  for (const action of actions) {
    // if (action.type === 'addProperties') {
    //   next = { ...prevState, ...action.extraData };
    //   history.push(next);
    //   prevState = next;
    // } else if (action.type === 'removeProperties') {
    //   next = Object.fromEntries(
    //     Object.entries(prevState).filter(
    //       ([k]) => !action.keysToRemove.includes(k),
    //     ),
    //   );

    //   history.push(next);
    //   prevState = next;
    // } else if (action.type === 'clear') {
    //   next = {};
    //   history.push(next);
    //   prevState = next;
    // }
    switch (action.type) {
      case 'addProperties':
        next = { ...prevState, ...action.extraData };
        break;
      case 'removeProperties':
        next = Object.fromEntries(
          Object.entries(prevState).filter(
            ([k]) => !action.keysToRemove.includes(k),
          ),
        );
        break;
      case 'clear':
        next = {};
        break;
      default:
        continue;
    }
    history.push(next);
    prevState = next;
  }

  return history;
}

module.exports = transformStateWithClones;
