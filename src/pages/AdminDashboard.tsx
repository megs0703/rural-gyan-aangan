import React from 'react'

export default function AdminDashboard() {
  return (
    <div style={{padding:20}}>
      <h1>Admin Dashboard (Placeholder)</h1>
      <section>
        <h2>Teacher Details</h2>
        <p>Username, Full Name, Qualifications, Subjects</p>
      </section>
      <section>
        <h2>Student Details</h2>
        <p>Username, Full Name, Standard, Enrollment (Year-Roll), Parent contact, Address</p>
      </section>
      <section>
        <h2>Logs</h2>
        <ul>
          <li>Teachers: live lectures count, leaves, assignments, reviews</li>
          <li>Students: attendance, performance, feedback, history</li>
        </ul>
      </section>
      <section>
        <h2>Profile</h2>
        <p>Admin profile management</p>
      </section>
    </div>
  )
}
