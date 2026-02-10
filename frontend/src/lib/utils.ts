import clsx, { ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getValueByPath(obj: any, path: string): any {
  const parts = path.split('.');
  let value = obj;
  for (const part of parts) {
    if (value === null || value === undefined) return undefined;
    value = value[part];
  }
  return value;
}

export function setValueByPath(obj: any, path: string, value: any): void {
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

export function getScoreColor(score: number, passThreshold: number, warnThreshold: number): string {
  if (score >= passThreshold) return 'text-green-600';
  if (score >= warnThreshold) return 'text-yellow-600';
  return 'text-red-600';
}

export function getScoreBgColor(score: number, passThreshold: number, warnThreshold: number): string {
  if (score >= passThreshold) return 'bg-green-50 border-green-200';
  if (score >= warnThreshold) return 'bg-yellow-50 border-yellow-200';
  return 'bg-red-50 border-red-200';
}

export function getStatusBadgeColor(status: string): string {
  const colors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-800',
    submitted: 'bg-blue-100 text-blue-800',
    review: 'bg-yellow-100 text-yellow-800',
    pilot: 'bg-purple-100 text-purple-800',
    golive: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    archived: 'bg-gray-100 text-gray-600',
    pass: 'bg-green-100 text-green-800',
    warn: 'bg-yellow-100 text-yellow-800',
    fail: 'bg-red-100 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

