export const setLoading = () => {
    return {
      type: "SET_LOADING",
      data: true
    }
}

export const setDoneLoading = () => {
  return {
    type: "SET_DONE_LOADING",
    data: false
  }
}

const reducer = (state = false, action) => {
    switch(action.type){
        case 'SET_LOADING':
            return action.data
        case 'SET_DONE_LOADING':
          return action.data
        default:
            return state
    }
}

export default reducer