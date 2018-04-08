// ============================================================================ //
// UTILITY FUNCTIONS
// ============================================================================ //
// Encapsulate Object.assign
export const updateObject = (current, updates) => Object.assign({}, current, updates)

// Encapsulate updating an array
export const updateArray = (current, updates) => [...current, updates]
