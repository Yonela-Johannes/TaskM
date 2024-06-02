import { Express, Request, Response } from 'express'
import swaggerUi from "swagger-ui-express";
import SwaggerJsdoc from 'swagger-jsdoc'
import {version} from '../../package-lock.json'

const options: SwaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API Docs",
            version
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                },
            },
        },
        security: [{
            bearerAuth: [],
        }]
    },
    apis: ["./src/routes/routes.ts", "./src/schema/*.ts"]
}

const swaggerspec = SwaggerJsdoc(options)

function swaggerDocs(app: Express, port: number){
    // Swagger page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerspec))

    // Docs in JSON format
    app.get("docs.json", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json")
        res.send(swaggerspec);
    });
    console.log(`Docs available at http://localhost:${port}/docs`)
}

export default swaggerDocs
