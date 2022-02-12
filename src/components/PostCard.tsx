import React, { useRef, useState } from 'react'
import styled from 'styled-components'

import { Id } from '../model/model'
import { Card, IconButton } from '../styleguide'
import { ImageNotSupportedIcon, PauseIcon, PlayArrowIcon } from '../styleguide/icons'
import theme from '../styleguide/theme'

const Wrapper = styled(Card)`
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const PostMedia = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`

const PlayPauseButton = styled(IconButton)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: ${theme.spacing(2)}; 
  border: solid 2px ${theme.palette.primary.main};
  background-color: ${theme.palette.primary.light};
`

type Props = {
  imageSrc?: string
  audioSrc?: string
  setDeleteAlert?: (postId: Id) => void
}

const PostCard: React.FC<Props> = ({ imageSrc, audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  return (
    <Wrapper>
      <audio ref={audioRef} src={audioSrc} />
      {imageSrc ? <PostMedia
        src={imageSrc}
        alt=""
      /> : <ImageNotSupportedIcon />}
      {!!audioSrc && <PlayPauseButton color="primary" aria-label="play/pause" onClick={() => {
        if (isPlaying) {
          audioRef.current?.pause()
          setIsPlaying(false)
        } else {
          audioRef.current?.play()
          setIsPlaying(true)
        }
      }}>
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </PlayPauseButton>}
    </Wrapper>
  )
}

export default PostCard

