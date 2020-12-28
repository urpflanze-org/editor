export enum LogLevel {
	None,
	Temporany = 1 << 1,
	Comunication = 1 << 2,
	ComunicationResponse = 1 << 3,
	SetProp = 1 << 4,
}

type LogLevelStrings = keyof typeof LogLevel

const colors: Record<LogLevelStrings, string> = {
	None: '#000',
	Temporany: '#f70',
	Comunication: '#0A0',
	ComunicationResponse: '#0AF',
	SetProp: '#a2f',
}

const Log = {
	forceLocalWorker: true, // if webpack hot reload is enabled
	// forceLocalWorker: false,
	level: LogLevel.None,
	// level: LogLevel.Temporany | LogLevel.Comunication | LogLevel.ComunicationResponse | LogLevel.SetProp,

	log: (level: LogLevelStrings, ...args: any[]): void => {
		if (Log.level !== LogLevel.None) {
			// const level: LogLevelStrings = args[args.length - 1]
			// args.splice(-1, 1)

			if (LogLevel[level] & Log.level) {
				console.log(`%cLOG::${level}`, `color: ${colors[level]}; background: #000`, args)
			}
		}
	},
}

export default Log
