const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get('/', async(req, res) => {
  try {
    const tagsData = await Tag.findAll({
      include: [{
        model: Product,
        through: ProductTag
      }],
    })
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  try {
    const tagById = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
        through: ProductTag
      }],
    });

    if (!tagById) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(tagById);

  } catch (err) {
    res.status(500).json(err);
  }
});

/*
{
  "tag_name": "vintage"
}
*/
router.post('/', async(req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async(req, res) => {
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!updateTag) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  try {
    const delTag = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    })
    if (!delTag) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(delTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
