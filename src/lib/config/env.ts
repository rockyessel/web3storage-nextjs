import { DID, DIDType, envError } from '../utils';

const env = process.env;

if (!env.WEB3STORAGE_SPACE_DID) {
  throw new Error(envError(`WEB3STORAGE_SPACE_DID`));
}

if (!env.WEB3STORAGE_EMAIL) {
  throw new Error(envError(`WEB3STORAGE_EMAIL`));
}

/**
 * Formats and validates the WEB3STORAGE_SPACE_DID environment variable.
 * @type {DIDType} - The formatted DID string.
 */
export const DID_KEY: DIDType = DID(env.WEB3STORAGE_SPACE_DID);

/**
 * Retrieves and formats the WEB3STORAGE_EMAIL environment variable.
 * @type {`${string}@${string}`} - The formatted email string.
 */
export const EMAIL: `${string}@${string}` = String(
  env.WEB3STORAGE_EMAIL
) as `${string}@${string}`;
