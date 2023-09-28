import { useState, useEffect, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, DoughnutController } from 'chart.js';
import FetchData from './FetchData';
import Card from '@mui/material/Card';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CardContent } from '@mui/material';

Chart.register(DoughnutController, ArcElement, CategoryScale, ChartDataLabels);

export const TaskStatistics = () => {
	const { data: allTasks, error: allTasksError } = FetchData(
		'http://localhost:8081/tasks'
	);

	const tasks = useMemo(() => {
		return allTasks?.filter((task) => task.is_active) || [];
	}, [allTasks]);

	const [taskStats, setTaskStats] = useState({
		highPriorityCount: 0,
		mediumPriorityCount: 0,
		lowPriorityCount: 0,
	});

	useEffect(() => {
		if (tasks) {
			const highPriorityCount = tasks.filter(
				(task) => task.priority === 'High'
			).length;
			const mediumPriorityCount = tasks.filter(
				(task) => task.priority === 'Medium'
			).length;
			const lowPriorityCount = tasks.filter(
				(task) => task.priority === 'Low'
			).length;

			setTaskStats({
				highPriorityCount,
				mediumPriorityCount,
				lowPriorityCount,
			});
		}
	}, [tasks]);

	return (
		<div>
			{allTasksError && <p>{allTasksError.message}</p>}

			{tasks && (
				<div
					style={{
						textAlign: 'center',
						fontSize: '1.5em',
						marginBottom: '10px',
					}}
				>
					<h6>Active Task Priority</h6>
					<Doughnut
						data={{
							labels: ['High Priority', 'Medium Priority', 'Low Priority'],
							datasets: [
								{
									data: [
										taskStats.highPriorityCount,
										taskStats.mediumPriorityCount,
										taskStats.lowPriorityCount,
									],
									backgroundColor: [
										'rgba(255, 0, 0, 0.8)',
										'rgba(255, 165, 0, 0.8)',
										'rgba(54, 205, 50, 0.8)',
									],
									borderColor: [
										'rgba(255, 99, 132, 1)',
										'rgba(255, 205, 86, 1)',
										'rgba(54, 162, 235, 1)',
									],
									cutoutPercentage: 70,
									borderWidth: 1,
								},
							],
						}}
						options={{
							plugins: {
								title: {
									display: true,
									text: 'Task Priorities',
									font: {
										size: 20,
										weight: 'bold',
									},
								},
								legend: {
									display: true,
								},

								datalabels: {
									display: true,
									color: 'white',
									font: {
										size: 20,
										weight: 'bold',
									},
									formatter: (value, ctx) => {
										return value;
									},
								},
							},
							datalabels: {
								display: true,
								color: 'black',
								font: {
									size: 20,
									weight: 'bold',
								},
								formatter: (value, ctx) => {
									return value;
								},
							},
						}}
					/>
				</div>
			)}
		</div>
	);
};
