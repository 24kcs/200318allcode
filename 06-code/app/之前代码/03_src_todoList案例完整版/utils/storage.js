export default{
  // 读取缓存数据
  getStorage(){
    return JSON.parse(localStorage.getItem('todos_key')||'[]')
  },
  // 设置缓存数据
  setStorage(val){
    localStorage.setItem('todos_key',JSON.stringify(val))
  }
}