import {
  getDownloadURL, getStorage, ref,
  uploadBytesResumable
} from 'firebase/storage'
import { useState } from 'react'

import { generateUID } from '../libs/uuid'
import { UploadStatus } from '../model/model'

const storage = getStorage();

const imageMetadata = {
  contentType: 'image/*'
};

const audioMetadata = {
  contentType: 'audio/*'
};

export const useUploadFile = () => {
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const [result, setResult] = useState<UploadStatus>({
    error: undefined,
    ok: undefined,
    completed: false,
  })

  const uploadFile = (file: File, type: 'audio' | 'image') => {
    const uniquePrefix = generateUID()

    const storageRef = ref(storage, `${type === 'image' ? 'images' : 'audio'}/${uniquePrefix}_${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file, type === 'image' ? imageMetadata : audioMetadata);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress)

        switch (snapshot.state) {
          case 'paused':
            setPaused(true)
            break;
          case 'running':
            setPaused(false)
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        setResult({ error: error.code, ok: false, completed: true })
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setResult({ ok: false, completed: true, url })
        });
      }
    );
  }

  return [
    uploadFile,
    {
      ...result,
      paused,
      progress,
    }
  ] as [(file: File, type: 'audio' | 'image') => void, UploadStatus & { paused: boolean, progress: number }]
}
