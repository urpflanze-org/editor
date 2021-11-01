import LZString from 'lz-string'

interface StorageIndexing {
	created: number
	parts: number
	bParse: boolean
}

interface StorageIndex {
	[name: string]: StorageIndexing
}

class UIStorage {
	private chunck_size = 1024

	public get<T>(name: string, _default: T, bUnparse = false): T {
		const index = this.getIndex()

		if (index[name]) {
			let data = ''
			for (let i = 0; i < index[name].parts; i++) data += localStorage.getItem(name + '_' + i)

			const decompresed = LZString.decompress(data) as string

			return index[name].bParse && !bUnparse ? JSON.parse(decompresed) : decompresed
		}

		return _default
	}

	public has(name: string): boolean {
		const index = this.getIndex()
		return typeof index[name] !== 'undefined'
	}

	public set(name: string, data: any, isJSONString = false): void {
		const bParse = isJSONString || typeof data === 'object'
		const compressed = LZString.compress(bParse && !isJSONString ? JSON.stringify(data) : data)

		const parts = Math.ceil(compressed.length / this.chunck_size)

		const indexing: StorageIndexing = {
			bParse,
			parts,
			created: +new Date(),
		}

		this.addToIndex(name, indexing)

		for (let i = 0; i < parts; i++) {
			const start = i * this.chunck_size
			const end = start + this.chunck_size
			localStorage.setItem(name + '_' + i, compressed.slice(start, end))
		}
	}

	private getIndex(): StorageIndex {
		return JSON.parse(localStorage.getItem('indexing') || '{}')
	}

	private addToIndex(name, indexing: StorageIndexing) {
		const index = this.getIndex()

		if (index[name]) for (let i = 0; i < index[name].parts; i++) localStorage.removeItem(name + '_' + i)

		index[name] = indexing

		localStorage.setItem('indexing', JSON.stringify(index))
	}
}

export default new UIStorage()
