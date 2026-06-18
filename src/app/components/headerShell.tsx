import Link from 'next/link';
import type { ReactNode } from 'react';

type HeaderShellProps = {
  theme: {
    panelBackground: string;
    borderColor: string;
    textColor: string;
    headerGlow: string;
  };
  subtitle: string;
  crewMember: ReactNode;
};

const dojoHeader = "Splinter's Dojo Dashboard";
const masterButton = 'Master';
const crewButton = 'Crew';

export const HeaderShell = ({ theme, subtitle, crewMember }: HeaderShellProps) => {
  return (
    <div id="header-shell-wrapper" className="flex items-center justify-between w-full">
      <div id="header-shell-left" className="flex items-center gap-4">
        <img
          id="header-shell-avatar"
          src="./avatars/splinter.jpg"
          alt="Splinter"
          className="h-16 w-16 rounded-full object-cover border-2 shrink-0"
          style={{ borderColor: theme.borderColor }}
        />
        <div id="header-shell-copy" className="flex flex-col">
          <h1 id="header-shell-title" className="tmnt-title text-4xl font-bold">
            {dojoHeader}
          </h1>
          <p id="header-shell-subtitle" className="tmnt-muted mt-2 text-sm">
            {subtitle}
          </p>
        </div>
      </div>

      <div id="header-shell-right" className="flex items-stretch flex-1 max-w-170  h-14">
        <div id="header-shell-buttons" className="flex items-stretch gap-2.25 shrink-0">
          <Link
            id="header-shell-master-link"
            href="/pages/master"
            className="tmnt-button px-6 rounded-lg font-bold inline-flex items-center justify-center transition-all shrink-0"
          >
            {masterButton}
          </Link>

          <Link
            id="header-shell-crew-link"
            href="/"
            className="tmnt-button  px-6 rounded-lg font-bold inline-flex items-center justify-center transition-all shrink-0"
          >
            {crewButton}
          </Link>
        </div>

        <div
          id="crew-member-block"
          className="flex-1 rounded-xl border-2 ml-3 flex items-stretch "
          style={{
            background: theme.panelBackground,
            borderColor: theme.borderColor,
            color: theme.textColor,
            boxShadow: theme.headerGlow,
          }}
          >
          <div id="crew-member-slot" className="w-full ">
          {crewMember}
          </div>
        </div>

      </div>

    </div>
  );
};