import React from 'react'
import { Route, Routes as Switch } from 'react-router'

import AddPostPage from './pages/AddPostPage'
import PostsPage from './pages/PostsPage'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" element={<PostsPage />} />
      <Route path="/posts" element={<PostsPage />} />
      <Route path="/post/add" element={<AddPostPage />} />
    </Switch>
  )
}

export default Routes
