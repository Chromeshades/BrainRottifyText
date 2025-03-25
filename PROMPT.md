# BrainRot.js Module Requirements

**Goal:** Create a Node.js npm module named `BrainRottify` that generates random, absurd text strings with a "brain rot" aesthetic.

## 1. Core Function: `rottifyText(inputString, options)`

* Takes an optional `inputString` and an `options` object.
* If `inputString` is provided, it modifies the string based on the `options`.
* If `inputString` is not provided, it generates a random brain rot string.
* Returns the modified or generated string.

## 2. Options Object:

The `options` object should have the following properties:

* `rotLevel`: A number (1-10) controlling the intensity of brain rot.
* `includeSlang`: An array of strings that determine the types of slang that will be included (e.g., `['GenZ', 'Millennial']`).
* `includeDread`: A boolean; if `true`, include existential dread phrases.
* `includeSymbols`: A boolean; if `true`, include glitchy symbols.
* `includeInternetNoise`: A boolean; if `true`, include internet slang.

## 3. Data Structures:

* Use an object of hard-set arrays within the module for different categories of brain rot:
    * Gen Z slang
    * Millennial slang
    * Existential dread phrases
    * Glitchy symbols
    * Internet slang

## 4. Error Handling:

* If `rotLevel` is outside the 1-10 range, default to a `rotLevel` of 5.

## 5. Output:

* The `RottenText` function must return a string.

## Example:

**Input:**

```javascript
RottenText("Hello world", { rotLevel: 8, includeSlang: ['GenZ'], includeSymbols: true });
```

**Expected Output:**

A highly modified string like "H3ll0 w0rld 💀 yeet"

6. README.md:
Include a README.md file explaining module installation and usage.