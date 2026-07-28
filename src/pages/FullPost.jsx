import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";

export const FullPost = () => {

  const [ data, setData ] = useState();
  const [ isLoading, setLoading ] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
        .get(`/posts/${id}`)
        .then((res) => {
            console.log(res.data);
            setData(res.data);
            setLoading(false);
        })
        .catch((err) => {
            console.warn(err);
            alert("Помилка при отриманні статті!");
        });
  }, [id]);

  if(isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  }

  return (
    <>
      <Post
        id={data.id}
        title={data.title}
        imageUrl={data.imageUrl}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.commentsCount}
        tags={data.tags}
        isFullPost
      >
        <p>
          {data.text}
        </p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Васильович",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "це тестовий коментар",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
