import Link from 'next/link';
import { Plus } from 'lucide-react';
import { SearchBar } from './SearchBar';

interface PageHeaderProps {
	isLoggedIn: boolean;
	isAdmin: boolean;
	toggleLogin: () => void;
	toggleAdmin: () => void;
	searchQuery: string;
	setSearchQuery: (query: string) => void;
}

export function PageHeader({
	isLoggedIn,
	isAdmin,
	toggleLogin,
	toggleAdmin,
	searchQuery,
	setSearchQuery,
}: PageHeaderProps) {
	return (
		<div className='flex flex-col md:flex-row justify-between items-center mb-8'>
			<h1 className='text-3xl md:text-4xl font-bold mb-4 md:mb-0'>
				Developer Portfolio
			</h1>

			{/* Demo toggles - remove in production */}
			<div className='flex gap-4 mb-4 md:mb-0 p-2 border rounded-md bg-muted/20'>
				<button
					onClick={toggleLogin}
					className={`px-3 py-1 rounded ${
						isLoggedIn ? 'bg-green-500 text-white' : 'bg-gray-200'
					}`}
				>
					{isLoggedIn ? 'Logged In' : 'Guest'}
				</button>
				<button
					onClick={toggleAdmin}
					className={`px-3 py-1 rounded ${
						isAdmin ? 'bg-purple-500 text-white' : 'bg-gray-200'
					}`}
					disabled={!isLoggedIn}
				>
					{isAdmin ? 'Admin' : 'Member'}
				</button>
			</div>

			<div className='flex gap-4 items-center'>
				<SearchBar
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
				/>

				{isAdmin && (
					<Link
						href='/portfolio/new'
						className='flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors'
					>
						<Plus size={16} />
						<span>Add Project</span>
					</Link>
				)}
			</div>
		</div>
	);
}
