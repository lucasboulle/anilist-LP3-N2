import { userActionForPost } from "./UserAction"

export async function getThreads (page: number, term?: string) {
  const query = `
  query {
    Page(page: ${page}, perPage: 20) {
      threads(sort: CREATED_AT_DESC) {
        id
        title
        createdAt
        replyCount,
        viewCount,
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
  return response.data.Page.threads
}