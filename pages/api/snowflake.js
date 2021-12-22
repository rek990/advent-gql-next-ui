// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/*
export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
*/

export default async function getData(req, res) {
  const queryString = `query MyQuery {
  unsplash_Search(query: "snowflake", per_page: 1, page: 1) {
    results
  }
}`;

  const response = await fetch(
    "https://westlinn.stepzen.net/api/newbie-olm/__graphql",

    {
      method: "POST",

      headers: {
        Authorization: `apikey ${process.env.NEXT_STEPZEN_API_KEY}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        /*query: `query MyQuery {unsplash_Random_Photo {
          urls {
            full
          }
        }
      }
      `,*/
        query: queryString,
      }),
    },
  );

  let data = await response.json();
  //Couldn't set status here. See https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client
  return res.json({ data: data });
}
