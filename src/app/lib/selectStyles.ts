export const selectStyles = (theme: {
  panelBackground: string;
  borderColor: string;
  headerGlow: string;
  textColor: string;
  mutedText: string;
  buttonBackground: string;
  buttonHover: string;
}) => ({

  container: (base: any) => ({
    ...base,
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
  }),

  control: (base: any, state: any) => ({
    ...base,
    width: '100%',
    minHeight: '64px',
    height: '64px',
    background: theme.panelBackground,
    border: 'none', // `2px solid ${theme.borderColor}`,
    borderRadius: '0.75rem',
    boxShadow: state.isFocused ? theme.headerGlow : 'none',
    display: 'flex',
    alignItems: 'center',
    color: theme.textColor,
    transition: 'all 0.2s ease',
  }),

  dropdownIndicator: (base: any) => ({
    ...base,
    color: theme.textColor,
    padding: 8,
  }),

  indicatorsContainer: (base: any) => ({
    ...base,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),

  input: (base: any) => ({
    ...base,
    color: theme.textColor,
    margin: 0,
    padding: 0,
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
    backgroundColor: state.isFocused ? theme.buttonHover : state.isSelected ? theme.buttonBackground : 'transparent',
    color: theme.textColor,
    cursor: 'pointer',
    padding: '10px 10px',
    transition: 'all 0.2s ease',
  }),

  placeholder: (base: any) => ({
    ...base,
    color: theme.mutedText,
  }),

  singleValue: (base: any) => ({
    ...base,
    color: theme.textColor,
    fontWeight: 700,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
  }),

  valueContainer: (base: any) => ({
    ...base,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    margin: 0,
  }),

});
