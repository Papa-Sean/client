export interface Author {
	id?: string;
	_id?: string;
	name: string;
	image?: string;
	profilePic?: string;
}

export interface Comment {
	id: string;
	content: string;
	author: Author;
	createdAt: string;
}

export interface Post {
	id?: string;
	_id?: string;
	title: string;
	content: string;
	author: {
		_id?: string;
		id?: string;
		name: string;
		profilePic?: string;
	};
	eventDate?: string;
	location?: string;
	isPinned?: boolean;
	comments: Comment[];
	createdAt: string;
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
