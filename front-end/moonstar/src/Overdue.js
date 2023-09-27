import React, { useEffect, useRef, useState } from 'react';
import {
	Chart,
	BarController,
	BarElement,
	LinearScale,
	CategoryScale,
} from 'chart.js';

Chart.register(BarController, BarElement, LinearScale, CategoryScale);

export const OverdueTasksChart = () => {
	const chartRef = useRef(null);
	const chartInstanceRef = useRef(null); // Use useRef to persist chartInstance across renders
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		fetch('http://localhost:8081/tasks')
			.then((response) => response.json())
			.then((data) => {
				setTasks(data);
			})
			.catch((err) => {
				console.error('Error fetching tasks:', err);
			});
	}, []);

	useEffect(() => {
		if (chartRef.current) {
			if (chartInstanceRef.current) {
				chartInstanceRef.current.destroy();
			}

			const overdueTasks = tasks.filter(
				(task) => new Date(task.due_date) < new Date() && task.is_active
			);

			const labels = overdueTasks.map((task) => task.task_name);
			const data = overdueTasks.map((task) =>
				Math.ceil(
					(new Date() - new Date(task.due_date)) / (1000 * 60 * 60 * 24)
				)
			);

			chartInstanceRef.current = new Chart(chartRef.current, {
				type: 'bar',
				data: {
					labels: labels,
					datasets: [
						{
							label: 'Days Overdue',
							data: data,
							backgroundColor: 'rgba(255, 99, 132, 0.6)',
							borderColor: 'rgba(255, 99, 132, 1)',
							borderWidth: 1,
						},
					],
				},
				options: {
					scales: {
						yAxes: [
							{
								ticks: {
									beginAtZero: true,
								},
							},
						],
					},
					legend: {
						labels: {
							fontColor: 'black',
						},
					},
				},
			});
		}
		return () => {
			if (chartInstanceRef.current) {
				chartInstanceRef.current.destroy();
			}
		};
	}, [tasks]);

	return (
		<div>
			<h3>Overdue Projects</h3>
			<canvas ref={chartRef}></canvas>
		</div>
	);
};
