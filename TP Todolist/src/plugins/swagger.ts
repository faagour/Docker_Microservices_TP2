import fp from 'fastify-plugin';
import swagger, { FastifySwaggerOptions } from '@fastify/swagger';
import JsonSchemas from '../schema/all.json'

export default fp<FastifySwaggerOptions>(async (fastify) => {
 fastify.addSchema({
    $id: 'ITodoList',
    ...JsonSchemas.definitions.ITodoList
  })
  fastify.addSchema({
    $id: 'ITodoItem',
    ...JsonSchemas.definitions.ITodoItem
  })

  fastify.register(swagger, {
    openapi: {
      info: {
        title: 'Todo API',
        description: 'API for managing todo lists and items',
        version: '1.0.0'
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server'
        }
      ],
      paths: {
        '/lists': {
          get: {
            summary: 'Get all todo lists',
            tags: ['Lists'],
            responses: {
              '200': {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'array',
                          items: {
                            $ref: '#/components/schemas/TodoList'
                          }
                        }
                      }
                    }
                  }
                }
              },
              '500': {
                description: 'Internal Server Error',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Error'
                    }
                  }
                }
              }
            }
          },
          post: {
            summary: 'Create a new todo list',
            tags: ['Lists'],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      name: { type: 'string' },
                      description: { type: 'string' }
                    },
                    required: ['id', 'name', 'description']
                  }
                }
              }
            },
            responses: {
              '201': {
                description: 'List created successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        data: {
                          $ref: '#/components/schemas/TodoList'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        '/lists/{id}': {
          put: {
            summary: 'Update a todo list',
            tags: ['Lists'],
            parameters: [
              {
                name: 'id',
                in: 'path',
                required: true,
                schema: {
                  type: 'string'
                }
              }
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      name: { type: 'string' },
                      description: { type: 'string' }
                    },
                    required: ['name', 'description']
                  }
                }
              }
            },
            responses: {
              '200': {
                description: 'List updated successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        data: {
                          $ref: '#/components/schemas/TodoList'
                        }
                      }
                    }
                  }
                }
              },
              '404': {
                description: 'List not found',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Error'
                    }
                  }
                }
              }
            }
          }
        },
        '/lists/{id}/items': {
          post: {
            summary: 'Add an item to a todo list',
            tags: ['Items'],
            parameters: [
              {
                name: 'id',
                in: 'path',
                required: true,
                schema: {
                  type: 'string'
                }
              }
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      description: { type: 'string' },
                      status: {
                        type: 'string',
                        enum: ['PENDING', 'IN-PROGRESS', 'DONE']
                      }
                    },
                    required: ['description', 'status']
                  }
                }
              }
            },
            responses: {
              '201': {
                description: 'Item added successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        data: {
                          $ref: '#/components/schemas/TodoItem'
                        }
                      }
                    }
                  }
                }
              },
              '404': {
                description: 'List not found',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Error'
                    }
                  }
                }
              }
            }
          }
        },
        '/lists/{listId}/items/{itemId}': {
          put: {
            summary: 'Update an item in a todo list',
            tags: ['Items'],
            parameters: [
              {
                name: 'listId',
                in: 'path',
                required: true,
                schema: {
                  type: 'string'
                }
              },
              {
                name: 'itemId',
                in: 'path',
                required: true,
                schema: {
                  type: 'string'
                }
              }
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      description: { type: 'string' },
                      status: {
                        type: 'string',
                        enum: ['PENDING', 'IN-PROGRESS', 'DONE']
                      }
                    },
                    required: ['description', 'status']
                  }
                }
              }
            },
            responses: {
              '200': {
                description: 'Item updated successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        data: {
                          $ref: '#/components/schemas/TodoItem'
                        }
                      }
                    }
                  }
                }
              },
              '404': {
                description: 'List or item not found',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Error'
                    }
                  }
                }
              }
            }
          },
          delete: {
            summary: 'Delete an item from a todo list',
            tags: ['Items'],
            parameters: [
              {
                name: 'listId',
                in: 'path',
                required: true,
                schema: {
                  type: 'string'
                }
              },
              {
                name: 'itemId',
                in: 'path',
                required: true,
                schema: {
                  type: 'string'
                }
              }
            ],
            responses: {
              '200': {
                description: 'Item deleted successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'object',
                          properties: {
                            message: { type: 'string' }
                          }
                        }
                      }
                    }
                  }
                }
              },
              '404': {
                description: 'List or item not found',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Error'
                    }
                  }
                }
              }
            }
          }
        }
      },
      components: {
        schemas: {
          TodoItem: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              description: { type: 'string' },
              status: {
                type: 'string',
                enum: ['PENDING', 'IN-PROGRESS', 'DONE']
              }
            }
          },
          TodoList: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              description: { type: 'string' },
              items: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/TodoItem'
                }
              }
            }
          },
          Error: {
            type: 'object',
            properties: {
              error: { type: 'string' }
            }
          }
        }
      }
    }
  });
});