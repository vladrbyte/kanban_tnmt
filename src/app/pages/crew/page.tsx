'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { turtles } from '@/app/lib/users';
import { crewThemes } from '@/app/lib/themes';
import { selectStyles } from '@/app/lib/selectStyles';
import { HeaderShell } from '@/app/components/headerShell';
import { CharacterId, Task, tasks, TaskStatus } from '@/app/lib/tasks';

type TurtleOption = {
	value: string;
	label: string;
	avatar: string;
	role: string;
};

export default function ViewCrew() {
	const [allTasks, setAllTasks] = useState<Task[]>([]);

	useEffect(() => {
		const saved = localStorage.getItem('tmnt_tasks');
		if (saved) setAllTasks(JSON.parse(saved));
		else setAllTasks(tasks);
	}, []);


	const turtleOptions: TurtleOption[] = turtles.map((turtle) => ({
		value: turtle.id,
		label: turtle.name,
		avatar: turtle.avatar,
		role: turtle.role,
	}));

	const [selectedTurtle, setSelectedTurtle] = useState<TurtleOption>(turtleOptions[0]);

	const theme = crewThemes[selectedTurtle.value as keyof typeof crewThemes];

	const customOption = (option: TurtleOption): ReactNode => (
		<div className="flex items-center gap-3 h-full">
			<img
				src={option.avatar}
				alt={option.label}
				className="h-10 w-10 rounded-full border-2 object-cover shrink-0"
				style={{ borderColor: theme.borderColor }}
			/>
			<div className="flex flex-col justify-center">
				<div className="font-bold">{option.label}</div>
				<div className="text-xs opacity-80">{option.role}</div>
			</div>
		</div>
	);

	const dojoMoto = 'Discipline above all, my students!';
	const empty = "Empty";
	const crewMember = (
		<div id="crew-select" className="w-full min-h-14">
			<Select
				instanceId="turtle-select"
				inputId="turtle-select"
				classNamePrefix="turtle-select"
				options={turtleOptions}
				value={selectedTurtle}
				onChange={(option) => option && setSelectedTurtle(option as TurtleOption)}
				styles={selectStyles(theme)}
				formatOptionLabel={customOption}
				isSearchable={false}
				menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
				menuPosition="fixed"
			/>
		</div>
	);

	const COLUMNS: { id: TaskStatus; label: string; themeKey: keyof typeof theme }[] = [
		{ id: 'todo', label: 'To Do', themeKey: 'todoBorder' },
		{ id: 'progress', label: 'In Progress', themeKey: 'progressBorder' },
		{ id: 'done', label: 'Done', themeKey: 'doneBorder' },
	];

	const updateTaskStatus = (taskId: number, turtleId: CharacterId, newStatus: TaskStatus) => {
		const updatedTasks = allTasks.map(task => {
			if (task.id === taskId) { return { ...task, status: { ...task.status, [turtleId]: newStatus } }; }
			return task;
		});
		setAllTasks(updatedTasks);
		localStorage.setItem('tmnt_tasks', JSON.stringify(updatedTasks));
	};

	const moveTask = (taskId: number, currentStatus: TaskStatus, direction: 'right' | 'left') => {
		const statusOrder: TaskStatus[] = ['todo', 'progress', 'done'];
		const currentIndex = statusOrder.indexOf(currentStatus);
		const nextIndex = direction === 'right' ? currentIndex + 1 : currentIndex - 1;
		if (nextIndex >= 0 && nextIndex < statusOrder.length) { updateTaskStatus(taskId, selectedTurtle.value as CharacterId, statusOrder[nextIndex]);}
	};

	return (
		<main id="crew-main"
			className="tmnt-page min-h-screen p-8 transition-all duration-500"
			style={
				{
					'--page-bg': theme.pageBackground,
					'--panel-bg': theme.panelBackground,
					'--title-color': theme.titleColor,
					'--text-color': theme.textColor,
					'--muted-text': theme.mutedText,
					'--border-color': theme.borderColor,
					'--button-bg': theme.buttonBackground,
					'--button-hover': theme.buttonHover,
					'--todo-border': theme.todoBorder,
					'--progress-border': theme.progressBorder,
					'--done-border': theme.doneBorder,
					'--header-glow': theme.headerGlow,
				} as CSSProperties
			}
		>
			<div id="crew-body" className="mx-auto flex h-full max-w-7xl flex-col min-h-0">
				<HeaderShell
					theme={theme}
					subtitle={dojoMoto}
					crewMember={crewMember}
				/>

				<div id="crew-content" className="mt-16">
					<div className="flex justify-between max-w-7xl mx-auto flex-wrap gap-6">
						{COLUMNS.map((col) => {
							const columnTasks = allTasks.filter(task =>
								task.assignees.includes(selectedTurtle.value as CharacterId) &&
								(task.status[selectedTurtle.value as CharacterId] || 'todo') === col.id
							);

							return (
								<div id={col.id}
									key={col.id}
									className={`tmnt-panel tmnt-panel--${col.id} themed-scroll backdrop-blur-sm p-6 rounded-2xl w-92 border-4 shadow-2xl transition-all overflow-y-auto`}
									style={{
										borderColor: theme[col.themeKey] as string,
										height: "620px",
										'--scroll-color': theme.scrollColor,
									} as React.CSSProperties}
								>
									<h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: theme[col.themeKey] as string }}>
										{col.label} :
									</h2>

									<div className="space-y-4">
										{columnTasks.length > 0 ? (
											columnTasks.map((task) => (
												<div id={`${col.id}-id-${task.id}`}
													key={task.id}
													className="p-4 rounded-xl border-2 font-black tracking-widest uppercase flex flex-col gap-3"
													style={{
														borderColor: theme[col.themeKey] as string,
														background: 'rgba(255,255,255,0.05)',
														color: theme.textColor,
													}}
												>
													<div className="flex justify-between opacity-70" >
														<button
															disabled={col.id === 'todo'}
															onClick={() => moveTask(task.id, col.id, 'left')}
															className="disabled:opacity-20 hover:scale-110 transition-transform cursor-pointer disabled:cursor-not-allowed"
														>
															◀
														</button>
														<span className="text-[10px] opacity-30 self-center">{task.title}</span>
														<button
															disabled={col.id === 'done'}
															onClick={() => moveTask(task.id, col.id, 'right')}
															className="disabled:opacity-20 hover:scale-110 transition-transform cursor-pointer disabled:cursor-not-allowed"
														>
															▶
														</button>
													</div>
												</div>
											))
										) : (<div className="text-center py-10 opacity-20 italic text-sm">{empty}</div>)}
									</div>
								</div>
							);
						})}
					</div>
				</div>

			</div>
		</main>
	);
}
