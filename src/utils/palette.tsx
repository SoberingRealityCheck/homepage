'use client';

import { createContext, useContext, ReactNode, useEffect } from 'react';

export interface ColorPalette {
	name: string;
	color1: string; // Primary accent
	color2: string; // Secondary accent
	color3: string; // Tertiary accent
}

// Predefined Ikeda-inspired palettes
export const IKEDA_PALETTES: Record<string, ColorPalette> = {
	classic: {
		name: 'Classic Red/Cyan',
		color1: '#ff0033',
		color2: '#00ffff',
		color3: '#ff6600',
	},
	infrared: {
		name: 'Infrared',
		color1: '#ff0066',
		color2: '#ff3366',
		color3: '#ff6699',
	},
	dataBlue: {
		name: 'Data Blue',
		color1: '#0066ff',
		color2: '#00ccff',
		color3: '#6699ff',
	},
	electric: {
		name: 'Electric',
		color1: '#00ff00',
		color2: '#00ffff',
		color3: '#ffff00',
	},
	neon: {
		name: 'Neon',
		color1: '#ff00ff',
		color2: '#00ffff',
		color3: '#ffff00',
	},
	monochrome: {
		name: 'Monochrome',
		color1: '#ffffff',
		color2: '#cccccc',
		color3: '#999999',
	},
	sunset: {
		name: 'Sunset',
		color1: '#ff3300',
		color2: '#ff6600',
		color3: '#ff9900',
	},
	arctic: {
		name: 'Arctic',
		color1: '#00ccff',
		color2: '#66ffff',
		color3: '#99ccff',
	},
    owlsat: {
        name: 'OwlSAT', // NASA Theme lol
        color1: '#1463ecff',
        color2: '#FC3D21',
        color3: '#a4f5f5ff', 

    },
    cacti: {
        name: 'Cacti',
        color1: '#4CAF50',
        color2: '#c3954aff',
        color3: '#CDDC39',
    },
    robotics: {
        name: 'Robotics',
        color1: '#8031e7ff',
        color2: '#efb24fff',
        color3: '#ea1616ff',
    },
    homeimg: {
        name: 'Homepage Image',
        color1: '#000000ff',
        color2: '#61be63ff',
        color3: '#91ec92ff',
    },
    homepage: {
        name: 'Homepage',
        color1: '#91ec92ff',
        color2: '#61be63ff',
        color3: '#33be36ff',
    }
};

const PaletteContext = createContext<ColorPalette | null>(null);

export function PaletteProvider({
	children,
	palette,
}: {
	children: ReactNode;
	palette: ColorPalette;
}) {
	useEffect(() => {
		// Apply palette as CSS custom properties
		document.documentElement.style.setProperty('--palette-color-1', palette.color1);
		document.documentElement.style.setProperty('--palette-color-2', palette.color2);
		document.documentElement.style.setProperty('--palette-color-3', palette.color3);
		
		// Also update the Ikeda colors to use the palette
		document.documentElement.style.setProperty('--ikeda-red', palette.color1);
		document.documentElement.style.setProperty('--ikeda-cyan', palette.color2);
		document.documentElement.style.setProperty('--ikeda-orange', palette.color3);
		
		// Update semantic colors
		document.documentElement.style.setProperty('--accent', palette.color1);
		document.documentElement.style.setProperty('--secondary', palette.color2);
		document.documentElement.style.setProperty('--highlight', palette.color3);
	}, [palette]);

	return <PaletteContext.Provider value={palette}>{children}</PaletteContext.Provider>;
}

export function usePalette() {
	const context = useContext(PaletteContext);
	return context;
}
