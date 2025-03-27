# BrainRottifyText

A Node.js module that generates random, absurd text strings with a "brain rot" aesthetic. Zero dependencies - uses only built-in Node.js modules.

## Installation

```bash
npm install brain-rottify-text
```

## Usage

```javascript
const { rottifyText } = require('brain-rottify-text');

// Generate a random brain rot phrase
const random = rottifyText();
console.log(random); // Output: "no cap 💀 Stan"

// Transform an input string with default settings
const transformed = rottifyText("Hello world");
console.log(transformed); // Output: "Hello world"

// Configure with options for maximum brain rot
const extreme = rottifyText("Hello world", {
  rotLevel: 10,                      // Maximum intensity (1-10)
  includeSlang: ['GenZ', 'Millennial'], // Include both slang types
  includeDread: true,                // Add existential dread
  includeSymbols: true,              // Add glitchy symbols
  includeInternetNoise: true         // Add internet slang
});
console.log(extreme); // Output: "Hello world 💀 no cap why are we here just to suffer lmao 👁️👄👁️"
```

## Features

- 🚫 Zero dependencies - uses only Node.js built-in modules
- 🔄 Transform existing text or generate random phrases
- 🎯 Configurable intensity levels
- 🗣️ Multiple slang types (Gen Z, Millennial)
- 💭 Existential dread phrases
- 🔣 Glitchy symbols
- 📱 Internet slang

## API

### rottifyText(inputString, options)

Transforms a string with "brain rot" aesthetics or generates a random brain rot phrase.

#### Parameters

- **inputString** (string, optional): Input string to transform. If not provided, generates a random brain rot phrase.
- **options** (object, optional): Configuration options.
  - **rotLevel** (number, default: 5): Level of brain rot intensity (1-10).
  - **includeSlang** (array, default: []): Types of slang to include ('GenZ', 'Millennial').
  - **includeDread** (boolean, default: false): Whether to include existential dread phrases.
  - **includeSymbols** (boolean, default: false): Whether to include glitchy symbols.
  - **includeInternetNoise** (boolean, default: false): Whether to include internet slang.

#### Returns

- **string**: The rottified text.

## Examples

### Basic Usage

```javascript
const { rottifyText } = require('brain-rottify');

// Simple transformation
console.log(rottifyText("Hello world"));
// Possible output: "Hello world"

// Generate random brain rot
console.log(rottifyText());
// Possible output: "sheesh fr"
```

### Advanced Configuration

```javascript
// High rot level with Gen Z slang and symbols
console.log(rottifyText("Serious business email", {
  rotLevel: 8,
  includeSlang: ['GenZ'],
  includeSymbols: true
}));
// Possible output: "Serious business email 🤡 no cap yeet 💀"

// Add existential dread to your text
console.log(rottifyText("Monday motivation", {
  rotLevel: 7,
  includeDread: true
}));
// Possible output: "Monday motivation existence is pain we're all just cosmic dust"
```

## License

MIT
