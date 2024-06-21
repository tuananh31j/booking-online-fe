export type Series = {
    name?: string;
    data: number[];
};

export type Option = {
    series: number[] | Series[];
    options: {
        legend?: {
            labels: {
                colors: string;
            };
        };
        chart?: {
            type:
                | 'line'
                | 'area'
                | 'bar'
                | 'pie'
                | 'donut'
                | 'radialBar'
                | 'scatter'
                | 'bubble'
                | 'heatmap'
                | 'candlestick'
                | 'boxPlot'
                | 'radar'
                | 'polarArea'
                | 'rangeBar'
                | 'rangeArea'
                | 'treemap';
            height: number;
        };
        dataLabels?: {
            enabled: boolean;
        };
        yaxis?: {
            labels: {
                style: {
                    colors: string;
                };
            };
        };
        xaxis?: {
            type: 'datetime' | 'category';
            categories: string[];
            labels?: {
                style: {
                    colors: string;
                };
            };
        };
        stroke?: {
            curve:
                | 'smooth'
                | 'straight'
                | 'stepline'
                | 'linestep'
                | 'monotoneCubic'
                | ('smooth' | 'straight' | 'stepline' | 'linestep' | 'monotoneCubic')[];
        };
        tooltip?: {
            x: {
                format: string;
            };
        };
    };
};

export const areaChartOption: Option = {
    series: [
        {
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
            name: 'series2',
            data: [11, 32, 45, 32, 34, 52, 41],
        },
    ],
    options: {
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            type: 'datetime',
            categories: [
                '2018-09-19',
                '2018-09-20',
                '2018-09-21',
                '2018-09-22',
                '2018-09-23',
                '2018-09-24',
                '2018-09-25',
            ],
            labels: {
                style: {
                    colors: 'var(--text)',
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: 'var(--text)',
                },
            },
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy',
            },
        },
        legend: {
            labels: {
                colors: 'text-reverse',
            },
        },
    },
};

export const pieChartOption: Option = {
    series: [44, 55, 41, 17, 15],
    options: {
        chart: {
            height: 350,
            type: 'donut',
        },
        legend: {
            labels: {
                colors: 'text-reverse',
            },
        },
    },
};
