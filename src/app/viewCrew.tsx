import Select from 'react-select';
import { selectStyles } from '@/app/lib/selectStyles';

type TurtleOption = {
  value: string;
  label: string;
  avatar: string;
  role: string;
};

type ViewCrewProps = {
  turtleOptions: TurtleOption[];
  selectedTurtle: TurtleOption;
  setSelectedTurtle: (option: TurtleOption) => void;
  theme: {
    panelBackground: string;
    titleColor: string;
    mutedText: string;
    todoBorder: string;
    progressBorder: string;
    doneBorder: string;
    textColor: string;
    buttonBackground: string;
    buttonHover: string;
    borderColor: string;
    headerGlow: string;
  };
};

export const viewCrew = ({
  turtleOptions,
  selectedTurtle,
  setSelectedTurtle,
  theme,
}: ViewCrewProps) => {
  const customOption = (option: TurtleOption) => (
    <div className="flex items-center gap-3">
      <img
        src={option.avatar}
        alt={option.label}
        className="h-10 w-10 rounded-full border-2 object-cover"
        style={{ borderColor: theme.borderColor }}
      />
      <div>
        <div className="font-bold">{option.label}</div>
        <div className="text-xs opacity-80">{option.role}</div>
      </div>
    </div>
  );

  const dojoMoto = (
    <>
      <p className="tmnt-muted mt-2 text-sm">
        Discipline above all, my students!
      </p>
    </>
  );

  const crewMember = (
    <>
      <div className="w-full max-w-sm">
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
        />
      </div>
    </>
  ); 
  const content = (
    <div className="flex gap-6 justify-center max-w-7xl mx-auto flex-wrap">
      <div className="tmnt-panel tmnt-panel--todo backdrop-blur-sm p-6 rounded-2xl w-72 min-h-[500px] border-4 shadow-2xl transition-all">
        <h2 className="tmnt-column-title tmnt-column-title--todo text-2xl font-bold mb-6 flex items-center gap-2">
          📋 To Do
        </h2>
        <div className="space-y-3">
          <div className="tmnt-skeleton h-12 rounded-lg"></div>
          <div className="tmnt-skeleton h-12 rounded-lg"></div>
        </div>
      </div>

      <div className="tmnt-panel tmnt-panel--progress backdrop-blur-sm p-6 rounded-2xl w-72 min-h-[500px] border-4 shadow-2xl transition-all">
        <h2 className="tmnt-column-title tmnt-column-title--progress text-2xl font-bold mb-6 flex items-center gap-2">
          ⚡ In Progress
        </h2>
        <div className="space-y-3">
          <div className="tmnt-skeleton h-12 rounded-lg"></div>
        </div>
      </div>

      <div className="tmnt-panel tmnt-panel--done backdrop-blur-sm p-6 rounded-2xl w-72 min-h-[500px] border-4 shadow-2xl transition-all">
        <h2 className="tmnt-column-title tmnt-column-title--done text-2xl font-bold mb-6 flex items-center gap-2">
          ✅ Done
        </h2>
        <div className="space-y-3">
          <div className="tmnt-skeleton h-12 rounded-lg"></div>
          <div className="tmnt-skeleton h-12 rounded-lg"></div>
        </div>
      </div>
    </div>
  );

  return { dojoMoto, crewMember, content };
};
