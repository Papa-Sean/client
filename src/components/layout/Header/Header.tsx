import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { MobileNav } from './MobileNav';

interface HeaderProps {
	isLoggedIn: boolean;
}

export function Header({ isLoggedIn }: HeaderProps) {
	return (
		<header className='relative bg-primary backdrop-blur-md mb-2'>
			{/* Decorative header line */}
			<div className='h-1 bg-gradient-to-r from-primary  to-secondary'></div>
			<div className='container mx-auto px-4 py-4 flex items-center justify-between'>
				<Logo />
				<Navigation isLoggedIn={isLoggedIn} />
				<MobileNav isLoggedIn={isLoggedIn} />
			</div>
		</header>
	);
}
