import { useNavigate, useSearch } from '@tanstack/react-router'
import { useState } from 'react'

import { useAuthStore } from '@/platform/auth/store'

export function LoginPageComponent() {
	const [name, setName] = useState('')
	const { redirect } = useSearch({ from: '/login' })
	const login = useAuthStore(state => state.login)

	const navigate = useNavigate()

	const handleLogin = () => {
		login({ name })
		navigate({ to: redirect || '/' })
	}

	return (
		<div className="p-8">
			<h1>Login Page</h1>
			<input
				type="text"
				placeholder="Enter name"
				value={name}
				onChange={e => setName(e.target.value)}
				className="border p-2"
			/>
			<button
				onClick={handleLogin}
				className="ml-2 px-4 py-2 bg-blue-600 text-white"
			>
				Login
			</button>
		</div>
	)
}
