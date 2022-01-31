import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import MediaCard from '../components/MediaCard'
import { Button, LoadingButton } from '../styleguide'
import {
  AudiotrackIcon, ChangeCircleIcon, ImageIcon,
  SaveIcon
} from '../styleguide/icons'
import theme from '../styleguide/theme'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${theme.spacing(2)};
  height: 100%;
`

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`

const CreatePostPage: React.FC = () => {
  const { t } = useTranslation()

  const [imageSrc, setImageSrc] = useState('')
  const [imageLoading, setImageLoading] = useState(false)

  const [audioSrc, setAudioSrc] = useState('')
  const [audioLoading, setAudioLoading] = useState(false)

  const imageInputRef = useRef<HTMLInputElement>(null)
  const audioInputRef = useRef<HTMLInputElement>(null)

  return (
    <Wrapper>
      <input hidden ref={imageInputRef} type="file" accept="image/*" onChange={(e) => {
        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
          if (typeof e.target?.result === 'string') {
            setImageSrc(e.target?.result || '')
            setImageLoading(false)
          }
        });
        if (e.currentTarget.files && e.currentTarget.files[0]) {
          setImageLoading(true)
          reader.readAsDataURL(e.currentTarget.files[0]);
        }
      }} />
      <input hidden ref={audioInputRef} type="file" accept="audio/*" onChange={(e) => {
        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
          if (typeof e.target?.result === 'string') {
            setAudioSrc(e.target?.result)
            setAudioLoading(false)
          }
        });
        if (e.currentTarget.files && e.currentTarget.files[0]) {
          setAudioLoading(true)
          reader.readAsDataURL(e.currentTarget.files[0]);
        }
      }} />
      <ButtonsWrapper>
        <LoadingButton
          loading={imageLoading}
          variant="outlined"
          startIcon={imageSrc ? <ChangeCircleIcon /> : <ImageIcon />}
          onClick={() => imageInputRef.current?.click()}>
          {t(imageSrc ? 'create.changeImage' : 'create.pickImage')}
        </LoadingButton>

        {!!imageSrc && <LoadingButton
          loading={audioLoading}
          variant="outlined"
          startIcon={audioSrc ? <ChangeCircleIcon /> : <AudiotrackIcon />}
          onClick={() => audioInputRef.current?.click()}>
          {t(audioSrc ? 'create.changeSound' : 'create.pickSound')
          }</LoadingButton>}
      </ButtonsWrapper>
      <MediaCard imageSrc={imageSrc} audioSrc={audioSrc} />
      <ButtonsWrapper>
        <Button variant="contained" startIcon={<SaveIcon />}>{t('general.save')}</Button>
      </ButtonsWrapper>
    </Wrapper>
  )
}

export default CreatePostPage
