import { w3sLinkBuilder } from '@/lib/utils';

interface Props {
  params: { cid: string };
}

export const GET = async (_request: Request, { params: { cid } }: Props) => {
  try {
    if (!cid) {
      return Response.json({ success: false });
    }

    const fileUrl = w3sLinkBuilder(cid);

    const fileResponse = await fetch(fileUrl);
    const rawFile = await fileResponse.blob();
    const mimeType = rawFile.type;

    // cloning the response object to prevent it from being disturbed
    const clonedResponse = await fetch(fileUrl);

    const headers = new Headers({
      'Content-Type': mimeType,
      'Content-Disposition': `inline; filename="${cid}"`,
    });

    return new Response(clonedResponse.body, { status: 200, headers });
  } catch (error) {
    console.log(error);

    return new Response(
      JSON.stringify({
        success: false,
        message: 'Internal Error',
        payload: null,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
