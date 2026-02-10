import { Router } from 'express';
import { prisma } from '../index.js';
import { calculateScores } from '../services/scoring.service.js';

const router = Router();

// Calculate scores for a product version
router.post('/calculate/:productCode', async (req, res) => {
  try {
    const { versionNo } = req.body;

    const product = await prisma.product.findUnique({
      where: { productCode: req.params.productCode },
      include: {
        versions: {
          where: versionNo ? { versionNo: parseInt(versionNo) } : undefined,
          orderBy: { versionNo: 'desc' },
          take: 1,
        },
      },
    });

    if (!product || !product.versions[0]) {
      return res.status(404).json({ error: 'Product version not found' });
    }

    const scores = await calculateScores(product.versions[0].id);
    res.json(scores);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get scores for a product
router.get('/:productCode', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { productCode: req.params.productCode },
      include: {
        versions: {
          include: {
            scores: {
              include: {
                framework: true,
                scoreModel: true,
                details: {
                  include: {
                    criteria: true,
                  },
                  orderBy: {
                    criteria: { orderNo: 'asc' },
                  },
                },
              },
            },
          },
          orderBy: { versionNo: 'desc' },
          take: 1,
        },
      },
    });

    if (!product || !product.versions[0]) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product.versions[0].scores);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get score frameworks
router.get('/frameworks', async (req, res) => {
  try {
    const frameworks = await prisma.scoreFramework.findMany({
      where: { isActive: true },
      include: {
        models: {
          where: { isActive: true },
          include: {
            criteria: {
              orderBy: { orderNo: 'asc' },
            },
          },
        },
      },
    });
    res.json(frameworks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

