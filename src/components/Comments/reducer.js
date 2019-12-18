export default (state, action) => {
  switch (action.type) {
    case "upload":
      return { ...state, comments: action.payload }
    case "create_comment":
      return { ...state, value: action.payload }
    default:
      throw new Error()
  }
}
