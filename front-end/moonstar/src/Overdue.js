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
	const chartInstanceRef = useRef(null);
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
							backgroundColor: 'rgba(255, 0, 0, 0.6)',
							borderColor: 'rgba(255, 99, 132, 1)',
							borderWidth: 1,
						},
					],
				},
				options: {
					scales: {
						y: {
							beginAtZero: true,
							title: {
								display: true,
								text: 'Days Overdue',
								align: 'center',
								color: 'white',
								font: {
									size: 14,
									weight: 'bold',
								},
							},
						},
					},

					legend: {
						display: true,
						labels: {
							color: 'rgb(255, 99, 132)',
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
			<h4>Overdue Projects</h4>
			<br />
			<canvas ref={chartRef}></canvas>
		</div>
	);
};
