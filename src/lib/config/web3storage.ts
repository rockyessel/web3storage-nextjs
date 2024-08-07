'use server';

import { Client, create } from '@web3-storage/w3up-client';
import { DID_KEY, EMAIL } from './env'

/**
 * Initializes and configures a Web3.Storage client.
 * @returns {Promise<Client>} - The configured Web3.Storage client or null if no space is set.
 * @throws Will throw an error if login or space setup fails.
 */
export const w3sClient = async (): Promise<Client> => {
  // Create a new Web3.Storage client instance
  const client = await create();

  // Log in to the Web3.Storage account using the provided email
  const account = await client.login(EMAIL);

  // Set the current space for the client using the formatted DID key
  await client.setCurrentSpace(DID_KEY);

  // Retrieve the currently set space
  const space = client.currentSpace();

  // Throw an error if no space is set/available
  if (!space) {
    throw new Error(`There is no space for the provided DID: ${DID_KEY}`);
  }

  // Verify by logging the space in the terminal
  console.log('space_did: ', space.did());
  console.log('space_name: ', space.name);

  // Wait for the user to select a payment plan
  while (true) {
    // Check the current payment plan status
    const res = await account.plan.get();
    if (res.ok) break; // Exit the loop if a valid payment plan is detected
    console.log('Waiting for payment plan to be selected...');
    // Pause execution for 1 second before rechecking
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Return the configured Web3.Storage client
  return client;
};
