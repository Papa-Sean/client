import Link from 'next/link';
import { Button } from '../../../components/ui/button';

interface NavigationProps {
	isLoggedIn: boolean;
}

export function Navigation({ isLoggedIn }: NavigationProps) {
	return (
		<nav className='hidden md:flex items-center gap-8'>
			<NavLink href='/'>Home</NavLink>
			<NavLink href='/portfolio'>Portfolio</NavLink>
			<NavLink href='/merch'>Merch</NavLink>
			<NavLink href='/say-what-up-doe'>Say What Up Doe</NavLink>

			{isLoggedIn ? (
				<Button
					variant='outline'
					className='rounded-full bg-secondary'
				>
					Log Out
				</Button>
			) : (
				<Button className='rounded-full bg-primary border border-secondary text-secondary'>Sign In</Button>
			)}
		</nav>
	);
}

interface NavLinkProps {
	href: string;
	children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
	return (
		<Link
			href={href}
			className='text-sm bg-primary border border-secondary text-secondary px-3 py-1 rounded-xl font-medium hover:text-accent hover:border-accent transition-colors relative group'
		>
			{children}
			<span className='absolute -bottom-2 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full'></span>
		</Link>
	);
}
