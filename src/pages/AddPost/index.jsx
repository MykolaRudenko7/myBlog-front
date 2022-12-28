import { Navigate, useNavigate } from 'react-router-dom';
import axios from '../../axios';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import React from 'react';
import SimpleMDE from 'react-simplemde-editor';

import { useSelector } from 'react-redux';
import { isAuthSelector } from "../../redax/slices/authSlice";

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
//
//
//
//
//
//
export const AddPost = () => {
  const navigate = useNavigate()
  const isAuth = useSelector(isAuthSelector)

  const [isLoading, setIsLoading] = React.useState(false);
  const [imageUrl, setImmageUrl] = React.useState('');
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const inputFileRef = React.useRef(null);

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData()
      const file = e.target.files[0]
      formData.append('image', file)
      const { data } = await axios.post('/upload', formData);
      setImmageUrl(data.url)
    } catch (error) {
      console.log('Error', error)
      alert('Помилка при завантаженні файлу')
    }
  };

  const onClickRemoveImage = () => {
    if (window.confirm("Ви дійсно хочете видалити прев'ю?"))
      setImmageUrl('')
  };

  const onChange = React.useCallback((text) => {
    setText(text);
  }, []);

  const onSubmit = async () => {
    try {
      setIsLoading(true)

      const fields = {
        title,
        imageUrl,
        tags: tags.split(','),
        text,
      }
      const { data } = await axios.post('/posts', fields)
      const id = data._id
      navigate(`/posts/${id}`)
    } catch (error) {
      console.log('Error:', error);
      alert('Помилка при створенні статті')
    }
  }

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );


  if (window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to='/' />
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large">
        Завантажити прев'ю
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Видалити
          </Button>
          <img className={styles.image} src={`http://localhost:7777${imageUrl}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статті..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тeги"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          Опублікувати
        </Button>
        <a href="/">
          <Button size="large">Відміна</Button>
        </a>
      </div>
    </Paper>
  );
};
