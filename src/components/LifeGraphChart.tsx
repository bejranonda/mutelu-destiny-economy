import React from 'react';

interface LifeGraphChartProps {
    data: { label: string; score: number }[];
    color?: string;
    className?: string;
}

export const LifeGraphChart: React.FC<LifeGraphChartProps> = ({
    data,
    color = "#F59E0B", // amber-500
    className = ""
}) => {
    const height = 200;
    const width = 600;
    const padding = 30;

    // Scales
    const xScale = (index: number) => padding + (index * (width - 2 * padding) / (data.length - 1));
    const yScale = (score: number) => height - padding - ((score / 12) * (height - 2 * padding));

    // Path Generation
    const points = data.map((d, i) => `${xScale(i)},${yScale(d.score)}`).join(' ');

    return (
        <div className={`w-full overflow-x-auto ${className}`}>
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[300px]">
                {/* Background Grid */}
                {[3, 6, 9, 12].map(level => (
                    <line
                        key={level}
                        x1={padding}
                        y1={yScale(level)}
                        x2={width - padding}
                        y2={yScale(level)}
                        stroke="#e2e8f0"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        opacity="0.2"
                    />
                ))}

                {/* The Line */}
                <polyline
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    points={points}
                    className="drop-shadow-md"
                />

                {/* Data Points */}
                {data.map((d, i) => (
                    <g key={i}>
                        <circle
                            cx={xScale(i)}
                            cy={yScale(d.score)}
                            r="4"
                            fill={d.score >= 10 ? "#22c55e" : d.score <= 3 ? "#ef4444" : color}
                            stroke="white"
                            strokeWidth="2"
                            className="hover:r-6 transition-all cursor-pointer"
                        />
                        {/* Show value on top if high/low */}
                        {(d.score >= 10 || d.score <= 3) && (
                            <text
                                x={xScale(i)}
                                y={yScale(d.score) - 10}
                                textAnchor="middle"
                                fontSize="10"
                                fill={d.score >= 10 ? "#22c55e" : "#ef4444"}
                                fontWeight="bold"
                            >
                                {d.score}
                            </text>
                        )}

                        {/* X-Axis Labels */}
                        <text
                            x={xScale(i)}
                            y={height - 5}
                            textAnchor="middle"
                            fontSize="8"
                            fill="#94a3b8"
                        >
                            {d.label.split(' ')[0]} {/* Show only Thai part for compactness */}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
};
