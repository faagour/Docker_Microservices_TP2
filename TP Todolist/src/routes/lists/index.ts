import { FastifyInstance } from 'fastify'
import * as listsController from '../../controllers/lists.controller'
import { userCreateSchema } from "../../schema/user.schema"
import { addListSchema, listListsSchema } from '../../schema'

async function lists(fastify: FastifyInstance) {

  fastify.get('/', { schema: listListsSchema }, listsController.listLists)

  fastify.post('/', { schema: addListSchema }, listsController.addList)

  fastify.get('/lists', listsController.listLists)
  fastify.post('/lists', {
    schema: userCreateSchema,  // Apply the validation schema here
    handler: listsController.addLists
  })
  fastify.put('/lists/:id', listsController.updateList)
  fastify.post('/lists/:id/items', listsController.addItemToList)
  fastify.put('/lists/:listId/items/:itemId', listsController.updateItemInList)
  fastify.delete('/lists/:listId/items/:itemId', listsController.deleteItemFromList)
}

export default lists