// Lightweight helpers to read mock counts from localStorage
const TEACHERS_KEY = 'app_teachers_v1'
const STUDENTS_KEY = 'app_students_v1'

export function getTeacherCount(){
  try{
    const raw = localStorage.getItem(TEACHERS_KEY)
    if(!raw) return 0
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr.length : 0
  }catch(e){
    return 0
  }
}

export function getStudentCount(){
  try{
    const raw = localStorage.getItem(STUDENTS_KEY)
    if(!raw) return 0
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr.length : 0
  }catch(e){
    return 0
  }
}
