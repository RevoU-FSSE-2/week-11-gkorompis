export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'eleven.',
      version: '1.0.0',
      description: 'Welcome to the API documentation for Reporting Portal App.',
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: "JWT"
        }
      },
    },
    security: [
      {
        bearerAuth: []
      }
    ],
    servers: [
      {
        url: 'https://gedldowmye.execute-api.ap-southeast-3.amazonaws.com/prod',
      }
    ],
    tags: [
      {
        name: 'Users and Sign Up',
        description: 'Endpoints related to Sign Up',
      },
      {
        name: 'Sign In',
        description: 'Endpoints related to Sign In',
      },
      {
        name: 'Services',
        description: 'Endpoints related to services',
      },
      {
        name: 'Service Request',
        description: 'Endpoints related to serviceRequest',
      },
      {
        name: 'Report Storage',
        description: 'Endpoints related to storageReport',
      },                   
    ]
  },
  apis: ["./router/usersRouter.js", "./router/*.js"]
};
