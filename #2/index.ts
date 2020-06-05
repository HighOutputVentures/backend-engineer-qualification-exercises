/**
 * Calculates the ratio between the amount of time when status is AVAILABLE and
 * the amount of time between startDateTime inclusive and endDateTime exclusive.
 * @param startDateTime 
 * @param endDateTime 
 */
export function availability(startDateTime: Date, endDateTime: Date): number {
  // do something
  return 0;
}

/**
 * Generates the outages between startDateTime inclusive and endDateTime exclusive.
 * An outage is PARTIAL if the status within the period is PARTIALLY_AVAILABLE.
 * Similarly, an outage is MAJOR if the status within the period is MAJOR.
 * @param startDateTime 
 * @param endDateTime 
 */
export function outages(startDateTime: Date, endDateTime: Date): { type: 'PARTIAL' | 'MAJOR', timestamp: Date, duration: number }[] {
  // do something
  return [];
}
