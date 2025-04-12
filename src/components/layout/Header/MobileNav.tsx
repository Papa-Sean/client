import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetTrigger,
} from '../../../components/ui/sheet';

interface MobileNavProps {
	isLoggedIn: boolean;
}

export function MobileNav({ isLoggedIn }: MobileNavProps) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant='ghost'
					size='sm'
					className='md:hidden'
				>
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<div className='flex flex-col gap-6 mt-10'>
					<Link
						href='/'
						className='text-lg font-medium hover:text-primary transition-colors'
					>
						Home
					</Link>
					<Link
						href='/portfolio'
						className='text-lg font-medium hover:text-primary transition-colors'
					>
						Portfolio
					</Link>
					<Link
						href='/merch'
						className='text-lg font-medium hover:text-primary transition-colors'
					>
						Merch
					</Link>
					<Link
						href='/say-what-up-doe'
						className='text-lg font-medium hover:text-primary transition-colors'
					>
						Say What Up Doe
					</Link>
					{isLoggedIn ? (
						<Button
							variant='outline'
							className='rounded-full'
						>
							Log Out
						</Button>
					) : (
						<Button className='rounded-full'>Sign In</Button>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
}
