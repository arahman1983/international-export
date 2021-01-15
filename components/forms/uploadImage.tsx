import { useRef, useState } from 'react';
import styles from '../../styles/upload.module.css'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'


export default function UploadImage({picUrl, setFile, ...props}) {
  const SUPPORTED_FORMATS = [".jpg", ".gif", ".png", ".gif"];
  const FILE_SIZE = 10000;
  const imageRef = useRef()
  const [picURL, setPicURL] = useState(picUrl)
  const [picture, setPicture] = useState<string | ArrayBuffer>(null)

  
  const handleUpload = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPicture (reader.result);
      console.log(reader.result)
      //this.handleSubmit()
      setFile(reader.result)
      setPicURL(null)
      props.getBase && props.getBase(reader.result)
    };
  }

  return (
    <label className={styles.componentContainer} htmlFor="image">
      <input type="file" id="image" className={styles.imgInput} onChange={handleUpload} ref={imageRef} />
      {
        !picture && !picURL ?
          <div className={styles.uploadDiv}>
            <FontAwesomeIcon icon={faCloudUploadAlt} color="#dc3545" style={{ width: '50px', marginRight: '0.7rem' }} />
            <span className="my-3 text-danger">Click to Select Picture</span>
            <small className="my-2">Files allowed : {JSON.stringify(SUPPORTED_FORMATS)}</small>
            <small>Max File Size {FILE_SIZE}</small>
          </div>
          : picURL
          ?
          <div className={styles.uploadDiv}>
            <img src={picURL} width={300} height={300} alt="pic"  />
          </div>
          :
          <div className={styles.uploadDiv}>
            <img src={picture.toString()} className="w-100" />
          </div>
      }
    </label>
  )
}