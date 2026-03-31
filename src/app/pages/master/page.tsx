'use client';

import { useMasterLogic } from './useMasterLogic';
import { CreateTaskModal } from './CreateTaskModal';
import { crewThemes } from '../../lib/themes';
import { HeaderShell } from '../../components/headerShell';
import { turtles } from '@/app/lib/users';
import { CharacterId } from '@/app/lib/tasks';

const theme = crewThemes.splinter;

const btn_delete = "delete"
const dojoMoto = "Master. Assign missions wisely."
const searchContent = "Search tasks..."
const crewMemberTag = "Master View"
const crewMember = (
	<div id="master-view-label"
		className="w-full h-full px-4 flex items-center justify-center font-bold"
	>
		{crewMemberTag}
	</div>
);

export default function MasterPage() {
	const {
		taskList, expandedTaskId, setExpandedTaskId, isModalOpen,
		setIsModalOpen, newTask, setNewTask, error, setError,
		toggleAssignee, deleteTask, handleCreateTask, toggleSuitable, searchQuery, setSearchQuery, filteredTasks,
	} = useMasterLogic();

	const assignedTasksByTurtle = Object.fromEntries(
		turtles.map((turtle) => [
			turtle.id,
			taskList.filter((task) => task.assignees.includes(turtle.id as CharacterId)),
		])
	);

	return (
		<main id="master-main"
			className="tmnt-page h-screen p-8 transition-all duration-500 overflow-hidden select-none"
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
					'--scroll-color': theme.scrollColor,
				} as React.CSSProperties
			}
		>
			<div id="master-body" className="mx-auto flex h-full max-w-7xl flex-col min-h-0">
				<HeaderShell theme={theme} subtitle={dojoMoto} crewMember={crewMember} />

				<div id="master-content" className="mt-6 grid flex-1 min-h-0 items-stretch lg:grid-cols-[410px_1fr] gap-6">

					<div id="master-backlog" className="tmnt-panel content-start min-h-0 rounded-2xl border-4 p-5 h-full relative flex flex-col">
						<div id="master-search-wrapper" className="mb-4 shrink-0">
							<input
								id="master-search"
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder={searchContent}
								className="rounded-xl border-2 px-4 h-12 w-full bg-transparent"
								style={{ borderColor: theme.borderColor, color: theme.textColor }}
							/>
						</div>

						<div id="master-task-list" className="themed-scroll space-y-3 pr-1 flex-1 min-h-0 overflow-y-auto" >
							{filteredTasks.map((task) => {
								const hasMinCrew = task.assignees.length >= task.crewSize.min;
								const isExpanded = expandedTaskId === task.id;
								return (
									<div
										id={`master-task-card-${task.id}`}
										key={task.id}
										className={`rounded-xl border px-4 py-3 flex flex-col gap-3 cursor-pointer transition-all ${hasMinCrew ? 'opacity-60' : ''}`}
										style={{ background: 'rgba(84, 120, 84, 0.18)', borderColor: 'rgba(190, 220, 190, 0.25)' }}
										onClick={() => setExpandedTaskId(isExpanded ? null : task.id)}
									>
										<div className="flex items-center w-full gap-2">
											<span className="text-sm font-semibold">{task.title}</span>
											<div className="flex-1" />
											<button
												onClick={(e) => deleteTask(e, task.id)}
												className="text-red-500 font-bold text-[1px] uppercase px-1 rounded-4xl border border-red-500/30 bg-red-500/5 hover:bg-red-500/10 flex items-center justify-center shrink-0"
											>
												{btn_delete}
											</button>
											<span className="opacity-60 text-lg">{isExpanded ? '▴' : '▾'}</span>
										</div>

										{isExpanded && (
											<div className="mt-1 rounded-lg border border-emerald-300/40 bg-emerald-900/30 px-3 py-3">
												<div className="grid grid-cols-2 gap-3">
													{turtles.map((turtle) => {
														const turtleId = turtle.id as CharacterId;
														const isSelected = task.assignees.includes(turtleId);
														const isAtMax = task.assignees.length >= task.crewSize.max;
														const isRecommended = task.suitableFor.includes(turtleId);
														return (
															<div key={turtle.id}
																className={`flex items-center gap-2 rounded-lg border px-2 py-2 text-left text-xs transition-all ${isSelected ? 'bg-emerald-500/30 border-emerald-300' : 'bg-black/10 border-white/10'} ${!isSelected && isAtMax ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-emerald-500/20'}`}
																onClick={(e) => { e.stopPropagation(); if (!isSelected && isAtMax) return; toggleAssignee(task.id, turtleId); }}
															>
																<input type="checkbox" className="h-4 w-4 shrink-0" checked={isSelected} readOnly />
																<img src={turtle.avatar} className="h-8 w-8 rounded-full border-2 object-cover shrink-0" style={{ borderColor: turtle.colorPrimary }} alt={turtle.name} />
																{isRecommended && <span className="text-amber-300 text-sm">★</span>}
															</div>
														);
													})}
												</div>
											</div>
										)}
									</div>
								);
							})}
						</div>

						<button id="master-create-task"
							className="absolute bottom-5 right-5 h-14 w-14 rounded-full text-3xl font-bold flex 
                   items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:rotate-90 shadow-lg z-40"
							style={{ background: theme.buttonBackground, color: theme.textColor, boxShadow: theme.headerGlow }}
							onClick={() => setIsModalOpen(true)}
						>
							+
						</button>
					</div>

					<div id="crew-members-grid" className="grid h-full md:grid-cols-2 gap-6">
						{turtles.map((turtle) => {
							const turtleTheme = crewThemes[turtle.id as keyof typeof crewThemes];
							const assignedTasks = assignedTasksByTurtle[turtle.id] ?? [];
							return (
								<div id={`card-${turtle.id}`} key={turtle.id} className="tmnt-panel rounded-2xl border-4 p-5 h-full" style={{ borderColor: turtle.colorPrimary }}>
									<div className="flex items-center gap-3 mb-5">
										<img src={turtle.avatar} className="h-12 w-12 rounded-full border-2 object-cover" style={{ borderColor: turtle.colorPrimary }} alt={turtle.name} />
										<div>
											<h2 className="text-xl font-bold">{turtle.name}</h2>
											<p className="text-sm opacity-75">{turtle.role}</p>
										</div>
									</div>

									<div className="space-y-3 overflow-y-auto pr-2 themed-scroll" style={{ height: '200px', '--scroll-color': turtleTheme.scrollColor } as React.CSSProperties}>
										{assignedTasks.length === 0 ? (
											<div className="rounded-xl border px-4 py-3 text-sm opacity-70" style={{ borderColor: `${turtleTheme.borderColor}44`, background: 'rgba(255,255,255,0.03)' }}>
												No task assignes
											</div>
										) : (
											assignedTasks.map((task) => (
												<div key={task.id} className="rounded-xl border px-4 py-3 flex items-center justify-between font-bold" style={{ borderColor: `${turtleTheme.borderColor}66`, background: 'rgba(255,255,255,0.04)', fontSize: '20px' }}>
													<span className="truncate pr-2">{task.title}</span>
													<div className="flex-1" />
													<span className="text-[10px] opacity-50 uppercase pt-1 mr-4.5"> [{task.status?.[turtle.id as CharacterId] || 'todo'}] </span>
													<button onClick={() => toggleAssignee(task.id, turtle.id as CharacterId)} className="text-red-500 px-2 font-bold">✕</button>
												</div>
											))
										)}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{isModalOpen && (
				<CreateTaskModal
					theme={theme} newTask={newTask} setNewTask={setNewTask}
					error={error} setError={setError} toggleSuitable={toggleSuitable}
					onClose={() => setIsModalOpen(false)} onSave={handleCreateTask}
				/>
			)}
		</main>
	);
}