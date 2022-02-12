import React, { Suspense } from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CircularProgress } from '../styleguide'
import AddPostPage from './AddPostPage'

export default {
  component: AddPostPage,
} as ComponentMeta<typeof AddPostPage>

export const Default: ComponentStory<typeof AddPostPage> = () => <Suspense fallback={<CircularProgress />}><AddPostPage /></Suspense>
