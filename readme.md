# Create [pull-streams](https://pull-stream.github.io/) from [web streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)

```js
fromReadable(readable) // → source
fromWritable(writable) // → sink → Promise
fromTransform(transform) // → through
```

## Examples

### `fetch`

```js
import pull from 'https://esm.sh/pull-stream@3.7.0'
import {
	fromReadable,
	fromTransform,
} from 'https://deno.land/x/pull_stream_from_web@v1.0.0/index.js'

fetch('https://www.google.com').then((r) =>
	pull(
		fromReadable(r.body),
		fromTransform(new TextDecoderStream()),
		pull.concat(console.log)
	)
)
```

### [Deno](https://deno.land/) `stdio`

```js
import pull from 'https://esm.sh/pull-stream@3.7.0'
import {
	fromReadable,
	fromTransform,
	fromWritable,
} from 'https://deno.land/x/pull_stream_from_web@v1.0.0/index.js'

pull(
	fromReadable(Deno.stdin.readable),
	fromTransform(new TextDecoderStream()),
	pull.map((x) => x.toUpperCase()),
	fromTransform(new TextEncoderStream()),
	fromWritable(Deno.stdout.writable)
).catch(console.error)
```
