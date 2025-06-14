"use client"

import { useState, useRef, useEffect } from 'react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { createCommentAction, updateCommentAction, deleteCommentAction } from './action'
import { usePioneerStore } from '../../../utils/zustand'
import Image from 'next/image'
import { Edit, Trash2 } from 'lucide-react'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components'
import Link from 'next/link'

interface Comment {
  id: number
  content: string
  createdAt: Date
  updatedAt: Date
  pioneer: {
    name: string
    avatar: string
    color: string
  }
}

interface CommentsSectionProps {
  initialComments: Comment[]
  blueprintId: number
}

export default function CommentsSection({ initialComments, blueprintId }: CommentsSectionProps) {
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState('')
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)
  const [editContent, setEditContent] = useState('')
  const [isCommentInputFocused, setIsCommentInputFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { name, avatar, color } = usePioneerStore()
  const pioneer = {
    name,
    avatar,
    color
  }

  const adjustTextareaHeight = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto'
    element.style.height = `${element.scrollHeight}px`
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value)
    adjustTextareaHeight(e.target)
  }

  const handleEditTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(e.target.value)
    adjustTextareaHeight(e.target)
  }

  useEffect(() => {
    if (textareaRef.current) {
      adjustTextareaHeight(textareaRef.current)
    }
  }, [newComment])

  const handleCreateComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment = await createCommentAction(newComment, blueprintId)

    if (comment) {
      setComments([{ ...comment, pioneer }, ...comments])
      setNewComment('')
      setIsCommentInputFocused(false)
    }
  }

  const handleCancelComment = () => {
    setNewComment('')
    setIsCommentInputFocused(false)
  }

  const handleUpdateComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCommentId || !editContent.trim()) return

    try {
      const updatedComment = await updateCommentAction(editContent, editingCommentId)

      if (updatedComment) {
        setComments(comments.map(comment =>
          comment.id === editingCommentId ? { ...updatedComment, pioneer } : comment
        ))
        setEditingCommentId(null)
        setEditContent('')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteComment = async (commentId: number) => {
    if (!confirm('Are you sure you want to delete this comment?')) return

    const deletedComment = await deleteCommentAction(commentId)
    if (deletedComment) {
      setComments(comments.filter(comment => comment.id !== deletedComment.id))
    }
  }

  const startEditing = (comment: Comment) => {
    setEditingCommentId(comment.id)
    setEditContent(comment.content)
  }

  return (
    <div className='w-full flex flex-col flex-grow mt-2 lg:mt-4'>
      <div className="w-full h-10 sm:h-12 flex items-center bg-main-bg p-4">
        <h1 className="text-lg sm:text-xl font-medium">Comments ({comments.length})</h1>
      </div>
      <div className="flex flex-col gap-2 p-2 lg:gap-4 lg:p-4 bg-light-bg">
        <>
          {checkIfPioneerExists(pioneer) ? (
            <div className="flex flex-col gap-2">
              <form onSubmit={handleCreateComment} className={`flex flex-col p-4 gap-8 rounded-lg outline-none bg-main-bg transition-all duration-200 ${isCommentInputFocused
                ? 'min-h-32 shadow-sm outline outline-main-orange'
                : 'min-h-6 cursor-pointer'
                }`}>
                <textarea
                  ref={textareaRef}
                  placeholder="Give a comment"
                  value={newComment}
                  onChange={handleTextareaChange}
                  onFocus={() => setIsCommentInputFocused(true)}
                  className="w-full p-3 rounded-lg outline-none bg-main-bg resize-none overflow-hidden"
                  rows={1}
                />
                {isCommentInputFocused && (
                  <div className="w-full flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleCancelComment}
                      className="px-4 py-1.5 text-sm font-medium text-gray-400 hover:text-gray-400 hover:bg-gray-700 rounded-full transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!newComment.trim()}
                      className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${newComment.trim()
                        ? 'bg-gray-600 hover:bg-dark-orange active:bg-main-orange text-white transition-all duration-100'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                      Comment
                    </button>
                  </div>
                )}
              </form>
            </div>
          ) : (
            <LoginLink className="flex items-center justify-center p-4 bg-main-bg hover:bg-dark-bg rounded-lg text-gray-400">
              Login to comment
            </LoginLink>
          )}
          {comments.length > 0 && <div className='w-full h-[1px] bg-main-gray' />}
        </>
        <div className="flex flex-col gap-2 lg:gap-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 p-2 lg:p-4 bg-main-bg rounded-md lg:rounded-lg">
              <Link href={`/pioneers/${comment.pioneer.name}`}>
                <Image
                  src={`/images/avatars/${comment.pioneer.avatar}.png`}
                  alt={comment.pioneer.name}
                  width={40}
                  height={40}
                  className={`w-10 h-10 rounded-full bg-avatar-${comment.pioneer.color}`}
                />
              </Link>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col sm:flex-row items-center sm:gap-2">
                    <Link href={`/pioneers/${comment.pioneer.name}`} className='hover:underline'>
                      <span className="font-medium">{comment.pioneer.name}</span>
                    </Link>
                    <span className="text-sm text-gray-500">
                      {comment.createdAt.getDate()}/{comment.createdAt.getMonth() + 1}/{comment.createdAt.getFullYear()}
                    </span>
                  </div>
                  {checkIfPioneerExists(pioneer) && comment.pioneer.name === pioneer.name && (
                    <div className="flex gap-1">
                      <button
                        onClick={() => startEditing(comment)}
                        className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Edit width={18} height={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 width={18} height={18} />
                      </button>
                    </div>
                  )}
                </div>
                {editingCommentId === comment.id ? (
                  <form onSubmit={handleUpdateComment} className="mt-2">
                    <textarea
                      value={editContent}
                      onChange={handleEditTextareaChange}
                      className="w-full p-3 rounded-lg outline-none bg-main-bg resize-none overflow-hidden"
                      rows={1}
                    />
                    <div className="flex gap-3 mt-3">
                      <button
                        type="submit"
                        className="px-4 py-1.5 text-sm font-medium bg-gray-600 text-white rounded-full hover:bg-dark-orange active:bg-blue-700 transition-all duration-100"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCommentId(null)
                          setEditContent('')
                        }}
                        className="px-4 py-1.5 text-sm font-medium text-gray-400 hover:text-gray-400 hover:bg-gray-700 rounded-full transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <p className="mt-2 whitespace-pre-wrap">{comment.content}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function checkIfPioneerExists(pioneer: { name: string, avatar: string, color: string }) {
  return !!pioneer && !!pioneer.name && !!pioneer.avatar && !!pioneer.color
}