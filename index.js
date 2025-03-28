/**
 * BrainRottify - A module that generates random, absurd text strings with a "brain rot" aesthetic
 */

const fs = require('fs');
const path = require('path');

// Load predefined brain rot data
let rottenData;
try {
  const dataPath = path.join(__dirname, 'rottenData', 'moldyRot.json');
  rottenData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
} catch (error) {
  console.error('Failed to load rottenData: ', error);
  // Default fallback data if file can't be loaded
  rottenData = {
    genZSlang: ['no cap', 'fr', 'based', 'yeet', 'sus'],
    millennialSlang: ['literally', 'I can\'t even', 'adulting', 'savage'],
    existentialDread: ['existence is pain', 'we live in a society'],
    glitchySymbols: ['💀', '👁️👄👁️', '🤡', '✨'],
    internetSlang: ['lol', 'lmao', 'idk', 'tbh', 'omg']
  };
}

/**
 * Transforms a string with "brain rot" aesthetics or generates a random brain rot phrase
 * @param {string} [inputString] - Optional input string to transform
 * @param {Object} [options] - Configuration options
 * @param {number} [options.rotLevel=5] - Level of brain rot intensity (1-10)
 * @param {string[]} [options.includeSlang=[]] - Types of slang to include ('GenZ', 'Millennial')
 * @param {boolean} [options.includeDread=false] - Whether to include existential dread phrases
 * @param {boolean} [options.includeSymbols=false] - Whether to include glitchy symbols
 * @param {boolean} [options.includeInternetNoise=false] - Whether to include internet slang
 * @returns {string} - The rottified text
 */
function rottifyText(inputString, options = {}) {
  // Set default options
  const config = setDefaultOptions(options);

  // If no input string is provided, generate a random brain rot phrase
  if (!inputString) {
    return generateRandomRotPhrase(config);
  }

  // Transform the input string based on options
  return transformText(inputString, config);
}

/**
 * Generates a random brain rot phrase based on configuration
 * @param {Object} config - Configuration options
 * @returns {string} - Random brain rot phrase
 */
function generateRandomRotPhrase(config) {
  const phrases = addPhrases(config);
  
  // If no phrases were added (no options selected), add some defaults
  if (phrases.length === 0) {
    phrases.push(...getRandomElements([...rottenData.genZSlang, ...rottenData.millennialSlang], 2));
  }
  
  // Shuffle phrases for randomness
  const shuffledPhrases = shuffleArray(phrases);
  
  // Add glitchy symbols if enabled
  if (config.includeSymbols) {
    const symbols = getRandomElements(rottenData.glitchySymbols, getRandomIntensity(config.rotLevel, 4));
    // Insert symbols randomly throughout the phrase
    for (const symbol of symbols) {
      const position = Math.floor(Math.random() * (shuffledPhrases.length + 1));
      shuffledPhrases.splice(position, 0, symbol);
    }
  }
  
  return shuffledPhrases.join(' ');
}

/**
 * Transforms an input string based on configuration
 * @param {string} text - Input text to transform
 * @param {Object} config - Configuration options
 * @returns {string} - Transformed text
 */
function transformText(text, config) {
  let result = text;
  
  // Collect all the phrases to insert
  const phrases = addPhrases(config);
  
  // Add glitchy symbols if enabled
  if (config.includeSymbols) {
    phrases.push(...getRandomElements(rottenData.glitchySymbols, getRandomIntensity(config.rotLevel, 3)));
  }
  
  // If we have phrases to insert, split the text and insert them
  if (phrases.length > 0) {
    result = shuffleAndInsert(result, phrases, config.rotLevel);
  }
  
  return result;
}

/**
 * Get random elements from an array
 * @param {Array} array - Source array
 * @param {number} count - Number of elements to select
 * @returns {Array} - Array of randomly selected elements
 */
function getRandomElements(array, count) {
  if (count <= 0 || array.length === 0) return [];
  
  // Ensure we don't try to select more elements than exist
  const actualCount = Math.min(count, array.length);
  
  // Clone and shuffle the array
  const shuffled = shuffleArray([...array]);
  
  // Return the first 'actualCount' elements
  return shuffled.slice(0, actualCount);
}

/**
 * Fisher-Yates shuffle algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} - Shuffled array
 */
function shuffleArray(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Calculate a random number of elements based on rot level intensity
 * @param {number} rotLevel - Level of brain rot intensity (1-10)
 * @param {number} maxCount - Maximum number of elements
 * @returns {number} - Random number of elements to include
 */
function getRandomIntensity(rotLevel, maxCount) {
  // Scale the rot level to a reasonable number based on maxCount
  const minElements = Math.max(1, Math.floor(rotLevel / 10 * maxCount));
  const maxElements = Math.max(minElements, Math.ceil(rotLevel / 5));
  
  return Math.floor(Math.random() * (maxElements - minElements + 1)) + minElements;
}

/**
 * Extract common logic for adding phrases
 * @param {Object} config - Configuration options
 * @returns {Array} - Array of phrases
 */
function addPhrases(config) {
  const phrases = [];
  
  // Add slang based on configuration
  if (config.includeSlang.map(s => s.toLowerCase()).includes('genz')) {
    phrases.push(...getRandomElements(rottenData.genZSlang, getRandomIntensity(config.rotLevel, 3)));
  }
  
  if (config.includeSlang.map(s => s.toLowerCase()).includes('millennial')) {
    phrases.push(...getRandomElements(rottenData.millennialSlang, getRandomIntensity(config.rotLevel, 3)));
  }
  
  // Add existential dread if enabled
  if (config.includeDread) {
    phrases.push(...getRandomElements(rottenData.existentialDread, getRandomIntensity(config.rotLevel, 2)));
  }
  
  // Add internet slang if enabled
  if (config.includeInternetNoise) {
    phrases.push(...getRandomElements(rottenData.internetSlang, getRandomIntensity(config.rotLevel, 3)));
  }
  
  return phrases;
}

/**
 * Extract common logic for shuffling and inserting phrases
 * @param {string} text - Input text to transform
 * @param {Array} phrases - Array of phrases to insert
 * @param {number} rotLevel - Level of brain rot intensity (1-10)
 * @returns {string} - Transformed text
 */
function shuffleAndInsert(text, phrases, rotLevel) {
  // Shuffle the phrases for randomness
  const shuffledPhrases = shuffleArray(phrases);
  
  // Split the result into words
  const words = text.split(' ');
  
  // If there are too few words, just append the phrases
  if (words.length <= 1) {
    return text + ' ' + shuffledPhrases.join(' ');
  }
  
  // Calculate how many phrases to insert (based on rot level)
  const insertCount = Math.min(
    shuffledPhrases.length,
    Math.max(1, Math.floor(rotLevel / 10 * words.length))
  );
  
  // Insert phrases at random positions
  for (let i = 0; i < insertCount; i++) {
    const phrase = shuffledPhrases[i];
    // Pick a random position between words (avoid putting at very beginning)
    const position = Math.floor(Math.random() * (words.length - 1)) + 1;
    words.splice(position, 0, phrase);
  }
  
  // If we have leftover phrases, append them at the end
  if (insertCount < shuffledPhrases.length) {
    words.push(...shuffledPhrases.slice(insertCount));
  }
  
  return words.join(' ');
}

/**
 * Set default options and handle the absence of an input string
 * @param {Object} options - Configuration options
 * @returns {Object} - Configuration options with defaults set
 */
function setDefaultOptions(options) {
  return {
    rotLevel: Math.min(Math.max(options.rotLevel || 5, 1), 10),
    includeSlang: options.includeSlang || [],
    includeDread: options.includeDread || true,
    includeSymbols: options.includeSymbols || false,
    includeInternetNoise: options.includeInternetNoise || true
    

  };
}

// Export the main function
module.exports = {
  rottifyText
};
