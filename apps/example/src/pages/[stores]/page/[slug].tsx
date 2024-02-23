import { PageBuilder } from '@dom-builder/builder';
import { GetServerSidePropsContext } from 'next';

export function DynamicPage({ slug, schema }: { slug: string, schema: any }) {
    return (
        <PageBuilder builderSchema={schema} page={String(slug)} />
    );
}

export default DynamicPage;

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ? `https://${process.env.NEXT_PUBLIC_API_URL}` : 'http://localhost:3000'
    // const response = await fetch(baseUrl + '/api/admin/pages?store_name=' + context?.params?.stores)
    const response = await fetch(baseUrl + '/api/integrations/airtable')
    const data = await response.json()

    return {
      props: {
        schema: data.schema,
        theme: data.theme,
        slug: context?.params?.slug,
      },
    }
}
