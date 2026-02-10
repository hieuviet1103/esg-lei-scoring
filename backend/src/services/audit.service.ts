import { prisma } from '../index.js';

interface CreateAuditLogParams {
  entityType: string;
  entityId: string;
  productVersionId?: string;
  action: string;
  beforeJson?: any;
  afterJson?: any;
  actor: string;
}

export async function createAuditLog(params: CreateAuditLogParams) {
  return await prisma.auditLog.create({
    data: {
      entityType: params.entityType,
      entityId: params.entityId,
      productVersionId: params.productVersionId,
      action: params.action,
      beforeJson: params.beforeJson,
      afterJson: params.afterJson,
      actor: params.actor,
    },
  });
}

export async function getAuditLogs(productVersionId: string) {
  return await prisma.auditLog.findMany({
    where: { productVersionId },
    orderBy: { createdAt: 'desc' },
  });
}

