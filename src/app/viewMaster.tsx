import { turtles } from '@/app/lib/users';
import { tasks } from '@/app/lib/tasks';

type ViewMasterProps = {
	theme: {
		panelBackground: string;
		borderColor: string;
		textColor: string;
		mutedText: string;
		headerGlow: string;
		buttonBackground: string;
	};
};

const masterCrewMember = "Master View"
const masterDojoMoto = "Master. Assign missions wisely."
const searchContent = "Search tasks..."



export const viewMaster = ({ theme }: ViewMasterProps) => {
	const dojoMoto = (
		<>
			<p className="tmnt-muted mt-2 text-sm">
				{masterDojoMoto}
			</p>
		</>
	);
	const crewMember = (
		<>
			<div
				className="w-full max-w-sm rounded-xl border-2 px-4 min-h-14 flex items-center justify-center font-bold transition-all"
				style={{
					background: theme.panelBackground,
					borderColor: theme.borderColor,
					color: theme.textColor,
					boxShadow: theme.headerGlow,
				}}
			>
				{masterCrewMember}
			</div>
		</>
	);
	const content = (
		<div id="master-content" className="max-w-7xl mx-auto grid lg:grid-cols-[380px_1fr] gap-6">
			<div id="master-backlog" className="tmnt-panel rounded-2xl border-4 p-5 min-h-155 relative">
				<div className="mb-4">
					<div 
						id="master-search"
						className="rounded-xl border-2 px-4 h-12 flex items-center"
						style={{
							borderColor: theme.borderColor,
							color: theme.mutedText,
						}}
					>
						{searchContent}
					</div>
				</div>

				<div id="master-task-list" className="master-backlog-scroll space-y-3 pr-1 max-h-125 overflow-y-auto">
					{tasks.map((task) => (
						<div
							key={task.id}
							className="rounded-xl border px-4 py-3 flex items-center justify-between"
							style={{
								background: 'rgba(84, 120, 84, 0.18)',
								borderColor: 'rgba(190, 220, 190, 0.25)',
							}}
						>
							<span className="text-sm font-semibold">{task.title}</span>
							<span className="opacity-60 text-lg">⠿</span>
						</div>
					))}
				</div>


				<button
					id="master-create-task"
					type="button"
					className="absolute bottom-5 right-5 h-14 w-14 rounded-full text-3xl font-bold flex items-center justify-center transition-all"
					style={{
						background: theme.buttonBackground,
						color: theme.textColor,
						boxShadow: theme.headerGlow,
					}}
				>
					+
				</button>
			</div>

			<div id="master-crew-grid" className="grid md:grid-cols-2 gap-6">
				{turtles.map((turtle) => (
					<div
						key={turtle.id}
						className="tmnt-panel rounded-2xl border-4 p-5 min-h-75"
						style={{ borderColor: turtle.colorPrimary }}
					>
						<div className="flex items-center gap-3 mb-5">
							<img
								src={turtle.avatar}
								alt={turtle.name}
								className="h-12 w-12 rounded-full border-2 object-cover"
								style={{ borderColor: turtle.colorPrimary }}
							/>

							<div>
								<h2 className="text-xl font-bold">{turtle.name}</h2>
								<p className="text-sm opacity-75">{turtle.role}</p>
							</div>
						</div>

						<div className="space-y-3">
							<div
								className="rounded-xl border px-4 py-3 text-sm"
								style={{
									borderColor: `${turtle.colorPrimary}66`,
									background: 'rgba(255,255,255,0.04)',
								}}
							>
								Assigned task preview
							</div>

							<div
								className="rounded-xl border px-4 py-3 text-sm opacity-70"
								style={{
									borderColor: `${turtle.colorPrimary}44`,
									background: 'rgba(255,255,255,0.03)',
								}}
							>
								Waiting for assignments...
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);


	return { dojoMoto, crewMember, content };
};
