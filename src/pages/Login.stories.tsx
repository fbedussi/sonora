import React from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import LoginPage from './LoginPage'

export default {
  component: LoginPage,
} as ComponentMeta<typeof LoginPage>

export const Default: ComponentStory<typeof LoginPage> = () => <LoginPage />
