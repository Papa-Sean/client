'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from './components/PageHeader';
import { GuestForm } from './components/GuestView/GuestForm';
import { AuthenticatedView } from './components/AuthenticatedView/AuthenticatedView';
import { dummyPosts, dummyGuestMessages } from './components/data';
import {
	Post,
	GuestMessage,
	GuestFormData,
	PostFormData,
} from './components/types';
import { cn } from '@/lib/utils';

export default function SayWhatUpDoePage() {
	// Auth state
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

	// Data state
	const [posts, setPosts] = useState<Post[]>(dummyPosts);
	const [guestMessages, setGuestMessages] =
		useState<GuestMessage[]>(dummyGuestMessages);

	// UI state
	const [activeTab, setActiveTab] = useState('posts');
	const [showNewPostForm, setShowNewPostForm] = useState(false);
	const [activeCommentPostId, setActiveCommentPostId] = useState<
		string | null
	>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [pageTheme, setPageTheme] = useState<
		'primary' | 'secondary' | 'accent'
	>('primary');

	// Form state
	const [guestForm, setGuestForm] = useState<GuestFormData>({
		name: '',
		email: '',
		message: '',
	});
	const [newPostForm, setNewPostForm] = useState<PostFormData>({
		title: '',
		content: '',
		eventDate: '',
		location: '',
	});
	const [newComment, setNewComment] = useState('');

	// Show loading indicator briefly
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 500);
		return () => clearTimeout(timer);
	}, []);

	// Toggle functions for demo purposes
	const toggleLogin = () => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoggedIn(!isLoggedIn);
			if (!isLoggedIn) setIsAdmin(false);
			// Change theme based on login status
			setPageTheme(isLoggedIn ? 'primary' : 'secondary');
			setIsLoading(false);
		}, 300);
	};

	const toggleAdmin = () => {
		setIsLoading(true);
		setTimeout(() => {
			setIsAdmin(!isAdmin);
			// Change theme based on admin status
			setPageTheme(isAdmin ? 'primary' : 'accent');
			setIsLoading(false);
		}, 300);
	};

	// Guest form handlers
	const handleGuestFormChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setGuestForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleGuestFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		// In a real app, this would send the form data to the server
		setTimeout(() => {
			alert(
				`Message submitted! We'll get back to you at ${guestForm.email}`
			);
			setGuestForm({ name: '', email: '', message: '' });
			setIsLoading(false);
		}, 500);
	};

	// New post form handlers
	const handleNewPostFormChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setNewPostForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleNewPostSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		setTimeout(() => {
			// Add new post to the list (for demo purposes)
			const newPost: Post = {
				id: `${posts.length + 1}`,
				...newPostForm,
				author: {
					id: 'currentUser',
					name: isAdmin ? 'Admin User' : 'Member User',
					image: '/avatars/default.jpg',
				},
				isPinned: false,
				createdAt: new Date().toISOString(),
				comments: [],
			};
			setPosts([newPost, ...posts]);
			setNewPostForm({
				title: '',
				content: '',
				eventDate: '',
				location: '',
			});
			setShowNewPostForm(false);
			setIsLoading(false);
		}, 300);
	};

	// Post management functions
	const togglePinPost = (postId: string) => {
		setPosts(
			posts.map((post) =>
				post.id === postId
					? { ...post, isPinned: !post.isPinned }
					: post
			)
		);
	};

	const deletePost = (postId: string) => {
		setIsLoading(true);
		setTimeout(() => {
			setPosts(posts.filter((post) => post.id !== postId));
			setIsLoading(false);
		}, 200);
	};

	// Message management functions
	const toggleResponseStatus = (messageId: string) => {
		setGuestMessages((messages) =>
			messages.map((msg) =>
				msg.id === messageId
					? { ...msg, isResponded: !msg.isResponded }
					: msg
			)
		);
	};

	// Comment functions
	const handleCommentSubmit = (postId: string) => {
		if (!newComment.trim()) return;

		setIsLoading(true);
		setTimeout(() => {
			const comment = {
				id: `c${Math.random().toString(36).substr(2, 9)}`,
				content: newComment,
				author: {
					id: 'currentUser',
					name: isAdmin ? 'Admin User' : 'Member User',
					image: '/avatars/default.jpg',
				},
				createdAt: new Date().toISOString(),
			};

			setPosts(
				posts.map((post) =>
					post.id === postId
						? { ...post, comments: [...post.comments, comment] }
						: post
				)
			);

			setNewComment('');
			setActiveCommentPostId(null);
			setIsLoading(false);
		}, 300);
	};

	// Determine background pattern based on theme
	const getThemePattern = () => {
		switch (pageTheme) {
			case 'secondary':
				return 'pattern-dots';
			case 'accent':
				return 'pattern-atomic';
			default:
				return 'pattern-chevron';
		}
	};

	return (
		<div
			className={cn(
				'min-h-screen transition-all duration-500',
				isLoading && 'opacity-70',
				pageTheme === 'primary' && 'bg-primary/5',
				pageTheme === 'secondary' && 'bg-secondary/5',
				pageTheme === 'accent' && 'bg-accent/5'
			)}
		>
			{/* Decorative background elements */}
			<div className='fixed inset-0 -z-10 overflow-hidden'>
				<div
					className={cn(
						'absolute inset-0 opacity-5',
						getThemePattern()
					)}
				></div>
				<div className='absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl'></div>
				<div className='absolute top-1/3 left-1/4 w-40 h-40 bg-secondary/20 rounded-full blur-2xl'></div>
				<div className='absolute bottom-1/4 right-10 w-80 h-40 bg-accent/20 rounded-full blur-3xl'></div>
			</div>

			<div className='container mx-auto px-4 py-8 relative z-10'>
				<div
					className={cn(
						'h-1 absolute top-0 left-0 right-0 transition-all duration-500',
						pageTheme === 'primary' && 'bg-primary',
						pageTheme === 'secondary' && 'bg-secondary',
						pageTheme === 'accent' && 'bg-accent'
					)}
				></div>

				<PageHeader
					isLoggedIn={isLoggedIn}
					isAdmin={isAdmin}
					toggleLogin={toggleLogin}
					toggleAdmin={toggleAdmin}
					theme={pageTheme}
				/>

				<div
					className={cn(
						'transition-all duration-500 transform',
						isLoading
							? 'translate-y-4 opacity-0'
							: 'translate-y-0 opacity-100'
					)}
				>
					{/* Render different views based on login state */}
					{!isLoggedIn ? (
						<GuestForm
							formData={guestForm}
							onChange={handleGuestFormChange}
							onSubmit={handleGuestFormSubmit}
							theme={pageTheme}
						/>
					) : (
						<AuthenticatedView
							isAdmin={isAdmin}
							posts={posts}
							guestMessages={guestMessages}
							activeTab={activeTab}
							showNewPostForm={showNewPostForm}
							newPostForm={newPostForm}
							activeCommentPostId={activeCommentPostId}
							newComment={newComment}
							setActiveTab={setActiveTab}
							setNewPostForm={setNewPostForm}
							setShowNewPostForm={setShowNewPostForm}
							setNewComment={setNewComment}
							setActiveCommentPostId={setActiveCommentPostId}
							handleNewPostFormChange={handleNewPostFormChange}
							handleNewPostSubmit={handleNewPostSubmit}
							handleCommentSubmit={handleCommentSubmit}
							togglePinPost={togglePinPost}
							deletePost={deletePost}
							toggleResponseStatus={toggleResponseStatus}
							theme={pageTheme}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
