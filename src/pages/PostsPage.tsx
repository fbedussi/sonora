import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import Header from '../components/Header'
import PostCard from '../components/PostCard'
import { useDeletePostMutation, useGetPostsQuery } from '../services/posts'
import { selectUserId } from '../store/user/selectors'
import {
  Alert, Button, Dialog,
  DialogActions, DialogContent, DialogContentText,
  Fab
} from '../styleguide'
import { AddIcon } from '../styleguide/icons'
import theme from '../styleguide/theme'
import LoadingPage from './LoadingPage'

const Posts = styled.div`
	max-width: 1000px;
	padding: ${theme.spacing(2)};
	gap: ${theme.spacing(1)};
	margin: 0 auto;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`

const PostsPage: React.FC = () => {
	const { t } = useTranslation()

	const userId = useSelector(selectUserId)
	const posts = useGetPostsQuery(userId)

	const [deletePost, deletePostResult] = useDeletePostMutation()

	const navigate = useNavigate()

	const [deleteAlert, setDeleteAlert] = useState('')
	const [deleteErrorMessage, setDeleteErrorMessage] = useState('')

	useEffect(() => {
		if (deletePostResult.status === 'rejected') {
			setDeleteErrorMessage(deletePostResult.error.toString())
		}
	}, [deletePostResult.status, deletePostResult.error])

	return (
		<>
			<Header title={t('posts.posts')} />

			{posts.isLoading && <LoadingPage />}

			<Posts>
				{posts.error && (
					<Alert severity="error">{t('posts.errorLoadingPosts')}</Alert>
				)}
				{posts.data?.map(post => (
					<PostCard
						key={post.id}
						imageSrc={post.imageSrc}
						audioSrc={post.audioSrc}
						setDeleteAlert={setDeleteAlert}
					/>
				))}
			</Posts>

			<Fab color="primary" onClick={() => navigate('/post/add')}>
				<AddIcon />
			</Fab>

			<Dialog open={!!deleteAlert} onClose={() => setDeleteAlert('')}>
				<DialogContent>
					<DialogContentText>
						{t('posts.confirmDelete')}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleteAlert('')}>
						{t('general.dismiss')}
					</Button>
					<Button
						onClick={() => {
							deletePost(deleteAlert)
							setDeleteAlert('')
						}}
						autoFocus
					>
						{t('general.yes')}
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog
				open={!!deleteErrorMessage}
				onClose={() => setDeleteErrorMessage('')}
			>
				<DialogContent>
					<DialogContentText>
						{t('posts.errorDeletingPost', {
							errorMessage: deleteErrorMessage,
						})}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={() => setDeleteErrorMessage('')}>
						{t('general.ok')}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default PostsPage
