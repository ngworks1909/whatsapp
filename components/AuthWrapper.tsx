import React from 'react'
import Field from './Field'

export default function AuthWrapper({type}: {type: "Login" | "Signup"}) {
  return (
    <>
      {type === "Signup" && <Field type='text' id='username' placeholder='Enter username' label='Username' />}
      <Field type='email' id='email' placeholder='Enter email' label='Email' />
      <Field type='password' id='password' placeholder='Enter password' label='Password' />
      {type === "Signup" && <Field type='text' id='mobile' placeholder='Enter mobile number' label='Mobile' />}
    </>
  )
}
