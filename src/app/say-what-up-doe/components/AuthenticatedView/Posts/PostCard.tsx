import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Pin, Trash2 } from 'lucide-react';
import { Post } from '../../types';
import { CommentSection } from './CommentSection';

interface PostCardProps {
	post: Post;
	isAdmin: boolean;
	activeCommentPostId: string | null;
	newComment: string;
	setNewComment: (comment: string) => void;
	setActiveCommentPostId: (id: string | null) => void;
	onCommentSubmit: (postId: string) => void;
	onTogglePin: (postId: string) => void;
	onDelete: (postId: string) => void;
}

export function PostCard({
	post,
	isAdmin,
	activeCommentPostId,
	newComment,
	setNewComment,
	setActiveCommentPostId,
	onCommentSubmit,
	onTogglePin,
	onDelete,
}: PostCardProps) {
	return (
		<div
			className={`bg-card rounded-lg shadow-md overflow-hidden ${
				post.isPinned ? 'border-l-4 border-primary' : ''
			}`}
		>
			<div className='p-6'>
				<div className='flex justify-between items-start'>
					<div className='flex gap-3 items-center mb-4'>
						<div className='w-10 h-10 rounded-full bg-muted flex items-center justify-center'>
							{post.author.name.charAt(0)}
						</div>
						<div>
							<h3 className='font-medium'>{post.author.name}</h3>
							<p className='text-sm text-muted-foreground'>
								{new Date(post.createdAt).toLocaleDateString()}
							</p>
						</div>
					</div>

					{/* Admin actions */}
					{isAdmin && (
						<div className='flex gap-2'>
							<button
								onClick={() => onTogglePin(post.id)}
								className={`p-1 rounded-full hover:bg-muted/50 transition-colors ${
									post.isPinned
										? 'text-primary'
										: 'text-muted-foreground'
								}`}
								title={
									post.isPinned ? 'Unpin post' : 'Pin post'
								}
							>
								<Pin size={18} />
							</button>
							<button
								onClick={() => onDelete(post.id)}
								className='p-1 rounded-full hover:bg-muted/50 transition-colors text-red-500'
								title='Delete post'
							>
								<Trash2 size={18} />
							</button>
						</div>
					)}
				</div>

				<h2 className='text-xl font-bold mb-2'>{post.title}</h2>
				<p className='mb-4'>{post.content}</p>

				<div className='flex flex-col md:flex-row gap-4 mb-4 text-muted-foreground'>
					<div className='flex items-center gap-1'>
						<CalendarIcon size={16} />
						<span>
							{format(
								new Date(post.eventDate),
								"MMM d, yyyy 'at' h:mm a"
							)}
						</span>
					</div>
					<div>
						<span>📍 {post.location}</span>
					</div>
				</div>

				<CommentSection
					postId={post.id}
					comments={post.comments}
					activeCommentPostId={activeCommentPostId}
					newComment={newComment}
					setNewComment={setNewComment}
					setActiveCommentPostId={setActiveCommentPostId}
					onCommentSubmit={onCommentSubmit}
				/>
			</div>
		</div>
	);
}
