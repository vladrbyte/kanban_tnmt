'use client';
import { useState, useEffect } from 'react';
import { CharacterId, Task, tasks } from '@/app/lib/tasks';

export function useMasterLogic() {
	const [taskList, setTaskList] = useState<Task[]>(() => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('tmnt_tasks');
			return saved ? JSON.parse(saved) : tasks;
		}
		return tasks;
	});

	const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [newTask, setNewTask] = useState<Partial<Task>>({
		title: '',
		suitableFor: [],
		crewSize: { min: 1, max: 4 }
	});

	useEffect(() => { localStorage.setItem('tmnt_tasks', JSON.stringify(taskList)); }, [taskList]);

	const toggleSuitable = (turtleId: CharacterId) => {
		setNewTask(prev => {
			const current = prev.suitableFor || [];
			const isSelected = current.includes(turtleId);
			const updated = isSelected
				? current.filter(id => id !== turtleId)
				: [...current, turtleId];
			return { ...prev, suitableFor: updated };
		});
	};

	const toggleAssignee = (taskId: number, turtleId: CharacterId) => {
		setTaskList(prev => prev.map(task => {
			if (task.id !== taskId) return task;
			const isSelected = task.assignees.includes(turtleId);
			if (isSelected) return { ...task, assignees: task.assignees.filter(id => id !== turtleId) };
			if (task.assignees.length >= task.crewSize.max) return task;
			return { ...task, assignees: [...task.assignees, turtleId] };
		}));
	};

	const deleteTask = (e: React.MouseEvent, taskId: number) => {
		e.stopPropagation();
		if (confirm("Are you sure you want to destroy this mission?")) {
			setTaskList(prev => prev.filter(t => t.id !== taskId));
		}
	};

	const handleCreateTask = () => {
		if (!newTask.title?.trim()) {
			setError("Title is required, Ninja!");
			setTimeout(() => setError(null), 2000);
			return;
		}

		const maxId = taskList.length > 0 ? Math.max(...taskList.map(t => t.id)) : 0;

		const finalTask: Task = {
			id: maxId + 1,
			title: newTask.title.trim(),
			assignees: [],
			status: {},
			suitableFor: (newTask.suitableFor && newTask.suitableFor.length > 0)
				? newTask.suitableFor
				: ['leo', 'raph', 'don', 'mike'],
			crewSize: {
				min: newTask.crewSize?.min || 1,
				max: newTask.crewSize?.max || 4
			}
		};

		setTaskList(prev => [...prev, finalTask]);
		setIsModalOpen(false);
		setNewTask({ title: '', suitableFor: [], crewSize: { min: 1, max: 4 } });
	};

	const filteredTasks = taskList.filter(task =>
		task.title.toLowerCase().includes(searchQuery.toLowerCase())
	);
	return {
		taskList,
		expandedTaskId,
		setExpandedTaskId,
		isModalOpen,
		setIsModalOpen,
		newTask,
		setNewTask,
		error,
		setError,
		toggleAssignee,
		deleteTask,
		handleCreateTask,
		toggleSuitable,
		filteredTasks,
		searchQuery,
		setSearchQuery,
	};
}