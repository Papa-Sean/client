export interface Author {
	id: string;
	name: string;
	image: string;
}

export interface Comment {
	id: string;
	content: string;
	author: Author;
	createdAt: string;
}

export interface Post {
	id: string;
	title: string;
	content: string;
	eventDate: string;
	location: string;
	author: Author;
	isPinned: boolean;
	createdAt: string;
	comments: Comment[];
}

export interface GuestMessage {
	id: string;
	name: string;
	email: string;
	message: string;
	createdAt: string;
	isResponded: boolean;
}

export interface GuestFormData {
	name: string;
	email: string;
	message: string;
}

export interface PostFormData {
	title: string;
	content: string;
	eventDate: string;
	location: string;
}
