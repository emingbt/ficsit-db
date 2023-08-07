import express from 'express'
import { createBlueprint, deleteBlueprint, getAllBlueprints, getBlueprintByTitle } from '../services/blueprint'

const router = express.Router()

// Get all blueprints
router.get('/', async (req, res) => {
  const blueprints = await getAllBlueprints()

  res.json(blueprints)
})

// Get blueprint by title
router.get('/:title', async (req, res) => {
  const title: string = req.params.title

  const blueprint = await getBlueprintByTitle(title)

  if (!blueprint) {
    res.status(404)
    res.json({
      message: 'Blueprint not found'
    })
    return
  }

  res.json(blueprint)
})

// Create blueprint
router.post('/', async (req, res) => {
  const { title, description, files, images, categories, designerId } = req.body

  const blueprint = await createBlueprint({
    title,
    description,
    files,
    images,
    categories,
    designerId
  })

  // if blueprint could not be created, throw error
  if (!blueprint) {
    res.status(400)
    res.json({
      message: 'Blueprint could not be created'
    })
    return
  }

  res.json(blueprint)
})

// Delete blueprint
// for development purposes only
// might be removed in production, I don't know yet
router.delete('/:id', async (req, res) => {
  const { id } = req.params

  const blueprint = await deleteBlueprint(id)

  if (!blueprint) {
    res.status(404)
    res.json({
      message: 'Blueprint not found'
    })
    return
  }

  res.json(blueprint)
})