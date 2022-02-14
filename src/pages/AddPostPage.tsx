import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import styled from 'styled-components'

import PostCard from '../components/PostCard'
import { useUploadFile } from '../hooks/useUploadFile'
import { resizeImage } from '../libs/image'
import { useAddPostMutation } from '../services/posts'
import { selectUserId } from '../store/user/selectors'
import { Button, LinearProgress, LoadingButton } from '../styleguide'
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
  margin: 0 auto;
`

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`

const AddPostPage: React.FC = () => {
  const { t } = useTranslation()

  const userId = useSelector(selectUserId)

  const [imageSrc, setImageSrc] = useState<string>('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageLoading, setImageLoading] = useState(false)

  const [audioSrc, setAudioSrc] = useState('')
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [audioLoading, setAudioLoading] = useState(false)

  const imageInputRef = useRef<HTMLInputElement>(null)
  const audioInputRef = useRef<HTMLInputElement>(null)

  const [uploadImage, uploadImageResult] = useUploadFile()
  const [uploadAudio, uploadAudioResult] = useUploadFile()

  const [addPost, addPostResult] = useAddPostMutation()

  useEffect(() => {
    if (uploadImageResult.url && uploadAudioResult.url && userId) {
      setImageSrc(uploadImageResult.url)
      setAudioSrc(uploadAudioResult.url)
      setImageFile(null)
      setAudioFile(null)
      addPost({ imageSrc: uploadImageResult.url, audioSrc: uploadAudioResult.url, userId })
    }
  }, [uploadImageResult.url, uploadAudioResult.url, addPost, userId])

  const saveCard = () => {
    if (imageFile && audioFile) {
      uploadImage(imageFile, 'image')
      uploadAudio(audioFile, 'audio')
    }
  }


  const disableSaveButton =
    !imageFile ||
    !audioFile ||
    (uploadImageResult.progress > 0 && !uploadImageResult.completed) ||
    (uploadAudioResult.progress > 0 && !uploadAudioResult.completed)

  const uploadProgress = (uploadImageResult.progress + uploadAudioResult.progress) / 2
  const showUploadProgress = uploadProgress > 0 && uploadProgress < 100

  return addPostResult.status === 'fulfilled' ? (
    <Navigate to="/posts" />
  ) : (
    <Wrapper>
      <input hidden ref={imageInputRef} type="file" accept="image/*" onChange={async (e) => {
        const file = e.currentTarget.files && e.currentTarget.files[0]
        if (!file) {
          throw new Error('No image file')
        }

        setImageLoading(true)

        const resizedImage = await resizeImage(file, 960, 960)

        setImageFile(resizedImage)
        const src = URL.createObjectURL(resizedImage)
        setImageSrc(src)
        setImageLoading(false)
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
          setAudioFile(e.currentTarget.files[0])
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
      <PostCard imageSrc={imageSrc} audioSrc={audioSrc} />
      <ButtonsWrapper>
        <Button
          disabled={disableSaveButton}
          variant="contained"
          onClick={saveCard}
          startIcon={<SaveIcon />}
        >
          {t('general.save')}
        </Button>
      </ButtonsWrapper>
      {showUploadProgress && <LinearProgress value={uploadProgress} />}
    </Wrapper>
  )
}

export default AddPostPage
