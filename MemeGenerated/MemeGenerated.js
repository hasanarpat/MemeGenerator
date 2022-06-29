import React from 'react'
import { useLocation, useNavigate} from 'react-router-dom';
import styles from './styles.module.css';
import { useClipboard } from 'use-clipboard-copy';

export const MemeGenerated = () => {

    const clipboard = useClipboard();
    const navigate= useNavigate();
    const location = useLocation();
    const url = new URLSearchParams(location.search).get('url');

    const copyLink = ()=>{
        clipboard.copy(url);
    }
    
  return (
    <div className={styles.container}>
        <button onClick={()=>{navigate('../', { replace: true })}} className={styles.home}>
            Make More Memes
        </button>
        { url && <img alt='img' src={url} />} 
        <button className={styles.copy} onClick={copyLink}>Copy Link</button>
    </div>
  )
}
