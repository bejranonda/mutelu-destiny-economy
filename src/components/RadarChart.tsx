import React from 'react';

interface RadarChartProps {
    data: { label: string; value: number; color?: string }[];
    size?: number;
    max?: number;
    className?: string;
    fillColor?: string;
    strokeColor?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({
    data,
    size = 300,
    max = 10,
    className = "",
    fillColor = "rgba(234, 179, 8, 0.4)", // yellow-500 with opacity
    strokeColor = "#EAB308" // yellow-500
}) => {
    const center = size / 2;
    const radius = (size / 2) - 40; // Padding
    const angleSlice = (Math.PI * 2) / data.length;

    // Helper to get coordinates
    const getCoords = (value: number, index: number) => {
        const angle = index * angleSlice - Math.PI / 2; // Start from top
        const r = (value / max) * radius;
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        return { x, y };
    };

    // Generate path for the data polygon
    const pathData = data.map((d, i) => {
        const { x, y } = getCoords(d.value, i);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ') + ' Z';

    // Generate grid levels
    const gridLevels = [0.25, 0.5, 0.75, 1];

    return (
        <div className={`relative flex justify-center items-center ${className}`}>
            <svg width={size} height={size} className="overflow-visible">
                {/* Grid Circles */}
                {gridLevels.map((level, i) => (
                    <circle
                        key={i}
                        cx={center}
                        cy={center}
                        r={radius * level}
                        fill="none"
                        stroke="#e5e7eb"
                        strokeDasharray="4 4"
                        className="opacity-30"
                    />
                ))}

                {/* Axis Lines */}
                {data.map((_, i) => {
                    const { x, y } = getCoords(max, i);
                    return (
                        <line
                            key={i}
                            x1={center}
                            y1={center}
                            x2={x}
                            y2={y}
                            stroke="#e5e7eb"
                            className="opacity-30"
                        />
                    );
                })}

                {/* Data Polygon */}
                <path
                    d={pathData}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth="2"
                    className="drop-shadow-md transition-all duration-1000 ease-out"
                />

                {/* Labels */}
                {data.map((d, i) => {
                    // Push labels out a bit further than max radius
                    const angle = i * angleSlice - Math.PI / 2;
                    const labelRadius = radius + 25;
                    const x = center + labelRadius * Math.cos(angle);
                    const y = center + labelRadius * Math.sin(angle);

                    return (
                        <g key={i} className="text-xs font-medium fill-current text-white">
                            <text
                                x={x}
                                y={y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="fill-gray-200"
                                style={{ fontSize: '10px' }}
                            >
                                {d.label}
                            </text>
                        </g>
                    );
                })}

                {/* Data Points */}
                {data.map((d, i) => {
                    const { x, y } = getCoords(d.value, i);
                    return (
                        <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="3"
                            fill={strokeColor}
                            className="transition-all duration-1000 ease-out"
                        />
                    );
                })}
            </svg>
        </div>
    );
};
