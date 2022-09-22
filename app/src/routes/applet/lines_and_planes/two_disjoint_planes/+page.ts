import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	if (url.searchParams.has('figure')) {
		const figureString = url.searchParams.get('figure') || '';

		const figure = parseInt(figureString) || 0;

		return { figure };
	}
};
