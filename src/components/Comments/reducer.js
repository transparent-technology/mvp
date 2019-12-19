export default (state, action) => {
  switch (action.type) {
    case "upload":
      return { ...state, ...action.payload }
    case "create_comment":
      return { ...state, loading: true, create: action.payload }
    case "add_comment":
      return {
        ...state,
        loading: false,
        create: null,
        comments: [...state.comments, action.payload]
      }
    case "edit_comment":
      return { ...state, loading: true, edit: action.payload }
    case "add_edit_comment":
      const editItem = action.payload
      const editComments = state.comments.map(item => {
        if (item.id === editItem.id) {
          return { ...item, ...editItem }
        }
        return item
      })
      return { ...state, loading: false, edit: null, comments: editComments }
    case "delete_comment":
      return { ...state, loading: true, deleteId: action.payload }
    default:
      throw new Error()
  }
}
