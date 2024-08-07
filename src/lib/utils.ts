import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DID_FORMAT = 'did:key:';

export type DIDType = `${typeof DID_FORMAT}${string}`;

/**
 * Formats and validates a given DID string.
 * @param {any} did - The DID value to format and validate.
 * @returns {DIDType} - The formatted DID string.
 * @throws Will throw an error if the provided DID is not a string or if it is empty.
 */
export const DID = (did: any): DIDType => {
  if (typeof did !== 'string') {
    throw new Error(`DID value must be a string but got: ${typeof did}`);
  }
  if (!did) {
    throw new Error('No did provided');
  }
  if (did.startsWith(DID_FORMAT)) {
    return did as DIDType;
  }
  return `${DID_FORMAT}${did}`;
};

/**
 * Generates an error message for missing environment variables.
 * @param {string} envName - The name of the missing environment variable.
 * @returns {string} - The error message.
 */
export const envError = (envName: string) => {
  const message = `You have to set an environment variable for ${envName}, to use this application.`;
  return message;
};

/**
 * Converts a file size in bytes to a human-readable string with units.
 * @param {number} bytes - The file size in bytes.
 * @returns {string} The formatted file size.
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Byte';

  const sizes: string[] = [
    'Bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB',
    'EB',
    'ZB',
    'YB',
  ];
  const i: number = Math.floor(Math.log(bytes) / Math.log(1024));
  const formattedSize: number = bytes / Math.pow(1024, i);

  return Math.round(formattedSize * 100) / 100 + ' ' + sizes[i];
};

export const w3sLinkBuilder = (cid: string) => {
  if (!cid) {
    throw new Error('CID is required. Value for `w3sLinkBuilder` is empty.');
  }

  if (typeof cid !== 'string') {
    throw new Error(`DID value must be a string but got: ${typeof cid}`);
  }

  const url = `https://${cid}.ipfs.w3s.link`;
  return url;
};

// Check if the environment is Vercel production or standard production.
const isVercelProduction = process.env.VERCEL === '1';
const isStandardProduction = process.env.NODE_ENV === 'production';

// Determine if the environment is production.
export const isProduction = isVercelProduction || isStandardProduction;

const DOMAIN = process.env.PROD_DOMAIN ?? 'localhost:3000';

/**
 * Constructs a domain URL with an optional path.
 * @param {string} [path] - Optional path to append to the domain URL.
 * @returns {string} - The constructed domain URL.
 * @throws {Error} - If the domain is not set or is an empty string.
 */
export const domainURL = (path?: string) => {
  const protocol = isProduction ? 'https' : 'http';
  // console.log('DOMAIN: ', DOMAIN);

  if (!DOMAIN) {
    throw new Error('Domain is not set or is an empty string');
  }

  let url: URL;
  if (path) {
    url = new URL(`${protocol}://${DOMAIN}${path}`);
  } else {
    url = new URL(`${protocol}://${DOMAIN}`);
  }

  return url.toString();
};

export const fileCidBuilder = (cid: string) => {
  if (!cid) {
    throw new Error('CID is required. Value for `fileCidBuilder` is empty.');
  }
  const url = domainURL(`/api/cids/${cid}`);
  return url;
};
