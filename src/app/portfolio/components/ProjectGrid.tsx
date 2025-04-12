import { Project } from './types';
import { ProjectCard } from './ProjectCard';
import { EmptyState } from './EmptyState';

interface ProjectGridProps {
	projects: Project[];
	isAdmin: boolean;
	onDelete: (id: string) => void;
}

export function ProjectGrid({ projects, isAdmin, onDelete }: ProjectGridProps) {
	if (projects.length === 0) {
		return <EmptyState />;
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
			{projects.map((project) => (
				<ProjectCard
					key={project.id}
					project={project}
					isAdmin={isAdmin}
					onDelete={onDelete}
				/>
			))}
		</div>
	);
}
