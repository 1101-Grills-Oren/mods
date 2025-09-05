const octokit = new Octokit({
  auth: 'github_p'+'at_11BADMTJI0dmSDa8V5xAJ3_9wUUK5VYsAq'+'jNY6nndJ5rDlTVwuLIYFGGVHzvWEGAQwHFQOVRMDH7yB9C86'
})

console.log(octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
  owner: '1101-Grills-Oren',
  repo: 'mods',
  path: '',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
}))
//console.log(fetch("https://raw.githubusercontent.com/1101-Grills-Oren/mods/refs/heads/main/"))
