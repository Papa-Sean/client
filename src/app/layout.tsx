import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: "wuddevdet | Detroit's Web Dev Hub",
	description:
		'Connect with Michigan developers, share events, and grow together.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// Mock auth state - replace with actual auth logic later
	const isLoggedIn = false;
	const isAdmin = false;

	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
			>
				<header className='sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm'>
					<div className='container mx-auto px-4 py-3 flex items-center justify-between'>
						<Link
							href='/'
							className='font-bold text-xl tracking-tight'
						>
							wuddevdet
						</Link>

						<nav className='hidden md:flex items-center gap-6'>
							<Link
								href='/'
								className='text-sm font-medium hover:text-primary transition-colors'
							>
								Home
							</Link>
							<Link
								href='/portfolio'
								className='text-sm font-medium hover:text-primary transition-colors'
							>
								Portfolio
							</Link>
							<Link
								href='/merch'
								className='text-sm font-medium hover:text-primary transition-colors'
							>
								Merch
							</Link>
							<Link
								href='/say-what-up-doe'
								className='text-sm font-medium hover:text-primary transition-colors'
							>
								Say What Up Doe
							</Link>

							{isLoggedIn ? (
								<button className='rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium hover:bg-muted transition-colors'>
									Log Out
								</button>
							) : (
								<Link
									href='/login'
									className='rounded-full bg-primary text-primary-foreground px-4 py-1.5 text-sm font-medium hover:bg-primary/90 transition-colors'
								>
									Sign In
								</Link>
							)}
						</nav>

						<button
							className='md:hidden'
							aria-label='Toggle menu'
						>
							{/* Mobile menu icon */}
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<line
									x1='4'
									x2='20'
									y1='12'
									y2='12'
								></line>
								<line
									x1='4'
									x2='20'
									y1='6'
									y2='6'
								></line>
								<line
									x1='4'
									x2='20'
									y1='18'
									y2='18'
								></line>
							</svg>
						</button>
					</div>
				</header>

				<main className='flex-1'>{children}</main>

				<footer className='bg-secondary/10 py-8'>
					<div className='container mx-auto px-4'>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
							<div>
								<h3 className='font-bold mb-4'>wuddevdet</h3>
								<p className='text-sm text-muted-foreground'>
									Detroit's web development community hub.
								</p>
							</div>

							<div>
								<h3 className='font-bold mb-4'>Links</h3>
								<ul className='space-y-2 text-sm'>
									<li>
										<Link
											href='/'
											className='hover:underline'
										>
											Home
										</Link>
									</li>
									<li>
										<Link
											href='/portfolio'
											className='hover:underline'
										>
											Portfolio
										</Link>
									</li>
									<li>
										<Link
											href='/merch'
											className='hover:underline'
										>
											Merch
										</Link>
									</li>
									<li>
										<Link
											href='/say-what-up-doe'
											className='hover:underline'
										>
											Say What Up Doe
										</Link>
									</li>
								</ul>
							</div>

							<div>
								<h3 className='font-bold mb-4'>Connect</h3>
								<ul className='space-y-2 text-sm'>
									<li>
										<a
											href='#'
											className='hover:underline'
										>
											Twitter
										</a>
									</li>
									<li>
										<a
											href='#'
											className='hover:underline'
										>
											GitHub
										</a>
									</li>
									<li>
										<a
											href='#'
											className='hover:underline'
										>
											LinkedIn
										</a>
									</li>
								</ul>
							</div>
						</div>

						<div className='mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground'>
							&copy; {new Date().getFullYear()} wuddevdet. All
							rights reserved.
						</div>
					</div>
				</footer>
			</body>
		</html>
	);
}
