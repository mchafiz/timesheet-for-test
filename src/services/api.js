const API_BASE_URL = 'http://localhost:3000/api/timesheet';

export const api = {
  async getTimeEntries() {
    try {
      const response = await fetch(`${API_BASE_URL}/entries`);
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error fetching time entries:', error);
      return [];
    }
  },

  async createTimeEntry(timeEntry) {
    try {
      const response = await fetch(`${API_BASE_URL}/entries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(timeEntry),
      });
      const data = await response.json();
      return data.success ? data.data : null;
    } catch (error) {
      console.error('Error creating time entry:', error);
      return null;
    }
  },

  async updateTimeEntry(id, updates) {
    // For now, we'll handle updates by creating a new entry
    // You can extend the backend later to support PUT requests
    try {
      const response = await fetch(`${API_BASE_URL}/entries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      return data.success ? data.data : null;
    } catch (error) {
      console.error('Error updating time entry:', error);
      return null;
    }
  }
};