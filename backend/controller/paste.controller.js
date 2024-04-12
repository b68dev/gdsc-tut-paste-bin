import db from '../helpers/db.js';
import { makeId } from '../utils/rand.js';

const getAllPastes = (req, res) => {
    try {
        db('pastes').select().then((data) => {
            const mapdata = data.map((paste) => {
                delete paste.id
                delete paste.content;
                delete paste.viewonce;
                return paste;
            });

            res.json(mapdata);
        }).catch((err) => {
            res.status(500).send(err);
        })
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const createPaste = (req, res) => {
    try {
        let { content, viewonce } = req.body;
        if(!content) return res.status(400).send('Content is required');
        
        if(viewonce) {
            viewonce = true;
        }
        else {
            viewonce = false;
        }
        const slug = makeId(6);
        db('pastes').insert({
            content,
            slug,
            viewonce
        }).then(() => res.status(200).json({
            message: 'Posted Successfully',
            slug
        })).catch(err => res.status(500).send(err.message))
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const getPasteBySlug = (req, res) => {
    try {
        const { slug } = req.params;
        if(!slug) return res.status(400).send('Slug is required');
        db('pastes').where({ slug }).first().then((data) => {
            if(!data) {
                return res.status(404).send('Paste not found');
            }

            if(data?.viewonce) {
                db('pastes').where({ slug }).del().then((data) => {
                    console.log('Deleted');
                })
            }
            return res.json(data);
        }).catch((err) => {
            res.status(500).send(err.message);
        })
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const getRawPasteBySlug = (req, res) => {
    try {
        const { slug } = req.params;
        if(!slug) return res.status(400).send('Slug is required');
        db('pastes').where({ slug }).first().then((data) => {
            if(!data) {
                return res.status(404).send('Paste not found');
            }

            if(data?.viewonce) {
                db('pastes').where({ slug }).del().then((data) => {
                    console.log('Deleted');
                })
            }
            return res.send(data.content);
        }).catch((err) => {
            res.status(500).send(err);
        })
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export {
    createPaste,
    getAllPastes,
    getPasteBySlug,
    getRawPasteBySlug,
}