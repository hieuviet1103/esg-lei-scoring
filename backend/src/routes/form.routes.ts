import { Router } from 'express';
import { prisma } from '../index.js';

const router = Router();

// Get all forms
router.get('/', async (req, res) => {
  try {
    const forms = await prisma.form.findMany({
      include: {
        versions: {
          where: { isActive: true },
          orderBy: { versionNo: 'desc' },
          take: 1,
        },
      },
    });
    res.json(forms);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get form by code with active version
router.get('/:code', async (req, res) => {
  try {
    const form = await prisma.form.findUnique({
      where: { code: req.params.code },
      include: {
        versions: {
          where: { isActive: true },
          include: {
            sections: {
              include: {
                fields: {
                  orderBy: { orderNo: 'asc' },
                },
              },
              orderBy: { orderNo: 'asc' },
            },
          },
          orderBy: { versionNo: 'desc' },
          take: 1,
        },
      },
    });

    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }

    res.json(form);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get form schema JSON (for dynamic rendering)
router.get('/:code/schema', async (req, res) => {
  try {
    const form = await prisma.form.findUnique({
      where: { code: req.params.code },
      include: {
        versions: {
          where: { isActive: true },
          orderBy: { versionNo: 'desc' },
          take: 1,
        },
      },
    });

    if (!form || !form.versions[0]) {
      return res.status(404).json({ error: 'Form not found' });
    }

    const version = form.versions[0];
    res.json(version.configJson);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create new form with version
router.post('/', async (req, res) => {
  try {
    const { code, name, configJson } = req.body;

    const form = await prisma.form.create({
      data: {
        code,
        name,
        versions: {
          create: {
            versionNo: 1,
            configJson,
            isActive: true,
          },
        },
      },
      include: {
        versions: true,
      },
    });

    res.status(201).json(form);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update form (create new version)
router.put('/:code', async (req, res) => {
  try {
    const { configJson } = req.body;

    const form = await prisma.form.findUnique({
      where: { code: req.params.code },
      include: {
        versions: {
          orderBy: { versionNo: 'desc' },
          take: 1,
        },
      },
    });

    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }

    const newVersionNo = (form.versions[0]?.versionNo || 0) + 1;

    const newVersion = await prisma.formVersion.create({
      data: {
        formId: form.id,
        versionNo: newVersionNo,
        configJson,
        isActive: true,
      },
    });

    res.json(newVersion);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

