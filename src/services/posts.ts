import {
  addDoc, collection, deleteDoc,
  doc, getDocs, query,
  setDoc, where
} from 'firebase/firestore'

import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { createApi } from '@reduxjs/toolkit/query/react'

import { db } from '../backend/init'
import { Id } from '../model/model'
import { Post } from '../model/post'

const COLLECTION_NAME = 'posts'

export const postsApi = createApi({
  reducerPath: 'postsApi',
  tagTypes: [COLLECTION_NAME],
  baseQuery: async <T>(query: T): Promise<QueryReturnValue<T, string, {}>> => {
    try {
      const data = await query
      return { data }
    } catch (error: any) {
      return { error: error.toString() }
    }
  },
  endpoints: builder => ({
    getPosts: builder.query<Post[], string | void>({
      query: async (userId: string) => {
        const q = query(
          collection(db, COLLECTION_NAME),
          where('userId', '==', userId),
        )

        const querySnapshot = await getDocs(q)
        let posts: Post[] = []
        querySnapshot.forEach(doc => {
          const post = doc.data() as Post
          posts.push({ ...post, id: doc.id })
        })
        return posts
      },
      providesTags: result =>
        // is result available?
        result
          ? // successful query
          [
            ...result.map(
              ({ id }) => ({ type: COLLECTION_NAME, id } as const),
            ),
            { type: COLLECTION_NAME, id: 'LIST' },
          ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'posts', id: 'LIST' }` is invalidated
          [{ type: COLLECTION_NAME, id: 'LIST' }],
    }),
    addPost: builder.mutation<
      Post,
      Omit<Post, 'id'> & { userId: string }
    >({
      query: async post => {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), post)
        return { ...post, id: docRef.id }
      },
      invalidatesTags: [{ type: COLLECTION_NAME, id: 'LIST' }],
    }),
    editPost: builder.mutation<Post, Post>({
      query: async post => {
        try {
          await setDoc(doc(db, COLLECTION_NAME, post.id), post)
          return post
        } catch (e) {
          throw e
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: COLLECTION_NAME, id },
      ],
    }),
    deletePost: builder.mutation<true, Id>({
      query: async postId => {
        try {
          await deleteDoc(doc(db, COLLECTION_NAME, postId))
          return true
        } catch (e) {
          throw e
        }
      },
      invalidatesTags: (result, error, id) => [{ type: COLLECTION_NAME, id }],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useEditPostMutation,
  useDeletePostMutation,
} = postsApi

export const useGetPostQuery = (postId: Id, userId: Id) => {
  const { post } = useGetPostsQuery(userId, {
    selectFromResult: ({ data }) => ({
      post: data?.find(({ id }) => id === postId),
    }),
  })
  return post
}
