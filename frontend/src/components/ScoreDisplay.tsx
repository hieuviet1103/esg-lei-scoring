import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { getScoreColor, getScoreBgColor, getStatusBadgeColor } from '@/lib/utils';

interface ScoreDisplayProps {
  score: any;
}

export default function ScoreDisplay({ score }: ScoreDisplayProps) {
  const { framework, totalScore, status, scoreModel } = score;
  const passThreshold = scoreModel?.passThreshold || 80;
  const warnThreshold = scoreModel?.warnThreshold || 60;

  const getIcon = () => {
    if (status === 'pass') return <TrendingUp className="h-6 w-6 text-green-600" />;
    if (status === 'warn') return <Minus className="h-6 w-6 text-yellow-600" />;
    return <TrendingDown className="h-6 w-6 text-red-600" />;
  };

  const getFrameworkIcon = (code: string) => {
    const icons: Record<string, string> = {
      LEI: '✨',
      ESG: '🌿',
      KPI: '🎯',
    };
    return icons[code] || '📊';
  };

  return (
    <div className={`card border-2 ${getScoreBgColor(totalScore, passThreshold, warnThreshold)}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <span className="text-3xl mr-3">{getFrameworkIcon(framework.code)}</span>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{framework.name}</h3>
            <p className="text-sm text-gray-600">{framework.code}</p>
          </div>
        </div>
        {getIcon()}
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className={`text-4xl font-bold ${getScoreColor(totalScore, passThreshold, warnThreshold)}`}>
            {totalScore.toFixed(0)}
          </div>
          <div className="text-sm text-gray-600 mt-1">/ {framework.maxScore}</div>
        </div>
        <div className="text-right">
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadgeColor(status)}`}>
            {status === 'pass' ? 'Đạt' : status === 'warn' ? 'Cảnh báo' : 'Không đạt'}
          </span>
          <div className="text-xs text-gray-500 mt-2">
            Pass: ≥{passThreshold}
          </div>
        </div>
      </div>

      {/* Score Details */}
      {score.details && score.details.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="space-y-2">
            {score.details.map((detail: any) => (
              <div key={detail.id} className="flex justify-between items-center text-sm">
                <span className="text-gray-700">{detail.criteria?.name}</span>
                <span className="font-medium text-gray-900">
                  {detail.scoreValue.toFixed(0)} / {detail.criteria?.maxPoints}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

