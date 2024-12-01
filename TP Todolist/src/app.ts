import { join } from 'path';
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import { FastifyPluginAsync, FastifyServerOptions } from 'fastify';
import listsRoutes from './routes/lists';
import SwaggerUI from '@fastify/swagger-ui';
import cors from '@fastify/cors'

export interface AppOptions extends FastifyServerOptions, Partial<AutoloadPluginOptions> {}

const options: AppOptions = {}

const app: FastifyPluginAsync<AppOptions> = async (fastify, opts): Promise<void> => {
  // Auto-load plugins (including swagger) first
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  });

  // Then register Swagger UI plugin
  void fastify.register(SwaggerUI, {
    routePrefix: '/api-docs',
  });

  // Auto-load routes
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts,
  });

  // Register the lists routes directly
  void fastify.register(listsRoutes); 

  fastify.register(cors, {
    origin: '*'
  })
};

export default app;
export { app, options };