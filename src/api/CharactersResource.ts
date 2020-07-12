import { userActionForPost } from "./UserAction"

export async function getCharactersByIds (ids: number[]) {
  const query = `
  query {
    Page(page: 0, perPage: 20) {
			characters(id_in: [${ids}]) {
        id
        name {
          full
          native
        },
        image {
          large
        }
      }
    }
  }
  `
  const response = await userActionForPost({ query }) 
  return response.data.Page.characters
}