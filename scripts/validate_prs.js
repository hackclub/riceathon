// using node-fetch instead of octokit.
const fs = require("fs");
const simpleApiReq = async (r, method, data, headers) => {
  console.debug("#req");
  try {
    const res = await fetch("https://api.github.com/" + r, {
      method: method || "GET",
      headers: {
        ...(headers ?? {}),
        "User-Agent": "Riceathon-PR-Validation",
        Accept: "application/vnd.github+json",
        Authorization: "Bearer " + process.env.GITHUB_TOKEN,
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    const json = await res.json();
    console.debug(json);
    return json;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};
const owner = process.env.OWNER_NAME || "hackclub";
const repo = process.env.REPO_NAME || "riceathon";
const pull_number = process.env.PR_NUMBER;

// break in line prettier

(async () => {
  console.log(`Checking out PR #${pull_number}`);
  const prData = await simpleApiReq(
    `repos/${owner}/${repo}/pulls/${pull_number}`,
    undefined,
    undefined,
    {
      Accept: "application/vnd.github.text+json",
    },
  );
  if (prData.body && prData.body.includes("automation:labels:rice")) {
    await simpleApiReq(
      `repos/${owner}/${repo}/issues/${pull_number}/labels`,
      "POST",
      {
        labels: ["rice-setup"],
      },
    );
  }
  const commentError = async (message) => {
    console.debug("#commentError");
    await simpleApiReq(
      `repos/${owner}/${repo}/issues/${pull_number}/comments`,
      "POST",
      {
        body: `members.json is invalid:\n${message}`,
      },
    );
  };
  // validate members.json file
  // schema
  // name -> GH username here (ex: John Does dotfiles or what ever you name ur dotfiles) string (req)
  // dotfiles git link (optional) string
  // dotfiles os (nixos,arch,etc) string (req)
  // TODO: any other props?
  function validate(obj) {
    if (!obj.name) throw "No Name";
    if (!obj.distro) throw "No OS provided";
    if (obj.git && typeof obj.git !== "string") throw "git is not a string";
    if (typeof obj.name !== "string") throw "Name is not a string";
    if (typeof obj.distro !== "string") throw "OS is not a string";
    if (
      obj.git &&
      typeof obj.git === "string" &&
      !obj.git.startsWith("https://")
    )
      throw "git is not a url";
    return true;
  }
  const members = fs.readFileSync(process.cwd() + "/members.json");
  let already_thrown = false;
  try {
    let parsed = JSON.parse(members);
    if (Array.isArray(parsed)) {
      for (const e of parsed) {
        console.log(`Checking `, e);
        //        if (already_thrown) throw e;
        try {
          console.log(`Validation??`);
          validate(e);
        } catch (e) {
          console.error(e);
          already_thrown = e;
          await commentError(e.toString());
        }
      }
    } else {
      await commentError(`It's not an array `);
    }
  } catch (e) {
    await commentError("Broken JSON:\n```" + e.toString() + "```");
  }
  if (already_thrown) {
    setTimeout(() => {
      process.exit(1);
    }, 5 * 1000);
  } else {
    await simpleApiReq(
      `repos/${owner}/${repo}/issues/${pull_number}/comments`,
      "POST",
      {
        body: "members.json is valid",
      },
    );
  }
})();
