'use client';

import { useState } from 'react';
import { dummyProjects } from './components/data';
import { PageHeader } from './components/PageHeader';
import { ProjectGrid } from './components/ProjectGrid';

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
	const deleteProject = (id: string) => {
		setProjects(projects.filter((project) => project.id !== id));
	};

	return (
		<div className='container mx-auto px-4 py-8'>
			<PageHeader
				isLoggedIn={isLoggedIn}
				isAdmin={isAdmin}
				toggleLogin={toggleLogin}
				toggleAdmin={toggleAdmin}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
			/>

			<ProjectGrid
				projects={filteredProjects}
				isAdmin={isAdmin}
				onDelete={deleteProject}
			/>
		</div>
	);
}
