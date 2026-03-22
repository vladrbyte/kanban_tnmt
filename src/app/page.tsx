'use client';

import { useState } from 'react';
import { turtles } from '@/app/lib/users';
import { crewThemes } from '@/app/lib/themes';
import { viewCrew } from './viewCrew';
import { viewMaster } from './viewMaster';

type Mode = 'crew' | 'master';

export default function Home() {
  const turtleOptions = turtles.map((turtle) => ({
    value: turtle.id,
    label: turtle.name,
    avatar: turtle.avatar,
    role: turtle.role,
  }));

  const [mode, setMode] = useState<Mode>('crew');
  const [selectedTurtle, setSelectedTurtle] = useState(turtleOptions[0]);

  const theme =
    mode === 'master'
      ? crewThemes.splinter
      : crewThemes[selectedTurtle.value as keyof typeof crewThemes];

  const activeView =
    mode === 'master'
      ? viewMaster({ theme })
      : viewCrew({
          turtleOptions,
          selectedTurtle,
          setSelectedTurtle,
          theme,
        });

  const masterButton = "Master"
  const crtewButton = "Crew"
  const dojoHeader = "Splinter's Dojo Dashboard"
  return (
    <main
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
        } as React.CSSProperties
      }
    >
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-wrap items-start justify-between gap-6 mb-6">
          <div className="flex items-start gap-4">
            <img
              src="/avatars/splinter.jpg"
              alt="Splinter"
              className="h-16 w-16 rounded-full object-cover border-2 shrink-0"
              style={{ borderColor: theme.borderColor }}
            />
            <div className="flex flex-col">
              <h1 className="tmnt-title text-4xl font-bold">
                {dojoHeader}
              </h1>
              {activeView.dojoMoto}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setMode('master')}
              className="tmnt-button px-6 py-2 rounded-lg font-bold transition-all"
            >
              {masterButton}
            </button>
            <button
              type="button"
              onClick={() => setMode('crew')}
              className="tmnt-button px-6 py-2 rounded-lg font-bold transition-all"
            >
              {crtewButton}
            </button>
            <div className="w-lg ">
              {activeView.crewMember}
            </div>

          </div>
        </div>
      </div>

      {activeView.content}
    </main>
  );
}
