'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
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
	const [showPassword, setShowPassword] = useState(false);

	// Handle input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		// Clear error when user types
		if (errors[name]) {
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
	const handleSubmit = async (e) => {
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

	// Toggle password visibility
	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

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

				<div className='bg-card rounded-lg shadow-lg p-6 md:p-8'>
					{loginError && (
						<div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6'>
							{loginError}
						</div>
					)}

					<form
						onSubmit={handleSubmit}
						className='space-y-6'
					>
						<div>
							<label
								htmlFor='email'
								className='block font-medium mb-1'
							>
								Email Address
							</label>
							<input
								type='email'
								id='email'
								name='email'
								value={formData.email}
								onChange={handleChange}
								className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
									errors.email
										? 'border-red-500'
										: 'border-gray-300'
								}`}
								placeholder='you@example.com'
								disabled={isSubmitting}
							/>
							{errors.email && (
								<p className='mt-1 text-sm text-red-500'>
									{errors.email}
								</p>
							)}
						</div>

						<div>
							<div className='flex justify-between items-center mb-1'>
								<label
									htmlFor='password'
									className='block font-medium'
								>
									Password
								</label>
								<Link
									href='/forgot-password'
									className='text-sm text-primary hover:underline'
								>
									Forgot password?
								</Link>
							</div>
							<div className='relative'>
								<input
									type={showPassword ? 'text' : 'password'}
									id='password'
									name='password'
									value={formData.password}
									onChange={handleChange}
									className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
										errors.password
											? 'border-red-500'
											: 'border-gray-300'
									}`}
									placeholder='••••••••'
									disabled={isSubmitting}
								/>
								<button
									type='button'
									onClick={togglePasswordVisibility}
									className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
								>
									{showPassword ? (
										<EyeOff size={18} />
									) : (
										<Eye size={18} />
									)}
								</button>
							</div>
							{errors.password && (
								<p className='mt-1 text-sm text-red-500'>
									{errors.password}
								</p>
							)}
						</div>

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

					{/* Demo credentials info - remove in production */}
					<div className='mt-8 p-4 bg-muted/30 rounded-md text-sm'>
						<p className='font-medium mb-1'>Demo Credentials:</p>
						<p>
							<strong>Email:</strong> demo@wuddevdet.com
						</p>
						<p>
							<strong>Password:</strong> password
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
