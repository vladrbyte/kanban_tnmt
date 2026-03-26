'use client';
import { useEffect } from 'react';
import { CharacterId, Task } from '@/app/lib/tasks';
import { turtles } from '@/app/lib/users';

interface Props {
	theme: any;
	newTask: Partial<Task>;
	setNewTask: (task: Partial<Task>) => void;
	error: string | null;
	setError: (err: string | null) => void;
	onClose: () => void;
	onSave: () => void;
	toggleSuitable: (id: CharacterId) => void;
}

export function CreateTaskModal({
	theme, newTask, setNewTask, error, setError, onClose, onSave, toggleSuitable
}: Props) {

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
			if (e.key === 'Enter') onSave();
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [onClose, onSave]);

	return (
		<div id="modal-overlay" 
			className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
			onClick={onClose}
		>
			<div id="modal-container"
				className="bg-[#1a1a1a] p-8 rounded-3xl w-full max-w-md border-4 shadow-2xl"
				style={{ borderColor: theme.buttonBackground }}
				onClick={(e) => e.stopPropagation()}
			>
				<h2 id="modal-title" className="text-2xl font-black uppercase mb-6" style={{ color: theme.buttonBackground }}>
					New Mission
				</h2>

				<div className="space-y-6">
					<div className="relative">
						<input
							id="modal-task-title-input"
							autoFocus
							placeholder="Mission Name..."
							className={`w-full bg-white/5 border-2 rounded-xl px-4 py-3 outline-none transition-all font-bold ${
								error ? 'border-red-500' : 'border-white/10 focus:border-white/30'
							}`}
							value={newTask.title}
							onChange={e => {
								setNewTask({ ...newTask, title: e.target.value });
								if (error) setError(null);
							}}
						/>
						{error && <div className="absolute -bottom-5 left-2 text-red-500 text-[10px] font-bold uppercase">{error}</div>}
					</div>

					<div id="modal-suitable-section">
						<label className="text-[10px] uppercase opacity-50 block mb-2 font-bold">Suitable For:</label>
						<div className="flex gap-3 justify-center">
							{turtles.map(t => {
								const isSelected = newTask.suitableFor?.includes(t.id as CharacterId);
								return (
									<button
										key={t.id}
										type="button"
										onClick={() => toggleSuitable(t.id as CharacterId)}
										className={`transition-all p-1 rounded-full border-2 ${isSelected ? 'opacity-100 scale-110' : 'opacity-30 grayscale'}`}
										style={{ borderColor: isSelected ? theme.buttonBackground : 'transparent' }}
									>
										<img src={t.avatar} className="w-10 h-10 rounded-full object-cover" alt={t.name} />
									</button>
								);
							})}
						</div>
					</div>

					<div className="flex gap-4">
						<div className="flex-1">
							<label className="text-[10px] uppercase opacity-50 block mb-1 font-bold">Min Crew</label>
							<select
								className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-3 py-2 outline-none font-bold"
								value={newTask.crewSize?.min}
								onChange={e => setNewTask({ ...newTask, crewSize: { ...newTask.crewSize!, min: Number(e.target.value) } })}
							>
								{[1, 2, 3, 4].map(n => <option key={n} value={n} className="bg-neutral-900">{n}</option>)}
							</select>
						</div>
						<div className="flex-1">
							<label className="text-[10px] uppercase opacity-50 block mb-1 font-bold">Max Crew</label>
							<select
								className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-3 py-2 outline-none font-bold"
								value={newTask.crewSize?.max}
								onChange={e => setNewTask({ ...newTask, crewSize: { ...newTask.crewSize!, max: Math.max(Number(e.target.value), newTask.crewSize?.min || 1) } })}
							>
								{[1, 2, 3, 4].map(n => <option key={n} value={n} disabled={n < (newTask.crewSize?.min || 1)} className="bg-neutral-900">{n}</option>)}
							</select>
						</div>
					</div>

					<div className="flex gap-4 pt-4">
						<button onClick={onClose} className="flex-1 py-3 rounded-xl font-bold text-xs uppercase opacity-50 hover:opacity-100 transition-all">
							Cancel (Esc)
						</button>
						<button 
							onClick={onSave} 
							className="flex-1 py-3 rounded-xl font-bold text-xs uppercase transition-all"
							style={{ background: theme.buttonBackground, color: theme.textColor }}
						>
							Create (Enter)
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}