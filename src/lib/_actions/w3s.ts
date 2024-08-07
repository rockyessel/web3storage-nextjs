'use server';

import { w3sClient } from '../config/web3storage';
import { CID } from 'multiformats/cid';

// Function to upload files
export const uploadFiles = async (formData: FormData) => {
  try {
    const w3s = await w3sClient();

    const rawFormData = Object.fromEntries(formData);

    console.log('rawFormData: ', rawFormData);
    let files = rawFormData.files as unknown as File[];

    if (typeof files === 'object') {
      // @ts-ignore
      files = [files];
    }
    const CIDs: string[] = [];
    for (const file of files) {
      const cid = await w3s.uploadFile(file);
      const stringifiedCid = cid?.toString();
      CIDs.push(stringifiedCid!);
    }
    return CIDs;
  } catch (error) {
    console.log('error', error);
  }
};

// Function to get a file by CID
export const gettingFileByCID = async (cidString: string) => {
  try {
    const w3s = await w3sClient();
    const cid = CID.parse(cidString);
    const file = await w3s.capability.upload.get(cid);
    console.log('file: ', file);
    return file;
  } catch (error) {
    console.log('error', error);
  }
};

// Function to get all files
export const gettingAllFiles = async () => {
  try {
    const w3s = await w3sClient();
    const allFiles = await w3s.capability.upload.list({});
    const allCIDs = allFiles.results.map((cid) => cid.root.link().toString());
    console.log('allCIDs: ', allCIDs);

    return allCIDs;
  } catch (error) {
    console.log('error', error);
  }
};

// // Function to add an existing upload by CID
// export const addingExistingUploadByCID = async (cidString: string) => {
//   try {
//     const w3s = await w3sClient();
//     const cid = CID.parse(cidString);
//     await w3s.capability.upload.add(cid);
//     console.log(`Added existing upload with CID: ${cidString}`);
//   } catch (error) {
//     console.log('error', error);
//   }
// };

// // Function to get all files from a directory
// export const gettingAllFilesFromDirectory = async (directoryCID: string) => {
//   try {
//     const w3s = await w3sClient();
//     const cid = CID.parse(directoryCID);
//     const directoryFiles = await w3s.capability.upload.list({ parent: cid });
//     console.log('directoryFiles: ', directoryFiles);
//     return directoryFiles;
//   } catch (error) {
//     console.log('error', error);
//   }
// };

// // Function to get all directories
// export const gettingAllDirectory = async () => {
//   try {
//     const w3s = await w3sClient();

//     console.log('indexer: ', w3s.capability.index);
//     const allDirectories = await w3s.capability.directory.list({});
//     console.log('allDirectories: ', allDirectories);
//     return allDirectories;
//   } catch (error) {
//     console.log('error', error);
//   }
// };

// // Function to upload files
// export const uploadFilesToDirectory = async (formData: FormData) => {
//   try {
//     const w3s = await w3sClient();

//     const rawFormData = Object.fromEntries(formData);

//     console.log('rawFormData: ', rawFormData);
//     let files = rawFormData.files as unknown as File[];

//     if (typeof files === 'object') {
//       // @ts-ignore
//       files = [files];
//     }

//     const fileCid = await w3s.uploadFile([...files]);
//     console.log('fileCid: ', fileCid.link().toString());
//     return fileCid.link().toString();
//   } catch (error) {
//     console.log('error', error);
//   }
// };
