'use client';

import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { DollarSign, Users, UserPlus, ShoppingCart } from 'lucide-react';
import StatsCard from '~/components/elements/StatsCard';

type Series = {
    name?: string;
    data: number[];
};
type Option = {
    series: number[] | Series[];
    options: {
        legend?: {
            labels: {
                colors: string; // Change the color of the series names
            };
        };
        chart?:
            | {
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
              }
            | ApexChart;
        dataLabels?: {
            enabled: boolean;
        };
        yaxis?: {
            labels: {
                style: {
                    colors: string; // Change the color of y-axis labels
                };
            };
        };
        xaxis?: {
            type: 'datetime' | 'category';
            categories: string[];
            // Change the color of categories (x-axis labels)
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

const Dashboard = () => {
    const [areaChart, setAreaCart] = useState<Option>({
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
                categories: ['2018-09-19', '2018-09-20', '2018-09-21', '2018-09-22', '2018-09-23', '2018-09-24'],
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy',
                },
            },
        },
    });
    const [pieChart, setPieCart] = useState<Option>({
        series: [44, 55, 41, 17],
        options: {
            chart: {
                height: 400,
                type: 'donut',
            },
        },
    });
    useEffect(() => {
        setAreaCart({
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
                            colors: 'var(--text)', // Change the color of y-axis labels
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
                        colors: 'text-reverse', // Change the color of the series names
                    },
                },
            },
        });
        setPieCart({
            series: [44, 55, 41, 17, 15],
            options: {
                chart: {
                    height: 350,
                    type: 'donut',
                },
                legend: {
                    labels: {
                        colors: 'text-reverse', // Change the color of the series names
                    },
                },
            },
        });
    }, []);
    return (
        <div className=''>
            <div className='flex justify-between'>
                <StatsCard
                    title="Today's Money"
                    amount='$53,000'
                    percentage={55}
                    since='since yesterday'
                    icon={DollarSign}
                    bgColor='bg-gradient-to-tl from-blue-500 to-violet-500'
                    iconColor='text-white'
                />
                <StatsCard
                    title="Today's Users"
                    amount='2,300'
                    percentage={3}
                    since='since last week'
                    icon={Users}
                    bgColor='bg-gradient-to-tl from-red-600 to-orange-600'
                    iconColor='text-white'
                />
                <StatsCard
                    title='New Clients'
                    amount='+3,462'
                    percentage={-2}
                    since='since last quarter'
                    icon={UserPlus}
                    bgColor='bg-gradient-to-tl from-emerald-500 to-teal-400'
                    iconColor='text-white'
                />
                <StatsCard
                    title='Sales'
                    amount='$103,430'
                    percentage={5}
                    since='than last month'
                    icon={ShoppingCart}
                    bgColor='bg-gradient-to-tl from-orange-500 to-yellow-500'
                    iconColor='text-white'
                />
            </div>
            <div className='gap my-6 grid grid-cols-1 justify-between lg:grid-cols-[58%,40%] '>
                <div className='rounded-3xl bg-card p-2'>
                    <ReactApexChart options={areaChart.options} series={areaChart.series} height={350} type='area' />
                </div>
                <div className='rounded-3xl bg-card p-2  '>
                    <div className='mt-10 '>
                        <ReactApexChart options={pieChart.options} series={pieChart.series} height={350} type='donut' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
