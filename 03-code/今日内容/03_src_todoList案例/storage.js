export default {
  getStorage () {
    return JSON.parse(localStorage.getItem('todos_key') || '[]')
  },
  setStorage (val) {
    localStorage.setItem('todos_key', JSON.stringify(val))
  }
}
