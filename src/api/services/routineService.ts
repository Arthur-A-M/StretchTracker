import { Stretch } from '../../features/routine/types';
import { API_ENDPOINTS } from '../../config/constants';
import { httpClient } from '../httpClient';

// TODO: Implement real fetch routines endpoint when backend API exists.
// Expected request: GET /routines
// Expected response: { data: Stretch[] }
export async function fetchRoutines(): Promise<Stretch[]> {
  try {
    // Placeholder: replace with actual httpClient.get call when API is ready
    console.warn('fetchRoutines() is not implemented yet. Endpoint:', API_ENDPOINTS.routines.list);
    throw new Error('Routine service not yet implemented');
  } catch (error) {
    throw error;
  }
}

// TODO: Implement real create routine endpoint when backend API exists.
// Expected request: POST /routines with { stretches: Stretch[] }
// Expected response: { data: Stretch[] }
export async function createRoutine(stretches: Stretch[]): Promise<Stretch[]> {
  try {
    // Placeholder: replace with actual httpClient.post call when API is ready
    console.warn('createRoutine() is not implemented yet. Endpoint:', API_ENDPOINTS.routines.create);
    throw new Error('Routine service not yet implemented');
  } catch (error) {
    throw error;
  }
}

// TODO: Implement real get routine endpoint when backend API exists.
// Expected request: GET /routines/:id
// Expected response: { data: Stretch[] }
export async function getRoutine(id: string): Promise<Stretch[]> {
  try {
    // Placeholder: replace with actual httpClient.get call when API is ready
    console.warn('getRoutine() is not implemented yet. Endpoint:', API_ENDPOINTS.routines.get(id));
    throw new Error('Routine service not yet implemented');
  } catch (error) {
    throw error;
  }
}

// TODO: Implement real update routine endpoint when backend API exists.
// Expected request: PUT /routines/:id with { stretches: Stretch[] }
// Expected response: { data: Stretch[] }
export async function updateRoutine(id: string, stretches: Stretch[]): Promise<Stretch[]> {
  try {
    // Placeholder: replace with actual httpClient.put call when API is ready
    console.warn('updateRoutine() is not implemented yet. Endpoint:', API_ENDPOINTS.routines.update(id));
    throw new Error('Routine service not yet implemented');
  } catch (error) {
    throw error;
  }
}

// TODO: Implement real delete routine endpoint when backend API exists.
// Expected request: DELETE /routines/:id
// Expected response: { success: true }
export async function deleteRoutine(id: string): Promise<void> {
  try {
    // Placeholder: replace with actual httpClient.delete call when API is ready
    console.warn('deleteRoutine() is not implemented yet. Endpoint:', API_ENDPOINTS.routines.delete(id));
    throw new Error('Routine service not yet implemented');
  } catch (error) {
    throw error;
  }
}
