import React from 'react';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { useDispatch, useSelector } from 'react-redux';

import { CommentsBlock } from '../components/CommentsBlock';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { fetchPosts, fetchTags } from '../redax/slices/postsSlice';
//
//
//
//
//
export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector(state => state.posts) //витягую пости і теги

  const isPostLoading = posts.status === 'loading'; // чи грузяться пости
  const isTagsLoading = tags.status === 'loading'; // ...теги

  React.useEffect(() => {
    dispatch(fetchPosts()) // запрос на отримання постів
    dispatch(fetchTags()) //...тегів
  }, [])


  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Нові" />
        <Tab label="Популярні" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : posts.items).map((obj, index) => (
            isPostLoading
              ? (<Post key={index} isLoading={true} />)
              : (<Post
                // key={obj._id}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable
              />)
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Панас Мирний',
                  avatarUrl: 'https://csamm.archives.gov.ua/wp-content/uploads/2019/10/1-14-234x300.jpg',
                },
                text: "Чи є Чіпка 'пропащою силою'?",
              },
              {
                user: {
                  fullName: 'Іван Багряний',
                  avatarUrl: 'https://upload.wikimedia.org/wikipedia/uk/e/e6/%D0%91%D0%B0%D0%B3%D1%80%D1%8F%D0%BD%D0%B8%D0%B9_%D0%86%D0%B2%D0%B0%D0%BD_%D0%9F%D0%B0%D0%B2%D0%BB%D0%BE%D0%B2%D0%B8%D1%87.jpg?20070915111736',
                },
                text: 'Головна ідея – утвердження перемоги добра над злом, воля до життя, свобода та гідність людини як ...',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
