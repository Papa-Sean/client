import React from 'react';
import { Comment } from '../../types';
import { CommentForm } from './CommentForm';
import { MessageCircle } from 'lucide-react';

interface CommentSectionProps {
	postId: string;
	comments: Comment[];
	activeCommentPostId: string | null;
	newComment: string;
	setNewComment: (comment: string) => void;
	setActiveCommentPostId: (id: string | null) => void;
	onCommentSubmit: (postId: string) => void;
}

export function CommentSection({
	postId,
	comments,
	activeCommentPostId,
	newComment,
	setNewComment,
	setActiveCommentPostId,
	onCommentSubmit,
}: CommentSectionProps) {
	return (
		<div className='mt-6 pt-4 border-t'>
			<h4 className='font-medium mb-2 flex items-center gap-1'>
				<MessageCircle size={16} />
				Comments ({comments.length})
			</h4>

			{comments.length > 0 && (
				<div className='space-y-4 mb-4'>
					{comments.map((comment) => (
						<div
							key={comment.id}
							className='bg-muted/30 p-3 rounded-md'
						>
							<div className='flex justify-between'>
								<div className='flex items-center gap-2 mb-1'>
									<div className='w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs'>
										{comment.author.name.charAt(0)}
									</div>
									<span className='font-medium text-sm'>
										{comment.author.name}
									</span>
								</div>
								<span className='text-xs text-muted-foreground'>
									{new Date(
										comment.createdAt
									).toLocaleDateString()}
								</span>
							</div>
							<p className='text-sm'>{comment.content}</p>
						</div>
					))}
				</div>
			)}

			{activeCommentPostId === postId ? (
				<CommentForm
					comment={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					onCancel={() => {
						setActiveCommentPostId(null);
						setNewComment('');
					}}
					onSubmit={() => onCommentSubmit(postId)}
				/>
			) : (
				<button
					onClick={() => setActiveCommentPostId(postId)}
					className='text-sm text-primary font-medium hover:underline'
				>
					Add a comment...
				</button>
			)}
		</div>
	);
}
