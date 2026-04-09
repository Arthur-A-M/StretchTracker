export const lightPalette = {
  background: '#F4FBFB',
  surface: '#FFFFFF',
  surfaceMuted: '#E6F4F3',
  teal: '#0F8B8D',
  tealDark: '#0B5D5E',
  text: '#14323A',
  textMuted: '#5D737A',
  border: '#C7E3E0',
  danger: '#D95D39',
};

export const darkPalette = {
  background: '#0D1F24',
  surface: '#162A30',
  surfaceMuted: '#1E3840',
  teal: '#1DAEAF',
  tealDark: '#7DD8D9',
  text: '#E4F2F3',
  textMuted: '#7AACB4',
  border: '#2A4A52',
  danger: '#E8755A',
};

export type Palette = typeof lightPalette;

// Kept for backwards compatibility — screens now receive palette from usePalette()
export const palette = lightPalette;

export const shadows = {
  card: {
    shadowColor: '#14323A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
};