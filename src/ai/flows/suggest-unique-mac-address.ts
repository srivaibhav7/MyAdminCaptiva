'use server';

/**
 * @fileOverview A MAC address suggestion AI agent.
 *
 * - suggestUniqueMacAddress - A function that handles the MAC address suggestion process.
 * - SuggestUniqueMacAddressInput - The input type for the suggestUniqueMacAddress function.
 * - SuggestUniqueMacAddressOutput - The return type for the suggestUniqueMacAddress function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestUniqueMacAddressInputSchema = z.object({
  existingMacAddresses: z
    .array(z.string())
    .describe('An array of existing MAC addresses in the network.'),
});
export type SuggestUniqueMacAddressInput = z.infer<
  typeof SuggestUniqueMacAddressInputSchema
>;

const SuggestUniqueMacAddressOutputSchema = z.object({
  suggestedMacAddress: z
    .string()
    .describe('A unique MAC address suggestion.'),
});
export type SuggestUniqueMacAddressOutput = z.infer<
  typeof SuggestUniqueMacAddressOutputSchema
>;

export async function suggestUniqueMacAddress(
  input: SuggestUniqueMacAddressInput
): Promise<SuggestUniqueMacAddressOutput> {
  return suggestUniqueMacAddressFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestUniqueMacAddressPrompt',
  input: {schema: SuggestUniqueMacAddressInputSchema},
  output: {schema: SuggestUniqueMacAddressOutputSchema},
  prompt: `You are a network administrator. You need to suggest a unique MAC address that is not in use in the network.

Here are the existing MAC addresses in the network:
{{#each existingMacAddresses}}
- {{this}}
{{/each}}

Suggest a unique MAC address that is not in the list above. The MAC address should be in the format of "XX:XX:XX:XX:XX:XX". Return ONLY the MAC address, without any other text. The MAC address must be valid.

UNIQUE MAC ADDRESS:`,
});

const suggestUniqueMacAddressFlow = ai.defineFlow(
  {
    name: 'suggestUniqueMacAddressFlow',
    inputSchema: SuggestUniqueMacAddressInputSchema,
    outputSchema: SuggestUniqueMacAddressOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
