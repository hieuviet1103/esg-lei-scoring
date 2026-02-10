import { prisma } from '../index.js';

/**
 * Calculate all scores (LEI, ESG, KPI) for a product version based on rules
 */
export async function calculateScores(productVersionId: string) {
  const productVersion = await prisma.productVersion.findUnique({
    where: { id: productVersionId },
    include: {
      formVersion: {
        include: {
          form: true,
        },
      },
    },
  });

  if (!productVersion) {
    throw new Error('Product version not found');
  }

  const dataJson = productVersion.dataJson as any;
  if (!dataJson) {
    throw new Error('No data found for product version');
  }

  // Get active frameworks
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

  const results = [];

  for (const framework of frameworks) {
    if (framework.models.length === 0) continue;

    // Use first active model (could be enhanced to select based on appliesTo)
    const model = framework.models[0];

    let totalScore = 0;
    const details = [];
    const calculationSnapshot: any = {
      framework: framework.code,
      model: model.modelName,
      timestamp: new Date().toISOString(),
      inputs: {},
    };

    // Calculate based on framework type
    if (framework.code === 'LEI') {
      // LEI calculation from slider values
      const leiData = dataJson.lei;
      if (leiData && leiData.criteria) {
        for (const criteria of model.criteria) {
          const criteriaCode = criteria.code;
          const scoreValue = leiData.criteria[criteriaCode]?.score || 0;
          
          totalScore += scoreValue;
          details.push({
            criteriaId: criteria.id,
            scoreValue,
            evidenceStatus: checkEvidence(leiData.evidence, criteriaCode) ? 'ok' : 'missing',
            notes: null,
          });

          calculationSnapshot.inputs[criteriaCode] = scoreValue;
        }
      }
    } else if (framework.code === 'ESG') {
      // ESG calculation from checklist
      const esgData = dataJson.esg;
      if (esgData && esgData.pillars) {
        const pillarScores: any = {};

        for (const pillar of ['E', 'S', 'G']) {
          const pillarData = esgData.pillars[pillar];
          if (pillarData && pillarData.items) {
            let pillarScore = 0;
            for (const item of pillarData.items) {
              pillarScore += item.points || 0;
            }
            pillarScores[pillar] = pillarScore;
            totalScore += pillarScore;
          }
        }

        calculationSnapshot.inputs = pillarScores;

        // Create summary detail
        details.push({
          criteriaId: model.criteria[0]?.id || null,
          scoreValue: totalScore,
          evidenceStatus: esgData.evidence && esgData.evidence.length > 0 ? 'ok' : 'missing',
          notes: JSON.stringify(pillarScores),
        });
      }
    } else if (framework.code === 'KPI') {
      // KPI calculation - check if targets meet minPass
      const kpiData = dataJson.kpi;
      if (kpiData && kpiData.items) {
        let passCount = 0;
        let totalCount = 0;

        for (const kpi of kpiData.items) {
          totalCount++;
          if (kpi.target >= kpi.minPass) {
            passCount++;
          }
        }

        totalScore = totalCount > 0 ? (passCount / totalCount) * 100 : 0;
        calculationSnapshot.inputs = { passCount, totalCount, items: kpiData.items };

        details.push({
          criteriaId: model.criteria[0]?.id || null,
          scoreValue: totalScore,
          evidenceStatus: 'ok',
          notes: `${passCount}/${totalCount} KPIs passed`,
        });
      }
    }

    // Determine status
    let status = 'fail';
    if (model.passThreshold && totalScore >= model.passThreshold) {
      status = 'pass';
    } else if (model.warnThreshold && totalScore >= model.warnThreshold) {
      status = 'warn';
    }

    // Delete existing score for this framework
    await prisma.productScore.deleteMany({
      where: {
        productVersionId,
        frameworkId: framework.id,
      },
    });

    // Create new score
    const score = await prisma.productScore.create({
      data: {
        productVersionId,
        frameworkId: framework.id,
        scoreModelId: model.id,
        totalScore,
        status,
        calculationSnapshotJson: calculationSnapshot,
        details: {
          create: details.filter(d => d.criteriaId !== null),
        },
      },
      include: {
        framework: true,
        scoreModel: true,
        details: {
          include: {
            criteria: true,
          },
        },
      },
    });

    results.push(score);
  }

  return results;
}

/**
 * Check if evidence exists for a criteria
 */
function checkEvidence(evidence: any[], criteriaCode: string): boolean {
  if (!evidence || !Array.isArray(evidence)) return false;
  return evidence.some(e => e.criteria_code === criteriaCode);
}

/**
 * Validate rules from rules_json
 */
export function validateRules(dataJson: any, rulesJson: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!rulesJson || !rulesJson.validation) {
    return { valid: true, errors: [] };
  }

  for (const rule of rulesJson.validation) {
    if (rule.type === 'required') {
      for (const path of rule.paths) {
        const value = getValueByPath(dataJson, path);
        if (value === null || value === undefined || value === '') {
          errors.push(rule.message || `Required field missing: ${path}`);
        }
      }
    } else if (rule.type === 'minRows') {
      const value = getValueByPath(dataJson, rule.path);
      if (!Array.isArray(value) || value.length < rule.min) {
        errors.push(rule.message || `Minimum ${rule.min} rows required`);
      }
    }
    // Add more validation types as needed
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Get value from nested object by path string
 */
function getValueByPath(obj: any, path: string): any {
  const parts = path.split('.');
  let value = obj;
  for (const part of parts) {
    if (value === null || value === undefined) return undefined;
    value = value[part];
  }
  return value;
}

/**
 * Compute calculated fields from rules_json
 */
export function computeFields(dataJson: any, rulesJson: any): any {
  if (!rulesJson || !rulesJson.computed) {
    return dataJson;
  }

  const result = { ...dataJson };

  for (const rule of rulesJson.computed) {
    if (rule.type === 'sum') {
      let sum = 0;
      for (const sourcePath of rule.sources) {
        const value = getValueByPath(result, sourcePath);
        sum += parseFloat(value) || 0;
      }
      setValueByPath(result, rule.targetPath, Math.round(sum));
    } else if (rule.type === 'sumChecklistPoints') {
      let total = 0;
      for (const source of rule.sources) {
        const items = getValueByPath(result, source.path);
        if (Array.isArray(items)) {
          for (const item of items) {
            total += item.points || 0;
          }
        }
      }
      setValueByPath(result, rule.targetPath, Math.round(total));
    }
  }

  return result;
}

/**
 * Set value in nested object by path string
 */
function setValueByPath(obj: any, path: string, value: any): void {
  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!(parts[i] in current)) {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

