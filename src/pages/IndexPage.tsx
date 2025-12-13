import React from 'react'
import LanguageToggle from '@/components/ui/LanguageToggle'
import { getTeacherCount, getStudentCount } from '@/lib/stats'

export default function IndexPage(){
  const [teachers] = React.useState(() => getTeacherCount())
  const [students] = React.useState(() => getStudentCount())
  return (
    <div style={{padding:20}}>
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1>Rural Gyan Aangan</h1>
        <LanguageToggle />
      </header>
      <section style={{marginTop:20}}>
        <h2>Roles Overview</h2>
        <div style={{display:'flex', gap:12}}>
          <div style={{border:'1px solid #eee', padding:12}}>
            <h3>Teachers</h3>
            <p>{teachers} registered</p>
          </div>
          <div style={{border:'1px solid #eee', padding:12}}>
            <h3>Students</h3>
            <p>{students} registered</p>
          </div>
        </div>
      </section>
    </div>
  )
}
