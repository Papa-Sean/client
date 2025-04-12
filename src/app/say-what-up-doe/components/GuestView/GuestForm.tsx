import React from 'react';
import { GuestFormData } from '../types';
import { cn } from '@/lib/utils';

interface GuestFormProps {
	formData: GuestFormData;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	onSubmit: (e: React.FormEvent) => void;
	theme: 'primary' | 'secondary' | 'accent';
}

export function GuestForm({
	formData,
	onChange,
	onSubmit,
	theme,
}: GuestFormProps) {
	return (
		<div className='max-w-2xl mx-auto transition-all duration-500'>
			<div
				className={cn(
					'bg-card rounded-tr-lg rounded-br-lg shadow-lg overflow-hidden transition-all duration-500',
					'border-l-4',
					theme === 'primary' && 'border-primary',
					theme === 'secondary' && 'border-secondary',
					theme === 'accent' && 'border-accent'
				)}
			>
				<div className='p-6 md:p-8'>
					<h2 className='text-2xl font-bold mb-2'>
						Say Hello to the Community
					</h2>
					<p className='mb-6 text-muted-foreground'>
						Have a question or want to connect? Fill out this form
						to send a message to our admin team.
					</p>

					<form
						onSubmit={onSubmit}
						className='space-y-6'
					>
						<div>
							<label
								htmlFor='name'
								className='block font-medium mb-1'
							>
								Name
							</label>
							<input
								type='text'
								id='name'
								name='name'
								value={formData.name}
								onChange={onChange}
								className={cn(
									'w-full px-4 py-3 border rounded-md transition-all',
									'focus:outline-none focus:ring-2',
									theme === 'primary' &&
										'focus:ring-primary/50 focus:border-primary',
									theme === 'secondary' &&
										'focus:ring-secondary/50 focus:border-secondary',
									theme === 'accent' &&
										'focus:ring-accent/50 focus:border-accent'
								)}
								required
							/>
						</div>

						<div>
							<label
								htmlFor='email'
								className='block font-medium mb-1'
							>
								Email
							</label>
							<input
								type='email'
								id='email'
								name='email'
								value={formData.email}
								onChange={onChange}
								className={cn(
									'w-full px-4 py-3 border rounded-md transition-all',
									'focus:outline-none focus:ring-2',
									theme === 'primary' &&
										'focus:ring-primary/50 focus:border-primary',
									theme === 'secondary' &&
										'focus:ring-secondary/50 focus:border-secondary',
									theme === 'accent' &&
										'focus:ring-accent/50 focus:border-accent'
								)}
								required
							/>
						</div>

						<div>
							<label
								htmlFor='message'
								className='block font-medium mb-1'
							>
								Message
							</label>
							<textarea
								id='message'
								name='message'
								value={formData.message}
								onChange={onChange}
								rows={5}
								className={cn(
									'w-full px-4 py-3 border rounded-md transition-all',
									'focus:outline-none focus:ring-2',
									theme === 'primary' &&
										'focus:ring-primary/50 focus:border-primary',
									theme === 'secondary' &&
										'focus:ring-secondary/50 focus:border-secondary',
									theme === 'accent' &&
										'focus:ring-accent/50 focus:border-accent'
								)}
								required
							></textarea>
							<p className='text-sm text-muted-foreground mt-1'>
								{500 - formData.message.length} characters
								remaining
							</p>
						</div>

						<button
							type='submit'
							className={cn(
								'w-full px-6 py-3 rounded-md font-medium text-primary-foreground transition-colors',
								theme === 'primary' &&
									'bg-primary hover:bg-primary/90',
								theme === 'secondary' &&
									'bg-secondary hover:bg-secondary/90',
								theme === 'accent' &&
									'bg-accent hover:bg-accent/90'
							)}
						>
							Send Message
						</button>
					</form>
				</div>
			</div>

			<div className='mt-12 flex justify-center items-center gap-2'>
				<div
					className={cn(
						'w-20 h-1 rounded',
						theme === 'primary' && 'bg-primary',
						theme === 'secondary' && 'bg-secondary',
						theme === 'accent' && 'bg-accent'
					)}
				></div>
				<div
					className={cn(
						'w-3 h-3 rounded-full',
						theme === 'primary' && 'bg-primary',
						theme === 'secondary' && 'bg-secondary',
						theme === 'accent' && 'bg-accent'
					)}
				></div>
				<div
					className={cn(
						'w-10 h-1 rounded',
						theme === 'primary' && 'bg-primary',
						theme === 'secondary' && 'bg-secondary',
						theme === 'accent' && 'bg-accent'
					)}
				></div>
			</div>
		</div>
	);
}
