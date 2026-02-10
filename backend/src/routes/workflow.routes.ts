import { Router } from 'express';
import { prisma } from '../index.js';

const router = Router();

// Get workflow for a product
router.get('/:productCode', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { productCode: req.params.productCode },
      include: {
        versions: {
          include: {
            workflowInstances: {
              include: {
                workflow: true,
                actions: {
                  orderBy: { createdAt: 'desc' },
                },
              },
              orderBy: { startedAt: 'desc' },
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

    res.json(product.versions[0].workflowInstances);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create workflow instance
router.post('/:productCode/start', async (req, res) => {
  try {
    const { workflowCode, actor } = req.body;

    const product = await prisma.product.findUnique({
      where: { productCode: req.params.productCode },
      include: {
        versions: {
          orderBy: { versionNo: 'desc' },
          take: 1,
        },
      },
    });

    if (!product || !product.versions[0]) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const workflow = await prisma.workflowDefinition.findUnique({
      where: { code: workflowCode },
    });

    if (!workflow) {
      return res.status(404).json({ error: 'Workflow not found' });
    }

    const instance = await prisma.workflowInstance.create({
      data: {
        workflowId: workflow.id,
        productVersionId: product.versions[0].id,
        currentStep: 'start',
        currentStatus: 'in_progress',
        actions: {
          create: {
            stepCode: 'start',
            action: 'submit',
            actor: actor || 'system',
            comment: 'Workflow started',
          },
        },
      },
      include: {
        workflow: true,
        actions: true,
      },
    });

    res.status(201).json(instance);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Add workflow action
router.post('/:productCode/action', async (req, res) => {
  try {
    const { instanceId, stepCode, action, actor, comment } = req.body;

    const workflowAction = await prisma.workflowAction.create({
      data: {
        instanceId,
        stepCode,
        action,
        actor: actor || 'system',
        comment,
      },
    });

    // Update instance status
    await prisma.workflowInstance.update({
      where: { id: instanceId },
      data: {
        currentStep: stepCode,
        currentStatus: action === 'approve' ? 'completed' : action === 'reject' ? 'rejected' : 'in_progress',
        ...(action === 'approve' && { endedAt: new Date() }),
      },
    });

    res.status(201).json(workflowAction);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

