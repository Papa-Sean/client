'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';

// Michigan city options for the dropdown
const michiganCities = [
	'Detroit',
	'Grand Rapids',
	'Ann Arbor',
	'Lansing',
	'Flint',
	'Dearborn',
	'Troy',
	'Farmington Hills',
	'Warren',
	'Livonia',
	'Sterling Heights',
	'Royal Oak',
	'Southfield',
	'Novi',
	'Other',
];

export default function SignupPage() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		location: '',
	});

	const [errors, setErrors] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		location: '',
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [signupError, setSignupError] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	// Handle input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Clear error when user types
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: '' }));
		}

		// Clear general signup error when user makes changes
		if (signupError) {
			setSignupError('');
		}
	};

	// Validate form
	const validateForm = () => {
		const newErrors = {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			location: '',
		};
		let isValid = true;

		// Name validation
		if (!formData.name.trim()) {
			newErrors.name = 'Name is required';
			isValid = false;
		}

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
		} else if (formData.password.length < 8) {
			newErrors.password = 'Password must be at least 8 characters';
			isValid = false;
		}

		// Confirm password validation
		if (!formData.confirmPassword) {
			newErrors.confirmPassword = 'Please confirm your password';
			isValid = false;
		} else if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match';
			isValid = false;
		}

		// Location validation
		if (!formData.location) {
			newErrors.location = 'Please select your location';
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
		setSignupError('');

		try {
			// This would be an actual API call in production
			// Simulating API call with timeout
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Simulate successful signup for demo
			console.log('Signup successful with data:', formData);

			// Redirect to home page or login after successful signup
			router.push('/login');
		} catch (error) {
			console.error('Signup error:', error);
			setSignupError(
				'An error occurred during signup. Please try again.'
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Password visibility toggles
	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword((prev) => !prev);
	};

	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='max-w-md mx-auto'>
				<div className='text-center mb-8'>
					<h1 className='text-3xl md:text-4xl font-bold mb-3'>
						Join Our Community
					</h1>
					<p className='text-muted-foreground'>
						Create an account to connect with Detroit-area
						developers
					</p>
				</div>

				<div className='bg-card rounded-lg shadow-lg p-6 md:p-8'>
					{signupError && (
						<div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6'>
							{signupError}
						</div>
					)}

					<form
						onSubmit={handleSubmit}
						className='space-y-5'
					>
						<div>
							<label
								htmlFor='name'
								className='block font-medium mb-1'
							>
								Full Name
							</label>
							<input
								type='text'
								id='name'
								name='name'
								value={formData.name}
								onChange={handleChange}
								className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
									errors.name
										? 'border-red-500'
										: 'border-gray-300'
								}`}
								placeholder='John Doe'
								disabled={isSubmitting}
							/>
							{errors.name && (
								<p className='mt-1 text-sm text-red-500'>
									{errors.name}
								</p>
							)}
						</div>

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
							<label
								htmlFor='password'
								className='block font-medium mb-1'
							>
								Password
							</label>
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

						<div>
							<label
								htmlFor='confirmPassword'
								className='block font-medium mb-1'
							>
								Confirm Password
							</label>
							<div className='relative'>
								<input
									type={
										showConfirmPassword
											? 'text'
											: 'password'
									}
									id='confirmPassword'
									name='confirmPassword'
									value={formData.confirmPassword}
									onChange={handleChange}
									className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
										errors.confirmPassword
											? 'border-red-500'
											: 'border-gray-300'
									}`}
									placeholder='••••••••'
									disabled={isSubmitting}
								/>
								<button
									type='button'
									onClick={toggleConfirmPasswordVisibility}
									className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
								>
									{showConfirmPassword ? (
										<EyeOff size={18} />
									) : (
										<Eye size={18} />
									)}
								</button>
							</div>
							{errors.confirmPassword && (
								<p className='mt-1 text-sm text-red-500'>
									{errors.confirmPassword}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor='location'
								className='block font-medium mb-1'
							>
								Your Location
							</label>
							<select
								id='location'
								name='location'
								value={formData.location}
								onChange={handleChange}
								className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
									errors.location
										? 'border-red-500'
										: 'border-gray-300'
								}`}
								disabled={isSubmitting}
							>
								<option value=''>Select your city</option>
								{michiganCities.map((city) => (
									<option
										key={city}
										value={city}
									>
										{city}
									</option>
								))}
							</select>
							{errors.location && (
								<p className='mt-1 text-sm text-red-500'>
									{errors.location}
								</p>
							)}
							<p className='mt-1 text-sm text-muted-foreground flex items-center'>
								<CheckCircle
									size={14}
									className='inline mr-1'
								/>
								Michigan-focused community
							</p>
						</div>

						<button
							type='submit'
							className='w-full bg-primary text-primary-foreground px-4 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6'
							disabled={isSubmitting}
						>
							{isSubmitting
								? 'Creating Account...'
								: 'Create Account'}
						</button>
					</form>

					<div className='mt-6 text-center'>
						<p className='text-muted-foreground'>
							Already have an account?{' '}
							<Link
								href='/login'
								className='text-primary hover:underline font-medium'
							>
								Sign In
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
