export {
	sourceFromReadable as fromReadable,
	sinkFromWritable as fromWritable,
	throughFromTransform as fromTransform,
}

function throughFromTransform({readable, writable}) {
	return (read) => {
		const source = sourceFromReadable(readable)
		sinkFromWritable(writable)(read)
		return source
	}
}

function sourceFromReadable(readable) {
	const reader = readable.getReader()
	let ended = null
	return (abort, cb) => {
		if (ended || abort) {
			ended = ended || abort
			reader.cancel(abort)
			cb(ended)
		} else {
			// Warning: "ended" should be consulted before invoking "cb"
			reader.read().then(
				({done, value}) => cb(done ? true : null, value),
				(err) => cb(err)
			)
		}
	}
}

function sinkFromWritable(writable) {
	return (read) =>
		new Promise((rs, rj) => {
			const writer = writable.getWriter()
			drain()

			function drain() {
				writer.ready.then(() =>
					read(null, (end, chunk) => {
						if (end === true) {
							writer.close().then(rs, rj)
						} else if (end) {
							writer.close().then(() => rj(end), rj)
						} else {
							writer.write(chunk)
							drain()
						}
					})
				)
			}
		})
}
