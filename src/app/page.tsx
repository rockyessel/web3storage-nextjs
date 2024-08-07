import Upload from '@/components/common/upload';
import { gettingAllFiles } from '@/lib/_actions/w3s';
// import { w3sClient } from '@/lib/config/web3storage';

export default async function Home() {
  // await w3sClient();

  const files = (await gettingAllFiles()) as string[];
  return <Upload files={files} />;
}
