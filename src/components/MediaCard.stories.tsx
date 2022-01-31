import React from 'react'
import styled from 'styled-components'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import MediaCard from './MediaCard'

const Wrapper = styled.div`
  width: 300px;
`

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  // title: 'MediaCard',
  component: MediaCard,
} as ComponentMeta<typeof MediaCard>;

export const NoMedia: ComponentStory<typeof MediaCard> = () => <Wrapper><MediaCard /></Wrapper>;
export const NoAudio: ComponentStory<typeof MediaCard> = () => <Wrapper><MediaCard imageSrc="https://placeimg.com/300/300/nature" /></Wrapper>;
export const NoImage: ComponentStory<typeof MediaCard> = () => <Wrapper><MediaCard audioSrc="https://download.samplelib.com/mp3/sample-3s.mp3" /></Wrapper>;
export const WithMedia: ComponentStory<typeof MediaCard> = () => <Wrapper><MediaCard imageSrc="https://placeimg.com/300/300/nature" audioSrc="https://download.samplelib.com/mp3/sample-3s.mp3" /></Wrapper>;
