import { FastifyReply, FastifyRequest } from 'fastify'
import { ITodoList, ITodoItem } from '../interfaces'
//import { userCreateSchema } from "../schema/user.schema";

let users: { name: string }[] = [];

const staticLists: ITodoList[] = [
    {
      id: 'l-1',
      name: 'Development Tasks',
      description: 'Tasks related to software development',
      items: [
        {
          id: 'i-1',
          description: 'Implement new feature',
          status: 'PENDING'
        },
        {
          id: 'i-2',
          description: 'Fix bugs',
          status: 'IN-PROGRESS'
        }
      ]
    },
    {
      id: 'l-2',
      name: 'Work Tasks',
      description: 'General work-related tasks',
      items: [
        {
          id: 'i-3',
          description: 'Prepare presentation',
          status: 'DONE'
        }
      ]
    }
  ];

  export async function listLists(
    request: FastifyRequest, 
    reply: FastifyReply
  ) {
    console.log('DB status', this.level.db.status); // Access LevelDB instance via 'this'
  
    const listsIter = this.level.db.iterator(); // Use LevelDB iterator
  
    const result: ITodoList[] = [];
    for await (const [key, value] of listsIter) {
      result.push(JSON.parse(value)); // Parse each item
    }
  
    reply.send({ data: result }); // Return the lists as a response
  }

export const addList = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id, name, description } = request.body as ITodoList
  const newList: ITodoList = { id, name, description, items: [] }
  staticLists.push(newList)
  reply.status(201).send({ data: newList })
}

export async function addLists(request: FastifyRequest, reply: FastifyReply) {
  try {
    const list = request.body as ITodoList;
    const result = await this.level.db.put(list.id.toString(), JSON.stringify(list)); // Use db directly
    reply.status(201).send({ data: result });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
}

export const updateList = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string }
  const { name, description } = request.body as { name: string; description: string }

  const listIndex = staticLists.findIndex((list) => list.id === id)
  if (listIndex === -1) {
    return reply.status(404).send({ error: 'List not found' })
  }

  const updatedList = { ...staticLists[listIndex], name, description }
  staticLists[listIndex] = updatedList
  reply.send({ data: updatedList })
}

export const addItemToList = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string }
  const { description, status } = request.body as { description: string; status: 'PENDING' | 'IN-PROGRESS' | 'DONE' }

  const list = staticLists.find((list) => list.id === id)
  if (!list) {
    return reply.status(404).send({ error: 'List not found' })
  }

  const newItem: ITodoItem = {
    id: (list.items.length + 1).toString(),
    description,
    status
  }
  list.items.push(newItem)
  reply.status(201).send({ data: newItem })
}

export const updateItemInList = async (request: FastifyRequest, reply: FastifyReply) => {
  const { listId, itemId } = request.params as { listId: string; itemId: string }
  const { description, status } = request.body as { description: string; status: 'PENDING' | 'IN-PROGRESS' | 'DONE' }

  const list = staticLists.find((list) => list.id === listId)
  if (!list) {
    return reply.status(404).send({ error: 'List not found' })
  }

  const item = list.items.find((item) => item.id === itemId)
  if (!item) {
    return reply.status(404).send({ error: 'Item not found' })
  }

  item.description = description
  item.status = status
  reply.send({ data: item })
}

export const deleteItemFromList = async (request: FastifyRequest, reply: FastifyReply) => {
  const { listId, itemId } = request.params as { listId: string; itemId: string }

  const list = staticLists.find((list) => list.id === listId)
  if (!list) {
    return reply.status(404).send({ error: 'List not found' })
  }

  const itemIndex = list.items.findIndex((item) => item.id === itemId)
  if (itemIndex === -1) {
    return reply.status(404).send({ error: 'Item not found' })
  }

  list.items.splice(itemIndex, 1)
  reply.send({ data: { message: 'Item deleted successfully' } })
}

export const addUser = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      // Get the data from the request body
      const { name } = request.body as { name: string };
      
      // Add the new user to your storage (e.g., an array, database)
      users.push({ name });
  
      reply.status(201).send({ message: "User created", user: { name } });
    } catch (err) {
      reply.status(500).send({ error: "Internal Server Error" });
    }
  };
