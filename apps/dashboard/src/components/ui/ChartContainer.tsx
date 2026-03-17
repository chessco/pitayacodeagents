import { ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './Card';

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
}

export function ChartContainer({ title, subtitle, children, action }: ChartContainerProps) {
  return (
    <Card className="flex flex-col h-full bg-[#090a0f]">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <CardTitle className="text-sm font-bold text-white tracking-wider uppercase">{title}</CardTitle>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center items-center min-h-[200px]">
        {children}
      </CardContent>
    </Card>
  );
}
