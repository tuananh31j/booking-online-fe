'use client';

import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { DollarSign, Users, UserPlus, ShoppingCart } from 'lucide-react';
import StatsCard from '~/components/elements/StatsCard';
import { areaChartOption, Option, pieChartOption } from './options';

const DashboardPage = () => {
    const [areaChart, setAreaCart] = useState<Option>(areaChartOption);
    const [pieChart, setPieCart] = useState<Option>(pieChartOption);

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
                        colors: 'text-reverse',
                    },
                },
            },
        });
    }, []);

    return (
        <div>
            <div className='flex flex-wrap justify-evenly'>
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
            <div className='gap my-6 grid grid-cols-1 justify-between lg:grid-cols-[58%,40%]'>
                <div className='rounded-3xl bg-card p-2 sm:m-2'>
                    <ReactApexChart options={areaChart.options} series={areaChart.series} height={350} type='area' />
                </div>
                <div className='rounded-3xl bg-card p-2 sm:m-2'>
                    <div className='mt-10'>
                        <ReactApexChart options={pieChart.options} series={pieChart.series} height={350} type='donut' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
