'use client';

import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

type Series = {
    name?: string;
    data: number[];
};
type Option = {
    series: number[] | Series[];
    options: {
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
        xaxis?: {
            type: 'datetime' | 'category';
            categories: string[];
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
const DashboardPage = () => {
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
                height: 350,
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
                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yy',
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
            },
        });
    }, []);
    return (
        <div className='mx-6'>
            <div className='gap my-6 grid grid-cols-1 gap-6 lg:grid-cols-[60%,40%] '>
                <div className='rounded-3xl bg-white p-2'>
                    <ReactApexChart options={areaChart.options} series={areaChart.series} height={350} type='area' />
                </div>
                <div className='rounded-3xl bg-white p-2'>
                    {' '}
                    <div className='mt-10'>
                        <ReactApexChart options={pieChart.options} series={pieChart.series} height={350} type='donut' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
