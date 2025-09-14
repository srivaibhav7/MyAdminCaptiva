'use server';

import { suggestUniqueMacAddress } from '@/ai/flows/suggest-unique-mac-address';

export async function getMacSuggestion(existingMacAddresses: string[]) {
  try {
    const result = await suggestUniqueMacAddress({ existingMacAddresses });
    return { success: true, suggestedMacAddress: result.suggestedMacAddress };
  } catch (error) {
    console.error('Error suggesting MAC address:', error);
    return {
      success: false,
      error: 'Failed to suggest a MAC address. Please try again.',
    };
  }
}
