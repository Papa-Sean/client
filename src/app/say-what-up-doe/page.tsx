'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
	CalendarIcon,
	MessageSquare,
	Pin,
	Trash2,
	CheckCircle,
	XCircle,
	MessageCircle,
} from 'lucide-react';
import { format } from 'date-fns';

// Dummy data representing posts/meetups
const dummyPosts = [
	{
		id: '1',
		title: 'Detroit JS Meetup - React Workshop',
		content:
			"Join us for a hands-on React workshop where we'll build a simple application from scratch. Beginners welcome!",
		eventDate: '2023-11-15T18:00:00',
		location: 'TechHub Detroit, 1570 Woodward Ave',
		author: {
			id: 'user1',
			name: 'Sarah Johnson',
			image: '/avatars/sarah.jpg',
		},
		isPinned: true,
		createdAt: '2023-10-20T14:30:00',
		comments: [
			{
				id: 'c1',
				content:
					'Looking forward to this! Will we need to bring our own laptops?',
				author: {
					id: 'user2',
					name: 'Michael Chen',
					image: '/avatars/michael.jpg',
				},
				createdAt: '2023-10-20T15:45:00',
			},
			{
				id: 'c2',
				content:
					"Yes, please bring your laptop with Node.js installed. We'll share more setup instructions closer to the date.",
				author: {
					id: 'user1',
					name: 'Sarah Johnson',
					image: '/avatars/sarah.jpg',
				},
				createdAt: '2023-10-20T16:30:00',
			},
		],
	},
	{
		id: '2',
		title: 'Michigan Tech Recruiting Fair',
		content:
			'Local tech companies will be present to discuss open positions. Great opportunity for networking and job hunting!',
		eventDate: '2023-11-20T10:00:00',
		location: 'Detroit Innovation Center, 1401 Michigan Ave',
		author: {
			id: 'user3',
			name: 'James Wilson',
			image: '/avatars/james.jpg',
		},
		isPinned: false,
		createdAt: '2023-10-18T09:15:00',
		comments: [
			{
				id: 'c3',
				content: 'Which companies will be represented at the fair?',
				author: {
					id: 'user4',
					name: 'Emily Rodriguez',
					image: '/avatars/emily.jpg',
				},
				createdAt: '2023-10-18T10:20:00',
			},
		],
	},
	{
		id: '3',
		title: 'Web Accessibility Workshop',
		content:
			"Learn how to make your websites more accessible for all users. We'll cover WCAG guidelines and practical implementation.",
		eventDate: '2023-11-25T14:00:00',
		location: 'Virtual - Zoom',
		author: {
			id: 'user5',
			name: 'Alex Thompson',
			image: '/avatars/alex.jpg',
		},
		isPinned: false,
		createdAt: '2023-10-15T11:00:00',
		comments: [],
	},
];

// Dummy data representing guest messages (for Admin view)
const dummyGuestMessages = [
	{
		id: 'g1',
		name: 'David Lee',
		email: 'david.lee@example.com',
		message:
			"I'm a frontend developer new to Detroit. How can I join your community?",
		createdAt: '2023-10-19T08:45:00',
		isResponded: false,
	},
	{
		id: 'g2',
		name: 'Jennifer Smith',
		email: 'jennifer.smith@example.com',
		message:
			'Would you be interested in a collaboration with our UX design group for an upcoming hackathon?',
		createdAt: '2023-10-17T15:20:00',
		isResponded: true,
	},
	{
		id: 'g3',
		name: 'Robert Garcia',
		email: 'robert.g@example.com',
		message:
			"I'm organizing a tech conference in Ann Arbor next spring. Would love to have some speakers from your community!",
		createdAt: '2023-10-16T09:10:00',
		isResponded: false,
	},
];

export default function SayWhatUpDoePage() {
	// Mock auth state - would be from auth context in production
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [posts, setPosts] = useState(dummyPosts);
	const [guestMessages, setGuestMessages] = useState(dummyGuestMessages);
	const [activeTab, setActiveTab] = useState('posts'); // 'posts' or 'messages' (Admin only)

	// For guest form
	const [guestForm, setGuestForm] = useState({
		name: '',
		email: '',
		message: '',
	});

	// For new post form (for authenticated users)
	const [newPostForm, setNewPostForm] = useState({
		title: '',
		content: '',
		eventDate: '',
		location: '',
	});
	const [showNewPostForm, setShowNewPostForm] = useState(false);

	// Toggle buttons for demo purposes
	const toggleLogin = () => {
		setIsLoggedIn(!isLoggedIn);
		if (!isLoggedIn) setIsAdmin(false);
	};

	const toggleAdmin = () => setIsAdmin(!isAdmin);

	// Guest form handlers
	const handleGuestFormChange = (e) => {
		const { name, value } = e.target;
		setGuestForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleGuestFormSubmit = (e) => {
		e.preventDefault();
		// In a real app, this would send the form data to the server
		alert(`Message submitted! We'll get back to you at ${guestForm.email}`);
		setGuestForm({ name: '', email: '', message: '' });
	};

	// New post form handlers
	const handleNewPostFormChange = (e) => {
		const { name, value } = e.target;
		setNewPostForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleNewPostSubmit = (e) => {
		e.preventDefault();
		// Add new post to the list (for demo purposes)
		const newPost = {
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
		setNewPostForm({ title: '', content: '', eventDate: '', location: '' });
		setShowNewPostForm(false);
	};

	// Pin/Unpin post (Admin only)
	const togglePinPost = (postId) => {
		setPosts(
			posts.map((post) =>
				post.id === postId
					? { ...post, isPinned: !post.isPinned }
					: post
			)
		);
	};

	// Delete post (Admin or post author)
	const deletePost = (postId) => {
		setPosts(posts.filter((post) => post.id !== postId));
	};

	// Mark guest message as responded (Admin only)
	const toggleResponseStatus = (messageId) => {
		setGuestMessages((messages) =>
			messages.map((msg) =>
				msg.id === messageId
					? { ...msg, isResponded: !msg.isResponded }
					: msg
			)
		);
	};

	// Add comment to a post
	const [newComment, setNewComment] = useState('');
	const [activeCommentPostId, setActiveCommentPostId] = useState(null);

	const handleCommentSubmit = (postId) => {
		if (!newComment.trim()) return;

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
	};

	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='flex flex-col md:flex-row justify-between items-center mb-8'>
				<h1 className='text-3xl md:text-4xl font-bold mb-4 md:mb-0'>
					Say What Up Doe
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
			</div>

			{/* Guest View */}
			{!isLoggedIn && (
				<div className='bg-card rounded-lg p-6 shadow-lg'>
					<h2 className='text-2xl font-bold mb-4'>
						Say Hello to the Community
					</h2>
					<p className='mb-6 text-muted-foreground'>
						Have a question or want to connect? Fill out this form
						to send a message to our admin team.
					</p>

					<form
						onSubmit={handleGuestFormSubmit}
						className='space-y-4'
					>
						<div>
							<label
								htmlFor='name'
								className='block font-medium mb-1'
							>
								Name
							</label>
							<input
								type='text'
								id='name'
								name='name'
								value={guestForm.name}
								onChange={handleGuestFormChange}
								className='w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none'
								required
							/>
						</div>

						<div>
							<label
								htmlFor='email'
								className='block font-medium mb-1'
							>
								Email
							</label>
							<input
								type='email'
								id='email'
								name='email'
								value={guestForm.email}
								onChange={handleGuestFormChange}
								className='w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none'
								required
							/>
						</div>

						<div>
							<label
								htmlFor='message'
								className='block font-medium mb-1'
							>
								Message
							</label>
							<textarea
								id='message'
								name='message'
								value={guestForm.message}
								onChange={handleGuestFormChange}
								rows={5}
								className='w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none'
								required
								maxLength={500}
							></textarea>
							<p className='text-sm text-muted-foreground mt-1'>
								{500 - guestForm.message.length} characters
								remaining
							</p>
						</div>

						<button
							type='submit'
							className='bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors'
						>
							Send Message
						</button>
					</form>
				</div>
			)}

			{/* Member & Admin Views */}
			{isLoggedIn && (
				<>
					{/* Admin Tabs */}
					{isAdmin && (
						<div className='flex border-b mb-6'>
							<button
								className={`px-4 py-2 ${
									activeTab === 'posts'
										? 'border-b-2 border-primary font-medium'
										: 'text-muted-foreground'
								}`}
								onClick={() => setActiveTab('posts')}
							>
								Community Posts
							</button>
							<button
								className={`px-4 py-2 ${
									activeTab === 'messages'
										? 'border-b-2 border-primary font-medium'
										: 'text-muted-foreground'
								}`}
								onClick={() => setActiveTab('messages')}
							>
								Guest Messages
							</button>
						</div>
					)}

					{/* Posts Section */}
					{activeTab === 'posts' && (
						<div>
							{/* "Create Post" button for authenticated users */}
							{!showNewPostForm ? (
								<button
									onClick={() => setShowNewPostForm(true)}
									className='bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors mb-6'
								>
									<MessageSquare size={18} />
									Create New Post
								</button>
							) : (
								<div className='bg-card rounded-lg p-6 shadow-lg mb-6'>
									<h2 className='text-xl font-bold mb-4'>
										Create New Post
									</h2>
									<form
										onSubmit={handleNewPostSubmit}
										className='space-y-4'
									>
										<div>
											<label
												htmlFor='title'
												className='block font-medium mb-1'
											>
												Title
											</label>
											<input
												type='text'
												id='title'
												name='title'
												value={newPostForm.title}
												onChange={
													handleNewPostFormChange
												}
												className='w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none'
												required
												maxLength={100}
											/>
										</div>

										<div>
											<label
												htmlFor='content'
												className='block font-medium mb-1'
											>
												Description
											</label>
											<textarea
												id='content'
												name='content'
												value={newPostForm.content}
												onChange={
													handleNewPostFormChange
												}
												rows={3}
												className='w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none'
												required
												maxLength={280}
											></textarea>
											<p className='text-sm text-muted-foreground mt-1'>
												{280 -
													newPostForm.content
														.length}{' '}
												characters remaining
											</p>
										</div>

										<div>
											<label
												htmlFor='eventDate'
												className='block font-medium mb-1'
											>
												Event Date & Time
											</label>
											<input
												type='datetime-local'
												id='eventDate'
												name='eventDate'
												value={newPostForm.eventDate}
												onChange={
													handleNewPostFormChange
												}
												className='w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none'
												required
											/>
										</div>

										<div>
											<label
												htmlFor='location'
												className='block font-medium mb-1'
											>
												Location
											</label>
											<input
												type='text'
												id='location'
												name='location'
												value={newPostForm.location}
												onChange={
													handleNewPostFormChange
												}
												className='w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none'
												required
											/>
										</div>

										<div className='flex gap-2'>
											<button
												type='submit'
												className='bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors'
											>
												Post
											</button>
											<button
												type='button'
												onClick={() =>
													setShowNewPostForm(false)
												}
												className='bg-muted px-4 py-2 rounded-md hover:bg-muted/80 transition-colors'
											>
												Cancel
											</button>
										</div>
									</form>
								</div>
							)}

							{/* Posts List */}
							<div className='space-y-6'>
								{/* Sort posts: pinned first, then by date */}
								{[...posts]
									.sort((a, b) => {
										if (a.isPinned && !b.isPinned)
											return -1;
										if (!a.isPinned && b.isPinned) return 1;
										return (
											new Date(b.createdAt) -
											new Date(a.createdAt)
										);
									})
									.map((post) => (
										<div
											key={post.id}
											className={`bg-card rounded-lg shadow-md overflow-hidden ${
												post.isPinned
													? 'border-l-4 border-primary'
													: ''
											}`}
										>
											<div className='p-6'>
												<div className='flex justify-between items-start'>
													<div className='flex gap-3 items-center mb-4'>
														<div className='w-10 h-10 rounded-full bg-muted flex items-center justify-center'>
															{post.author.name.charAt(
																0
															)}
														</div>
														<div>
															<h3 className='font-medium'>
																{
																	post.author
																		.name
																}
															</h3>
															<p className='text-sm text-muted-foreground'>
																{new Date(
																	post.createdAt
																).toLocaleDateString()}
															</p>
														</div>
													</div>

													{/* Admin actions */}
													{isAdmin && (
														<div className='flex gap-2'>
															<button
																onClick={() =>
																	togglePinPost(
																		post.id
																	)
																}
																className={`p-1 rounded-full hover:bg-muted/50 transition-colors ${
																	post.isPinned
																		? 'text-primary'
																		: 'text-muted-foreground'
																}`}
																title={
																	post.isPinned
																		? 'Unpin post'
																		: 'Pin post'
																}
															>
																<Pin
																	size={18}
																/>
															</button>
															<button
																onClick={() =>
																	deletePost(
																		post.id
																	)
																}
																className='p-1 rounded-full hover:bg-muted/50 transition-colors text-red-500'
																title='Delete post'
															>
																<Trash2
																	size={18}
																/>
															</button>
														</div>
													)}
												</div>

												<h2 className='text-xl font-bold mb-2'>
													{post.title}
												</h2>
												<p className='mb-4'>
													{post.content}
												</p>

												<div className='flex flex-col md:flex-row gap-4 mb-4 text-muted-foreground'>
													<div className='flex items-center gap-1'>
														<CalendarIcon
															size={16}
														/>
														<span>
															{format(
																new Date(
																	post.eventDate
																),
																"MMM d, yyyy 'at' h:mm a"
															)}
														</span>
													</div>
													<div>
														<span>
															📍 {post.location}
														</span>
													</div>
												</div>

												{/* Comments section */}
												<div className='mt-6 pt-4 border-t'>
													<h4 className='font-medium mb-2 flex items-center gap-1'>
														<MessageCircle
															size={16}
														/>
														Comments (
														{post.comments.length})
													</h4>

													{post.comments.length >
														0 && (
														<div className='space-y-4 mb-4'>
															{post.comments.map(
																(comment) => (
																	<div
																		key={
																			comment.id
																		}
																		className='bg-muted/30 p-3 rounded-md'
																	>
																		<div className='flex justify-between'>
																			<div className='flex items-center gap-2 mb-1'>
																				<div className='w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs'>
																					{comment.author.name.charAt(
																						0
																					)}
																				</div>
																				<span className='font-medium text-sm'>
																					{
																						comment
																							.author
																							.name
																					}
																				</span>
																			</div>
																			<span className='text-xs text-muted-foreground'>
																				{new Date(
																					comment.createdAt
																				).toLocaleDateString()}
																			</span>
																		</div>
																		<p className='text-sm'>
																			{
																				comment.content
																			}
																		</p>
																	</div>
																)
															)}
														</div>
													)}

													{/* Add comment form */}
													{activeCommentPostId ===
													post.id ? (
														<div className='mt-2'>
															<textarea
																value={
																	newComment
																}
																onChange={(e) =>
																	setNewComment(
																		e.target
																			.value
																	)
																}
																placeholder='Add your comment...'
																className='w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none text-sm'
																rows={2}
																maxLength={280}
															></textarea>
															<div className='flex justify-between mt-1'>
																<span className='text-xs text-muted-foreground'>
																	{280 -
																		newComment.length}{' '}
																	characters
																	remaining
																</span>
																<div className='flex gap-2'>
																	<button
																		onClick={() => {
																			setActiveCommentPostId(
																				null
																			);
																			setNewComment(
																				''
																			);
																		}}
																		className='px-3 py-1 text-sm rounded bg-muted hover:bg-muted/80 transition-colors'
																	>
																		Cancel
																	</button>
																	<button
																		onClick={() =>
																			handleCommentSubmit(
																				post.id
																			)
																		}
																		className='px-3 py-1 text-sm rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors'
																		disabled={
																			!newComment.trim()
																		}
																	>
																		Post
																	</button>
																</div>
															</div>
														</div>
													) : (
														<button
															onClick={() =>
																setActiveCommentPostId(
																	post.id
																)
															}
															className='text-sm text-primary font-medium hover:underline'
														>
															Add a comment...
														</button>
													)}
												</div>
											</div>
										</div>
									))}
							</div>
						</div>
					)}

					{/* Guest Messages Section (Admin Only) */}
					{isAdmin && activeTab === 'messages' && (
						<div className='bg-card rounded-lg p-6 shadow-lg'>
							<h2 className='text-xl font-bold mb-6'>
								Guest Messages
							</h2>

							{guestMessages.length === 0 ? (
								<p className='text-center text-muted-foreground py-8'>
									No guest messages to display.
								</p>
							) : (
								<div className='space-y-4'>
									{guestMessages.map((message) => (
										<div
											key={message.id}
											className='border rounded-md p-4 flex flex-col md:flex-row justify-between gap-4'
										>
											<div>
												<div className='flex items-center gap-2 mb-1'>
													<h3 className='font-medium'>
														{message.name}
													</h3>
													<span className='text-sm text-muted-foreground'>
														({message.email})
													</span>
												</div>
												<p className='mb-2'>
													{message.message}
												</p>
												<p className='text-sm text-muted-foreground'>
													Received:{' '}
													{new Date(
														message.createdAt
													).toLocaleString()}
												</p>
											</div>
											<div className='flex items-center gap-3'>
												<span
													className={`flex items-center gap-1 text-sm ${
														message.isResponded
															? 'text-green-500'
															: 'text-amber-500'
													}`}
												>
													{message.isResponded ? (
														<>
															<CheckCircle
																size={16}
															/>
															Responded
														</>
													) : (
														<>
															<XCircle
																size={16}
															/>
															Pending
														</>
													)}
												</span>
												<button
													onClick={() =>
														toggleResponseStatus(
															message.id
														)
													}
													className='px-3 py-1 text-sm rounded bg-muted hover:bg-muted/80 transition-colors'
												>
													Mark as{' '}
													{message.isResponded
														? 'Pending'
														: 'Responded'}
												</button>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					)}
				</>
			)}
		</div>
	);
}
