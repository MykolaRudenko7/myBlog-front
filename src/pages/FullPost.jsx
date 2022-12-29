import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'

import axios from "../axios";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { Post } from "../components/Post";
//
//
//
//
//
export const FullPost = () => {

  const [isLoading, setIsLoading] = React.useState(true)
  const [data, setData] = React.useState({})
  const { id } = useParams() // id із строки

  React.useEffect(() => {
    axios.get(`/posts/${id}`)
      .then((response) => {
        setData(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('Error:', error);
        alert('Помилкам при отриманні статті')
      })
  }, [])

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  }
  return (
    <>
      <Post

        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:7777${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />

      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Іван Франко",
              avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/%D0%86%D0%B2%D0%B0%D0%BD_%D0%AF%D0%BA%D0%BE%D0%B2%D0%B8%D1%87_%D0%A4%D1%80%D0%B0%D0%BD%D0%BA%D0%BE.jpg/267px-%D0%86%D0%B2%D0%B0%D0%BD_%D0%AF%D0%BA%D0%BE%D0%B2%D0%B8%D1%87_%D0%A4%D1%80%D0%B0%D0%BD%D0%BA%D0%BE.jpg",
            },
            text: "Джеджалик",
          },
          {
            user: {
              fullName: "Іван Мельник",
              avatarUrl: "https://malevich.evo.run/img?url=https://images.crafta.ua/products/4677722",
            },
            text: "why?",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
