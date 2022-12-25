import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React from 'react';
import axios from '../axios';

import { CommentsBlock } from '../components/CommentsBlock';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
//
//
//
//
//
export const Home = () => {

  React.useEffect(() => {
    axios.get('/posts')
  }, [])


  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Нові" />
        <Tab label="Популярні" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {[...Array(5)].map(() => (
            <Post
              id={1}
              title="Roast the code #1 | Rock Paper Scissors"
              imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
              user={{
                avatarUrl:
                  'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                fullName: 'Keff',
              }}
              createdAt={'12 липня 2022 р.'}
              viewsCount={150}
              commentsCount={3}
              tags={['react', 'fun', 'typescript']}
              isEditable
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={['react', 'typescript', 'замітки']} isLoading={false} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Панас Мирний',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: "Чи є Чіпка 'пропащою силою'?",
              },
              {
                user: {
                  fullName: 'Іван Багряний',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
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
