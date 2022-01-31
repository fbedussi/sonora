import React, { useRef, useState } from 'react'

import {
  Card, CardMedia, IconButton,
  styled
} from '../styleguide'
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

const Button = styled(IconButton)`
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
}

const MediaCard: React.FC<Props> = ({ imageSrc, audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  return (
    <Wrapper>
      <audio ref={audioRef} src={audioSrc} />
      {imageSrc ? <CardMedia
        component="img"
        image={imageSrc}
        alt=""
      /> : <ImageNotSupportedIcon />}
      {!!audioSrc && <Button color="primary" aria-label="play/pause" onClick={() => {
        if (isPlaying) {
          audioRef.current?.pause()
          setIsPlaying(false)
        } else {
          audioRef.current?.play()
          setIsPlaying(true)
        }
      }}>
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </Button>}
    </Wrapper>
  )
}

export default MediaCard

