function getIndexOfItem(action, state) {
  let index = -1,
    data = action.result;

  for (let i = 0; i < state.result.length; i++) {
    if (state.result[i]._id === data._id) {
      index = i;
      break;
    }
  }

  return index;
}

export default function customStateSwitcher(SINGLE, ALL, CREATE, EDIT, REMOVE) {
  return function (state = [], action) {
    if (action.error) {
      return {
        result: state.result,
        error: action.error,
      };
    }
    switch (action.type) {
      case SINGLE:
      case ALL:
        return {
          result: action.result,
        };
      case CREATE:
        return {
          result: [
            ...state.result,
            action.result,
          ],
        };
      case EDIT:
        var index = getIndexOfItem(action, state);

                // todo item not found in state object so return original state
        if (index === -1) return state;

                // todo item found! return new state
        return {
          result: [
            ...state.result.slice(0, index),
            Object.assign({}, state.result[index], action.result),
            ...state.result.slice(index + 1),
          ],
        };
      case REMOVE:
        var index = getIndexOfItem(action, state);
                // todo item not found in state object so return original state
        if (index === -1) return state;

                // todo item found! don't include it in the new state
        return {
          result: [
            ...state.result.slice(0, index),
            ...state.result.slice(index + 1),
          ],
        };
      default:
        return state;
    }
  };
}
