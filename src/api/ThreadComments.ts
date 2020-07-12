import { userActionForPost } from "./UserAction"

export async function getThreadComments (threadId: number) {
  const query = `
  query {
  	Page(page: 0 perPage: 20) {
    threadComments(threadId: ${threadId}) {
      id
      comment
      createdAt
      user {
        id
        name
        avatar {
          medium
        }
      }
    }
  }
}
  `
  const response = await userActionForPost({ query }) 
  return response.data.Page.threadComments
}