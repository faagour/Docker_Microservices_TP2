export interface ITodoItem {
    id: string
    description: string
    status: 'PENDING' | 'IN-PROGRESS' | 'DONE'
  }
  
  export interface ITodoList {
    id: string
    name: string
    description: string
    items: ITodoItem[]
  }
  