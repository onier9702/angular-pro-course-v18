import { sleep } from "../../../helpers/sleep";
import { GithubIssue } from '../interfaces/github-issue.interface';

export const getComments = async (issueNumber: string): Promise<GithubIssue> => {

  await sleep(1500);

  try {
    const resp = await fetch(`https://api.github.com/repos/angular/angular/issues/${issueNumber}/comments`);

    if (!resp.ok) {
      throw 'Can not load comments';
    }

    const comments: GithubIssue = await resp.json();

    return comments;
  } catch (error) {
    throw 'Can not load comments';
  }

}
