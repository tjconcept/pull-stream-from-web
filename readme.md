# Create [pull-streams](https://pull-stream.github.io/) from [web streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)

```js
fromReadable(readable) // → source
fromWritable(writable) // → sink → Promise
fromTransform(transform) // → through
```

## Example

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
