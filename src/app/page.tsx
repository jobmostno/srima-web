"use client";
import {
    BarElement,
    CategoryScale,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    InteractionItem
} from "chart.js";
import {Chart as ChartJS} from "chart.js/auto";
import {faker} from "@faker-js/faker";
import {Chart, getDatasetAtEvent, getElementAtEvent, getElementsAtEvent} from "react-chartjs-2";
import {useRef} from "react";

export default function Home() {
    ChartJS.register(
        LinearScale,
        CategoryScale,
        BarElement,
        PointElement,
        LineElement,
        Legend,
        Tooltip
    );

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        maintainAspectRatio: false,
        responsive: true,
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                type: 'line' as const,
                label: 'Dataset 1',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                fill: false,
                data: labels.map(() => faker.number.int({min: -1000, max: 1000})),
            },
            {
                type: 'bar' as const,
                label: 'Dataset 2',
                backgroundColor: 'rgb(75, 192, 192)',
                data: labels.map(() => faker.number.int({min: -1000, max: 1000})),
                borderColor: 'white',
                borderWidth: 2,
            },
            {
                type: 'bar' as const,
                label: 'Dataset 3',
                backgroundColor: 'rgb(53, 162, 235)',
                data: labels.map(() => faker.number.int({min: -1000, max: 1000})),
            },
        ],
    };

    const printDatasetAtEvent = (dataset: InteractionItem[]) => {
        if (!dataset.length) return;

        const datasetIndex = dataset[0].datasetIndex;

        console.log(data.datasets[datasetIndex].label);
    };

    const printElementAtEvent = (element: InteractionItem[]) => {
        if (!element.length) return;

        const {datasetIndex, index} = element[0];

        console.log(data.labels[index], data.datasets[datasetIndex].data[index]);
    };

    const printElementsAtEvent = (elements: InteractionItem[]) => {
        if (!elements.length) return;

        console.log(elements.length);
    };

    const chartRef = useRef<ChartJS>(null);

    const onClick = (event: any) => {
        const {current: chart} = chartRef;

        if (!chart) {
            return;
        }

        printDatasetAtEvent(getDatasetAtEvent(chart, event));
        printElementAtEvent(getElementAtEvent(chart, event));
        printElementsAtEvent(getElementsAtEvent(chart, event));
    };

    return (
        <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
            <div style={{border: "solid 1px"}}>
                <h1>Navbar</h1>
            </div>
            <div id="content" style={{flex: 1, display: "flex", flexDirection: "row"}}>
                <div id="parameters" style={{border: "solid 1px", display: "flex", flexDirection: "column", width: "50%"}}>
                    <h1>Parameters</h1>
                    <form className="w-full max-w-sm">
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                       htmlFor="inline-full-name">
                                    Full Name
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1
                                    px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="inline-full-name" type="text" placeholder={"Jane Doe"}/>
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                       htmlFor="inline-password">
                                    Password
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1
                                    px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="inline-password" type="password" placeholder="******************"/>
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3"></div>
                            <label className="md:w-2/3 block text-gray-500 font-bold">
                                <input className="mr-2 leading-tight" type="checkbox"/>
                                <span className="text-sm">Send me your newsletter!</span>
                            </label>
                        </div>
                        <div className="md:flex md:items-center">
                            <div className="md:w-1/3"></div>
                            <div className="md:w-2/3">
                                <button
                                    className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                    type="button">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                {/*
                    Apply overflow: hidden to make the chart shrink
                    https://stackoverflow.com/questions/52502837/chart-js-in-flex-element-overflows-instead-of-shrinking
                    */}
                <div id="results" style={{border: "solid 1px", overflow: "hidden", width: "50%"}}>
                    <h1>Results</h1>
                    <div id="chart-wrapper" style={{position: "relative", height: "90vh"}}>
                        <Chart
                            ref={chartRef}
                            type='bar'
                            onClick={onClick}
                            options={options}
                            data={data}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
