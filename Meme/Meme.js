import React, { useEffect, useState} from 'react'
import styles from "./styles.module.css"
import {useNavigate } from "react-router-dom";

export const  Meme = () =>{

    const [memes,setMemes] = useState([]);
    const [memeIndex,SetMemeIndex] = useState(0);
    const [captions,setCaptions]= useState([]);

    const navigate = useNavigate();

    const updateCaption =(e, index)=> {
        const text = e.target.value || '';
        setCaptions(
            captions.map((c , i)=>{
                if(index === i){
                    return text;
                } else {
                    return c;
                }
            })
        )
    }

    const shuffleMemes = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * i);
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      };

    useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes").then(res=>{
           res.json().then(res=>{
            const _memes=res.data.memes;
            shuffleMemes(_memes);
            setMemes(_memes);
           }); 
        });
    },[]);

    useEffect(()=>{
        if(memes.length){
            setCaptions(Array(memes[memeIndex].box_count).fill(""));
        }
    },[memeIndex, memes]);


    const generateMeme = ()=>{
        const currentMeme = memes[memeIndex];
        const formdata = new FormData();

        formdata.append('username','*');
        formdata.append('password','*');
        formdata.append('template_id', currentMeme.id);
        captions.forEach((c, index)=> formdata.append(`boxes[${index}][text]`, c));

        fetch('https://api.imgflip.com/caption_image',{
            method: 'POST',
            body: formdata
        }).then(res=>{
            res.json().then(res=>{
                navigate(`/generated?url=${res.data.url}`);
            });
        });
    }

    return (
        memes.length ? 
        <div className={styles.container}>
            <button onClick={ generateMeme} className={styles.generate}>Generate</button>
            <button onClick={ ()=>{SetMemeIndex(memeIndex + 1)}} className={styles.skip}>Skip</button>
            {
                captions.map((c, index)=> (
                    <input onChange={(e)=>{
                        updateCaption(e, index)
                    }} key={index} />
                )
                    
                )
            } 
            <img alt='img' src={memes[memeIndex].url}/>
        </div>
         : <></>
    );
  }
