import { Router } from 'express';
import { prisma } from '../index.js';
import { createAuditLog } from '../services/audit.service.js';

const router = Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        versions: {
          orderBy: { versionNo: 'desc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get product by code
router.get('/:code', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { productCode: req.params.code },
      include: {
        versions: {
          include: {
            formVersion: {
              include: {
                form: true,
              },
            },
            scores: {
              include: {
                framework: true,
                details: {
                  include: {
                    criteria: true,
                  },
                },
              },
            },
          },
          orderBy: { versionNo: 'desc' },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create new product
router.post('/', async (req, res) => {
  try {
    const { productCode, productName, ownerBu, formCode, dataJson, createdBy } = req.body;

    // Get form version
    const form = await prisma.form.findUnique({
      where: { code: formCode },
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

    const product = await prisma.product.create({
      data: {
        productCode,
        productName,
        ownerBu,
        createdBy: createdBy || 'system',
        versions: {
          create: {
            versionNo: 1,
            formVersionId: form.versions[0].id,
            dataJson: dataJson || {},
            status: 'draft',
            createdBy: createdBy || 'system',
          },
        },
      },
      include: {
        versions: true,
      },
    });

    // Create audit log
    await createAuditLog({
      entityType: 'product',
      entityId: product.id,
      productVersionId: product.versions[0].id,
      action: 'create',
      afterJson: product,
      actor: createdBy || 'system',
    });

    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update product data (create new version or update existing)
router.put('/:code', async (req, res) => {
  try {
    const { dataJson, createdBy, createNewVersion = false } = req.body;

    const product = await prisma.product.findUnique({
      where: { productCode: req.params.code },
      include: {
        versions: {
          orderBy: { versionNo: 'desc' },
          take: 1,
        },
      },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const currentVersion = product.versions[0];

    if (createNewVersion) {
      // Create new version
      const newVersion = await prisma.productVersion.create({
        data: {
          productId: product.id,
          versionNo: currentVersion.versionNo + 1,
          formVersionId: currentVersion.formVersionId,
          dataJson,
          status: 'draft',
          createdBy: createdBy || 'system',
        },
      });

      await createAuditLog({
        entityType: 'product_version',
        entityId: newVersion.id,
        productVersionId: newVersion.id,
        action: 'create_version',
        afterJson: newVersion,
        actor: createdBy || 'system',
      });

      res.json(newVersion);
    } else {
      // Update current version
      const beforeData = currentVersion.dataJson;
      
      const updated = await prisma.productVersion.update({
        where: { id: currentVersion.id },
        data: {
          dataJson,
          updatedAt: new Date(),
        },
      });

      await createAuditLog({
        entityType: 'product_version',
        entityId: updated.id,
        productVersionId: updated.id,
        action: 'update',
        beforeJson: beforeData,
        afterJson: dataJson,
        actor: createdBy || 'system',
      });

      res.json(updated);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product
router.delete('/:code', async (req, res) => {
  try {
    await prisma.product.delete({
      where: { productCode: req.params.code },
    });
    res.json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get product version data
router.get('/:code/versions/:versionNo', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { productCode: req.params.code },
      include: {
        versions: {
          where: { versionNo: parseInt(req.params.versionNo) },
          include: {
            formVersion: {
              include: {
                form: true,
              },
            },
            scores: {
              include: {
                framework: true,
                details: {
                  include: {
                    criteria: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!product || !product.versions[0]) {
      return res.status(404).json({ error: 'Product version not found' });
    }

    res.json(product.versions[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

