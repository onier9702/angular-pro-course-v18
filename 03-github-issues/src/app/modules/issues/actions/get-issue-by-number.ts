import { sleep } from "../../../helpers/sleep";
import { GithubIssue } from "../interfaces/github-issue.interface";

export const getIssueByNumber = async (issueNumber: string): Promise<GithubIssue> => {

  await sleep(1500);

  try {
    const resp = await fetch(`https://api.github.com/repos/angular/angular/issues/${issueNumber}`);

    if (!resp.ok) {
      throw 'Can not load issue';
    }

    const issue: GithubIssue = await resp.json();
    console.log(issue);

    return issue;
  } catch (error) {
    throw 'Can not load issue';
  }

}
