import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { Button } from '../styleguide'
import theme from '../styleguide/theme'

const ButtonWrapper = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing(2)};
`

const ImageWrapper = styled.div`
  max-height: 80vh;
`

const Image = styled.img`
  margin: 0 auto;
  max-width: 100%;
  max-height: 100%;
`

const LoadImageWidget: React.FC = () => {
  const { t } = useTranslation()

  const [imageLocalUri, setImageLocalUri] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  return (
    <div>
      <input hidden ref={inputRef} type="file" accept="image/*" onChange={(e) => {
        setImageLocalUri(e.currentTarget.value)
        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
          if (imageRef.current && typeof e.target?.result === 'string') {
            imageRef.current.src = e.target?.result
          }
        });
        if (e.currentTarget.files && e.currentTarget.files[0]) {
          reader.readAsDataURL(e.currentTarget.files[0]);
        }
      }} />
      <ButtonWrapper>
        <Button variant="outlined" onClick={() => inputRef.current?.click()}>{t(imageLocalUri ? 'create.changeImage' : 'create.pickImage')}</Button>
      </ButtonWrapper>
      <ImageWrapper>
        {!!imageLocalUri && <Image ref={imageRef} alt="" />}
      </ImageWrapper>
    </div>
  )
}

export default LoadImageWidget
