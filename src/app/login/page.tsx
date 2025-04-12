'use client';

import React from 'react';
import { LoginForm } from './components/LoginForm';

export default function LoginPage() {
	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='max-w-md mx-auto'>
				<div className='text-center mb-8'>
					<h1 className='text-3xl md:text-4xl font-bold mb-3'>
						Welcome Back
					</h1>
					<p className='text-muted-foreground'>
						Sign in to access your account and connect with the
						Detroit developer community
					</p>
				</div>

				<LoginForm />
			</div>
		</div>
	);
}
