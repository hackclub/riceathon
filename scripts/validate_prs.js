// using node-fetch instead of octokit.

const simpleApiReq = (r, method, data) => {
  return fetch("https://api.github.com/" + r, {
    method: method || "GET",
      headers: {
        Accept: "application/vnd.github+json",
      Authorization: process.env.GITHUB_TOKEN,
    },
    body: JSON.stringify(data),
  }).then((r) => r.json());
};
const owner = "OtterCodes101";
const repo = "programmer-socks-ysws";
const pull_number = process.env.PR_NUMBER;
(async () => {
  const prData = await simpleApiReq(
    `repos/${owner}/${repo}/pulls/${pull_number}`
    );
    if (prData.body.includes('automation:labels:rice')) {
        
    }
})();
