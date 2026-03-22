export const selectStyles = (theme: {
  panelBackground: string;
  borderColor: string;
  headerGlow: string;
  textColor: string;
  mutedText: string;
  buttonBackground: string;
  buttonHover: string;
}) => ({
  control: (base: any, state: any) => ({
    ...base,
    background: theme.panelBackground,
    border: `2px solid ${theme.borderColor}`,
    borderRadius: '0.75rem',
    boxShadow: state.isFocused ? theme.headerGlow : 'none',
    minHeight: '56px',
    color: theme.textColor,
    transition: 'all 0.2s ease',
  }),

  singleValue: (base: any) => ({
    ...base,
    color: theme.textColor,
    fontWeight: 700,
  }),

  menu: (base: any) => ({
    ...base,
    background: theme.panelBackground,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: '0.75rem',
    overflow: 'hidden',
  }),

  menuList: (base: any) => ({
    ...base,
    padding: 4,
  }),

  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected ? theme.buttonBackground : 'transparent',
    color: theme.textColor,
    cursor: 'pointer',
    padding: '10px 10px',
    transition: 'all 0.2s ease',
  }),

  placeholder: (base: any) => ({
    ...base,
    color: theme.mutedText,
  }),

  input: (base: any) => ({
    ...base,
    color: theme.textColor,
  }),

  dropdownIndicator: (base: any) => ({
    ...base,
    color: theme.textColor,
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),
});
