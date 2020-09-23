const app_utilities = {
	app_name: 'Urpflanze',

	app_version: '0.0.1',

	file_extension: 'ufz',

	autosave_timeout: 5000,

	empty_project_name: 'Empty_Project',

	getDocumentProjectTitle: (project_name?: string): string =>
		(project_name || app_utilities.empty_project_name) + ' ∴ ' + app_utilities.app_name,
}

export default app_utilities
