import express from 'express'
import setupRoutes from './router'

const app = express()
app.use(express.json())
setupRoutes(app)

export { app }
