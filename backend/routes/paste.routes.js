import { Router } from 'express'
import { createPaste, getAllPastes, getPasteBySlug, getRawPasteBySlug } from '../controller/paste.controller.js'

const route = Router()

route.get('/', getAllPastes)
route.post('/a', createPaste)
route.get('/:slug', getPasteBySlug)
route.get('/:slug/r', getRawPasteBySlug)

export default route