import React, { useEffect, useState } from 'react'

type Teacher = {
  id: string
  username: string
  fullName: string
  qualifications?: string
  subjects?: string
}

type Student = {
  id: string
  username: string
  fullName: string
  standard?: string
  enrollment?: string
  parentContact?: string
  address?: string
}

const STORAGE_TEACHERS = 'app_teachers_v1'
const STORAGE_STUDENTS = 'app_students_v1'

function useLocalStorage<T>(key: string, initial: T){
  const [state, setState] = useState<T>(() => {
    try{
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) as T : initial
    }catch(e){
      return initial
    }
  })

  useEffect(()=>{
    try{ localStorage.setItem(key, JSON.stringify(state)) }catch(e){}
  },[key, state])

  return [state, setState] as const
}

export default function AdminManage(){
  const [teachers, setTeachers] = useLocalStorage<Teacher[]>(STORAGE_TEACHERS, [])
  const [students, setStudents] = useLocalStorage<Student[]>(STORAGE_STUDENTS, [])

  const [tForm, setTForm] = useState({username:'', fullName:'', qualifications:'', subjects:''})
  const [sForm, setSForm] = useState({username:'', fullName:'', standard:'', enrollment:'', parentContact:'', address:''})
  const [editingTeacherId, setEditingTeacherId] = useState<string | null>(null)
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null)

  function addOrUpdateTeacher(e: React.FormEvent){
    e.preventDefault()
    if(editingTeacherId){
      setTeachers(teachers.map(t => t.id === editingTeacherId ? {...t, username: tForm.username, fullName: tForm.fullName, qualifications: tForm.qualifications, subjects: tForm.subjects} : t))
      setEditingTeacherId(null)
    }else{
      const t: Teacher = { id: Date.now().toString(), username: tForm.username, fullName: tForm.fullName, qualifications: tForm.qualifications, subjects: tForm.subjects }
      setTeachers([...teachers, t])
    }
    setTForm({username:'', fullName:'', qualifications:'', subjects:''})
  }

  function addOrUpdateStudent(e: React.FormEvent){
    e.preventDefault()
    if(editingStudentId){
      setStudents(students.map(s => s.id === editingStudentId ? {...s, username: sForm.username, fullName: sForm.fullName, standard: sForm.standard, enrollment: sForm.enrollment, parentContact: sForm.parentContact, address: sForm.address} : s))
      setEditingStudentId(null)
    }else{
      const s: Student = { id: Date.now().toString(), username: sForm.username, fullName: sForm.fullName, standard: sForm.standard, enrollment: sForm.enrollment, parentContact: sForm.parentContact, address: sForm.address }
      setStudents([...students, s])
    }
    setSForm({username:'', fullName:'', standard:'', enrollment:'', parentContact:'', address:''})
  }

  function editTeacher(id: string){
    const t = teachers.find(x => x.id === id); if(!t) return
    setTForm({username: t.username, fullName: t.fullName, qualifications: t.qualifications || '', subjects: t.subjects || ''})
    setEditingTeacherId(id)
  }

  function editStudent(id: string){
    const s = students.find(x => x.id === id); if(!s) return
    setSForm({username: s.username, fullName: s.fullName, standard: s.standard || '', enrollment: s.enrollment || '', parentContact: s.parentContact || '', address: s.address || ''})
    setEditingStudentId(id)
  }

  function removeTeacher(id: string){ setTeachers(teachers.filter(t=>t.id !== id)) }
  function removeStudent(id: string){ setStudents(students.filter(s=>s.id !== id)) }

  // CSV Export
  function exportCSV(){
    const rows = ['type,id,username,fullName,meta']
    teachers.forEach(t => rows.push(`teacher,${t.id},${t.username},${t.fullName},${JSON.stringify({qualifications: t.qualifications, subjects: t.subjects})}`))
    students.forEach(s => rows.push(`student,${s.id},${s.username},${s.fullName},${JSON.stringify({standard: s.standard, enrollment: s.enrollment})}`))
    const blob = new Blob([rows.join('\n')], {type:'text/csv'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'export_users.csv'; a.click(); URL.revokeObjectURL(url)
  }

  // CSV Import (very small parser)
  function importCSV(file: File | null){
    if(!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const txt = String(ev.target?.result || '')
      const lines = txt.split(/\r?\n/).slice(1).filter(Boolean)
      const newT: Teacher[] = []
      const newS: Student[] = []
      for(const line of lines){
        const parts = line.split(/,(.+)/) // split only first 4 cols
        const [type, id, username, rest] = line.split(',',4)
        try{
          const meta = JSON.parse(rest.substring(rest.indexOf('{')))
          if(type === 'teacher') newT.push({id, username, fullName: parts[2] || username, qualifications: meta.qualifications || '', subjects: meta.subjects || ''})
          if(type === 'student') newS.push({id, username, fullName: parts[2] || username, standard: meta.standard || '', enrollment: meta.enrollment || ''})
        }catch(e){/* skip malformed */}
      }
      if(newT.length) setTeachers([...teachers, ...newT])
      if(newS.length) setStudents([...students, ...newS])
    }
    reader.readAsText(file)
  }

  // Sample data
  function generateSampleData(){
    const sampleTeachers: Teacher[] = [
      {id: 't1', username:'ram123', fullName:'Ram Singh', qualifications:'B.Ed', subjects:'Math,Science'},
      {id: 't2', username:'sita', fullName:'Sita Kaur', qualifications:'M.Ed', subjects:'English'}
    ]
    const sampleStudents: Student[] = [
      {id:'s1', username:'priya', fullName:'Priya Sharma', standard:'10', enrollment:'2023-01'},
      {id:'s2', username:'raj', fullName:'Raj Kumar', standard:'9', enrollment:'2022-15'}
    ]
    setTeachers([...teachers, ...sampleTeachers])
    setStudents([...students, ...sampleStudents])
  }

  // Simple logs (mock)
  const logs = (() => {
    try{ const raw = localStorage.getItem('app_logs_v1'); return raw ? JSON.parse(raw) : {attendance:[], performance:[]} }catch(e){ return {attendance:[], performance:[]} }
  })()

  return (
    <div style={{padding:20}}>
      <h1>Admin - Manage Teachers & Students (Mock)</h1>

      <div style={{marginTop:12}}>
        <button onClick={() => exportCSV() }>Export CSV</button>
        <input style={{marginLeft:8}} type="file" accept="text/csv" onChange={(e)=> importCSV(e.target.files ? e.target.files[0] : null)} />
        <button style={{marginLeft:8}} onClick={generateSampleData}>Generate Sample Data</button>
      </div>

      <section style={{display:'flex', gap:40, marginTop:20}}>
        <div style={{flex:1}}>
          <h2>{editingTeacherId ? 'Edit Teacher' : 'Add Teacher'}</h2>
          <form onSubmit={addOrUpdateTeacher}>
            <input placeholder="Username" value={tForm.username} onChange={e=>setTForm({...tForm, username: e.target.value})} required />
            <input placeholder="Full Name" value={tForm.fullName} onChange={e=>setTForm({...tForm, fullName: e.target.value})} required />
            <input placeholder="Qualifications" value={tForm.qualifications} onChange={e=>setTForm({...tForm, qualifications: e.target.value})} />
            <input placeholder="Subjects (comma)" value={tForm.subjects} onChange={e=>setTForm({...tForm, subjects: e.target.value})} />
            <button type="submit">{editingTeacherId ? 'Update' : 'Add Teacher'}</button>
          </form>

          <h3 style={{marginTop:20}}>Teachers</h3>
          <ul>
            {teachers.map(t => (
              <li key={t.id} style={{marginBottom:8}}>
                <strong>{t.fullName}</strong> ({t.username}) — {t.subjects}
                <button onClick={() => editTeacher(t.id)} style={{marginLeft:8}}>Edit</button>
                <button onClick={() => removeTeacher(t.id)} style={{marginLeft:8}}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        <div style={{flex:1}}>
          <h2>{editingStudentId ? 'Edit Student' : 'Add Student'}</h2>
          <form onSubmit={addOrUpdateStudent}>
            <input placeholder="Username" value={sForm.username} onChange={e=>setSForm({...sForm, username: e.target.value})} required />
            <input placeholder="Full Name" value={sForm.fullName} onChange={e=>setSForm({...sForm, fullName: e.target.value})} required />
            <input placeholder="Standard" value={sForm.standard} onChange={e=>setSForm({...sForm, standard: e.target.value})} />
            <input placeholder="Enrollment (year-roll)" value={sForm.enrollment} onChange={e=>setSForm({...sForm, enrollment: e.target.value})} />
            <input placeholder="Parent Contact" value={sForm.parentContact} onChange={e=>setSForm({...sForm, parentContact: e.target.value})} />
            <input placeholder="Address" value={sForm.address} onChange={e=>setSForm({...sForm, address: e.target.value})} />
            <button type="submit">{editingStudentId ? 'Update' : 'Add Student'}</button>
          </form>

          <h3 style={{marginTop:20}}>Students</h3>
          <ul>
            {students.map(s => (
              <li key={s.id} style={{marginBottom:8}}>
                <strong>{s.fullName}</strong> ({s.username}) — {s.standard}
                <button onClick={() => editStudent(s.id)} style={{marginLeft:8}}>Edit</button>
                <button onClick={() => removeStudent(s.id)} style={{marginLeft:8}}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section style={{marginTop:30}}>
        <h2>Logs (Mock)</h2>
        <div>
          <h3>Attendance records</h3>
          <pre style={{background:'#f7f7f7', padding:10}}>{JSON.stringify(logs.attendance || [], null, 2)}</pre>
        </div>
        <div>
          <h3>Performance records</h3>
          <pre style={{background:'#f7f7f7', padding:10}}>{JSON.stringify(logs.performance || [], null, 2)}</pre>
        </div>
      </section>
    </div>
  )
}
