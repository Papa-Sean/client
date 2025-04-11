'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Share2, Edit, Trash2, Plus } from 'lucide-react';

// Dummy data representing portfolio projects
const dummyProjects = [
	{
		id: '1',
		title: 'Detroit City Explorer',
		description:
			'An interactive map application showcasing Detroit neighborhoods and local points of interest.',
		techStack: ['React', 'MapboxGL', 'Node.js', 'Express'],
		prototypeUrl: 'https://example.com/detroit-explorer',
		image: '/portfolio/project1.jpg',
		creator: 'Admin',
	},
	{
		id: '2',
		title: 'Michigan Tech Connect',
		description:
			'Platform connecting tech professionals across Michigan for mentorship and collaboration opportunities.',
		techStack: ['Next.js', 'Firebase', 'Tailwind CSS'],
		prototypeUrl: 'https://example.com/mi-tech-connect',
		image: '/portfolio/project2.jpg',
		creator: 'Admin',
	},
	{
		id: '3',
		title: 'Automotive Industry Dashboard',
		description:
			'Real-time analytics dashboard for monitoring automotive manufacturing metrics in Michigan.',
		techStack: ['Vue.js', 'D3.js', 'GraphQL', 'MongoDB'],
		prototypeUrl: 'https://example.com/auto-dashboard',
		image: '/portfolio/project3.jpg',
		creator: 'Admin',
	},
	{
		id: '4',
		title: 'Local Event Finder',
		description:
			'Mobile app for discovering tech meetups and workshops happening in Southeast Michigan.',
		techStack: [
			'React Native',
			'TypeScript',
			'Firebase',
			'Google Maps API',
		],
		prototypeUrl: 'https://example.com/event-finder',
		image: '/portfolio/project4.jpg',
		creator: 'Admin',
	},
	{
		id: '5',
		title: 'Coding Bootcamp Portal',
		description:
			'Educational platform showcasing Detroit-based coding bootcamps and learning resources.',
		techStack: ['Angular', 'Bootstrap', 'Node.js', 'PostgreSQL'],
		prototypeUrl: 'https://example.com/bootcamp-portal',
		image: '/portfolio/project5.jpg',
		creator: 'Admin',
	},
	{
		id: '6',
		title: 'Weather Alert System',
		description:
			'Weather monitoring application with real-time alerts for Michigan residents.',
		techStack: ['React', 'Redux', 'Weather API', 'Socket.io'],
		prototypeUrl: 'https://example.com/mi-weather',
		image: '/portfolio/project6.jpg',
		creator: 'Admin',
	},
];

export default function PortfolioPage() {
	// Mock auth state - would be from auth context in production
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [projects, setProjects] = useState(dummyProjects);
	const [searchQuery, setSearchQuery] = useState('');

	// Toggle buttons for demo purposes
	const toggleLogin = () => setIsLoggedIn(!isLoggedIn);
	const toggleAdmin = () => setIsAdmin(!isAdmin);

	// Filter projects based on search query
	const filteredProjects = projects.filter(
		(project) =>
			project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			project.description
				.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
			project.techStack.some((tech) =>
				tech.toLowerCase().includes(searchQuery.toLowerCase())
			)
	);

	// Mock delete function
	const deleteProject = (id) => {
		setProjects(projects.filter((project) => project.id !== id));
	};

	// Mock placeholder images when real images aren't available
	const getProjectImage = (path) => {
		// For demo purposes, use colored backgrounds
		const colors = [
			'bg-blue-100',
			'bg-green-100',
			'bg-purple-100',
			'bg-amber-100',
			'bg-pink-100',
			'bg-cyan-100',
		];
		const index = parseInt(path.split('project')[1].split('.')[0]) - 1;
		return colors[index % colors.length];
	};

	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='flex flex-col md:flex-row justify-between items-center mb-8'>
				<h1 className='text-3xl md:text-4xl font-bold mb-4 md:mb-0'>
					Developer Portfolio
				</h1>

				{/* Demo toggles - remove in production */}
				<div className='flex gap-4 mb-4 md:mb-0 p-2 border rounded-md bg-muted/20'>
					<button
						onClick={toggleLogin}
						className={`px-3 py-1 rounded ${
							isLoggedIn
								? 'bg-green-500 text-white'
								: 'bg-gray-200'
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
					<input
						type='text'
						placeholder='Search projects...'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className='px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none'
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

			{filteredProjects.length === 0 ? (
				<div className='text-center py-12'>
					<h2 className='text-2xl font-medium text-muted-foreground'>
						No projects found
					</h2>
					<p className='mt-2'>
						Try adjusting your search or check back later.
					</p>
				</div>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{filteredProjects.map((project) => (
						<div
							key={project.id}
							className='bg-card rounded-lg overflow-hidden shadow-lg transition-transform hover:shadow-xl'
						>
							{/* Project image */}
							<div
								className={`h-48 relative ${getProjectImage(
									project.image
								)}`}
							>
								<div className='absolute inset-0 flex items-center justify-center'>
									<p className='text-xl font-bold'>
										{project.title.charAt(0)}
									</p>
								</div>
							</div>

							{/* Project content */}
							<div className='p-6'>
								<div className='flex justify-between items-start mb-4'>
									<h2 className='text-xl font-bold'>
										{project.title}
									</h2>

									{/* Action buttons */}
									<div className='flex space-x-2'>
										{/* Share button - always visible */}
										<button
											className='p-1 rounded-full hover:bg-muted/50 transition-colors'
											title='Share project'
										>
											<Share2 size={18} />
										</button>

										{/* Admin-only buttons */}
										{isAdmin && (
											<>
												<Link
													href={`/portfolio/edit/${project.id}`}
													className='p-1 rounded-full hover:bg-muted/50 transition-colors'
													title='Edit project'
												>
													<Edit size={18} />
												</Link>
												<button
													onClick={() =>
														deleteProject(
															project.id
														)
													}
													className='p-1 rounded-full hover:bg-muted/50 transition-colors text-red-500'
													title='Delete project'
												>
													<Trash2 size={18} />
												</button>
											</>
										)}
									</div>
								</div>

								<p className='text-muted-foreground mb-4'>
									{project.description}
								</p>

								<div className='mb-4'>
									<h3 className='font-semibold mb-2'>
										Tech Stack:
									</h3>
									<div className='flex flex-wrap gap-2'>
										{project.techStack.map((tech) => (
											<span
												key={tech}
												className='bg-muted px-2 py-1 rounded-md text-sm'
											>
												{tech}
											</span>
										))}
									</div>
								</div>

								<a
									href={project.prototypeUrl}
									target='_blank'
									rel='noopener noreferrer'
									className='text-primary font-medium hover:underline inline-block mt-2'
								>
									View Prototype
								</a>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
