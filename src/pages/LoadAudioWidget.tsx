import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { Button } from '../styleguide'
import theme from '../styleguide/theme'

const ButtonWrapper = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing(2)};
`

const SoundWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

const LoadAudioWidget: React.FC = () => {
  const { t } = useTranslation()

  const [audioLocalUri, setAudioLocalUri] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  return (
    <div>
      <input hidden ref={inputRef} type="file" accept="audio/*" onChange={(e) => {
        setAudioLocalUri(e.currentTarget.value)
        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
          if (audioRef.current && typeof e.target?.result === 'string') {
            audioRef.current.src = e.target?.result
          }
        });
        if (e.currentTarget.files && e.currentTarget.files[0]) {
          reader.readAsDataURL(e.currentTarget.files[0]);
        }
      }} />
      <ButtonWrapper>
        <Button variant="outlined" onClick={() => inputRef.current?.click()}>{t(audioLocalUri ? 'create.changeSound' : 'create.pickSound')}</Button>
      </ButtonWrapper>
      <SoundWrapper>
        {!!audioLocalUri && <audio controls ref={audioRef} />}
      </SoundWrapper>
    </div>
  )
}

export default LoadAudioWidget
