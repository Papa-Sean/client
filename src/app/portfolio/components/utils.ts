// Helper functions for the portfolio page

/**
 * Generates a background color class for project cards when no images are available
 */
export const getProjectImage = (path: string): string => {
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
