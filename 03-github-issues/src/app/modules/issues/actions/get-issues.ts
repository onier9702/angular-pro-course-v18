import { sleep } from "../../../helpers/sleep";
import { GithubIssue } from "../interfaces/github-issue.interface";

export const getIssues = async (): Promise<GithubIssue[]> => {

  await sleep(1500);

  try {
    const resp = await fetch(`https://api.github.com/repos/angular/angular/issues`);

    if (!resp.ok) {
      throw 'Can not load issues';
    }

    const issues: GithubIssue[] = await resp.json();
    console.log(issues);

    return issues;
  } catch (error) {
    throw 'Can not load issues';
  }

}
