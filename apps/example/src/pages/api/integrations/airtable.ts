import type { NextApiRequest, NextApiResponse } from "next";
import theme from "../../../utils/base_theme.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await fetch(
    "https://api.airtable.com/v0/appSrrogtpdUpyhwu/tbl9g9Qwvkr2M3bSN",
    {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
      },
    },
  );

  const data = await response.json();
  const schema: any = {};
  const links: any[] = [];

  data.records.forEach((record: any) => {
    links.push({
      "link": `page/${record.fields.name}`,
      "label": record.fields.name,
    });

    schema[record.fields.name] = {
      "page": record.fields.name,
      components: record?.fields?.component?.map((name: any) => ({
        name,
        props: {
          links,
        },
      })),
    };
  });

  res.status(200).json({ schema, theme });
}
