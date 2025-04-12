import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormInput } from './FormInput';
import { PasswordInput } from './PasswordInput';
import { ErrorAlert } from './ErrorAlert';
import { DemoCredentials } from './DemoCredentials';

export function LoginForm() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState({
		email: '',
		password: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [loginError, setLoginError] = useState('');

	// Handle input changes
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		// Clear error when user types
		if (errors[name as keyof typeof errors]) {
			setErrors((prev) => ({ ...prev, [name]: '' }));
		}
		// Clear general login error when user makes changes
		if (loginError) {
			setLoginError('');
		}
	};

	// Validate form
	const validateForm = () => {
		const newErrors = {
			email: '',
			password: '',
		};
		let isValid = true;

		// Email validation
		if (!formData.email) {
			newErrors.email = 'Email is required';
			isValid = false;
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Email is invalid';
			isValid = false;
		}

		// Password validation
		if (!formData.password) {
			newErrors.password = 'Password is required';
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsSubmitting(true);
		setLoginError('');

		try {
			// This would be an actual API call in production
			// Simulating API call with timeout
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Simulate successful login for demo
			if (
				formData.email === 'demo@wuddevdet.com' &&
				formData.password === 'password'
			) {
				console.log('Login successful');
				// Redirect to home page after successful login
				router.push('/');
			} else {
				// Demo validation error
				setLoginError('Invalid email or password');
			}
		} catch (error) {
			console.error('Login error:', error);
			setLoginError('An error occurred during login. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='bg-card rounded-lg shadow-lg p-6 md:p-8'>
			<ErrorAlert message={loginError} />

			<form
				onSubmit={handleSubmit}
				className='space-y-6'
			>
				<FormInput
					id='email'
					name='email'
					label='Email Address'
					type='email'
					value={formData.email}
					error={errors.email}
					placeholder='you@example.com'
					disabled={isSubmitting}
					onChange={handleChange}
				/>

				<PasswordInput
					value={formData.password}
					error={errors.password}
					disabled={isSubmitting}
					onChange={handleChange}
				/>

				<button
					type='submit'
					className='w-full bg-primary text-primary-foreground px-4 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
					disabled={isSubmitting}
				>
					{isSubmitting ? 'Signing In...' : 'Sign In'}
				</button>
			</form>

			<div className='mt-6 text-center'>
				<p className='text-muted-foreground'>
					Don't have an account?{' '}
					<Link
						href='/signup'
						className='text-primary hover:underline font-medium'
					>
						Sign Up
					</Link>
				</p>
			</div>

			<DemoCredentials />
		</div>
	);
}
