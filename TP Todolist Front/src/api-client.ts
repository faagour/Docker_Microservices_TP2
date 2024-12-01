import axios from 'axios'

const lists = ['Work Tasks', 'Personal Tasks', 'Shopping List']
const listItems: Record<string, string[]> = {
    'Work Tasks': ['Buy groceries', 'Complete React project', 'Exercise for 30 minutes', 'Read a book chapter'],
    'Personal Tasks': ['Buy groceries', 'Complete React project', 'Exercise for 30 minutes', 'Read a book chapter'],
    'Shopping List': ['Buy groceries', 'Complete React project', 'Exercise for 30 minutes', 'Read a book chapter']
}

export const apiClient = {
    getLists: async () => {
        return axios.get('http://localhost:3005/lists').then(res => res.data)
    },
 
    addList: async (listName: string) => {
        return axios.post('http://localhost:3005/lists', listName).then(res => res.data)
    },

    getTodos: async (listName: string): Promise<string[]> => {
        return Promise.resolve(listItems[listName])
    },
    addTodo: async (listName: string, todo: string) => {
        return axios.post('http://localhost:3005/lists/' + listName + '/items', todo).then(res => res.data)
    }
}
