import { IconButton, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as LikedIcon } from '../../icons/LikedIcon.svg';
import { ReactComponent as LikeIcon } from '../../icons/LikeIcon.svg';
import postService from '../../services/postService';
import { useHistory } from 'react-router';
import BookmarkMenu from '../BookmarkMenu';
import { ReactComponent as ProfileIcon } from '../../icons/ProfileIcon.svg';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: '9999px',
    color: 'rgba(156, 163, 175, 1)',
    padding: '0.375rem',
    '&:hover': {
      color: 'rgba(236, 72, 153, 1)',
      backgroundColor: 'rgba(252, 231, 243, 1)'
    }
  },

}));

const Post = ({ post , notify}) => {
  const classes = useStyles()
  const [POST, setPost] = useState(post)

  const handleLike = async (postId,e) => {
    e.stopPropagation()
    const response = await postService.likePost(postId)
    setPost(response)
  }


  return(
    <div  key={post.id} className="flex flex-row border-b p-3 hover:bg-gray-50">
      <div className="mr-3">
        <div className="flex flex-row items-center justify-center h-12 w-12 rounded-full bg-gray-300 text-gray-400">
          <div className="h-9 w-9">
          <ProfileIcon />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-stretch">
          <div className="flex-grow">
            <span className="text-sm font-semibold hover:underline">
              <Link to={`/${post.creator.username}`}>
                {post.creator.username}
              </Link>
            </span>
            {/* <span className="text-sm text-gray-400 pl-1">
              @handle
            </span>
            <span className="text-sm text-gray-400 pl-1">
              . date
            </span> */}
            <Link className="block" to={`/${post.creator.username}/post/${post.id}`}>
            {post.content}
            </Link>
          </div>
        </div>
        <div className="flex flex-row justify-between mt-3">
          <div className="relative z-10 flex flex-row flex-grow justify-start items-center text-sm ">
              <IconButton className={classes.root} onClick={(e) => { handleLike(post.id,e) }}>
                {
                  POST.likeStatus
                  ?<LikedIcon />
                  :<LikeIcon />
                }
              </IconButton>
              <div className={`absolute ml-7 ${POST.likeStatus ? 'text-pink-500' : null}`}>
                {POST.likes?POST.likes:null}
              </div>
          </div>
          <div onClick={(e) => e.stopPropagation()} className="z-10 flex flex-row flex-grow justify-start items-center text-sm ">
            <BookmarkMenu id={post?.id} status={post?.bookmarkStatus} notify={notify} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post;