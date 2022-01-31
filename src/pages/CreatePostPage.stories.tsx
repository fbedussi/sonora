import React, { Suspense } from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CircularProgress } from '../styleguide'
import CreatePostPage from './CreatePostPage'

export default {
  component: CreatePostPage,
} as ComponentMeta<typeof CreatePostPage>

export const Default: ComponentStory<typeof CreatePostPage> = () => <Suspense fallback={<CircularProgress />}><CreatePostPage /></Suspense>
