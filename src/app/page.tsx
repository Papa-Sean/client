'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function Home() {
	// Mock auth state - in production, this would come from an auth context/provider
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

	return (
		<div className='container mx-auto px-4 py-8'>
			{/* Hero Section */}
			<section className='py-16 md:py-24'>
				<div className='max-w-4xl mx-auto text-center'>
					<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6'>
						Welcome to{' '}
						<span className='text-primary'>wuddevdet.com</span>
						<br />
						Detroit&apos;s Web Dev Hub
					</h1>
					<p className='text-xl md:text-2xl text-muted-foreground mb-10'>
						Connect with Michigan developers, share events, and grow
						together.
					</p>

					{/* Role-based CTAs */}
					{!isLoggedIn ? (
						<Link
							href='/signup'
							className='rounded-full bg-primary text-primary-foreground px-6 py-3 text-lg font-medium hover:bg-primary/90 transition-colors'
						>
							Join the Community → Sign Up
						</Link>
					) : (
						<Link
							href='/say-what-up-doe'
							className='rounded-full bg-primary text-primary-foreground px-6 py-3 text-lg font-medium hover:bg-primary/90 transition-colors'
						>
							Check the latest events → Say What Up Doe
						</Link>
					)}
				</div>
			</section>

			{/* Interactive Map Section */}
			<section className='py-12 md:py-16'>
				<div className='max-w-4xl mx-auto'>
					<h2 className='text-2xl md:text-3xl font-bold mb-8 text-center'>
						Our Community in Southeast Michigan
					</h2>
					<div className='bg-muted rounded-lg aspect-video relative overflow-hidden'>
						{/* This would be replaced with an actual interactive map component */}
						<div className='absolute inset-0 flex items-center justify-center'>
							<p className='text-lg text-muted-foreground'>
								Interactive Detroit/Michigan Map
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Preview Cards Section */}
			<section className='py-12 md:py-16'>
				<div className='max-w-6xl mx-auto'>
					<h2 className='text-2xl md:text-3xl font-bold mb-8 text-center'>
						Explore What We Offer
					</h2>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{/* Portfolio Card */}
						<div className='bg-card rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105'>
							<div className='h-48 bg-primary/10 relative'>
								<div className='absolute inset-0 flex items-center justify-center'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='48'
										height='48'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
										className='text-primary'
									>
										<rect
											width='7'
											height='7'
											x='3'
											y='3'
											rx='1'
										/>
										<rect
											width='7'
											height='7'
											x='14'
											y='3'
											rx='1'
										/>
										<rect
											width='7'
											height='7'
											x='14'
											y='14'
											rx='1'
										/>
										<rect
											width='7'
											height='7'
											x='3'
											y='14'
											rx='1'
										/>
									</svg>
								</div>
							</div>
							<div className='p-6'>
								<h3 className='text-xl font-bold mb-2'>
									Portfolio
								</h3>
								<p className='text-muted-foreground mb-4'>
									Explore the works of talented developers in
									our community.
								</p>
								<Link
									href='/portfolio'
									className='text-primary font-medium hover:underline'
								>
									View Projects →
								</Link>
							</div>
						</div>

						{/* Merch Card */}
						<div className='bg-card rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105'>
							<div className='h-48 bg-primary/10 relative'>
								<div className='absolute inset-0 flex items-center justify-center'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='48'
										height='48'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
										className='text-primary'
									>
										<path d='M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z' />
									</svg>
								</div>
							</div>
							<div className='p-6'>
								<h3 className='text-xl font-bold mb-2'>
									Merch
								</h3>
								<p className='text-muted-foreground mb-4'>
									Show your Detroit dev pride with our branded
									apparel.
								</p>
								<Link
									href='/merch'
									className='text-primary font-medium hover:underline'
								>
									Shop Now →
								</Link>
							</div>
						</div>

						{/* Say What Up Doe Card */}
						<div className='bg-card rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105'>
							<div className='h-48 bg-primary/10 relative'>
								<div className='absolute inset-0 flex items-center justify-center'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='48'
										height='48'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
										className='text-primary'
									>
										<path d='M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z' />
										<path d='M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1' />
									</svg>
								</div>
							</div>
							<div className='p-6'>
								<h3 className='text-xl font-bold mb-2'>
									Say What Up Doe
								</h3>
								<p className='text-muted-foreground mb-4'>
									Connect with the community and participate
									in local events.
								</p>
								<Link
									href='/say-what-up-doe'
									className='text-primary font-medium hover:underline'
								>
									Join the Conversation →
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Community Stats Section */}
			<section className='py-12 md:py-16 bg-muted/30 rounded-lg my-12'>
				<div className='max-w-6xl mx-auto px-4'>
					<h2 className='text-2xl md:text-3xl font-bold mb-8 text-center'>
						Our Growing Community
					</h2>

					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center'>
						<div className='p-4'>
							<p className='text-4xl font-bold text-primary mb-2'>
								100+
							</p>
							<p className='text-muted-foreground'>
								Active Members
							</p>
						</div>
						<div className='p-4'>
							<p className='text-4xl font-bold text-primary mb-2'>
								25+
							</p>
							<p className='text-muted-foreground'>
								Weekly Events
							</p>
						</div>
						<div className='p-4'>
							<p className='text-4xl font-bold text-primary mb-2'>
								50+
							</p>
							<p className='text-muted-foreground'>
								Projects Showcased
							</p>
						</div>
						<div className='p-4'>
							<p className='text-4xl font-bold text-primary mb-2'>
								10+
							</p>
							<p className='text-muted-foreground'>
								Partner Companies
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
